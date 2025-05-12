"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { throttle } from "lodash";
import { Search, Mail, Heart, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export default function OurServices() {
  const [scrolled, setScrolled] = useState(false);
  const [filters, setFilters] = useState({
    serviceType: [],
    serviceArea: [],
    location: "",
  });
  const router = useRouter();

  const specializationMap = {
    "Real Estate Disputes": "36324834-8436-453a-a814-cef2558248cc",
    "Intellectual Property": "3a44d3ff-12c6-44bf-9241-1fb901da7b55",
    "Employment Law": "4333ac74-6d8d-4963-93ba-a4df668f350a",
    "Family Law": "65f683c3-b334-49b5-b9f9-d3670798a724",
    "Civil Cases": "c13aebf7-9dde-4d49-a01a-0b926777577e",
    "Criminal Cases": "8181668b-4429-4c9b-b3e7-dda87b1530f9",
    "Insurance Claims": "fad2759a-5dcd-486d-8c37-270e7cfd3c0c",
  };

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
      if (type === "serviceType") {
        const isSelected = prev[type].includes(value);
        return { ...prev, [type]: isSelected ? [] : [value] };
      }
      const updatedArray = prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value];
      return { ...prev, [type]: updatedArray };
    });
  };

  const handleInputChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  const handleSubmit = () => {
    const specializationName = filters.serviceArea[0] || "";
    const specialization = specializationMap[specializationName] || "";
    const location = filters.location || "";

    if (!specialization && !location) {
      alert("Please select at least a specialization or a location before searching.");
      return;
    }

    const queryParams = new URLSearchParams({
      specialization,
      location,
    }).toString();

    router.push(`/lawyers?${queryParams}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-Parkinsans">
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-gray-900 shadow-lg" : "bg-transparent"}`}>
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex ml-16 items-center space-x-2 text-2xl font-medium">
            <span className={`${scrolled ? "text-white" : "text-gray-300"}`}>MIZAN</span>
          </div>
          <ul className={`hidden md:flex ml-16 space-x-6 ${scrolled ? "text-gray-300" : "text-white"} font-medium`}>
            {[
              { name: 'Home', path: '/home' },
              { name: 'Our Services', path: '/our-services' },
              { name: 'Contact us', path: '/contact-us' },
              { name: 'About us', path: '/about-us' },
              { name: 'FAQ', path: '/FAQ' }
            ].map((item, idx) => (
              <li key={idx}><Link href={item.path}>{item.name}</Link></li>
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
            <h3 className="font-semibold mb-3">Service Type (Select one)</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {[
                'Legal Consultation',
                'Legal Document Preparation',
                'Legal Representation',
                'Online Legal Consultation',
                'Corporate Legal Services'
              ].map((item) => (
                <label key={item} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.serviceType.includes(item)}
                    onChange={() => handleCheckboxChange("serviceType", item)}
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Specialization (Optional, for future use)</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {Object.keys(specializationMap).map((item) => (
                <label key={item} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.serviceArea.includes(item)}
                    onChange={() => handleCheckboxChange("serviceArea", item)}
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Location</h3>
            <select
              className="border p-2 rounded w-full"
              value={filters.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
            >
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
              {[
                { name: 'Home', path: '/home' },
                { name: 'Our Services', path: '/our-services' },
                { name: 'Contact us', path: '/contact-us' },
                { name: 'About us', path: '/about-us' },
                { name: 'FAQ', path: '/FAQ' }
              ].map((item, idx) => (
                <li key={idx}><Link href={item.path}>{item.name}</Link></li>
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
