"use client";
import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();  // Prevent default form submission (which causes a page refresh)

        setError("");
        setLoading(true);

        try {
            const response = await fetch("https://mizan-grad-project.runasp.net/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Login successful!");
                // Redirect user after successful login (modify as needed)
                window.location.href = "/home";
            } else {
                setError(data.message || "Invalid email or password");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex h-screen bg-gray-200">
            {/* Left Side Image */}
            <div className="w-1/2 hidden md:block">
                <img
                    src="/images/login.png"
                    alt="Login Background"
                    className="w-full h-full object-cover object-center"
                />
            </div>

            {/* Right Side Form */}
            <div className="w-full md:w-1/2 flex justify-center items-center">
                <div className="max-w-md w-full space-y-6 p-8 bg-white rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold text-gray-900 text-center">Login</h2>
                    <p className="text-gray-500 text-center">
                        Create your account in just a few steps
                    </p>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-4">
                        {/* Email Input */}
                        <div>
                            <label className="block text-gray-700">Email</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className={`w-full pl-10 text-gray-900 p-2 border ${error.email ? "border-red-500" : "border-gray-300"
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
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    className={`w-full pl-10 text-gray-900 p-2 border ${error.password ? "border-red-500" : "border-gray-300"
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
                            <a href="/forgot-pass" className="text-blue-500 text-sm">
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
                        <button className="w-full flex justify-center text-gray-900 items-center border py-2 rounded-lg hover:bg-gray-200">
                            Continue with Google
                        </button>
                    </form>

                    {/* Signup Link */}
                    <p className="text-center text-gray-700">
                        Don't have an account?{" "}
                        <a href="/sign-up" className="text-blue-500 font-bold">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
