/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";

export default function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [error, setError] = useState("");

    const validatePassword = (pwd) => {
        let strength = 0;
        if (pwd.length >= 8) strength++;
        if (/[A-Z]/.test(pwd)) strength++;
        if (/[a-z]/.test(pwd)) strength++;
        if (/\d/.test(pwd)) strength++;
        if (/[!@#$%^&*]/.test(pwd)) strength++;
        setPasswordStrength(strength);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        validatePassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }
        if (passwordStrength < 3) {
            setError("Password is too weak!");
            return;
        }
        setError("");
        console.log("Password successfully changed!");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 flex items-center space-x-10 max-w-3xl w-full">

                {/* Left Side Illustration */}
                <div className="hidden md:block w-1/2">
                    <img
                        src="/images/reset-pass.png"
                        alt="Reset Password"
                        className="w-full"
                    />
                </div>

                {/* Right Side Form */}
                <div className="w-full md:w-1/2">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Create a New Password</h2>
                    <p className="text-gray-500 mb-6">
                        Enter your new password below to complete the reset process.
                    </p>

                    {/* Error Message */}
                    {error && <p className="text-red-500 bg-red-100 p-3 rounded-lg mb-4">{error}</p>}

                    {/* Password Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="password"
                            placeholder="New Password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        {/* Password Strength Indicator */}
                        <div className="flex space-x-2">
                            {[...Array(5)].map((_, index) => (
                                <div
                                    key={index}
                                    className={`h-2 flex-1 rounded-full ${passwordStrength > index ? "bg-green-500" : "bg-gray-300"
                                        }`}
                                />
                            ))}
                        </div>

                        {/* Password Tips */}
                        <ul className="text-gray-500 text-sm mt-3">
                            <li>✅ Use a mix of uppercase and lowercase letters (A-Z, a-z)</li>
                            <li>✅ Add numbers (0-9)</li>
                            <li>✅ Use special characters (e.g. @#$%^&*)</li>
                        </ul>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 mt-4"
                        >
                            Continue
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
