import { DEFAULT_IMAGE } from '@/constants';

/**
 * @param {string} url
 * @param {RequestInit} options
 * @returns Promise<Response>
 */
async function efetch(url, options = {}) {
  let result = {};
  let json = {};
  try {
    result = await fetch(url, options);
    json = await result.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error(error.message);
  }

  if (!result.ok || json.status !== 'success') {
    throw new Error(json.message);
  }
  return json.data;
}

function makeProductService() {
  const baseUrl = '/api/products';

  async function fetchProduct(id) {
    const { product } = await efetch(`${baseUrl}/${id}`);
    return {
      category: product.c_name,
      ...product
    };
  }

  async function fetchProducts() {
    const data = await efetch(`${baseUrl}/all`);
    if (data && data.products) {
      return data;
    } else {
      throw new Error('Products not found');
    }
  }

  async function createProduct(product) {
    const formData = new FormData();
    formData.append('p_name', product.name);
    formData.append('p_author', product.author);
    formData.append('p_publish_date', product.publish_date);
    formData.append('p_description', product.description);
    formData.append('p_price', product.price);
    formData.append('p_quantity', product.quantity);
    formData.append('p_category', product.category);
    formData.append('p_image', product.imageFile);
    try {
      return efetch(baseUrl, {
        method: 'POST',
        body: formData
      });
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  async function updateProduct(id, product) {
    const formData = new FormData();
    formData.append('p_name', product.name);
    formData.append('p_author', product.author);
    formData.append('p_publish_date', product.publish_date);
    formData.append('p_description', product.description);
    formData.append('p_price', product.price);
    formData.append('p_quantity', product.quantity);
    formData.append('p_category', product.category);
    formData.append('p_image', product.imageFile);
    try {
      return efetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        body: formData
      });
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  async function deleteProduct(id) {
    return efetch(`${baseUrl}/${id}`, {
      method: 'DELETE'
    });
  }

  async function deleteAllProducts() {
    return efetch(baseUrl, {
      method: 'DELETE'
    });
  }

  return {
    fetchProduct,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    deleteAllProducts
  };
}

export default makeProductService();
