import client from './client';

// GET /api/products — supports category, search, sort, page, limit
export async function getProducts(params = {}) {
  const res = await client.get('/api/products', { params });
  return res.data; // { products, page, totalPages, total }
}

// GET /api/products/:id
export async function getProductById(id) {
  const res = await client.get(`/api/products/${id}`);
  return res.data;
}

// GET /api/products/:id/similar
export async function getSimilarProducts(id) {
  const res = await client.get(`/api/products/${id}/similar`);
  return res.data;
}

// POST /api/products/:id/review  (requires auth token)
export async function addReview(id, { rating, comment }) {
  const res = await client.post(`/api/products/${id}/review`, { rating, comment });
  return res.data;
}