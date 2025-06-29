"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { throttle } from "lodash";
import { Search, Mail, Heart, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const BASE_URL = "https://mizan-grad-project.runasp.net/api";

export default function OurServices() {
  const [scrolled, setScrolled] = useState(false);
  const [filters, setFilters] = useState({
    serviceType: [],
    serviceArea: [],
    location: "",
  });
  const [availableSpecializations, setAvailableSpecializations] = useState([]);
  const [availableLocations, setAvailableLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = throttle(() => {
      setScrolled(window.scrollY > 100);
    }, 200);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch specializations and locations with retry
  useEffect(() => {
    const fetchMetadata = async (retryCount = 2) => {
      for (let attempt = 1; attempt <= retryCount; attempt++) {
        try {
          const [specializationsResponse, locationsResponse] = await Promise.all([
            fetch(`https://mizan-grad-project.runasp.net/api/Specialization/get-specializations`),
            fetch(`https://mizan-grad-project.runasp.net/api/Locations/get-locations`),
          ]);

          console.log(`Attempt ${attempt} - Specializations Response Status:`, specializationsResponse.status);
          console.log(`Attempt ${attempt} - Locations Response Status:`, locationsResponse.status);

          if (!specializationsResponse.ok) {
            throw new Error(`Specializations fetch failed: ${specializationsResponse.status} ${specializationsResponse.statusText}`);
          }
          if (!locationsResponse.ok) {
            throw new Error(`Locations fetch failed: ${locationsResponse.status} ${locationsResponse.statusText}`);
          }

          const specializationsData = await specializationsResponse.json();
          const locationsData = await locationsResponse.json();
          console.log("Fetched Specializations Data:", specializationsData);
          console.log("Fetched Locations Data:", locationsData);

          const specs = specializationsData.specializations || [];
          if (!Array.isArray(specs)) {
            throw new Error("Specializations data is not an array");
          }
          setAvailableSpecializations(specs.map(item => item.normalizedName));

          const locs = locationsData.locations || [];
          if (!Array.isArray(locs)) {
            throw new Error("Locations data is not an array");
          }
          setAvailableLocations(locs.map(item => item.normalizedName));

          setError(null); // Clear error on success
          break; // Exit loop on success
        } catch (err) {
          console.error(`Attempt ${attempt} - Metadata fetch error details:`, err.message);
          if (attempt === retryCount) {
            setError(err.message.includes("fetch failed") ? err.message : `Metadata fetch error after ${retryCount} attempts: ${err.message}`);
          } else {
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt)); // Exponential backoff
          }
        }
      }
      setLoading(false);
    };

    fetchMetadata();
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
    const specialization = specializationName; // Use the normalized name directly
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
        <h1 className="text-2xl text-red-600 mb-4">Error fetching options</h1>
        <p className="text-gray-500">{error}</p>
        <Link
          href="/"
          className="mt-6 inline-block bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-600"
        >
          Go Back
        </Link>
      </div>
    );
  }

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
              {availableSpecializations.map((item) => (
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
              {availableLocations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
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