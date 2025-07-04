"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function LawyerDashboard() {
    const [userName, setUserName] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true); 
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        console.log("User state in useEffect:", user); 
        if (!user) {
            setLoading(false); 
            return;
        }
        if (!user.isLawyer) {
            router.push("/home");
            return;
        }
        setLoading(false); 
        const token = localStorage.getItem("token") || "";
        if (token) {
            try {
                const decoded = JSON.parse(atob(token.split(".")[1])); 
                setUserName(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || "Lawyer");
            } catch (err) {
                console.error("Error decoding token:", err);
                setError("Failed to load user name.");
            }
        }
    }, [user, router]);

    if (loading) {
        return <div className="min-h-screen flex justify-center items-center">Loading...</div>; 
    }

    if (!user) {
        return null; 
    }

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white p-4">
                <h3 className="text-xl font-bold mb-4">Menu</h3>
                <ul className="space-y-2">
                    <li>
                        <a href="/update-profile" className="hover:text-gray-300">Update Profile</a>
                    </li>
                    <li>
                        <a href="#" className="hover:text-gray-300">Cases</a>
                    </li>
                    <li>
                        <a href="#" className="hover:text-gray-300">Appointments</a>
                    </li>
                    <li>
                        <a href="/logout" className="hover:text-gray-300">Logout</a>
                    </li>
                </ul>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <header className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Lawyer Dashboard</h1>
                    <p className="text-gray-600">Welcome, {userName}!</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Card 1: Profile Summary */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-gray-800">Profile</h3>
                        <p className="text-gray-600">Location: {user?.location || "Not set"}</p>
                        <p className="text-gray-600">Specialization: {user?.specialization || "Not set"}</p>
                    </div>

                    {/* Card 2: Active Cases */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-gray-800">Active Cases</h3>
                        <p className="text-gray-600">0 cases</p>
                    </div>

                    {/* Card 3: Appointments */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-gray-800">Appointments</h3>
                        <p className="text-gray-600">0 upcoming</p>
                    </div>
                </div>

                {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
            </main>
        </div>
    );
}