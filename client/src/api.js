
const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000';

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
}

// GET - Retrieve all products
export const getProducts = () => {
  return request('/api/products');
};

// POST - Add a new product
export const createProduct = (product) => {
  return request('/api/products', {
    method: 'POST',
    body: JSON.stringify(product),
  });
};

// PUT - Update an existing product
export const updateProduct = (id, product) => {
  return request(`/api/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(product),
  });
};

// DELETE - Remove a product
export const deleteProduct = (id) => {
  return request(`/api/products/${id}`, {
    method: 'DELETE',
  });
};
