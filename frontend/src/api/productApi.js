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

// POST /api/upload/image — upload image to Cloudinary
export async function uploadImage(imageUri) {
  const formData = new FormData();
  const filename = imageUri.split('/').pop();
  const match = /\.(\w+)$/.exec(filename);
  const type = match ? `image/${match[1]}` : 'image/jpeg';

  formData.append('file', {
    uri: imageUri,
    name: filename,
    type,
  });

  const res = await client.post('/api/upload/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data; // { imageUrl, publicId }
}

// POST /api/products — create a new product (requires auth token)
export async function createProduct(productData) {
  const res = await client.post('/api/products', productData);
  return res.data;
}

// PUT /api/products/:id — update product (requires auth token)
export async function updateProduct(id, productData) {
  const res = await client.put(`/api/products/${id}`, productData);
  return res.data;
}

// DELETE /api/products/:id — delete product (requires auth token)
export async function deleteProduct(id) {
  const res = await client.delete(`/api/products/${id}`);
  return res.data;
}

// POST /api/products/:id/review  (requires auth token)
export async function addReview(id, { rating, comment }) {
  const res = await client.post(`/api/products/${id}/review`, { rating, comment });
  return res.data;
}
