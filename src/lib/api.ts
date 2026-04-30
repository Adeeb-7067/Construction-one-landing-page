const BASE_URL = import.meta.env.PROD ? (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "") : "";

export const fetchLandingData = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/v1/company/landing-page`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        return json.data;
    } catch (error) {
        console.error("Failed to fetch landing data:", error);
        throw error;
    }
};

export const fetchSellTypes = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/v1/business-request/selltype`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        return json;
    } catch (error) {
        console.error("Failed to fetch sell types:", error);
        throw error;
    }
};

export const submitBusinessRequest = async (data: any) => {
    try {
        const response = await fetch(`${BASE_URL}/api/v1/business-request`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to submit business request:", error);
        throw error;
    }
};

