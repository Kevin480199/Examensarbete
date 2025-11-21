import { useState } from "react";
import { createProduct } from "../api/products";
import useAuth from "../hooks/useAuth";
import { useParams, useNavigate } from "react-router-dom";
import Toast from "../components/Toast";


export default function AddListing() {
  const { user } = useAuth();
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();
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
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "SecondHandWebSite");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dyavoyj7o/image/upload",
        { method: "POST", body: data }
      );

      const uploadData = await res.json();

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

    try {
      const product = await createProduct({
        ...form,
        userId: user.id
      });

      setToast({ message: "Product created successfully!", type: "success" });
        setTimeout(() => {
        navigate("/");
        }, 1200);
    } catch (err) {
      alert("Failed: " + err.message);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Add a New Product</h1>
        {toast && (
            <Toast
                message={toast.message}
                type={toast.type}
                onClose={() => setToast(null)}
            />
            )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <input
            name="name"
            placeholder="Product Name"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* Category */}
          <select
            name="category"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">Select category</option>
            <option value="Electronics">Electronics</option>
            <option value="Vehicle">Vehicle</option>
            <option value="Clothes">Clothes</option>
            <option value="Other">Other</option>
          </select>

          {/* Description */}
          <textarea
            name="description"
            placeholder="Enter product description..."
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border border-gray-300 h-28 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* Price */}
          <input
            name="price"
            type="number"
            placeholder="Price (kr)"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* Cloudinary upload */}
          <div>
            <label className="block mb-1 font-medium">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full text-gray-700"
            />
          </div>

          {/* Preview */}
          {form.imageUrl && (
            <img
              src={form.imageUrl}
              alt="Preview"
              className="w-40 h-40 object-cover rounded-lg mx-auto border mt-3"
            />
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
}
