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
    throw new Error('Network or JSON parsing error: ' + error.message);
  }

  if (!result.ok) {
    console.error('API Response Error:', json);
    throw new Error(json.message || 'API error');
  }

  if (json.status !== 'success') {
    console.error('API status error:', json.message);
    throw new Error(json.message);
  }

  return json.data;
}

function makeOrderService() {
  const baseUrl = '/api/orders';

  async function fetchOrder(o_id) {
    const response = await efetch(`${baseUrl}/${o_id}`, {
      method: 'GET'
    });
    console.log('Fetched order:', response);
    return response;
  }

  async function fetchOrders() {
    try {
      const data = await efetch(`${baseUrl}/details`);
      console.log('Fetch data order:', data);
      if (data && Array.isArray(data.details)) {
        console.log('Orders:', data.details);
        return data.details;
      } else {
        throw new Error('Orders not found');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }

  async function deleteOrder(o_id) {
    return efetch(`${baseUrl}/${o_id}`, {
      method: 'DELETE'
    });
  }

  return {
    fetchOrder,
    fetchOrders,
    deleteOrder
  };
}

export default makeOrderService();
