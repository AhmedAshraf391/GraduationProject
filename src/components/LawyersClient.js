'use client';

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Mail, Heart } from "lucide-react";
import Link from "next/link";
import { throttle } from "lodash";
import { useRouter } from 'next/navigation';

export default function LawyersClient() {
	console.log("LawyersClient component rendered");
	const router = useRouter();
	const menuRef = useRef(null);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const searchParams = useSearchParams();
	const specializationName = searchParams.get("specialization")?.trim() || "";
	const location = searchParams.get("location")?.trim() || "";
	const specialization = specializationName || "all"; // Default to "all" if empty
	const validLocation = location.toLowerCase() || "all"; // Default to "all" if empty
	const [scrolled, setScrolled] = useState(false);
	const [lawyers, setLawyers] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const handleScroll = throttle(() => {
			setScrolled(window.scrollY > 100);
		}, 200);

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

		setLoading(true);
		setError(null);

		const fetchLawyers = async (retryCount = 2) => {
			for (let attempt = 1; attempt <= retryCount; attempt++) {
				try {
					const sentRequest = { specialization, location: validLocation };
					console.log(`Attempt ${attempt} - Sending POST request to filter-lawyers API with:`, JSON.stringify(sentRequest, null, 2));

					const response = await fetch(
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
						const errorMessage = responseData?.message || response.statusText;
						if (response.status === 400) {
							console.error(`Attempt ${attempt} - 400 Bad Request - sentRequest:`, sentRequest);
							throw new Error(`Failed to fetch lawyers: 400 - Invalid request parameters (${JSON.stringify(sentRequest)})`);
						}
						throw new Error(`Failed to fetch lawyers: ${response.status} ${errorMessage}`);
					}

					const lawyersData = Array.isArray(responseData?.model) ? responseData.model : [];
					console.log(`Attempt ${attempt} - Processed lawyers data (specializations):`, lawyersData.map(l => l.specialization));
					setLawyers(lawyersData);
					setError(null);
					break;
				} catch (err) {
					console.error(`Attempt ${attempt} - Fetch error details:`, err.message);
					if (attempt === retryCount) {
						setError(`Failed to fetch lawyers after ${retryCount} attempts: ${err.message}`);
					} else {
						await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
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
		<div className="w-[100%] h-auto bg-teal-50 py-14 text-stone-800">
			<nav
				className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-teal-500 shadow-lg`}
			>
				<div className="container mx-auto px-6 py-3 flex justify-between items-center">
					<div className="flex ml-16 items-center space-x-2 text-2xl font-medium">
						<span className={`${scrolled ? "text-white" : "text-gray-300"}`}>
							MIZAN
						</span>
					</div>
					<ul className={`hidden md:flex ml-16 space-x-6 ${scrolled ? "text-gray-300" : "text-white"} font-medium`}>
						{[
							{ name: 'Home', path: '/home' },
							{ name: 'Our Services', path: '/our-services' },
							{ name: 'Contact us', path: '/contact-us' },
							{ name: 'About us', path: '/about-us' },
							{ name: 'FAQ', path: '/FAQ' }
						].map((item, idx) => (
							<li key={idx}>
								<Link href={item.path}>{item.name}</Link>
							</li>
						))}
					</ul>
					<div className="flex items-center space-x-4">
						<div className="relative">
							<input
								type="text"
								placeholder="Search"
								className="bg-transparent border border-white placeholder:text-white text-white text-sm px-4 py-2 rounded-full focus:outline-none"
							/>
							<Search className="absolute right-3 top-2 text-white" />
						</div>
						<Mail className="text-white hover:text-gray-400 cursor-pointer" />
						<Heart className="text-white hover:text-gray-400 cursor-pointer" />
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
			<div className="max-w-7xl mx-auto px-4 py-8">
				<h1 className="text-3xl font-bold mb-6 text-center">Available Lawyers</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{lawyers.map((lawyer, index) => (
						<div
							key={index}
							className="rounded-lg p-6 shadow hover:shadow-lg transition"
						>
							<div className="flex flex-col items-center">
								<img
									src={lawyer.profileImage || "/images/10035116.jpg"}
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