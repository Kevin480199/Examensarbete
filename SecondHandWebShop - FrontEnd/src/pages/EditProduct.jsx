import { useState, useEffect } from "react";
import { getProductById, updateProduct } from "../api/products";
import { useParams, useNavigate } from "react-router-dom";
import Toast from "../components/Toast";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);

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

  async function handleImageUpload(e) {
  const file = e.target.files?.[0];
  if (!file) return;

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "SecondHandWebSite"); // make sure this exists

  try {
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dyavoyj7o/image/upload",
      { method: "POST", body: data }
    );

    // ✅ Check if Cloudinary returned errors
    if (!res.ok) {
      const text = await res.text(); // <-- read raw text
      console.error("Cloudinary error raw response:", text);
      throw new Error("Upload failed: " + text);
    }

    // Now safe to parse JSON
    const uploadData = await res.json();
    console.log("Cloudinary response JSON:", uploadData);

    setForm(prev => ({ ...prev, imageUrl: uploadData.secure_url }));
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    alert("Image upload failed — check console for details.");
  }
}

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await updateProduct(id, form);
      setToast({ message: "Product created successfully!", type: "success" });
      setTimeout(() => {
        navigate("/my-listings");
        }, 1200);
    } catch (err) {
      alert("Failed: " + err.message);
    }
  }

  return (

    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
        {toast && (
        <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
        />
        )}
        <h1 className="text-3xl font-bold mb-6 text-center">
          Edit Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <input
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* Category */}
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="Electronics">Electronics</option>
            <option value="Vehicle">Vehicle</option>
            <option value="Clothes">Clothes</option>
            <option value="Other">Other</option>
          </select>

          {/* Description */}
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border border-gray-300 h-28 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* Price */}
          <input
            name="price"
            type="number"
            placeholder="Price (kr)"
            value={form.price}
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
    onChange={handleImageUpload}  // <--- must use your upload handler
    className="w-full text-gray-700 cursor-pointer file:mr-4 file:py-2 file:px-4 
               file:rounded-lg file:border-0 file:text-sm file:font-semibold 
               file:bg-blue-600 file:text-white hover:file:bg-blue-700"
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
