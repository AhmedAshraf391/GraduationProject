'use client';

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Mail, Heart, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";
import { throttle } from "lodash";
import { useRouter } from 'next/navigation';


export default function LawyersClient() {

	console.log("LawyersClient component rendered");
	const router = useRouter();
	const menuRef = useRef(null);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const searchParams = useSearchParams();
	const specializationName = searchParams.get("specialization") || "";
	const location = searchParams.get("location") || "";
	const specialization = specializationName; // Use the name directly
	const validLocation = location.toLowerCase(); // Removed static array, assuming validation from OurServices
	const [scrolled, setScrolled] = useState(false);
	const [lawyers, setLawyers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const handleScroll = throttle(() => {
			setScrolled(window.scrollY > 100);
		}, 200); // Fires at most once every 200ms

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				setIsMenuOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

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
			<nav
				className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-teal-500 shadow-lg""
					}`}
			>
				{/* Navbar Container */}
				<div className="container mx-auto px-6 py-3 flex justify-between items-center">
					{/* Logo */}
					<div className="flex ml-16 items-center space-x-2 text-2xl font-medium">
						<span className={`${scrolled ? "text-white" : "text-gray-300"}`}>
							MIZAN
						</span>
					</div>

					{/* Navigation Links */}
					<ul
						className={`hidden md:flex ml-16 space-x-6 ${scrolled ? "text-gray-300" : "text-white"
							} font-medium`}
					>
						{["Home", "Our Services", "Contact us", "About us", "FAQ"].map(
							(item, index) => (
								<li key={index}>
									<Link href={`/${item.toLowerCase().replace(/\s/g, "-")}`}>
										<span className="relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full">
											{item}
										</span>
									</Link>
								</li>
							)
						)}
					</ul>

					{/* Right Section: Search & Icons */}
					<div className="flex items-center space-x-4">
						{/* Search Bar */}
						<div className="relative">
							<input
								type="text"
								placeholder="Search"
								className="bg-white border border-white text-gray-900 text-sm px-4 py-2 rounded-full focus:outline-none  "
							/>
							<Search className="absolute right-3 top-2 text-gray-400" />
						</div>

						{/* Icons */}
						<Mail className="text-white hover:text-gray-400 transition-colors cursor-pointer" />
						<Heart className="text-white hover:text-gray-400 cursor-pointer" />

						{/* Profile Image */}
						<div className="relative" ref={menuRef}>
							<img
								src="/images/user-profile.jpg"
								alt="User Profile"
								className="w-10 h-10 rounded-full border-2 border-gray-600 cursor-pointer"
								onClick={() => setIsMenuOpen(!isMenuOpen)}
							/>
							{isMenuOpen && (
								<div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg z-50 animate-fadeInDown">
									<div className="px-4 py-2 border-b font-semibold">Ahmed</div>
									<button
										onClick={() => {
											setIsMenuOpen(false);
											router.push('/');
										}}
										className="w-full text-left px-4 py-2 hover:bg-gray-100"
									>
										Logout
									</button>
								</div>
							)}
						</div>

					</div>
				</div>
			</nav>
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