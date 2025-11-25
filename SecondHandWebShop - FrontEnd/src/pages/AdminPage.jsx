import { useEffect, useState } from "react";
import { deleteProduct, getAllProducts } from "../api/products";
import { getAllUsers } from "../api/users";

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getAllProducts();
        setProducts(data.content || []);
      } catch (e) {
        setError("Failed to load products");
      }
    }

    async function loadUsers() {
      try {
        const data = await getAllUsers();
        setUsers(data || []);
      } catch (e) {
        setError("Failed to load users");
      }
    }

    loadProducts();
    loadUsers();
  }, []);

  const deleteOnClick = async (id) => {
      try {
        await deleteProduct(id);
        setProducts(prev => prev.filter(p => p.id !== id));
      } catch (err) {
        console.error(err);
      }
    };

  if (error)
    return (
      <h2 className="text-center text-xl font-semibold text-red-500 mt-10">
        Error: {error}
      </h2>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>

      {/* USERS SECTION */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Users ({users.length})
        </h2>

        {users.length === 0 ? (
          <p className="text-gray-500">No users found.</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="min-w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 font-medium">ID</th>
                  <th className="p-3 font-medium">Name</th>
                  <th className="p-3 font-medium">Email</th>
                  <th className="p-3 font-medium">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{u.id}</td>
                    <td className="p-3">{u.name}</td>
                    <td className="p-3">{u.email}</td>
                    <td className="p-3">{u.admin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* PRODUCTS SECTION */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Products ({products.length})
        </h2>

        {products.length === 0 ? (
          <p className="text-gray-500">No products found.</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="min-w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 font-medium">ID</th>
                  <th className="p-3 font-medium">Name</th>
                  <th className="p-3 font-medium">Price</th>
                  <th className="p-3 font-medium">Seller</th>
                  <th className="p-3 font-medium">Delete</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{p.id}</td>
                    <td className="p-3">{p.name}</td>
                    <td className="p-3">{p.price} kr</td>
                    <td className="p-3">{p.seller?.email || "Unknown"}</td>
                    <td className="p-3"><button onClick={() => deleteOnClick(p.id)}>❌</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
