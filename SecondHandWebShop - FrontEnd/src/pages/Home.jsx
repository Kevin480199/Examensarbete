import Toast from "../components/Toast";
import { useEffect, useRef, useState } from "react";
import { getProductsPaginated } from "../api/products";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [toast, setToast] = useState(null);

  const loaderRef = useRef(null);
  const observerRef = useRef(null);

  // Load page 0 manually
  useEffect(() => {
    async function loadInitial() {
      setLoading(true);
      const data = await getProductsPaginated(0);
    
      setProducts(data.content);
      if (data.last) setHasMore(false);

      setLoading(false);
    }
    loadInitial();
  }, []);

  // Load page N when page changes (page - 1)
  useEffect(() => {
    if (page === 1) return;
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

  return (
    <div className="max-w-6xl mx-auto px-4 pt-8">
        {toast && (
        <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
        />
        )}

      {/* Title */}
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        All Products
      </h2>

      {/* Product Grid */}
      <div className="
        grid 
        grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
        gap-6
      ">
        {products.map(p => (
          <div
            key={p.id}
            className="
              bg-white border rounded-xl shadow-sm 
              hover:shadow-md transition p-4 cursor-pointer
            "
          >
            <img
              src={p.imageUrl}
              alt={p.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="font-semibold text-lg text-gray-900">{p.name}</h3>
            <p className="text-600 mt-1">{p.description}</p>
            <p className="text-blue-600 font-bold mt-1">{p.price} kr</p>
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
    </div>
  );
}
