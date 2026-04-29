import CarCard from "./CarCard";

export default function CarGrid({ cars }) {

    return (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

            {cars.map(car => (
                <CarCard key={car.id} car={car} />
            ))}

        </div>
    );
}