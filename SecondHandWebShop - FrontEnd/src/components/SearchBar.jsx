import { getByName } from "../api/products";
import { useEffect, useState } from "react";

export default function SearchBar({ setProducts, setHasMore, setPage }) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadProducts() {
      if (search.trim() === "") {
        // user cleared input → restore normal infinite scroll
        setPage(1);
        setHasMore(true);
        return;
      }

      try {
        const data = await getByName(search);
        console.log(data)
        setProducts(data);   // show search results
        setHasMore(false);           // stop infinite scroll while searching
      } catch (err) {
        console.error(err);
      }
    }

    loadProducts();
  }, [search]);

  function handleChange(e) {
    setSearch(e.target.value);
  }

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search..."
        className="border p-2 rounded w-full"
        onChange={handleChange}
      />
    </div>
  );
}
