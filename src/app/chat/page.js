"use client";
import { Search, Mail, Heart, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { useState } from "react";
import Link from 'next/link';

export default function ChatPage() {
	const [messages, setMessages] = useState([
		{ sender: "You", text: "You can replace this text with any other content that suits your needs." },
		{ sender: "John", text: "This text is a placeholder that can be replaced with any other content." }
	]);
	const [newMessage, setNewMessage] = useState("");

	const sendMessage = (e) => {
		e.preventDefault();
		if (newMessage.trim() !== "") {
			setMessages([...messages, { sender: "You", text: newMessage }]);
			setNewMessage("");
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			{/* Navbar */}
			<nav className="w-full bg-gray-800 text-white shadow-md z-50">

				{/* Navbar Container */}
				<div className="container mx-auto px-6 py-3 mb-16 flex justify-between items-center">

					{/* Logo Section */}
					<div className="flex items-center space-x-2 text-2xl font-medium ml-16">
						<span>MIZAN</span>
					</div>

					{/* Navigation Links */}
					<ul className="hidden md:flex ml-16 space-x-6 text-white font-medium">
						<li>
							<Link href="/home">
								<span className="relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full">
									Home
								</span>
							</Link>
						</li>
						<li>
							<Link href="/our-services">
								<span className="relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full">
									Our Services
								</span>
							</Link>
						</li>
						<li>
							<Link href="/contact-us">
								<span className="relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full">
									Contact us
								</span>
							</Link>
						</li>
						<li>
							<Link href="/about-us">
								<span className="relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full">
									About us
								</span>
							</Link>
						</li>
						<li>
							<Link href="/faq">
								<span className="relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full">
									FAQ
								</span>
							</Link>
						</li>
					</ul>

					{/* Right Section: Search Bar & Icons */}
					<div className="flex items-center space-x-4">
						{/* Search Bar */}
						<div className="relative">
							<input
								type="text"
								placeholder="Search"
								className="bg-transparent border border-white text-white text-sm px-4 py-2 rounded-full focus:outline-none  "
							/>
							<Search className="absolute right-3 top-2" />
						</div>

						{/* Icons */}
						<Mail className="hover:text-gray-400 cursor-pointer" />
						<Heart className="hover:text-gray-400 cursor-pointer" />

						{/* Profile Image */}
						<img
							src="images/user-profile.jpg"
							alt="User Profile"
							className="w-10 h-10 rounded-full border-2 border-gray-600 cursor-pointer"
						/>
					</div>
				</div>
			</nav>

			{/* Chat Section */}
			<section className="py-20 px-5 bg-white text-gray-900 max-w-4xl mx-auto">
				<h2 className="text-center text-3xl font-bold mb-6">Live Chat</h2>
				<div className="border rounded-lg shadow-lg p-5 bg-gray-50">
					<div className="h-96 overflow-y-auto p-4 border-b">
						{messages.map((msg, index) => (
							<div key={index} className={`mb-4 p-3 ${msg.sender === "You" ? "bg-teal-500 text-white self-end" : "bg-gray-200"} rounded-lg w-fit`}>
								<p>{msg.text}</p>
							</div>
						))}
					</div>
					<form className="mt-4 flex" onSubmit={sendMessage}>
						<input
							type="text"
							placeholder="Type a message..."
							className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none"
							value={newMessage}
							onChange={(e) => setNewMessage(e.target.value)}
						/>
						<button type="submit" className="px-4 py-2 bg-teal-500 text-white rounded-r-lg hover:bg-teal-600">
							Send
						</button>
					</form>
				</div>
			</section>

			{/* Footer */}
			<footer className="py-10 px-5 bg-gray-800 text-white">
				<div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
					<div className="space-y-1">
						<h3 className="font-bold text-3xl">MIZAN</h3>
						<p className="text-2xl">
							Your Trusted Legal Patener
						</p>
					</div>
					<div>
						<h3 className="font-bold text-lg">Quick Links</h3>
						<ul className="space-y-2">
							<li><Link href="/home" className="relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full">Home</Link></li>
							<li><Link href="/our-services" className="relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full">Our Services</Link></li>
							<li><Link href="/contact-us" className="relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full">Contact Us</Link></li>
							<li><Link href="/about-us" className="relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full">About Us</Link></li>
							<li><Link href="/faq" className="relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full">FAQ</Link></li>
						</ul>
					</div>
					<div className="space-y-2">
						<h3 className="font-bold text-lg">Contact Info</h3>
						<p>Maadi, Cairo, Egypt</p>
						<p>01148113314</p>
						<div className="flex space-x-4 mt-4">
							<ul className="flex items-center space-x-3">
								<li className="hover:text-gray-400 cursor-pointer"><Facebook /></li>
								<li className="hover:text-gray-400 cursor-pointer"><Instagram /></li>
								<li className="hover:text-gray-400 cursor-pointer"><Twitter /></li>
								<li className="hover:text-gray-400 cursor-pointer"><Linkedin /></li>
							</ul>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}
