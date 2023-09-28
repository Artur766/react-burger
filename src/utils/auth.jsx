import { BASE_URL } from "./constants";
import Cookies from 'js-cookie';
import { request } from "./Api";

function saveToken(token, tokenResponse) {
  Cookies.set('token', token, { expires: 1 });
  Cookies.set('refreshToken', tokenResponse, { expires: 7 });
}

function handleToken(res) {
  if (res.accessToken && res.refreshToken) {
    saveToken(res.accessToken.split('Bearer ')[1], res.refreshToken);
    return res;
  }
}

export function registerApi(email, password, userName) {
  return request(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-type": 'application/json'
    },
    body: JSON.stringify({ "email": email, "password": password, "name": userName })
  })
    .then(handleToken)
}

export function loginApi(email, password) {
  return request(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-type": 'application/json'
    },
    body: JSON.stringify({ "email": email, "password": password })
  })
    .then(handleToken)
}

export function refreshToken() {
  if (Cookies.get("token")) {
    return Promise.resolve("Bearer " + Cookies.get("token"));
  }
  return request(`${BASE_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({ "token": Cookies.get("refreshToken") })
  })
    .then(res => res.accessToken);
}

export function logoutApi(refreshToken) {
  return request(`${BASE_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({ "token": refreshToken })
  })
}

export function getUserInfoApi() {
  return refreshToken()
    .then(token => {
      return request(`${BASE_URL}/auth/user`, {
        headers: {
          "Content-type": "application/json",
          "authorization": token
        },
      })
    });
}

export function updateUserInfoApi(name, email, password) {
  return refreshToken()
    .then(token => {
      return request(`${BASE_URL}/auth/user`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          "authorization": token
        },
        body: JSON.stringify({ "name": name, "email": email, "password": password })
      })
    });
}
