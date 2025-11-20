import { useState, useEffect } from "react";
import { getProductById, updateProduct } from "../api/products";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    category: ""
  });

  useEffect(() => {
    async function loadProduct() {
      try {
        const product = await getProductById(id);
        setForm(product);
      } catch (err) {
        alert("Could not load product");
      }
    }
    loadProduct();
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await updateProduct(id, form);
      alert("Product updated!");
      navigate("/my-listings");
    } catch (err) {
      alert("Failed: " + err.message);
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Edit Product</h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", width: "300px", gap: "10px" }}>
        
        <input name="name" value={form.name} onChange={handleChange} required />

        <select name="category" value={form.category} onChange={handleChange} required>
          <option value="Electronics">Electronics</option>
          <option value="Vehicle">Vehicle</option>
          <option value="Clothes">Clothes</option>
          <option value="Other">Other</option>
        </select>

        <textarea name="description" value={form.description} onChange={handleChange} required />

        <input name="price" type="number" value={form.price} onChange={handleChange} required />

        <input name="imageUrl" value={form.imageUrl} onChange={handleChange} required />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
