import { BASE_URL } from "./constants";

function handleResponse(res) {
  if (res.ok) return res.json();
  return res.json()
    .then(error => {
      const errorMessage = error || "Произошла ошибка...";
      return Promise.reject(errorMessage);
    });
}

export function getAllIngredients() {
  return fetch(`${BASE_URL}/ingredients`, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(handleResponse)
}

export function createOrder(allId) {
  return fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "ingredients": allId })
  })
    .then(handleResponse)
}

export function forgotPassword(emailValue) {
  return fetch(`${BASE_URL}/password-reset`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "email": emailValue })
  })
    .then(handleResponse)
}

export function resetPassword(password, token) {
  return fetch(`${BASE_URL}/password-reset/reset`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "password": password, "token": token })
  })
    .then(handleResponse)
}