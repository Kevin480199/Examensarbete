import { useEffect, useState } from "react";
import { getAllProducts } from "../api/products";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getAllProducts();
        setProducts(data);
        console.log(products)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  if (loading) return <h2>Loading products...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <div style={styles.container}>
      <h1>All Products</h1>
      <div style={styles.grid}>
        {products.map(product => (
          <div key={product.id} style={styles.card}>
            <h2>{product.name}</h2>
            <img src={`${product.imageUrl}`} alt="" width={250}/>
            <p>{product.description}</p>
            <p><strong>{product.price} kr</strong></p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: "20px" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px"
  },
  card: {
    padding: "15px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    background: "#fff"
  }
};
