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
  return fetch(BASE_URL, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(handleResponse)
}