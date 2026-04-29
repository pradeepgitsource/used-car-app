import CarGrid from "./CarGrid";
import Pagination from "./Pagination";
import useCarsQuery from "../hooks/useCarsQuery";

export default function CarsSection({ page, setPage, criteria, enabled }) {

    const { data, isLoading } = useCarsQuery({
        page,
        criteria,
        enabled
    });

    const cars = data?.content || [];
    const totalPages = data?.totalPages || 0;

    if (isLoading) {
        return <div className="h-64 flex items-center justify-center">Loading...</div>;
    }

    if (cars.length === 0) {
        return <div className="h-64 flex items-center justify-center">No cars</div>;
    }

    return (
        <>
            <CarGrid cars={cars} />
            <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </>
    );
}