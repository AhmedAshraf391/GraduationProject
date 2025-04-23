// src/app/our-services/page.js

"use client";

import { useState, useEffect } from "react";
import Link from 'next/link';
import { Search, Mail, Heart, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { throttle } from "lodash";

export default function OurServices() {
  const [scrolled, setScrolled] = useState(false);
  const [filters, setFilters] = useState({
    serviceType: [],
    serviceArea: [],
    location: "",
  });
  const [lawyers, setLawyers] = useState([]);

  const egyptGovernorates = [
    "Cairo", "Giza", "Alexandria", "Aswan", "Asyut", "Beheira", "Beni Suef", "Dakahlia",
    "Damietta", "Faiyum", "Gharbia", "Ismailia", "Kafr El Sheikh", "Luxor", "Matruh",
    "Minya", "Monufia", "New Valley", "North Sinai", "Port Said", "Qalyubia", "Qena",
    "Red Sea", "Sharqia", "Sohag", "South Sinai", "Suez"
  ];

  useEffect(() => {
    const handleScroll = throttle(() => {
      setScrolled(window.scrollY > 100);
    }, 200);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCheckboxChange = (type, value) => {
    setFilters((prev) => {
      const updatedArray = prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value];
      return { ...prev, [type]: updatedArray };
    });
  };

  const handleInputChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  const handleSubmit = async () => {
    try {
      const specialization = filters.serviceType[0] || "";
      const location = filters.location;

      const response = await fetch("https://mizan-grad-project.runasp.net/api/Filter/filter-lawyers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ specialization, location }),
      });

      const result = await response.json();

      if (Array.isArray(result) && result.length > 0) {
        setLawyers(result);
      } else {
        setLawyers([]);
      }
    } catch (error) {
      console.error("Error filtering lawyers:", error);
      setLawyers([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-Parkinsans">
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-gray-900 shadow-lg" : "bg-transparent"}`}>
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex ml-16 items-center space-x-2 text-2xl font-medium">
            <span className={`${scrolled ? "text-white" : "text-gray-300"}`}>MIZAN</span>
          </div>
          <ul className={`hidden md:flex ml-16 space-x-6 ${scrolled ? "text-gray-300" : "text-white"} font-medium`}>
            {['Home', 'Our Services', 'Contact us', 'About us', 'FAQ'].map((item, idx) => (
              <li key={idx}><Link href={`/${item.toLowerCase().replace(/ /g, '-')}`}>{item}</Link></li>
            ))}
          </ul>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input type="text" placeholder="Search" className="bg-transparent border border-white text-white text-sm px-4 py-2 rounded-full focus:outline-none" />
              <Search className="absolute right-3 top-2 text-gray-400" />
            </div>
            <Mail className="hover:text-gray-400 text-white cursor-pointer" />
            <Heart className="hover:text-gray-400 text-white cursor-pointer" />
            <img src="/images/user-profile.jpg" alt="User Profile" className="w-10 h-10 rounded-full border-2 border-gray-600 cursor-pointer" />
          </div>
        </div>
      </nav>

      <section className="relative text-center py-20 px-5 bg-cover bg-center w-full h-[60vh] text-white" style={{ backgroundImage: "url('/images/blur-effect-3.png')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 mt-12 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold my-4">Our Services</h1>
          <p className="max-w-2xl mx-auto">
            We offer a comprehensive range of legal services tailored to meet your needs, ensuring professionalism, accuracy, and dedication.
          </p>
        </div>
      </section>

      <section className="py-10 px-5 max-w-5xl mx-auto bg-white rounded-lg shadow-md mt-12 mb-12">
        <h2 className="text-center text-2xl font-bold mb-5">Choose your legal service easily</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-3">Service Type</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {['Legal Consultation', 'Legal Document Preparation', 'Legal Representation', 'Online Legal Consultation', 'Corporate Legal Services'].map((item) => (
                <label key={item}><input type="checkbox" onChange={() => handleCheckboxChange("serviceType", item)} /> {item}</label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Service Area</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {['Civil Cases', 'Criminal Cases', 'Insurance Claims', 'Family Law', 'Employment Law', 'Intellectual Property'].map((item) => (
                <label key={item}><input type="checkbox" onChange={() => handleCheckboxChange("serviceArea", item)} /> {item}</label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Location</h3>
            <select className="border p-2 rounded w-full" onChange={(e) => handleInputChange("location", e.target.value)}>
              <option value="">Select Location</option>
              {egyptGovernorates.map((gov) => (
                <option key={gov} value={gov}>{gov}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-center mt-6">
            <button onClick={handleSubmit} className="bg-teal-500 px-6 py-2 text-white rounded-lg hover:bg-teal-600">
              Find Your Service
            </button>
          </div>
        </div>
      </section>

     

      <footer className="py-10 px-5 bg-gray-800 text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="font-bold text-3xl">MIZAN</h3>
            <p>Your Trusted Legal Partner</p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Our Services', 'Contact us', 'About us', 'FAQ'].map((item, idx) => (
                <li key={idx}><Link href={`/${item.toLowerCase().replace(/ /g, '-')}`}>{item}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Contact Info</h3>
            <p>Maadi, Cairo, Egypt</p>
            <p>01148113314</p>
            <div className="flex space-x-4 mt-4">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, idx) => (
                <Icon key={idx} className="hover:text-gray-400 cursor-pointer" />
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
