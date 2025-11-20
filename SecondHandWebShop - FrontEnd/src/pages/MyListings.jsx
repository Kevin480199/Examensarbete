import { useEffect, useState } from "react";
import { getAllProducts, deleteProduct } from "../api/products";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";


export default function MyListings() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, jwt, isLoggedIn } = useAuth();
  const navigate = useNavigate();

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
        setProducts(data.filter(product => product.seller?.id === user.id));
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
      <h1>My Products</h1>
      <div style={styles.grid}>
        {products.map(product => (
          <div key={product.id} style={styles.card}>
            <h2>{product.name}</h2>
            <img src={`${product.imageUrl}`} alt="" width={250}/>
            <p>{product.description}</p>
            <p><strong>{product.price} kr</strong></p>
            <button onClick={() => handleOnClick(product.id)}>Delete</button>
            <button onClick={() => navigate(`/edit/${product.id}`)}>Edit</button>
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
