"""
ML Recommendation Microservice
Exposes two endpoints:
  POST /recommend  -> personalised product IDs for a user
  POST /similar    -> content-based similar product IDs for a product
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import MultiLabelBinarizer
import numpy as np
import os
from dotenv import load_dotenv
from bson import ObjectId

load_dotenv()

app = Flask(__name__)
CORS(app)

# ── Database ──────────────────────────────────────────────────────────────────
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/ecommerce_capstone")
client = MongoClient(MONGO_URI)
db = client.get_default_database()
products_col = db["products"]


# ── Helpers ───────────────────────────────────────────────────────────────────
def get_all_products():
    """Return all products as a list of dicts with string _id."""
    docs = list(products_col.find({}))
    for d in docs:
        d["_id"] = str(d["_id"])
    return docs


def build_feature_matrix(products):
    """
    Build a simple TF-IDF-style feature matrix from category + tags.
    Returns (matrix, product_ids_in_order).
    """
    mlb = MultiLabelBinarizer()
    features = []
    ids = []
    for p in products:
        tags = p.get("tags", [])
        category = [p.get("category", "unknown")]
        features.append(tags + category)
        ids.append(p["_id"])

    matrix = mlb.fit_transform(features).astype(float)

    # Weight by average rating (normalised 0-1) and view popularity
    for i, p in enumerate(products):
        rating_weight = p.get("averageRating", 0) / 5.0
        view_weight = min(p.get("viewCount", 0) / 1000.0, 1.0)
        matrix[i] *= 1 + rating_weight + 0.5 * view_weight

    return matrix, ids


# ── Routes ────────────────────────────────────────────────────────────────────
@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


@app.route("/recommend", methods=["POST"])
def recommend():
    """
    Body:
      user_id          : str
      view_history     : [product_id, ...]
      purchase_history : [product_id, ...]
      ratings          : [{"product_id": str, "score": int}, ...]
    Returns:
      {"recommended_product_ids": [str, ...]}
    """
    data = request.get_json()
    viewed = data.get("view_history", [])
    purchased = data.get("purchase_history", [])
    ratings = {r["product_id"]: r["score"] for r in data.get("ratings", [])}

    all_products = get_all_products()
    if not all_products:
        return jsonify({"recommended_product_ids": []})

    matrix, ids = build_feature_matrix(all_products)

    # Build a weighted user profile vector
    interacted = set(viewed + purchased + list(ratings.keys()))
    if not interacted:
        # Cold start — return top-rated products
        top = sorted(all_products, key=lambda p: -p.get("averageRating", 0))[:8]
        return jsonify({"recommended_product_ids": [p["_id"] for p in top]})

    user_vector = np.zeros(matrix.shape[1])
    for pid in viewed:
        if pid in ids:
            user_vector += matrix[ids.index(pid)] * 1.0
    for pid in purchased:
        if pid in ids:
            user_vector += matrix[ids.index(pid)] * 2.0  # purchases weighted more
    for pid, score in ratings.items():
        if pid in ids:
            user_vector += matrix[ids.index(pid)] * (score / 5.0) * 3.0

    if user_vector.sum() == 0:
        return jsonify({"recommended_product_ids": []})

    sims = cosine_similarity([user_vector], matrix)[0]

    # Exclude already-interacted products
    ranked = sorted(
        [(ids[i], sims[i]) for i in range(len(ids)) if ids[i] not in interacted],
        key=lambda x: -x[1],
    )

    top_ids = [pid for pid, _ in ranked[:8]]
    return jsonify({"recommended_product_ids": top_ids})


@app.route("/similar", methods=["POST"])
def similar():
    """
    Body:
      product_id : str
      limit      : int (optional, default 6)
    Returns:
      {"similar_product_ids": [str, ...]}
    """
    data = request.get_json()
    product_id = data.get("product_id")
    limit = data.get("limit", 6)

    all_products = get_all_products()
    if not all_products:
        return jsonify({"similar_product_ids": []})

    matrix, ids = build_feature_matrix(all_products)

    if product_id not in ids:
        return jsonify({"similar_product_ids": []})

    idx = ids.index(product_id)
    sims = cosine_similarity([matrix[idx]], matrix)[0]

    ranked = sorted(
        [(ids[i], sims[i]) for i in range(len(ids)) if ids[i] != product_id],
        key=lambda x: -x[1],
    )

    top_ids = [pid for pid, _ in ranked[:limit]]
    return jsonify({"similar_product_ids": top_ids})


if __name__ == "__main__":
    port = int(os.getenv("ML_PORT", 5001))
    app.run(host="0.0.0.0", port=port, debug=False)
