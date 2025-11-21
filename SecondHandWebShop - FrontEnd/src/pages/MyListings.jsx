import { useEffect, useState } from "react";
import { getAllProducts, deleteProduct } from "../api/products";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";

export default function MyListings() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);


  const handleOnClick = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getAllProducts();
        setProducts(data.content.filter(product => product.seller?.id === user.id));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, [user]);

  if (loading)
    return <h2 className="text-center text-xl font-semibold mt-10">Loading products...</h2>;

  if (error)
    return <h2 className="text-center text-xl font-semibold text-red-500 mt-10">Error: {error}</h2>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Listings</h1>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {products.length === 0 ? (
        <p className="text-gray-600 text-lg">You have no products listed.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 border border-gray-200"
            >
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>

              <div className="relative">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />

              {!product.available && (
                <span className="
                  absolute inset-0 
                  bg-black/50 
                  flex items-center justify-center 
                  text-white text-xl font-bold
                  rounded-md
                ">
                  SOLD
                </span>
              )}
            </div>


              <p className="text-gray-700 mb-2">{product.description}</p>

              <p className="text-lg font-bold text-blue-600 mb-4">
                {product.price} kr
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => handleOnClick(product.id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-lg transition"
                >
                  Delete
                </button>

                {product.available && <button
                  onClick={() => navigate(`/edit/${product.id}`)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition"
                >
                  Edit
                </button>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
