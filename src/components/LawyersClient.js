// components/LawyersClient.js
'use client';

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const specializationMap = {
	"Real Estate Disputes": "36324834-8436-453a-a814-cef2558248cc",
	"Intellectual Property": "3a44d3ff-12c6-44bf-9241-1fb901da7b55",
	"Employment Law": "433a3c74-6d8d-4963-93ba-adf668f350a",
	"Family Law": "65f683c3-b334-49b5-b9f9-d3670798a724",
	"Civil Cases": "8181668b-4429-4c9b-b3e7-dda87b1530f9",
	"Criminal Cases": "c13aefb7-9dde-4d49-a01a-0b926777577e",
	"Insurance Claims": "fad2759a-5dcd-486d-8c37-270e7cfd3c0c",
};

export default function LawyersClient() {
	const searchParams = useSearchParams();
	const specializationName = searchParams.get("specialization") || "";
	const location = searchParams.get("location") || "";
	const specialization = specializationMap[specializationName] || "";

	const [lawyers, setLawyers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchLawyers = async () => {
			setLoading(true);
			setError(null);

			try {
				let response;

				if (specialization || location) {
					response = await fetch(
						"https://mizan-grad-project.runasp.net/api/Filter/filter-lawyers",
						{
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({ specialization, location }),
						}
					);
				} else {
					response = await fetch(
						"https://mizan-grad-project.runasp.net/api/Lawyer/lawyers"
					);
				}

				if (!response.ok) {
					throw new Error("Failed to fetch lawyers.");
				}

				const data = await response.json();
				setLawyers(Array.isArray(data.model) ? data.model : []);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchLawyers();
	}, [specialization, location]);

	if (loading) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="text-center py-20">
				<h1 className="text-2xl text-red-600 mb-4">Error fetching lawyers</h1>
				<p className="text-gray-500">{error}</p>
				<Link
					href="/our-services"
					className="mt-6 inline-block bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-600"
				>
					Try Again
				</Link>
			</div>
		);
	}

	if (!lawyers.length) {
		return (
			<div className="text-center py-20">
				<h1 className="text-2xl text-gray-700 mb-4">
					No lawyers found matching your search.
				</h1>
				<Link
					href="/our-services"
					className="mt-6 inline-block bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-600"
				>
					Modify Search
				</Link>
			</div>
		);
	}

	return (
		<div className="max-w-7xl mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-6 text-center">Available Lawyers</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{lawyers.map((lawyer, index) => (
					<div
						key={index}
						className="border rounded-lg p-6 shadow hover:shadow-lg transition"
					>
						<div className="flex flex-col items-center">
							<img
								src={lawyer.profileImage || "/images/default-lawyer.png"}
								alt={lawyer.name}
								className="w-24 h-24 rounded-full object-cover border-2 border-teal-500 mb-4"
								onError={(e) =>
									(e.target.src = "/images/default-lawyer.png")
								}
							/>
							<h2 className="text-xl font-semibold">{lawyer.name}</h2>
							<p className="text-teal-600">
								{lawyer.specialization || "General Lawyer"}
							</p>
							<p className="text-gray-600">
								{lawyer.lawyerAddress || lawyer.location || "Location Unknown"}
							</p>
							<p className="text-gray-500 mt-2">
								Experience: {lawyer.experience || "N/A"}
							</p>
							<button className="mt-4 bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition">
								Contact
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
