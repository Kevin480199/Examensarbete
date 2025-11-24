import axios from "axios";

const BASE = "http://localhost:8080/api/recommendation";

export async function getRecommendations(userId) {
  const res = await axios.get(BASE, { params: { userId } });
  return res.data; // Hashset of Recommendations objects
}