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
