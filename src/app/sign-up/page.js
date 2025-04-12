"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        PhoneNumber: "",
        password: "",
        confirmPassword: "",
        role: "",
    });

    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    //     setServerError("");
    //     setLoading(true);

    //     let errors = {};

    //     if (formData.firstName.length < 3) errors.firstName = "Enter a valid first name";
    //     if (formData.lastName.length < 3) errors.lastName = "Enter a valid last name";
    //     if (!formData.email.includes("@")) errors.email = "Enter a valid email";
    //     if (formData.phone.length < 10) errors.phone = "Enter a valid phone number";
    //     if (formData.password.length < 6) errors.password = "Password must be at least 6 characters";
    //     if (formData.password !== formData.confirmPassword) errors.confirmPassword = "Passwords do not match";

    //     setError(errors);
    //     if (Object.keys(errors).length > 0) {
    //         setLoading(false);
    //         return;
    //     }

    //     try {
    //         //  Convert form data into FormData object
    //         const formDataObj = new FormData();
    //         formDataObj.append("firstName", formData.firstName);
    //         formDataObj.append("lastName", formData.lastName);
    //         formDataObj.append("email", formData.email);
    //         formDataObj.append("phone", formData.phone);
    //         formDataObj.append("password", formData.password);
    //         formDataObj.append("role", formData.role);

    //         const response = await fetch("https://localhost:7121/register", {
    //             method: "POST",
    //             body: formDataObj,
    //         });

    //         const data = await response.json();

    //         if (!response.ok) {
    //             throw new Error(data.message || "Signup failed");
    //         }

    //         alert("Signup successful! Redirecting to login...");
    //         router.push("/login"); // Redirect to login page

    //     } catch (error) {
    //         setServerError(error.message);
    //     }

    //     setLoading(false);
    // };
    const handleSignup = async (e) => {
        e.preventDefault();
        setServerError("");
        setLoading(true);

        let errors = {};

        if (formData.firstName.length < 3) errors.firstName = "Enter a valid first name";
        if (formData.lastName.length < 3) errors.lastName = "Enter a valid last name";
        if (!formData.email.includes("@")) errors.email = "Enter a valid email";
        if (formData.PhoneNumber.length < 10) errors.PhoneNumber = "Enter a valid phone number";
        if (formData.password.length < 6) errors.password = "Password must be at least 6 characters";
        if (formData.password !== formData.confirmPassword) errors.confirmPassword = "Passwords do not match";

        setError(errors);
        if (Object.keys(errors).length > 0) {
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:7121/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                // Disable SSL verification for local testing with Burp Suite
                mode: "cors",
                credentials: "include",
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    phone: formData.PhoneNumber,
                    password: formData.password,
                    role: formData.role,
                }),
                agent: proxyAgent, 
            });

            if (response.status === 201) {
                const responseData = await response.json();
                console.log("Created successfully:", responseData);
                alert("Signup successful! Redirecting to login...");
                router.push("/verify-email");
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || "Signup failed");
            }
        } catch (error) {
            setServerError(error.message);
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex bg-gray-200">
            {/* Left Side Image */}
            <div className="w-1/2 hidden md:block">
                <img src="/images/sign-up.png" alt="Signup Background" className="w-full h-full object-cover" />
            </div>

            {/* Right Side Form */}
            <div className="w-full md:w-1/2 flex justify-center items-center">
                <div className="max-w-md w-full space-y-6 p-8 bg-white rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold text-gray-900 text-center">Signup</h2>
                    <p className="text-gray-500 text-center">Create your account in just a few steps</p>

                    {serverError && <p className="text-red-500 text-center">{serverError}</p>}

                    {/* Form */}
                    <form onSubmit={handleSignup} className="space-y-4">
                        {/* First Name Input */}
                        <div>
                            <label className="block text-gray-700">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="Enter your first name"
                                className={`w-full text-gray-900 p-2 border ${error.firstName ? "border-red-500" : "border-gray-300"} rounded-lg`}
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                            {error.firstName && <p className="text-red-500 text-sm">{error.firstName}</p>}
                        </div>

                        {/* Last Name Input */}
                        <div>
                            <label className="block text-gray-700">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Enter your last name"
                                className={`w-full text-gray-900 p-2 border ${error.lastName ? "border-red-500" : "border-gray-300"} rounded-lg`}
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                            {error.lastName && <p className="text-red-500 text-sm">{error.lastName}</p>}
                        </div>

                        {/* Email Input */}
                        <div>
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className={`w-full text-gray-900 p-2 border ${error.email ? "border-red-500" : "border-gray-300"} rounded-lg`}
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {error.email && <p className="text-red-500 text-sm">{error.email}</p>}
                        </div>

                        {/* Phone Input */}
                        <div>
                            <label className="block text-gray-700">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                placeholder="Enter your phone number"
                                className={`w-full text-gray-900 p-2 border ${error.phone ? "border-red-500" : "border-gray-300"} rounded-lg`}
                                value={formData.phone}
                                onChange={handleChange}
                            />
                            {error.phone && <p className="text-red-500 text-sm">{error.phone}</p>}
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-gray-700">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                className={`w-full text-gray-900 p-2 border ${error.password ? "border-red-500" : "border-gray-300"} rounded-lg`}
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {error.password && <p className="text-red-500 text-sm">{error.password}</p>}
                        </div>

                        {/* Confirm Password Input */}
                        <div>
                            <label className="block text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm your password"
                                className={`w-full text-gray-900 p-2 border ${error.confirmPassword ? "border-red-500" : "border-gray-300"} rounded-lg`}
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            {error.confirmPassword && <p className="text-red-500 text-sm">{error.confirmPassword}</p>}
                        </div>

                        {/* Role Selection */}
                        <div>
                            <label className="block text-gray-700">Select Role:</label>
                            <div className="flex space-x-4">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="lawyer"
                                        checked={formData.role === "lawyer"}
                                        onChange={handleChange}
                                    />
                                    <span className="ml-2 text-gray-500">Lawyer</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="client"
                                        checked={formData.role === "client"}
                                        onChange={handleChange}
                                    />
                                    <span className="ml-2 text-gray-500">Client</span>
                                </label>
                            </div>
                        </div>

                        {/* Signup Button */}
                        <button
                            type="submit"
                            href="/verify-email"
                            className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900"
                            disabled={loading}
                        >
                            <a href="/verify-email" className="text-white">
                                {loading ? "Signing up..." : "Signup"}
                            </a>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
