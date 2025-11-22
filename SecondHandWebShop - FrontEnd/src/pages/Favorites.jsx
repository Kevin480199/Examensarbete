import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { getFavorites, removeFavorite } from "../api/favorites";

export default function Favorites() {
  const { user, jwt } = useAuth();
  const userId = user?.id;
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    async function loadFavs() {
      if (!userId) return;
      const data = await getFavorites(userId);
      setFavorites(data); // contains Favorite objects
    }
    loadFavs();
  }, [userId]);

  async function removeFav(productId) {
    await removeFavorite(userId, productId);
    setFavorites(prev => prev.filter(f => f.product.id !== productId));
  }

  if (!jwt) return <p className="text-center mt-10">You must be logged in.</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 pt-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        My Favorites
      </h2>

      {favorites.length === 0 && (
        <p className="text-gray-500 text-center mt-10">
          You have no favorite items yet ❤️
        </p>
      )}

      <div className="
        grid 
        grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
        gap-6
      ">
        {favorites.map((fav) => (
          <div
            key={fav.id}
            className="bg-white border rounded-xl shadow-sm hover:shadow-md transition p-4"
          >
            <img
              src={fav.product.imageUrl}
              alt={fav.product.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />

            <h3 className="font-semibold text-lg text-gray-900">
              {fav.product.name}
            </h3>
            <p className="text-gray-600 mt-1">{fav.product.description}</p>

            <div className="flex items-center justify-between mt-2">
              <p className="text-blue-600 font-bold">{fav.product.price} kr</p>

              <button
                onClick={() => removeFav(fav.product.id)}
                className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
              >
                ❌
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
