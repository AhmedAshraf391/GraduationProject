"use client";

import { useState } from "react";

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
			<nav className="flex justify-between items-center p-5 bg-gray-800 text-white">
				<div className="text-2xl font-bold">MIZAN</div>
				<ul className="flex space-x-6">
					<li className="hover:text-teal-400 cursor-pointer">Home</li>
					<li className="hover:text-teal-400 cursor-pointer">Our Services</li>
					<li className="hover:text-teal-400 cursor-pointer">Contact Us</li>
					<li className="hover:text-teal-400 cursor-pointer">About Us</li>
					<li className="hover:text-teal-400 cursor-pointer">FAQ</li>
				</ul>
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
					<div>
						<h3 className="font-bold text-lg">MIZAN</h3>
						<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
					</div>
					<div>
						<h3 className="font-bold text-lg">Quick Links</h3>
						<ul>
							<li>Home</li>
							<li>Our Services</li>
							<li>Contact Us</li>
							<li>About Us</li>
							<li>FAQ</li>
						</ul>
					</div>
					<div>
						<h3 className="font-bold text-lg">Contact Info</h3>
						<p>Lorem Ipsum, Cairo, Egypt</p>
						<p>01148113314</p>
						<div className="flex space-x-4 mt-4">
							<span>FB</span>
							<span>IG</span>
							<span>TW</span>
							<span>LN</span>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}
