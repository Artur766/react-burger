import { BASE_URL } from "./constants";
import Cookies from 'js-cookie';

function handleResponse<T>(res: Response): Promise<T> {
  if (res.ok) return res.json();
  return res.json()
    .then((error: string) => {
      const errorMessage = error || "Произошла ошибка...";
      return Promise.reject(errorMessage);
    });
}

export function request(url: string, options: RequestInit) {
  return fetch(url, options).then(handleResponse)
}

export function getAllIngredients() {
  return request(`${BASE_URL}/ingredients`, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function getOrderApi(id: number) {
  return request(`${BASE_URL}/orders/${id}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export function createOrder(allId: string) {
  return request(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + Cookies.get("token")
    },
    body: JSON.stringify({ "ingredients": allId })
  })
}

export function forgotPasswordApi(emailValue: string) {
  return request(`${BASE_URL}/password-reset`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "email": emailValue })
  })
}

export function resetPassword<T extends string>(password: T, token: T) {
  return request(`${BASE_URL}/password-reset/reset`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "password": password, "token": token })
  })
}