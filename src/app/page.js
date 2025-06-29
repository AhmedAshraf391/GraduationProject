"use client";
import { useState } from "react";
import { jwtDecode } from 'jwt-decode';



export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
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
            console.log(response)
            if (response.ok) {
                alert("Login successful!");
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
                        Login to your account
                    </p>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full text-gray-900 p-2 border border-gray-300 rounded-lg"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700">Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="w-full text-gray-900 p-2 border border-gray-300 rounded-lg"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm text-center">{error}</p>
                        )}

                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                <label className="text-gray-700">Remember me</label>
                            </div>
                            <a href="/forgot-pass" className="text-blue-500 text-sm">
                                Forgot password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>

                        <button className="w-full flex justify-center text-gray-900 items-center border py-2 rounded-lg hover:bg-gray-200">
                            Continue with Google
                        </button>
                    </form>

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
