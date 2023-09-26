import { BASE_URL } from "./constants";

function handleResponse(res) {
  if (res.ok) return res.json();
  return res.json()
    .then(error => {
      const errorMessage = error || "Произошла ошибка...";
      return Promise.reject(errorMessage);
    });
}

function request(url, options) {
  return fetch(url, options).then(handleResponse)
}

export function getAllIngredients() {
  return request(`${BASE_URL}/ingredients`, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function createOrder(allId) {
  return request(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "ingredients": allId })
  })
}

export function forgotPasswordApi(emailValue) {
  return request(`${BASE_URL}/password-reset`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "email": emailValue })
  })
}

export function resetPassword(password, token) {
  return request(`${BASE_URL}/password-reset/reset`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "password": password, "token": token })
  })
}