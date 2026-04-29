import { useEffect, useReducer } from "react";
import api from "../api/axios";
import { initialSearchCriteria } from "../constants/searchCriteria";
import {
    ActionTypes,
    setLoading,
    setData
} from "./carActions";

const initialState = {
    cars: [],
    page: 0,
    totalPages: 0,
    loading: false,
    criteria: initialSearchCriteria
};

function reducer(state, action) {
    switch (action.type) {

        case ActionTypes.SET_LOADING:
            return { ...state, loading: action.payload };

        case ActionTypes.SET_DATA:
            return {
                ...state,
                cars: action.payload.content,
                totalPages: action.payload.totalPages
            };

        case ActionTypes.SET_PAGE:
            return { ...state, page: action.payload };

        case ActionTypes.SET_CRITERIA:
            return {
                ...state,
                criteria: {
                    ...state.criteria,
                    [action.payload.name]: action.payload.value
                }
            };

        case ActionTypes.RESET_CRITERIA:
            return {
                ...state,
                criteria: initialSearchCriteria,
                page: 0
            };

        default:
            return state;
    }
}

export default function useCars() {

    const [state, dispatch] = useReducer(reducer, initialState);

    const loadCars = async () => {
        try {
            dispatch(setLoading(true));

            const params = {
                page: state.page,
                size: 8
            };

            Object.entries(state.criteria).forEach(([k, v]) => {
                if (v !== "") params[k] = v;
            });

            const res = await api.get("/api/cars", { params });

            dispatch(setData(res.data));

        } catch (err) {
            console.error(err);
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        loadCars();
    }, [state.page]);

    return {
        state,
        dispatch,
        loadCars
    };
}