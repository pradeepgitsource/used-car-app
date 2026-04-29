import { useEffect, useState } from "react";
import api from "../api/axios";

export default function CarList() {

  const [cars, setCars] = useState([]);

  useEffect(() => {
    api.get("/api/cars?page=0&size=6")
      .then(res => setCars(res.data.content));
  }, []);

  if (!cars.length) return <p>No cars found</p>;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

      {cars.map(car => (
        <div key={car.id} className="bg-white p-3 rounded shadow">

          <img
            src={car.imageUrls?.[0] || "/images/car-placeholder.png"}
            onError={(e) => (e.target.src = "/images/car-placeholder.png")}
            className="w-full h-40 object-cover rounded"
          />

          <h3 className="font-bold mt-2">{car.title}</h3>
          <p className="text-gray-500">{car.brand}</p>
          <p className="text-blue-600 font-semibold">₹ {car.price}</p>

        </div>
      ))}

    </div>
  );
}