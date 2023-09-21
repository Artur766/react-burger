import { BASE_URL } from "./constants";
import Cookies from 'js-cookie';

function saveToken(token, tokenResponse) {
  const expirationDate = new Date();
  expirationDate.setMinutes(expirationDate.getMinutes() + 20);
  Cookies.set('token', token, { expires: expirationDate });
  Cookies.set('refreshToken', tokenResponse, { expires: expirationDate });
}

function handleResponse(res) {
  if (res.ok) return res.json();
  return res.json()
    .then(error => {
      const errorMessage = error || "Произошла ошибка...";
      return Promise.reject(errorMessage);
    });
}

function handleToken(res) {
  if (res.accessToken && res.refreshToken) {
    saveToken(res.accessToken.split('Bearer ')[1], res.refreshToken);
    return res;
  }
}

export function registerApi(email, password, userName) {
  return fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-type": 'application/json'
    },
    body: JSON.stringify({ "email": email, "password": password, "name": userName })
  })
    .then(handleResponse)
    .then(handleToken)
}

export function loginApi(email, password) {
  return fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-type": 'application/json'
    },
    body: JSON.stringify({ "email": email, "password": password })
  })
    .then(handleResponse)
    .then(handleToken)
}
