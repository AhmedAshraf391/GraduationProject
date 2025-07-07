"use client"
import React, { useState, useEffect } from 'react';

export default function Clients() {
	const clients = [
		{ name: 'Ahmed Mohammed', summary: 'Dispute over property boundaries in downtown area.', contact: 'ahmed.mohammed@email.com' },
		{ name: 'Fatima Ali', summary: 'Breach of contract in a commercial real estate transaction.', contact: 'fatima.ali@email.com' },
		{ name: 'Khalid Abdullah', summary: 'Landlord-tenant dispute regarding lease terms.', contact: 'khalid.abdullah@email.com' },
		{ name: 'Sarah Hassan', summary: 'Title dispute for a residential property.', contact: 'sarah.hassan@email.com' },
		{ name: 'Youssef Ibrahim', summary: 'Construction defect litigation for a new development.', contact: 'youssef.ibrahim@email.com' },
		{ name: 'Laila Omar', summary: 'Dispute over property boundaries in downtown area.', contact: 'laila.omar@email.com' },
		{ name: 'Mohammed Saeed', summary: 'Breach of contract in a commercial real estate transaction.', contact: 'mohammed.saeed@email.com' },
		{ name: 'Noura Khalid', summary: 'Landlord-tenant dispute regarding lease terms.', contact: 'noura.khalid@email.com' },
		{ name: 'Abdulrahman', summary: 'Title dispute for a residential property.', contact: 'abdulrahman@email.com' },
		{ name: 'Huda Abdelaziz', summary: 'Construction defect litigation for a new development.', contact: 'huda.abdelaziz@email.com' },
		{ name: 'Omar Abdullah', summary: 'Dispute over property boundaries in downtown area.', contact: 'omar.abdullah@email.com' },
		{ name: 'Salma Ahmed', summary: 'Breach of contract in a commercial real estate transaction.', contact: 'salma.ahmed@email.com' },
		{ name: 'Yasser Ali', summary: 'Landlord-tenant dispute regarding lease terms.', contact: 'yasser.ali@email.com' },
		{ name: 'Rana Hassan', summary: 'Title dispute for a residential property.', contact: 'rana.hassan@email.com' },
		{ name: 'Khalid Mohammed', summary: 'Construction defect litigation for a new development.', contact: 'khalid.mohammed@email.com' },
		{ name: 'Amira Saeed', summary: 'Dispute over property boundaries in downtown area.', contact: 'amira.saeed@email.com' },
		{ name: 'Abdullah Youssef', summary: 'Breach of contract in a commercial real estate transaction.', contact: 'abdullah.youssef@email.com' },
		{ name: 'Leena Omar', summary: 'Landlord-tenant dispute regarding lease terms.', contact: 'leena.omar@email.com' },
		{ name: 'Tarek Abdelaziz', summary: 'Title dispute for a residential property.', contact: 'tarek.abdelaziz@email.com' },
		{ name: 'Noura Mohammed', summary: 'Construction defect litigation for a new development.', contact: 'noura.mohammed@email.com' },
	];

	const [displayedClients, setDisplayedClients] = useState([]);

	useEffect(() => {
		const randomCount = Math.floor(Math.random() * 20) + 1;
		const shuffled = [...clients].sort(() => 0.5 - Math.random());
		setDisplayedClients(shuffled.slice(0, randomCount));
	}, []);

	return (
		<div className="min-h-screen bg-gray-50 p-6 text-gray-800">
			<nav className="w-[100%] h-16 rounded-lg p-10 flex justify-between items-center mb-6 shadow-lg">
				<div className="flex items-center">
					<span className="text-3xl font-semibold text-gray-800">MIZAN</span>
				</div>
				<div className="flex items-center space-x-8">
					<a href="/lawyer-dashboard" className="text-gray-600 hover:text-gray-800">Dashboard</a>
					<a href="/" className="text-gray-600 hover:text-gray-800">Logout</a>
					<span className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">👤</span>
				</div>
			</nav>

			<div className='w-[90%] m-auto'>
				<h1 className="text-2xl font-bold mb-4">Clients</h1>

				<div className="bg-white p-6 rounded-lg shadow-md">
					<table className="w-full">
						<thead>
							<tr className="border-b">
								<th className="text-left p-2">Client</th>
								<th className="text-left p-2">Case Summary</th>
								<th className="text-left p-2">Contact</th>
							</tr>
						</thead>
						<tbody>
							{displayedClients.map((client, index) => (
								<tr key={index} className="border-b">
									<td className="p-2">{client.name}</td>
									<td className="p-2">{client.summary}</td>
									<td className="p-2">{client.contact}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}