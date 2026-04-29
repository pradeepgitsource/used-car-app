import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function CarDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [car, setCar] = useState(null);
    const [selected, setSelected] = useState(0);

    useEffect(() => {
        loadCar();
    }, []);

    const loadCar = async () => {
        try {
            const res = await api.get(`/api/cars/${id}`);
            setCar(res.data);
        } catch (err) {
            alert("Failed to load car");
        }
    };

    if (!car) return <div className="p-6">Loading...</div>;

    const images =
        car.imageUrls && car.imageUrls.length > 0
            ? car.imageUrls
            : ["/no-image.png"];

    return (
        <div className="p-6 max-w-5xl mx-auto">

            {/* BACK BUTTON */}
            <button
                onClick={() => navigate(-1)}
                className="mb-4 bg-gray-300 px-4 py-2 rounded"
            >
                ← Back
            </button>

            <div className="grid grid-cols-2 gap-6">

                <div>
                    <img
                        src={images[selected] || "/images/car-placeholder.png"}
                        onError={(e) => (e.target.src = "/images/car-placeholder.png")}
                        className="w-full h-80 object-cover rounded"
                    />

                    <div className="flex gap-2 mt-3 overflow-x-auto">
                        {images.map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                onClick={() => setSelected(i)}
                                className={`w-20 h-20 object-cover rounded cursor-pointer border ${selected === i ? "border-blue-500" : ""}`}
                            />
                        ))}
                    </div>

                </div>

                <div>

                    <h1 className="text-2xl font-bold">{car.title}</h1>

                    <p className="text-gray-500">{car.brand}</p>

                    <div className="mt-4 border-t pt-3">

                        <h3 className="font-semibold mb-2">Price Breakdown</h3>

                        {/* Base Price */}
                        <div className="flex justify-between text-sm">
                            <span>Base Price</span>
                            <span>₹ {car.basePrice?.toLocaleString("en-IN")}</span>
                        </div>

                        {/* Components */}
                        {car.priceComponents?.map((pc, i) => (
                            <div key={i} className="flex justify-between text-sm">

                                <span>
                                    {pc.name}
                                    {pc.percentageBased && pc.percentage
                                        ? ` (${pc.percentage}%)`
                                        : ""}
                                    {pc.type === "DEDUCTION" && " (-)"}
                                </span>

                                <span
                                    className={
                                        pc.type === "DEDUCTION"
                                            ? "text-red-500"
                                            : "text-green-600"
                                    }
                                >
                                    ₹ {pc.value?.toLocaleString("en-IN")}
                                </span>

                            </div>
                        ))}

                        <hr className="my-2" />

                        {/* Final Price */}
                        <div className="flex justify-between font-bold text-lg">
                            <span>Final Price</span>
                            <span>₹ {car.finalPrice?.toLocaleString("en-IN")}</span>
                        </div>

                    </div>
                    <p className="mt-2">
                        <strong>Fuel:</strong> {car.fuelType || "N/A"}
                    </p>

                    <p>
                        <strong>Transmission:</strong> {car.transmission || "N/A"}
                    </p>

                    <p>
                        <strong>Location:</strong> {car.location || "N/A"}
                    </p>

                    <p className="mt-4 text-gray-700">
                        {car.description || "No description available"}
                    </p>

                </div>

            </div>

        </div>
    );
}