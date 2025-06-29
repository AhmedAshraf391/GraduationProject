export const API_BASE_URL = 'https://mizan-grad-project.runasp.net/api';

export const endpoints = {
    auth: {
        login: `${API_BASE_URL}/auth/login`,
        register: `${API_BASE_URL}/auth/register`,
        verifyEmail: `${API_BASE_URL}/auth/verify-email`,
    },
    lawyers: {
        list: `${API_BASE_URL}/Lawyer/lawyers`,
        filter: `${API_BASE_URL}/Filter/filter-lawyers`,
        update: `${API_BASE_URL}/lawyers/update`,
    }
};

export const createApiClient = (token = null) => {
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const handleResponse = async (response) => {
        try {
            // Log raw response for debugging
            console.log('Raw response:', {
                status: response.status,
                statusText: response.statusText,
                headers: Object.fromEntries(response.headers.entries())
            });

            // Get response as text first
            const text = await response.text();
            console.log('Response text:', text);

            // Try to parse as JSON
            let data;
            try {
                data = JSON.parse(text);
                console.log('Parsed response:', data);
            } catch (e) {
                // If not JSON, use text as is
                data = text;
                console.log('Using text response:', data);
            }

            // Handle error responses
            if (!response.ok) {
                const error = new Error(
                    (typeof data === 'object' && data.message) ||
                    (typeof data === 'string' ? data : 'An error occurred')
                );
                error.statusCode = response.status;
                error.response = data;
                throw error;
            }

            // For login endpoint, ensure we return the token in the expected format
            if (response.url.endsWith('/auth/login')) {
                if (typeof data === 'string') {
                    // If response is a string, assume it's the token
                    return { model: data };
                } else if (data?.model) {
                    // If response has model property, return as is
                    return data;
                } else if (data?.token) {
                    // If response has token property, wrap it in model
                    return { model: data.token };
                }
            }

            return data;
        } catch (error) {
            console.error('Response handling error:', error);
            throw error;
        }
    };

    return {
        async get(url) {
            console.log('GET request to:', url);
            const response = await fetch(url, { headers });
            return handleResponse(response);
        },
        async post(url, body) {
            console.log('POST request to:', url, 'with body:', body);
            const response = await fetch(url, {
                method: 'POST',
                headers,
                body: JSON.stringify(body),
            });
            return handleResponse(response);
        },
        async put(url, body) {
            console.log('PUT request to:', url, 'with body:', body);
            const response = await fetch(url, {
                method: 'PUT',
                headers,
                body: JSON.stringify(body),
            });
            return handleResponse(response);
        },
        async delete(url) {
            console.log('DELETE request to:', url);
            const response = await fetch(url, {
                method: 'DELETE',
                headers,
            });
            return handleResponse(response);
        },
    };
}; 