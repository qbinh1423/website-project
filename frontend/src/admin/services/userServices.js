import { DEFAULT_AVATAR } from '@/constants';

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
    throw new Error(error.message);
  }
  if (!result.ok || json.status !== 'success') {
    throw new Error(json.message);
  }
  return json.data;
}

function makeUserService() {
  const baseUrl = '/api/users';

  async function fetchUsers() {
    try {
      const data = await efetch(`${baseUrl}/all`);
      if (data && Array.isArray(data.user)) {
        console.log('Full Data:', data);
        console.log('Users:', data.user);
        return data.user;
      } else {
        throw new Error('Users not found');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  async function fetchUser(u_id) {
    const response = await efetch(`${baseUrl}/${u_id}`, {
      method: 'GET'
    });
    console.log('Fetched user:', response);
    return response;
  }

  async function deleteUser(u_id) {
    return efetch(`${baseUrl}/${u_id}`, {
      method: 'DELETE',
    });
  }

  return {
    fetchUser,
    fetchUsers,
    deleteUser
  };
}

export default makeUserService();
