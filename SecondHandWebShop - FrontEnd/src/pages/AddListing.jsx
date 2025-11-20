import { useState } from "react";
import { createProduct } from "../api/products";
import useAuth from "../hooks/useAuth";

export default function AddListing() {
  const { user, jwt, isLoggedIn } = useAuth();
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    category: ""
  });

  async function handleImageUpload(e) {
  try {
    const file = e.target.files[0];
    console.log("FILE:", file);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "SecondHandWebSite");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dyavoyj7o/image/upload",
      { method: "POST", body: data }
    );

    console.log("RAW RESPONSE:", res);

    const uploadData = await res.json();
    console.log("Cloudinary response:", uploadData);

    setForm(prev => ({ ...prev, imageUrl: uploadData.secure_url }));
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
  }
}


  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    console.log(user)

    try {
      const product = await createProduct({
        ...form,
        userId: user.id   // ✅ send userId to backend
      });
      console.log("Created:", product);
      alert("Product added!");
    } catch (err) {
      alert("Failed: " + err.message);
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Add Product</h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", width: "300px", gap: "10px" }}>
        <input name="name" placeholder="Name" onChange={handleChange} required/>
        <select name="category" id="" onChange={handleChange} required>
            <option value="">SELECT AN OPTION</option>
            <option value="Electronics">Electronics</option>
            <option value="Vehicle">Vehicle</option>
            <option value="Clothes">Clothes</option>
            <option value="Other">Other</option>
        </select>
        <textarea name="description" placeholder="Description" onChange={handleChange} required />
        <input name="price" type="number" placeholder="Price" onChange={handleChange} required/>
        {/* Cloudinary Upload */}
        <input type="file" name="imageUrl" accept="image/*" onChange={(e) => {
                console.log("FILE SELECTED:", e.target.files[0]);
                handleImageUpload(e);
            }} />

        {form.imageUrl && (
          <img
            src={form.imageUrl}
            alt="Preview"
            style={{ width: "150px", borderRadius: "8px" }}
          />
        )}

        <button type="submit">Create</button>
      </form>
    </div>
  );
}
