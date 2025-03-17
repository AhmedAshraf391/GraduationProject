/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";

export default function ForgetPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email.includes("@")) {
            setError("Please enter a valid email address.");
            return;
        }
        setError("");
        setSuccess(true);
        console.log("Password reset link sent to:", email);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 flex items-center space-x-10 max-w-3xl w-full">

                {/* Left Side Illustration */}
                <div className="hidden md:block w-1/2">
                    <img
                        src="/images/forgot-pass.png"
                        alt="Forgot Password"
                        className="w-full"
                    />
                </div>

                {/* Right Side Form */}
                <div className="w-full md:w-1/2">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Forget Password</h2>
                    <p className="text-gray-500 mb-6">
                        Do not worry! Enter your email address below and we will send you an OTP to reset your password.
                    </p>

                    {/* Success Message */}
                    {success && (
                        <p className="text-green-600 bg-green-100 p-3 rounded-lg mb-4">
                            A password reset link has been sent to your email!
                        </p>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email Input */}
                        <div>
                            <label className="block text-gray-700 mb-2">Email</label>
                            <div className="relative">
                                
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    className={`w-full pl-10 p-2 border ${error ? "border-red-500" : "border-gray-300"
                                        } rounded-lg`}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                        </div>

                        {/* Buttons */}
                        <div className="flex space-x-4">
                            <button
                                type="button"
                                className="w-1/2 border py-2 rounded-lg text-gray-700 hover:bg-gray-200"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="w-1/2 bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900"
                            >
                                Continue
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
