import { useEffect, useState } from "react";
import api from "../api/axios";
import { initialFormState } from "../constants/searchCriteria";
import ImageUploader from "../components/ImageUploader";
import toast from "react-hot-toast";
import Pagination from "../components/Pagination";
import PriceComponents from "../components/PriceComponents";

export default function AdminDashboard() {

    const [cars, setCars] = useState([]);
    const [form, setForm] = useState({ ...initialFormState, priceComponents: [] });
    const [images, setImages] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    // 🔥 LOAD CARS (with pagination)
    const loadCars = async () => {
        try {
            const res = await api.get("/api/cars", {
                params: { page, size: 4 }
            });
            setCars(res.data.content);
            setTotalPages(res.data.totalPages);
        } catch (err) {
            toast.error("Failed to load cars");
        }
    };

    useEffect(() => {
        loadCars();
    }, [page]);

    // 🔥 SAVE CAR
    const saveCar = async () => {
        try {

            const payload = {
                title: form.title?.trim(),
                brand: form.brand?.trim(),
                model: form.model || null,
                year: form.year ? Number(form.year) : null,
                mileage: form.mileage ? Number(form.mileage) : null,
                fuelType: form.fuelType || null,
                transmission: form.transmission || null,
                basePrice: form.basePrice ? Number(form.basePrice) : null,
                priceComponents: form.priceComponents || [],
                location: form.location,
                description: form.description || null,
                status: form.status || "AVAILABLE",
                imageUrls: images
            };

            if (!payload.title || !payload.brand || !payload.basePrice) {
                toast.error("Title, Brand and BasePrice Price are required");
                return;
            }

            setLoading(true);

            if (editingId) {
                await api.put(`/api/cars/${editingId}`, payload);
                toast.success("Car updated");
            } else {
                await api.post("/api/cars", payload);
                toast.success("Car created");
            }

            resetForm();
            loadCars();

        } catch (err) {
            toast.error(err.response?.data?.error || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    // 🔥 RESET
    const resetForm = () => {
        setForm(initialFormState);
        setImages([]);
        setEditingId(null);
    };

    // 🔥 EDIT
    const handleEdit = (car) => {
        setForm({
            title: car.title || "",
            brand: car.brand || "",
            model: car.model || "",
            basePrice: car.basePrice ?? "",
            priceComponents: (car.priceComponents || []).map(pc => ({
                name: pc.name,
                amount: pc.value,
                percentage: pc.percentageBased ? pc.percentage : null,
                percentageBased: pc.percentageBased ?? false,
                type: pc.type
            })),
            year: car.year ?? "",
            mileage: car.mileage ?? "",
            fuelType: car.fuelType || "",
            transmission: car.transmission || "",
            description: car.description || "",
            location: car.location || "",
            status: car.status || "AVAILABLE"
        });

        setImages(car.imageUrls || []);
        setEditingId(car.id);

        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // 🔥 DELETE
    const deleteCar = async (id) => {
        if (!window.confirm("Delete this car?")) return;

        try {
            setLoading(true);
            await api.delete(`/api/cars/${id}`);
            toast.success("Deleted successfully");
            loadCars();
        } catch {
            toast.error("Delete failed");
        } finally {
            setLoading(false);
        }
    };

    // 🔥 IMAGE UPLOAD
    const handleUpload = async (files) => {
        try {
            setLoading(true);

            const uploaded = [];

            for (let file of files) {
                const formData = new FormData();
                formData.append("file", file);

                const res = await api.post("/api/images/upload", formData);
                uploaded.push(res.data);
            }

            setImages(prev => [...prev, ...uploaded]);

            toast.success("Images uploaded");

        } catch {
            toast.error("Upload failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">

            <h1 className="text-2xl font-bold mb-6">
                {editingId ? "Edit Car" : "Add New Car"}
            </h1>

            {/* FORM */}
            <div className="bg-white p-4 rounded shadow mb-6 grid grid-cols-3 gap-4">

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                        Title
                    </label>

                    <input type="text" placeholder="Title" className="border p-2"
                        value={form.title}
                        onChange={e => setForm({ ...form, title: e.target.value })} />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                        Brand
                    </label>

                    <input type="text" placeholder="Brand" className="border p-2"
                        value={form.brand}
                        onChange={e => setForm({ ...form, brand: e.target.value })} />
                </div>


                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                        Base Price
                    </label>

                    <input type="number" placeholder="Base Price" className="border p-2"
                        value={form.basePrice || ""}
                        onChange={e => setForm({ ...form, basePrice: e.target.value })} />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                        Manufacturing Year
                    </label>

                    <input type="number" placeholder="Year" className="border p-2"
                        value={form.year}
                        onChange={e => setForm({ ...form, year: e.target.value })} />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                        Mileage
                    </label>

                    <input type="number" placeholder="Mileage" className="border p-2"
                        value={form.mileage}
                        onChange={e => setForm({ ...form, mileage: e.target.value })} />
                </div>


                <textarea placeholder="Description" className="border p-2 col-span-3"
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })} />

                <input placeholder="Location" className="border p-2"
                    value={form.location}
                    onChange={e => setForm({ ...form, location: e.target.value })} />

                <select className="border p-2"
                    value={form.fuelType || ""}
                    onChange={e => setForm({ ...form, fuelType: e.target.value })}>
                    <option value="">Fuel</option>
                    <option value="PETROL">Petrol</option>
                    <option value="DIESEL">Diesel</option>
                </select>

                <select className="border p-2"
                    value={form.transmission || ""}
                    onChange={e => setForm({ ...form, transmission: e.target.value })}>
                    <option value="">Transmission</option>
                    <option value="MANUAL">Manual</option>
                    <option value="AUTOMATIC">Automatic</option>
                </select>

                <select className="border p-2"
                    value={form.status || "AVAILABLE"}
                    onChange={e => setForm({ ...form, status: e.target.value })}>
                    <option value="AVAILABLE">Available</option>
                    <option value="SOLD">Sold</option>
                    <option value="INACTIVE">Inactive</option>
                </select>
                <PriceComponents
                    components={form.priceComponents || []}
                    setComponents={(list) =>
                        setForm({ ...form, priceComponents: list })
                    }
                />
                <ImageUploader
                    images={images}
                    setImages={setImages}
                    handleUpload={handleUpload}
                />

                <div className="col-span-3 flex gap-2">

                    <button
                        disabled={loading}
                        className={`flex-1 py-2 rounded text-white ${loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
                            }`}
                        onClick={saveCar}>
                        {loading
                            ? "Processing..."
                            : editingId
                                ? "Update Car"
                                : "Add Car"}
                    </button>
                    {(editingId || Object.values(form).some(v => v)) && (
                        <button
                            type="button"
                            onClick={resetForm}
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                            Reset
                        </button>
                    )}

                </div>
            </div>

            {/* LIST */}
            <div className="grid grid-cols-4 gap-4">

                {cars.length === 0 && (
                    <p className="col-span-3 text-center text-gray-500">
                        No cars available
                    </p>
                )}

                {cars.map(c => (
                    <div key={c.id} className="border p-3 rounded shadow hover:shadow-lg transition">

                        <img
                            src={c.imageUrls?.[0] || "/images/car-placeholder.png"}
                            onError={(e) => (e.target.src = "/images/car-placeholder.png")}
                            className="w-full h-40 object-cover rounded mb-2"
                        />

                        <h3 className="font-bold">{c.title}</h3>
                        <p>{c.brand}</p>
                        <p className="text-blue-600">$ {c.finalPrice?.toLocaleString()}</p>
                        <p className="text-sm text-gray-500 line-through"> $ {c.basePrice?.toLocaleString()}</p>

                        <div className="flex gap-2 mt-2">
                            <button
                                className="bg-blue-500 text-white px-2 py-1"
                                onClick={() => handleEdit(c)}
                            >
                                Edit
                            </button>

                            <button
                                className="bg-red-500 text-white px-2 py-1"
                                onClick={() => deleteCar(c.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* PAGINATION */}
            <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
    );
}