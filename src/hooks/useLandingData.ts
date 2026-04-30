import { useQuery } from "@tanstack/react-query";
import { fetchLandingData, fetchSellTypes } from "@/lib/api";

export const useLandingData = () => {
    return useQuery({
        queryKey: ["landingData"],
        queryFn: fetchLandingData,
    });
};

export const useSellTypes = () => {
    return useQuery({
        queryKey: ["sellTypes"],
        queryFn: fetchSellTypes,
    });
};
