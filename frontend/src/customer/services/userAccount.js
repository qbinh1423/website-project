/**
 * @param {string} url
 * @param {RequestInit} options
 * @returns Promise<Response>
 */
// async function efetch(url, options = {}) {
//   let result = {};
//   let json = {};

//   const token = localStorage.getItem('authToken');

//   options.headers = {
//     ...options.headers,
//     Authorization: token ? `Bearer ${token}` : undefined,
//     'Content-Type': 'application/json'
//   };

//   try {
//     result = await fetch(url, options);
//     json = await result.json();
//   } catch (error) {
//     throw new Error(error.message);
//   }
//   console.log('Response from server:', json);

//   if (!result.ok || json.status !== 'success') {
//     throw new Error(json.message);
//   }
//   return json.data;
// }

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

export function registerService() {
  const baseUrl = '/api/users/register';

  async function registerAccount(user) {
    return efetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
  }
  return {
    registerAccount
  };
}

export function loginService() {
  const baseUrl = '/api/users/login';

  async function loginAccount(user) {
    const response = await efetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    console.log('Login response:', response);
    return response;
  }

  return {
    loginAccount
  };
}

export function userInformation() {
  const baseUrl = '/api/users';

  async function getUser(u_id) {
    const response = await efetch(`${baseUrl}/${u_id}`);
    return response;
  }

  async function updateUser(u_id, user) {
    return efetch(`${baseUrl}/${u_id}`, {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  return {
    getUser,
    updateUser
  };
}
