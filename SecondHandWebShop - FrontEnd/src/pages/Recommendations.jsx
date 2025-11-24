import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { getRecommendations } from "../api/recommendations";


export default function Recommendations(){
    const { user, jwt } = useAuth();
    const userId = user?.id;
    const [recommendations, setRecommendations] = useState([])
    useEffect(() => {
        async function loadRecommedations() {
          if (!userId) return;
          const data = await getRecommendations(userId);
          setRecommendations(data); // contains Recommendation objects
        }
        loadRecommedations();
      }, [userId]);

    return(
        <div className="max-w-6xl mx-auto px-4 pt-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Recommendations
      </h2>

      {recommendations.length === 0 && (
        <p className="text-gray-500 text-center mt-10">
          You have no favorite items yet ❤️
        </p>
      )}

      <div className="
        grid 
        grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
        gap-6
      ">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="bg-white border rounded-xl shadow-sm hover:shadow-md transition p-4"
          >
            <img
              src={rec.imageUrl}
              alt={rec.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />

            <h3 className="font-semibold text-lg text-gray-900">
              {rec.name}
            </h3>
            <p className="text-gray-600 mt-1">{rec.description}</p>

            <div className="flex items-center justify-between mt-2">
              <p className="text-blue-600 font-bold">{rec.price} kr</p>

            </div>
          </div>
        ))}
      </div>
    </div>
    )
}
    