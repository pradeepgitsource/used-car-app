import { useState } from "react";
import Filter from "../components/Filter";
import CarsSection from "../components/CarsSection";
import { initialSearchCriteria } from "../constants/searchCriteria";

export default function Home() {

    const [page, setPage] = useState(0);
    const [draftCriteria, setDraftCriteria] = useState(initialSearchCriteria);
    const [appliedCriteria, setAppliedCriteria] = useState(initialSearchCriteria);
    const [enabled, setEnabled] = useState(true);

    // handle typing
    const handleChange = (e) => {
        const { name, value } = e.target;

        setDraftCriteria(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const applyFilters = () => {
        setAppliedCriteria(draftCriteria);
        setPage(0);
        setEnabled(true);
    };


    const resetFilters = () => {
        setDraftCriteria(initialSearchCriteria);
        setAppliedCriteria(initialSearchCriteria);
        setPage(0);
    };

    return (
        <div className="bg-gray-100 min-h-screen">

            <div className="max-w-7xl mx-auto px-6 py-8">

                <h1 className="text-3xl font-bold mb-6">
                    Used Cars Marketplace
                </h1>

                <div className="grid grid-cols-4 gap-6">

                    <Filter
                        criteria={draftCriteria}
                        onChange={handleChange}
                        apply={applyFilters}
                        reset={resetFilters}
                    />

                    <div className="col-span-3">
                        <CarsSection
                            page={page}
                            setPage={setPage}
                            criteria={appliedCriteria}
                        />
                    </div>

                </div>

            </div>
        </div>
    );
}