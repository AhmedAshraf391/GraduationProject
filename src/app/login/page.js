"use client";
import { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({ email: "", password: "" });

    const handleLogin = (e) => {
        e.preventDefault();
        let errors = { email: "", password: "" };

        if (!email.includes("@")) {
            errors.email = "Enter your correct email";
        }
        if (password.length < 6) {
            errors.password = "Enter your correct password";
        }

        setError(errors);
        if (!errors.email && !errors.password) {
            console.log("Login successful");
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side Image */}
            <div className="w-1/2 hidden md:block">
                <img
                    src="/images/login-bg.jpg"
                    alt="Login Background"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Right Side Form */}
            <div className="w-full md:w-1/2 flex justify-center items-center">
                <div className="max-w-md w-full space-y-6 p-8 bg-white rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold text-gray-900 text-center">Login</h2>
                    <p className="text-gray-500 text-center">
                        Create your account in just few steps
                    </p>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-4">
                        {/* Email Input */}
                        <div>
                            <label className="block text-gray-700">Email</label>
                            <div className="relative">
                                <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className={`w-full pl-10 p-2 border ${error.email ? "border-red-500" : "border-gray-300"
                                        } rounded-lg`}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            {error.email && (
                                <p className="text-red-500 text-sm">{error.email}</p>
                            )}
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-gray-700">Password</label>
                            <div className="relative">
                                <FaLock className="absolute left-3 top-3 text-gray-500" />
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    className={`w-full pl-10 p-2 border ${error.password ? "border-red-500" : "border-gray-300"
                                        } rounded-lg`}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            {error.password && (
                                <p className="text-red-500 text-sm">{error.password}</p>
                            )}
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                <label className="text-gray-700">Remember me</label>
                            </div>
                            <a href="#" className="text-blue-500 text-sm">
                                Forgot password?
                            </a>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900"
                        >
                            Login
                        </button>

                        {/* Google Login */}
                        <button className="w-full flex justify-center items-center border py-2 rounded-lg hover:bg-gray-200">
                            <img
                                src="/images/google-icon.png"
                                alt="Google Login"
                                className="w-5 h-5 mr-2"
                            />
                            Continue with Google
                        </button>
                    </form>

                    {/* Signup Link */}
                    <p className="text-center text-gray-700">
                        Have an account?{" "}
                        <a href="#" className="text-blue-500 font-bold">
                            Signup
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
