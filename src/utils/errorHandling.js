export class ApiError extends Error {
    constructor(message, statusCode, errors = []) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.name = 'ApiError';
    }
}

export const getErrorMessage = (error) => {
    if (error instanceof ApiError) {
        return error.message;
    }

    if (error.message === 'Failed to fetch') {
        return 'Network error. Please check your connection.';
    }

    // Handle authentication errors
    if (error.statusCode === 401) {
        return 'Incorrect email or password';
    }

    // Handle validation errors
    if (error.statusCode === 400 && error.errors) {
        return error.errors[0] || error.message;
    }

    return error.message || 'An unexpected error occurred.';
};

export const handleApiError = (error, setError) => {
    const message = getErrorMessage(error);
    setError(message);

    // Log error for monitoring with better formatting
    console.error('[API Error]:', JSON.stringify({
        message: error.message,
        statusCode: error.statusCode,
        errors: error.errors
    }, null, 2));
}; 