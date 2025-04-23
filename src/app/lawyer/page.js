"use client";
import { useState, useEffect } from "react";

export default function LawyersList() {
  const [lawyers, setLawyers] = useState([]);
  const [filteredLawyers, setFilteredLawyers] = useState([]);
  const [filters, setFilters] = useState({
    serviceType: [],
    serviceArea: [],
    languages: [],
    experience: "",
  });

  const serviceTypes = [
    "Legal Consultation",
    "Legal Document Preparation",
    "Legal Representation in Court",
    "Online Legal Consultation",
    "Corporate Legal Services",
  ];

  const serviceAreas = [
    "Civil Cases",
    "Criminal Cases",
    "Insurance Claims",
    "Family Law",
    "Employment Law",
    "Real Estate Disputes",
    "Intellectual Property",
  ];

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const response = await fetch("https://mizan-grad-project.runasp.net/api/Lawyer/lawyers");
        if (!response.ok) throw new Error("Failed to fetch lawyers");
        const data = await response.json();

        const mappedData = data.map((lawyer) => ({
          name: lawyer.name,
          specialization: lawyer.specialization,
          experience: "More than 10 years",
          languages: ["Arabic", "English"],
          location: lawyer.lawyerAddress,
          service: lawyer.specialization,
          area: lawyer.specialization,
        }));

        setLawyers(mappedData);
        setFilteredLawyers(mappedData);
      } catch (error) {
        console.error("Error fetching lawyers:", error);
      }
    };

    fetchLawyers();
  }, []);

  const handleFilterChange = (type, value) => {
    setFilters((prevFilters) => {
      let updatedFilters = { ...prevFilters };
      if (Array.isArray(prevFilters[type])) {
        updatedFilters[type] = prevFilters[type].includes(value)
          ? prevFilters[type].filter((item) => item !== value)
          : [...prevFilters[type], value];
      } else {
        updatedFilters[type] = value;
      }
      return updatedFilters;
    });
  };

  useEffect(() => {
    let filtered = lawyers.filter((lawyer) => {
      return (
        (filters.serviceType.length === 0 || filters.serviceType.includes(lawyer.service)) &&
        (filters.serviceArea.length === 0 || filters.serviceArea.includes(lawyer.area)) &&
        (filters.languages.length === 0 || filters.languages.some((lang) => lawyer.languages.includes(lang))) &&
        (filters.experience === "" || lawyer.experience === filters.experience)
      );
    });

    setFilteredLawyers(filtered);
  }, [filters, lawyers]);

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold text-center mb-5">Find a Lawyer</h1>

      <div className="mb-5 flex flex-wrap gap-4">
        <select className="border p-2 rounded" onChange={(e) => handleFilterChange("serviceType", e.target.value)}>
          <option value="">Select Service Type</option>
          {serviceTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <select className="border p-2 rounded" onChange={(e) => handleFilterChange("serviceArea", e.target.value)}>
          <option value="">Select Service Area</option>
          {serviceAreas.map((area) => (
            <option key={area} value={area}>{area}</option>
          ))}
        </select>

        <select className="border p-2 rounded" onChange={(e) => handleFilterChange("experience", e.target.value)}>
          <option value="">Select Experience</option>
          <option value="Less than 5 years">Less than 5 years</option>
          <option value="5 to 10 years">5 to 10 years</option>
          <option value="More than 10 years">More than 10 years</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredLawyers.length > 0 ? (
          filteredLawyers.map((lawyer, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-lg bg-white">
              <h2 className="text-xl font-semibold">{lawyer.name}</h2>
              <p className="text-gray-600">{lawyer.specialization}</p>
              <p className="text-gray-500">{lawyer.experience}</p>
              <p className="text-gray-700">Languages: {lawyer.languages.join(", ")}</p>
              <p className="text-gray-700">Location: {lawyer.location}</p>
              <button className="mt-3 px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600">
                View Profile
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-3">No results found, try changing filters.</p>
        )}
      </div>
    </div>
  );
}
