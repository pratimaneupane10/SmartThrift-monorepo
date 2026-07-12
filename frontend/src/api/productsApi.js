import client from './client';

export async function getProducts(params = {}) {
  const { data } = await client.get('/api/products', { params });
  return data; // { products, page, totalPages, total }
}

export async function getProductById(id) {
  const { data } = await client.get(`/api/products/${id}`);
  return data;
}
