import { useNavigate } from "react-router-dom";

export default function CarCard({ car }) {

  const navigate = useNavigate();

  const images =
    car.imageUrls && car.imageUrls.length > 0
      ? car.imageUrls
      : ["/no-image.png"];

  const visibleImages = images.slice(0, 4);

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">

      <div className="grid grid-cols-2 gap-1 relative">

        {visibleImages.map((img, i) => (
          <div key={i} className="relative">
            <img
              src={img || "/images/car-placeholder.png"}
              onError={(e) => (e.target.src = "/images/car-placeholder.png")}
              className="h-20 w-full object-cover"
            />

            {i === 3 && images.length > 4 && (
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center text-white font-bold">
                +{images.length - 4}
              </div>
            )}
          </div>
        ))}

      </div>

      <div className="p-4">

        <h3 className="font-bold">{car.title}</h3>

        <p className="text-gray-500 text-sm">{car.brand}</p>

        <p className="text-green-600 font-bold mt-2 text-xs">
          Final Price: $ {car.finalPrice?.toLocaleString("en-IN")}
        </p>

        <p className="text-xs text-gray-400 line-through">
          Base: $ {car.basePrice?.toLocaleString("en-IN")}
        </p>

        <p className="text-xs text-gray-400">
          {car.fuelType || "N/A"} • {car.transmission || "N/A"}
        </p>

        <button
          className="mt-3 bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
          onClick={() => navigate(`/cars/${car.id}`)}
        >
          View Details
        </button>

      </div>
    </div>
  );
}