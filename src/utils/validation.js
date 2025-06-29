export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Invalid email format';
    return '';
};

export const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
    if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter';
    if (!/[0-9]/.test(password)) return 'Password must contain at least one number';
    if (!/[!@#$%^&*]/.test(password)) return 'Password must contain at least one special character';
    return '';
};

export const validateName = (name, fieldName = 'Name') => {
    if (!name) return `${fieldName} is required`;
    if (name.length < 2) return `${fieldName} must be at least 2 characters`;
    if (!/^[a-zA-Z\s]*$/.test(name)) return `${fieldName} can only contain letters and spaces`;
    return '';
};

export const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    if (!phoneNumber) return 'Phone number is required';
    if (!phoneRegex.test(phoneNumber)) return 'Invalid phone number format';
    return '';
};

export const validateForm = (values, validations) => {
    const errors = {};

    Object.keys(validations).forEach(key => {
        const value = values[key];
        const validation = validations[key];

        const error = validation(value);
        if (error) {
            errors[key] = error;
        }
    });

    return errors;
}; 