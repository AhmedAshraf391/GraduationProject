// "use client";
// import { useState } from "react";
// import Image from "next/image";

// export default function ChatPage() {
// 	const [messages, setMessages] = useState([
// 		{ id: 1, sender: "mo reda", text: "This is a placeholder that can be replaced with any other...", time: "05:38", type: "received" },
// 		{ id: 2, sender: "me", text: "You can replace this text with any other content that suits your needs.", time: "8:00 PM", type: "sent" },
// 		{ id: 3, sender: "mo reda", text: "This text is a placeholder that can be replaced with any other content...", time: "8:00 PM", type: "received" },
// 	]);

// 	const [newMessage, setNewMessage] = useState("");

// 	const sendMessage = () => {
// 		if (newMessage.trim() === "") return; // منع إرسال رسائل فاضية
// 		const newMsg = {
// 			id: messages.length + 1, // إضافة معرف فريد
// 			sender: "me",
// 			text: newMessage,
// 			time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), // وقت ديناميكي
// 			type: "sent",
// 		};
// 		setMessages([...messages, newMsg]);
// 		setNewMessage("");
// 	};

// 	return (
// 		<div className="min-h-screen bg-gray-100 flex">
// 			{/* Messages Sidebar */}
// 			<div className="w-1/3 bg-white border-r shadow-md p-4">
// 				<h2 className="text-xl font-bold mb-4">Messages</h2>
// 				<input
// 					type="text"
// 					placeholder="Search"
// 					className="w-full p-2 border rounded-lg mb-4"
// 				/>
// 				<div className="space-y-2">
// 					{[...Array(8)].map((_, index) => (
// 						<div
// 							key={index}
// 							className="flex items-center space-x-3 p-3 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
// 						>
// 							<Image
// 								src="/images/user.jpg"
// 								width={40}
// 								height={40}
// 								className="rounded-full"
// 								alt="User Profile"
// 								onError={() => console.log("Error loading image")}
// 							/>
// 							<div>
// 								<p className="font-semibold">mo reda</p>
// 								<p className="text-sm text-gray-500">This is a placeholder message...</p>
// 							</div>
// 							<span className="text-xs text-gray-500">05:38</span>
// 						</div>
// 					))}
// 				</div>
// 			</div>

// 			{/* Chat Window */}
// 			<div className="w-2/3 bg-white shadow-md flex flex-col">
// 				<div className="flex justify-between items-center p-4 border-b">
// 					<h3 className="text-lg font-bold">mo reda</h3>
// 					<div className="flex space-x-3 text-gray-600">
// 					</div>
// 				</div>

// 				<div className="flex-1 overflow-y-auto p-4 space-y-4">
// 					{messages.map((msg) => (
// 						<div key={msg.id} className={`flex ${msg.type === "sent" ? "justify-end" : "justify-start"}`}>
// 							<div
// 								className={`p-3 rounded-lg max-w-xs ${msg.type === "sent" ? "bg-blue-900 text-white" : "bg-gray-100 text-gray-900"
// 									}`}
// 							>
// 								<p>{msg.text}</p>
// 								<span className="text-xs text-gray-400 block mt-1">{msg.time}</span>
// 							</div>
// 						</div>
// 					))}
// 				</div>

// 				<div className="p-4 border-t flex items-center space-x-3">

// 					<input
// 						type="text"
// 						className="flex-1 p-2 border rounded-lg"
// 						placeholder="Type a message"
// 						value={newMessage}
// 						onChange={(e) => setNewMessage(e.target.value)}
// 						onKeyDown={(e) => e.key === "Enter" && sendMessage()}
// 					/>
// 					<button onClick={sendMessage} className="p-2 bg-blue-500 text-white rounded-lg">

// 					</button>
// 				</div>
// 			</div>
// 		</div >
// 	);
// }


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
