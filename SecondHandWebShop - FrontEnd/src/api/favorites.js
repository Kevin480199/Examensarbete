import axios from "axios";

const BASE = "http://localhost:8080/api/favorites";

export async function addFavorite(userId, productId) {
  return axios.post(BASE, {
    user: { id: userId },
    product: { id: productId }
  });
}

export async function removeFavorite(userId, productId) {
  return axios.delete(BASE, {
    params: { userId, productId }
  });
}

export async function getFavorites(userId) {
  const res = await axios.get(BASE, { params: { userId } });
  return res.data; // Array of Favorite objects
}
