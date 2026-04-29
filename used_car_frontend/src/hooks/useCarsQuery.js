import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export default function useCarsQuery({ page, criteria, enabled }) {

    return useQuery({
        queryKey: [
            "cars",
            page,
            criteria.fuelType,
            criteria.transmission,
            criteria.minPrice,
            criteria.maxPrice,
            criteria.keyword,
            criteria.sort
        ],

        queryFn: async () => {
            const params = { page, size: 8 };

            Object.entries(criteria).forEach(([k, v]) => {
                if (v !== "") params[k] = v;
            });

            const res = await api.get("/api/cars", { params });
            return res.data;
        },

        enabled, 
        keepPreviousData: true,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false
    });
}