"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UpdateProfile() {
    const [location, setLocation] = useState("");
    const [specialty, setSpecialty] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/"); // رجّع المستخدم للصفحة الرئيسية لو مفيش توكن
        }
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        const token = localStorage.getItem("token");

        try {
            const response = await fetch("https://mizan-grad-project.runasp.net/api/lawyers/update", {
                method: "PUT", // أو PATCH حسب الـ API
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    location,
                    specialty,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Profile updated successfully!");
                // ممكن تنقله لصفحة تانية بعد التحديث
                // router.push("/home");
            } else {
                setMessage(data.message || "Failed to update profile.");
            }
        } catch (error) {
            setMessage("An error occurred. Please try again.");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Update Your Profile</h2>

                <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Location</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Specialty</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            value={specialty}
                            onChange={(e) => setSpecialty(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                        {loading ? "Updating..." : "Update Profile"}
                    </button>
                </form>

                {message && (
                    <p className="mt-4 text-center text-sm text-gray-800">{message}</p>
                )}
            </div>
        </div>
    );
}
