/**
 * @param {string} url
 * @param {RequestInit} options
 * @returns Promise<Response>
 */

async function efetch(url, options = {}) {
  let result;
  let json;

  try {
    console.log('Request URL:', url);
    console.log('Request options:', options);

    result = await fetch(url, options);

    if (!result.ok) {
      throw new Error(`HTTP error! status: ${result.status}`);
    }

    json = await result.json();
  } catch (error) {
    console.error('Fetch error:', error.message);
    throw error;
  }

  console.log('Response from server:', json);
  if (json?.status === 'fail' && json.message === 'Product not found') {
    console.warn('No products found for the specified category.');
    return [];
  }

  return json.data || json.products || [];
}

export function productInformation() {
  const baseUrl = '/api/products';

  async function getProduct() {
    const response = await efetch(`${baseUrl}/all`, {
      method: 'GET'
    });

    console.log('Fetched product:', response);
    return response;
  }

  async function getProductbyCategory(c_name) {
    const response = await efetch(`${baseUrl}/category/${c_name}`, {
      method: 'GET'
    });

    console.log('Fetched product by category:', response);
    return response;
  }

  async function fetchProductsByName(p_name) {
    try {
      const response = await efetch(`${baseUrl}?p_name=${encodeURIComponent(p_name)}`, {
        method: 'GET'
      });

      console.log('Fetched products:', response);
      return response;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }

  async function getProductbyID(p_id) {
    const response = await efetch(`${baseUrl}/${p_id}`, {
      method: 'GET'
    });

    console.log('Fetch data', response);
    return response;
  }

  async function getProductwithCategory(p_id) {
    const response = await efetch(`${baseUrl}/genres/${p_id}`, {
      method: 'GET'
    });

    console.log('Fetch data', response);
    return response;
  }

  return {
    getProduct,
    fetchProductsByName,
    getProductbyCategory,
    getProductbyID,
    getProductwithCategory
  };
}
