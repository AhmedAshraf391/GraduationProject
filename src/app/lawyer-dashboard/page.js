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

	const [caseCount, setCaseCount] = useState(0);
	const [appointmentCount, setAppointmentCount] = useState(0);

	useEffect(() => {
		setCaseCount(Math.floor(Math.random() * 50) + 1);
		setAppointmentCount(Math.floor(Math.random() * 50) + 1);
	}, []);

	useEffect(() => {
		console.log("useEffect triggered - Initial user state:", user);

		const fetchUpdatedUser = async () => {
			try {
				if (!user) {
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
	}, [user, router]);

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
			<aside className="w-64 bg-gray-100 text-slate-700 p-4 rounded-lg shadow-lg">
				<h3 className="text-xl font-bold mb-4">Menu</h3>
				<ul className="space-y-2">
					<li><a href="/clients" className="hover:text-gray-500">Clients</a></li>
					<li><a href="./" className="hover:text-gray-500">Logout</a></li>
				</ul>
			</aside>
			<main className="flex-1 p-8 space-y-4">
				<header className="mb-6">
					<h1 className="text-3xl font-bold text-gray-900 my-2">Lawyer Dashboard</h1>
					<p className="text-gray-600">Welcome, {user.email} !</p>
				</header>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
					<div className="bg-white p-6 rounded-lg shadow-md">
						<h3 className="text-lg font-semibold text-gray-800">Active Cases</h3>
						<p className="text-gray-600">{caseCount} cases</p>
					</div>
					<div className="bg-white p-6 rounded-lg shadow-md">
						<h3 className="text-lg font-semibold text-gray-800">Upcoming Appointments</h3>
						<p className="text-gray-600">{appointmentCount} upcoming</p>
					</div>
				</div>
				<div className="space-y-4 text-slate-900">
					<div className="flex items-center p-2 bg-gray-100 rounded-lg shadow">
						<span className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-2">📅</span>
						<div>
							<h3 className="font-semibold">Client Consultation with David Lee</h3>
							<p className="text-sm text-gray-600">10:00 AM - 11:00 AM</p>
						</div>
					</div>
					<div className="flex items-center p-2 bg-gray-100 rounded-lg shadow">
						<span className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-2">📂</span>
						<div>
							<h3 className="font-semibold">Reviewing Documents for Case: Estate Planning</h3>
							<p className="text-sm text-gray-600">Case ID: 2023-0012</p>
						</div>
					</div>
					<div className="flex items-center p-2 bg-gray-100 rounded-lg shadow">
						<span className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-2">✉️</span>
						<div>
							<h3 className="font-semibold">New Message from Client: Emily Carter</h3>
							<p className="text-sm text-gray-600">Received 2 hours ago</p>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}