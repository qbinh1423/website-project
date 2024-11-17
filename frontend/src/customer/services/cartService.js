/**
 * @param {string} url
 * @param {RequestInit} options
 * @returns Promise<Response>
 */

async function efetch(url, options = {}) {
  let result = {};
  let json = {};

  try {
    console.log('Request URL:', url);
    console.log('Request options:', options);

    result = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    });

    if (!result.ok) {
      const errorData = await result.json();
      console.error('Server error:', errorData);
      throw new Error(`Server error: ${errorData.message || 'Unknown error'}`);
    }

    json = await result.json();
    console.log('Response from server:', json);
  } catch (error) {
    console.error('Fetch Error:', error.message);
    throw new Error('Error processing the request. Please try again later.');
  }

  return json.data;
}

export function Cart() {
  const baseUrl = '/api/cart';

  async function fetchCartItems(u_name) {
    return await efetch(`${baseUrl}/${u_name}`, {
      method: 'GET'
    });
  }

  async function addCartItem(product) {
    console.log('Sending product to server:', product);
    return await efetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    });
  }

  async function updateCartItem(cartId, product) {
    const url = `${baseUrl}/${encodeURIComponent(cartId)}`;
    return await efetch(url, {
      method: 'PUT',
      body: JSON.stringify(product)
    });
  }

  async function deleteCartItem(cartId) {
    const url = `${baseUrl}/${encodeURIComponent(cartId)}`;
    return await efetch(url, {
      method: 'DELETE'
    });
  }

  async function deleteAllCartItems(product) {
    return await efetch(baseUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    });
  }

  return {
    fetchCartItems,
    addCartItem,
    updateCartItem,
    deleteCartItem,
    deleteAllCartItems
  };
}
