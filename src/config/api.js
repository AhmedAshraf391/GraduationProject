export const API_BASE_URL = "https://mizan-grad-project.runasp.net/api";

export const endpoints = {
    auth: {
        login: `${API_BASE_URL}/auth/login`,
        register: `${API_BASE_URL}/auth/register`,
        verifyEmail: `${API_BASE_URL}/auth/verify-email`,
    },
    lawyers: {
        list: `${API_BASE_URL}/Lawyer/lawyers`,
        filter: `${API_BASE_URL}/Filter/filter-lawyers`,
        update: `${API_BASE_URL}/Lawyer/update-lawyer`,
    },
    locations: {
        getLocations: `${API_BASE_URL}/Locations/get-locations`,
    },
    specializations: {
        getSpecializations: `${API_BASE_URL}/Specialization/get-specializations`,
    },
};

export const createApiClient = (token = null) => {
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const handleResponse = async (response) => {
        try {
            console.log("Raw response:", {
                status: response.status,
                statusText: response.statusText,
                headers: Object.fromEntries(response.headers.entries()),
            });

            const text = await response.text();
            console.log("Response text:", text);

            let data;
            try {
                data = text ? JSON.parse(text) : {};
                console.log("Parsed response:", data);
            } catch (e) {
                data = text || "An error occurred";
                console.log("Using text response:", data);
            }

            if (!response.ok) {
                const errorMessage =
                    (typeof data === "object" && (data.title || data.message)) ||
                    (data.errors ? JSON.stringify(data.errors) : "An error occurred");
                const error = new Error(errorMessage);
                error.statusCode = response.status;
                error.response = data;
                throw error;
            }

            if (response.url.endsWith("/auth/login")) {
                if (data.success && data.model && typeof data.model === "object") {
                    const { accessToken, isLawyer, id, email, location, specialization } = data.model;
                    const token = accessToken?.token || accessToken;
                    if (token) {
                        return {
                            success: data.success,
                            message: data.message,
                            model: { token, isLawyer, id, email, location, specialization },
                        };
                    }
                } else if (data.token) {
                    return { model: data.token };
                }
                console.warn("Unexpected login response structure:", data);
                throw new Error("Unexpected login response structure");
            }

            if (response.url.endsWith("/Locations/get-locations")) {
                if (data.success && Array.isArray(data.locations)) {
                    return data.locations.map((loc) => loc.normalizedName);
                }
                console.warn("Unexpected locations response structure:", data);
                throw new Error("Unexpected locations response structure");
            }

            if (response.url.endsWith("/Specialization/get-specializations")) {
                if (data.success && Array.isArray(data.specializations)) {
                    return data.specializations.map((spec) => spec.normalizedName);
                }
                console.warn("Unexpected specializations response structure:", data);
                throw new Error("Unexpected specializations response structure");
            }

            return data;
        } catch (error) {
            console.error("Response handling error:", error);
            throw error;
        }
    };

    return {
        async get(url) {
            console.log("GET request to:", url);
            const response = await fetch(url, { headers });
            return handleResponse(response);
        },
        async post(url, body) {
            console.log("POST request to:", url, "with body:", body);
            const response = await fetch(url, {
                method: "POST",
                headers,
                body: JSON.stringify(body),
            });
            return handleResponse(response);
        },
        async put(url, body) {
            console.log("PUT request to:", url, "with body:", body);
            const response = await fetch(url, {
                method: "PUT",
                headers,
                body: JSON.stringify(body),
            });
            return handleResponse(response);
        },
        async delete(url) {
            console.log("DELETE request to:", url);
            const response = await fetch(url, {
                method: "DELETE",
                headers,
            });
            return handleResponse(response);
        },
    };
};