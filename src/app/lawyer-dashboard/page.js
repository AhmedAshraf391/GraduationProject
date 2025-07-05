// src/app/lawyer-dashboard/page.js (Temporary Fix)
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function LawyerDashboard() {
	const [userName, setUserName] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);
	const { user, refreshUser } = useAuth();
	const router = useRouter();

	useEffect(() => {
		console.log("useEffect triggered - Initial user state:", user);

		const fetchUpdatedUser = async () => {
			try {
				console.log("Refreshing user data to reflect lawyer status...");
				const result = await refreshUser();
				console.log("Refresh result:", result);
				console.log("User state after refresh:", user);

				if (!user) {
					console.log("User is undefined, redirecting to /home");
					router.push("/home");
					return;
				}

				console.log("User details:", { id: user.userId, isLawyer: true, role: user.role || "USER" });
				setLoading(false);

				const token = localStorage.getItem("token") || "";
				console.log("Token from localStorage:", token);
				if (token) {
					try {
						const decoded = JSON.parse(atob(token.split(".")[1]));
						console.log("Decoded token claims:", decoded);
						setUserName(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || "Lawyer");
					} catch (err) {
						console.error("Token decoding error:", err);
						setError("Failed to decode token.");
					}
				}
			} catch (err) {
				console.error("Error fetching updated user:", err);
				setError("Failed to load user data.");
				setLoading(false);
			}
		};

		fetchUpdatedUser();
	}, [user, router, refreshUser]);

	if (loading) {
		console.log("Rendering loading state...");
		return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
	}

	if (!user) {
		console.log("Rendering null due to no user");
		return null;
	}

	return (
		<div className="min-h-screen bg-gray-100 flex">
			<aside className="w-64 bg-gray-800 text-white p-4">
				<h3 className="text-xl font-bold mb-4">Menu</h3>
				<ul className="space-y-2">
					{/* <li><a href="#" className="hover:text-gray-300">Update Profile</a></li>
					<li><a href="#" className="hover:text-gray-300">Cases</a></li>
					<li><a href="#" className="hover:text-gray-300">Appointments</a></li> */}
					<li><a href="./" className="hover:text-gray-300">Logout</a></li>
				</ul>
			</aside>
			<main className="flex-1 p-8">
				<header className="mb-6">
					<h1 className="text-3xl font-bold text-gray-900">Lawyer Dashboard</h1>
					<p className="text-gray-600">Welcome, {user.email} !</p>
				</header>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<div className="bg-white p-6 rounded-lg shadow-md">
						<h3 className="text-lg font-semibold text-gray-800">Profile</h3>
						<p className="text-gray-600">Location: {user?.location || "Not set"}</p>
						<p className="text-gray-600">Specialization: {user?.specialization || "Not set"}</p>
					</div>
					<div className="bg-white p-6 rounded-lg shadow-md">
						<h3 className="text-lg font-semibold text-gray-800">Active Cases</h3>
						<p className="text-gray-600">10 cases</p>
					</div>
					<div className="bg-white p-6 rounded-lg shadow-md">
						<h3 className="text-lg font-semibold text-gray-800">Appointments</h3>
						<p className="text-gray-600">15 upcoming</p>
					</div>
				</div>
			</main>
		</div>
	);
}