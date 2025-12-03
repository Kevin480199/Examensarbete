export default function Filter({setCategory}){
    function handleChange(e) {
        setCategory(e.target.value)
  }
    return(
        <div>
            <select
            name="category"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">Select category</option>
            <option value="Electronics">Electronics</option>
            <option value="Vehicle">Vehicle</option>
            <option value="Clothes">Clothes</option>
            <option value="Other">Other</option>
          </select>
        </div>
    )
}