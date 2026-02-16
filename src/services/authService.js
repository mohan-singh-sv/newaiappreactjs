const LOGIN_ENDPOINT = 'https://reqres.in/api/login';

export async function loginWithUsernamePassword(username, password) {
  const response = await fetch(LOGIN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: username,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error || 'Login failed. Please check your credentials.');
  }

  return data;
}
