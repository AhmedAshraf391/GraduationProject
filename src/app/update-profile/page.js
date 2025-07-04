"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { createApiClient, endpoints } from "@/config/api";

export default function UpdateProfile() {
    const { user, isAuthenticated, setUser } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        location: "",
        specialization: "",
    });
    const [locations, setLocations] = useState([]);
    const [specializations, setSpecializations] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login");
        } else if (user) {
            setFormData({
                email: user.email || "",
                location: user.location || "",
                specialization: user.specialization || "",
            });
        }

        const fetchData = async () => {
            try {
                const apiClient = createApiClient();
                const [locationsResponse, specializationsResponse] = await Promise.all([
                    apiClient.get(endpoints.locations.getLocations),
                    apiClient.get(endpoints.specializations.getSpecializations),
                ]);
                console.log("Locations response:", locationsResponse);
                console.log("Specializations response:", specializationsResponse);
                setLocations(Array.isArray(locationsResponse) ? locationsResponse : []);
                setSpecializations(Array.isArray(specializationsResponse) ? specializationsResponse : []);
            } catch (err) {
                console.error("Error fetching data:", err.message, "Response:", err.response);
                setError("Failed to load locations or specializations");
            }
        };
        fetchData();
    }, [user, isAuthenticated, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const token = localStorage.getItem("token");
            const apiClient = createApiClient(token);
            console.log("Sending update profile request with payload:", {
                id: user.userId,
                email: formData.email,
                location: formData.location || null,
                specialization: formData.specialization || null,
            });
            const response = await apiClient.put(endpoints.lawyers.update, {
                id: user.userId,
                email: formData.email,
                location: formData.location || null,
                specialization: formData.specialization || null,
            });
            console.log("Update profile response:", response);
            setUser((prevUser) => ({
                ...prevUser,
                email: formData.email,
                location: formData.location || "",
                specialization: formData.specialization || "",
            }));
            router.push("/lawyer-dashboard");
        } catch (err) {
            console.error("Error updating profile:", err.message, "Status:", err.statusCode, "Response:", err.response);
            setError(err.message || "Failed to update profile. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-200">
            <div className="max-w-md w-full space-y-6 p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 text-center">Update Profile</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border text-gray-900 border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Location</label>
                        <select
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full p-2 border text-gray-900 border-gray-300 rounded-lg"
                        >
                            <option value="">Select a location</option>
                            {locations.map((loc) => (
                                <option key={loc} value={loc}>
                                    {loc}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700">Specialization</label>
                        <select
                            name="specialization"
                            value={formData.specialization}
                            onChange={handleChange}
                            className="w-full p-2 border text-gray-900 border-gray-300 rounded-lg"
                        >
                            <option value="">Select a specialization</option>
                            {specializations.map((spec) => (
                                <option key={spec} value={spec}>
                                    {spec}
                                </option>
                            ))}
                        </select>
                    </div>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 disabled:bg-gray-500"
                    >
                        {loading ? "Updating..." : "Update Profile"}
                    </button>
                </form>
            </div>
        </div>
    );
}