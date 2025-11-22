import Toast from "../components/Toast";
import { useEffect, useRef, useState } from "react";
import { getProductsPaginated, markProductAsSold } from "../api/products";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import SearchBar from "../components/SearchBar";
import { addFavorite, getFavorites, removeFavorite } from "../api/favorites";


export default function Home() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [toast, setToast] = useState(null);
  const { jwt, user } = useAuth();
  const userId = user?.id;
  const [favorites, setFavorites] = useState([]);
  const isLoggedIn = Boolean(jwt);
  const navigate = useNavigate();
  const [confirmModal, setConfirmModal] = useState({
  open: false,
  productId: null,
});


  const loaderRef = useRef(null);
  const observerRef = useRef(null);

  // Load page N when page changes (page - 1)
  useEffect(() => {
    if (page === 0) return;
    if (!hasMore || loading) return;

    async function loadNext() {
      setLoading(true);

      const data = await getProductsPaginated(page - 1);
      setProducts(prev => [...prev, ...data.content]);
      if (data.last) setHasMore(false);

      setLoading(false);
    }

    loadNext();
  }, [page]);

  // Attach observer after loading
  useEffect(() => {
    if (loading || !hasMore) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          console.log("Scroll Trigger → page", page);
          setPage(prev => prev + 1);
        }
      },
      {
        root: null,
        rootMargin: "150px",
        threshold: 0,
      }
    );

    if (loaderRef.current) {
      observerRef.current.observe(loaderRef.current);
    }
  }, [loading, hasMore]);

  

function openConfirmModal(id) {
  setConfirmModal({
    open: true,
    productId: id
  });
}

async function confirmBuy() {
  try {
    await markProductAsSold(confirmModal.productId);

    setToast({ message: "Product bought successfully!", type: "success" });

    setTimeout(() => {
        window.location.reload();
        }, 1200);
    
  } catch (err) {
    setToast({ message: "Failed to mark as sold", type: "error" });
  } finally {
    setConfirmModal({ open: false, productId: null });
  }
}
    useEffect(() => {
        async function loadFavorites() {
            if (!userId) return;
            const favs = await getFavorites(userId);
            setFavorites(favs.map(f => f.product.id)); // store product IDs only
        }
        loadFavorites();
        }, [userId]);

async function toggleFavorite(productId) {
  if (!isLoggedIn) return alert("You must log in");

  try {
    const isFav = favorites.includes(productId);

    if (isFav) {
      await removeFavorite(userId, productId);
      setFavorites(prev => prev.filter(id => id !== productId));
    } else {
      await addFavorite(userId, productId);
      setFavorites(prev => [...prev, productId]);
    }

  } catch (err) {
    console.error("Failed to toggle favorite:", err);
  }
}


  return (
    <div className="max-w-6xl mx-auto px-4 pt-8">
        {toast && (
        <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
        />
        )}
        <SearchBar setProducts={setProducts} setHasMore={setHasMore} setPage={setPage}/>
      {/* Title */}
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Products
      </h2>

      {/* Product Grid */}
      <div className="
        grid 
        grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
        gap-6
      ">
        { Array.isArray(products) && products.map(p => (
          <div
            key={p.id}
            className="
              bg-white border rounded-xl shadow-sm 
              hover:shadow-md transition p-4 cursor-pointer
            "
          >
            <div className="relative">
            <img
                src={p.imageUrl}
                alt={p.name}
                className="w-full h-48 object-cover rounded-md mb-4"
            />

            {!p.available && (
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

            <h3 className="font-semibold text-lg text-gray-900">{p.name}</h3>
            <p className="text-600 mt-1">{p.description}</p>
            <div className="flex items-center justify-between mt-2">
            <p className="text-blue-600 font-bold">{p.price} kr</p>

            {isLoggedIn && <button
                onClick={() => toggleFavorite(p.id)}
                className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
            >
                {favorites.includes(p.id) ? "❤️" : "🤍"}
            </button>}
            </div>


            {isLoggedIn && p.available && (
            <button 
            onClick={() => openConfirmModal(p.id)}  
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
                Buy</button>

            )}

          </div>
        ))}
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="text-center py-6 text-gray-600 font-medium">
          Loading...
        </div>
      )}

      {/* Spacer to push loader below fold */}
      {hasMore && <div style={{ height: `${window.innerHeight}px` }} />}

      {/* Loader target */}
      <div ref={loaderRef} className="h-2 bg-transparent" />

      {/* End message */}
      {!hasMore && (
        <p className="text-center text-gray-500 mt-6">
          No more products
        </p>
      )}
      {confirmModal.open && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
    <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">

      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Confirm Purchase
      </h2>

      <p className="text-gray-700 mb-6">
        Are you sure you want to buy this product?
      </p>

      <div className="flex justify-end gap-3">
        <button
          onClick={() => setConfirmModal({ open: false, productId: null })}
          className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
        >
          Cancel
        </button>

        <button
          onClick={confirmBuy}
          className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
        >
          Yes, Buy
        </button>
      </div>

    </div>
  </div>
)}

    </div>
  );
}
