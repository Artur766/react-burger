import { BASE_URL } from "./constants";

function handleResponse(res) {
  if (res.ok) return res.json();
  return res.json()
    .then(error => {
      const errorMessage = error || "Произошла ошибка...";
      return Promise.reject(errorMessage);
    });
}

export function register(email, password, userName) {
  return fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-type": 'application/json'
    },
    body: JSON.stringify({ "email": email, "password": password, "name": userName })
  })
    .then(handleResponse)
}
