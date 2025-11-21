import axios from "axios";
const API_URL = "http://localhost:8080"; // change to your backend

export async function getAllProducts() {
  const response = await fetch(`${API_URL}/api/products`); 
  if (!response.ok) {
    throw new Error("Failed to load products");
  }
  return response.json();
}

export async function createProduct(product) {
    console.log(product)
  const response = await fetch("http://localhost:8080/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(product)
  });

  if (!response.ok) throw new Error("Failed to create product");
  // If the backend returns empty body → don't parse JSON
  const text = await response.text();
  return text ? JSON.parse(text) : null
}

export async function deleteProduct(id) {
    console.log(id)
  const response = await fetch(`http://localhost:8080/api/products/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) throw new Error("Failed to create product");
  // If the backend returns empty body → don't parse JSON
  const text = await response.text();
  return text ? JSON.parse(text) : null
}

export async function getProductById(id) {
  const response = await fetch(`${API_URL}/api/products/${id}`);
  if (!response.ok) throw new Error("Failed to load product");
  return response.json();
}

export async function updateProduct(id, product) {
  const response = await fetch(`${API_URL}/api/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product)
  });

  if (!response.ok) throw new Error("Failed to update product");
   // Read raw text because backend sends empty body
  const text = await response.text();
  if (!text) return {}; // ← prevent JSON crash
  return JSON.parse(text);
}

export async function getProductsPaginated(page, size = 4) {
  const res = await fetch(`http://localhost:8080/api/products?page=${page}&size=${size}`);
  if (!res.ok) throw new Error("Failed to load products");
  return res.json(); // returns a Page object
}

export async function markProductAsSold(id) {
  await fetch(`${API_URL}/api/products/${id}/sold`, {
    method: "PUT"
});
}

export async function getByName(name) {
  try {
    if (!name || name.trim() === "") {
      const response = await axios.get("http://localhost:8080/api/products");
      return response.data.content; // because this endpoint returns a Page
    }

    const response = await axios.get("http://localhost:8080/api/products/search", {
      params: { name }
    });

    return response.data;
  } catch (err) {
    console.error("Search request failed", err);
    throw new Error("Failed to load products");
  }
}

