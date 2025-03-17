/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";

export default function Signup() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        role: "lawyer",
    });

    const [error, setError] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = (e) => {
        e.preventDefault();
        let errors = { name: "", email: "", phone: "", password: "", confirmPassword: "" };

        if (formData.name.length < 3) {
            errors.name = "Enter a valid name";
        }
        if (!formData.email.includes("@")) {
            errors.email = "Enter a valid email";
        }
        if (formData.phone.length < 10) {
            errors.phone = "Enter a valid phone number";
        }
        if (formData.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }
        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }

        setError(errors);
        if (!errors.name && !errors.email && !errors.phone && !errors.password && !errors.confirmPassword) {
            console.log("Signup successful");
        }
    };

    return (
        <div className="min-h-screen flex  bg-gray-200">
            {/* Left Side Image */}
            <div className="w-1/2 hidden md:block">
                <img
                    src="/images/sign-up.png"
                    alt="Signup Background"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Right Side Form */}
            <div className="w-full md:w-1/2 flex justify-center items-center">
                <div className="max-w-md w-full space-y-6 p-8 bg-white rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold text-gray-900 text-center">Signup</h2>
                    <p className="text-gray-500 text-center">
                        Create your account in just few steps
                    </p>

                    {/* Form */}
                    <form onSubmit={handleSignup} className="space-y-4">
                        {/* Name Input */}
                        <div>
                            <label className="block text-gray-700">Name</label>
                            <div className="relative">

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    className={`w-full pl-10 p-2 border ${error.name ? "border-red-500" : "border-gray-300"
                                        } rounded-lg`}
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            {error.name && <p className="text-red-500 text-sm">{error.name}</p>}
                        </div>

                        {/* Email Input */}
                        <div>
                            <label className="block text-gray-700">Email</label>
                            <div className="relative">

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    className={`w-full pl-10 p-2 border ${error.email ? "border-red-500" : "border-gray-300"
                                        } rounded-lg`}
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            {error.email && <p className="text-red-500 text-sm">{error.email}</p>}
                        </div>

                        {/* Phone Input */}
                        <div>
                            <label className="block text-gray-700">Phone</label>
                            <div className="relative">

                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Enter your phone number"
                                    className={`w-full pl-10 p-2 border ${error.phone ? "border-red-500" : "border-gray-300"
                                        } rounded-lg`}
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            {error.phone && <p className="text-red-500 text-sm">{error.phone}</p>}
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-gray-700">Password</label>
                            <div className="relative">

                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    className={`w-full pl-10 p-2 border ${error.password ? "border-red-500" : "border-gray-300"
                                        } rounded-lg`}
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            {error.password && <p className="text-red-500 text-sm">{error.password}</p>}
                        </div>

                        {/* Confirm Password Input */}
                        <div>
                            <label className="block text-gray-700">Confirm Password</label>
                            <div className="relative">

                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm your password"
                                    className={`w-full pl-10 p-2 border ${error.confirmPassword ? "border-red-500" : "border-gray-300"
                                        } rounded-lg`}
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                            </div>
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
                                    <span className="ml-2 text-stone-500">Lawyer</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="client"
                                        checked={formData.role === "client"}
                                        onChange={handleChange}
                                    />
                                    <span className="ml-2 text-stone-500">Client</span>
                                </label>
                            </div>
                        </div>

                        {/* Signup Button */}
                        <button type="submit" className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900">
                            Signup
                        </button>

                        {/* Google Signup */}
                        <button className="w-full flex justify-center items-center border py-2 text-gray-500 rounded-lg hover:bg-gray-200">
                            Continue with Google
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
