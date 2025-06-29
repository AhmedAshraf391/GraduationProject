'use client';

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LawyersClient() {
	console.log("LawyersClient component rendered");

	const searchParams = useSearchParams();
	const specializationName = searchParams.get("specialization") || "";
	const location = searchParams.get("location") || "";
	const specialization = specializationName; // Use the name directly
	const validLocation = location.toLowerCase(); // Removed static array, assuming validation from OurServices

	const [lawyers, setLawyers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		console.log("useEffect triggered");
		console.log("Input Query Params:", { specializationName, location });
		console.log("Mapped Values:", { specialization, validLocation });

		const fetchLawyers = async (retryCount = 2) => {
			for (let attempt = 1; attempt <= retryCount; attempt++) {
				try {
					let response;
					const sentRequest = {
						specialization: specialization || undefined,
						location: validLocation || undefined
					};
					console.log(`Attempt ${attempt} - sentRequest to backend:`, JSON.stringify(sentRequest, null, 2));

					if (specialization || validLocation) {
						console.log(`Attempt ${attempt} - Sending POST request to filter-lawyers API`);
						response = await fetch(
							"https://mizan-grad-project.runasp.net/api/Filter/filter-lawyers",
							{
								method: "POST",
								headers: { "Content-Type": "application/json" },
								body: JSON.stringify(sentRequest),
							}
						);

						console.log(`Attempt ${attempt} - Response status:`, response.status, response.statusText);
						let responseData;
						try {
							responseData = await response.json();
							console.log(`Attempt ${attempt} - Response data:`, JSON.stringify(responseData, null, 2));
						} catch (jsonError) {
							console.error(`Attempt ${attempt} - Failed to parse response JSON:`, jsonError.message);
							throw new Error("Invalid response format from server");
						}

						if (!response.ok) {
							if (response.status === 400) {
								console.error(`Attempt ${attempt} - 400 Bad Request - sentRequest might be invalid:`, sentRequest);
								throw new Error(`Failed to fetch lawyers: 400 - Check specialization (${specialization}) or location (${validLocation}) format`);
							}
							throw new Error(`Failed to fetch lawyers: ${response.status} ${response.statusText}`);
						}

						const lawyersData = Array.isArray(responseData?.model) ? responseData.model : [];
						console.log(`Attempt ${attempt} - Processed lawyers data (specializations):`, lawyersData.map(l => l.specialization));
						setLawyers(lawyersData);
					} else {
						console.log(`Attempt ${attempt} - Sending GET request to lawyers API`);
						response = await fetch(
							"https://mizan-grad-project.runasp.net/api/Lawyer/lawyers"
						);

						console.log(`Attempt ${attempt} - Response status:`, response.status, response.statusText);
						let responseData;
						try {
							responseData = await response.json();
							console.log(`Attempt ${attempt} - Response data:`, JSON.stringify(responseData, null, 2));
						} catch (jsonError) {
							console.error(`Attempt ${attempt} - Failed to parse response JSON:`, jsonError.message);
							throw new Error("Invalid response format from server");
						}

						if (!response.ok) {
							throw new Error(`Failed to fetch lawyers: ${response.status} ${response.statusText}`);
						}

						const lawyersData = Array.isArray(responseData?.model) ? responseData.model : [];
						console.log(`Attempt ${attempt} - Processed lawyers data (specializations):`, lawyersData.map(l => l.specialization));
						setLawyers(lawyersData);
					}

					setError(null); // Clear error on success
					break; // Exit loop on success
				} catch (err) {
					console.error(`Attempt ${attempt} - Fetch error details:`, err.message);
					if (attempt === retryCount) {
						setError(err.message.includes("fetch failed") ? err.message : `Fetch error after ${retryCount} attempts: ${err.message}`);
					} else {
						await new Promise(resolve => setTimeout(resolve, 1000 * attempt)); // Exponential backoff
					}
				}
			}
			console.log("Fetch completed, loading set to false");
			setLoading(false);
		};

		fetchLawyers();
	}, [specialization, validLocation]);

	if (loading) {
		console.log("Rendering loading state");
		return (
			<div className="flex justify-center items-center min-h-screen">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
			</div>
		);
	}

	if (error) {
		console.log("Rendering error state:", error);
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
		console.log("Rendering no lawyers found state");
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

	console.log("Rendering lawyers list (specializations):", lawyers.map(l => l.specialization));
	return (
		<div className="w-[100%] h-[100vh] bg-teal-50 py-14 text-stone-800">
			<div className="max-w-7xl mx-auto px-4 py-8 ">
				<h1 className="text-3xl font-bold mb-6 text-center">Available Lawyers</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{lawyers.map((lawyer, index) => (
						<div
							key={index}
							className="rounded-lg p-6 shadow hover:shadow-lg transition"
						>
							<div className="flex flex-col items-center">
								<img
									src={lawyer.profileImage || "/images/default-lawyer.png"}
									alt={lawyer.name}
									className="w-24 h-24 rounded-full object-cover border-2 border-teal-500 mb-4"
									onError={(e) => (e.target.src = "/images/default-lawyer.png")}
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
		</div>
	);
}