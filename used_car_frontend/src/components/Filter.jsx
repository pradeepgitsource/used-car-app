export default function Filter({ criteria, onChange, apply, reset }) {

    return (
        <div className="bg-white p-4 rounded-xl shadow space-y-3 col-span-1">

            <h2 className="font-semibold">Filters</h2>

            <input
                name="keyword"
                value={criteria.keyword}
                onChange={onChange}
                placeholder="Search..."
                className="w-full border p-2 rounded"
            />

            <input
                name="minPrice"
                value={criteria.minPrice}
                onChange={onChange}
                placeholder="Min Price"
                className="w-full border p-2 rounded"
            />

            <input
                name="maxPrice"
                value={criteria.maxPrice}
                onChange={onChange}
                placeholder="Max Price"
                className="w-full border p-2 rounded"
            />

            <select
                name="fuelType"
                value={criteria.fuelType}
                onChange={onChange}
                className="w-full border p-2 rounded"
            >
                <option value="">Fuel</option>
                <option value="PETROL">Petrol</option>
                <option value="DIESEL">Diesel</option>
            </select>

            <select
                name="transmission"
                value={criteria.transmission}
                onChange={onChange}
                className="w-full border p-2 rounded"
            >
                <option value="">Transmission</option>
                <option value="MANUAL">Manual</option>
                <option value="AUTOMATIC">Automatic</option>
            </select>

            <button
                onClick={apply}
                className="bg-blue-600 text-white w-full py-2 rounded"
            >
                Apply Filter
            </button>

            <button
                onClick={reset}
                className="bg-gray-300 w-full py-2 rounded"
            >
                Reset
            </button>

        </div>
    );
}