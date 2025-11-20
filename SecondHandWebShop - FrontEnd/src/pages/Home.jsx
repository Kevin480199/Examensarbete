import { useEffect, useRef, useState } from "react";
import { getProductsPaginated } from "../api/products";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);   // scrolling loads page 1
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef(null);
  const observerRef = useRef(null);

  // 1️⃣ Load first page manually BEFORE observer
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

  // 2️⃣ Load page N (N = 1, 2, 3…) when page changes
  useEffect(() => {
    if (page === 1) return; // we manually loaded page 0
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

  // 3️⃣ Attach observer AFTER first load is complete
  useEffect(() => {
    if (loading) return; // wait until layout is stable
    if (!hasMore) return;

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
        rootMargin: "100px",
        threshold: 0,
      }
    );

    if (loaderRef.current) {
      observerRef.current.observe(loaderRef.current);
    }
  }, [loading, hasMore]); // ← KEY! attach only after loading finishes

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Products</h2>

      <div className="grid">
        {products.map(p => (
          <div key={p.id} className="card">
            <img src={p.imageUrl} alt="" width={250} />
            <h3>{p.name}</h3>
            <p>{p.price} kr</p>
          </div>
        ))}
      </div>

      {loading && <p>Loading...</p>}
      {hasMore && <div style={{ height: `${window.innerHeight}px` }} />}
      <div ref={loaderRef} style={{ height: "1px", background: "yellow" }} />

      {!hasMore && <p>No more products</p>}
    </div>
  );
}
