/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";

export default function VerifyOTP() {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleChange = (index, value) => {
        if (isNaN(value)) return;
        let newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const enteredOTP = otp.join("");
        if (enteredOTP.length !== 6) {
            setError("Please enter a valid 6-digit OTP.");
            return;
        }
        setError("");
        setSuccess(true);
        console.log("OTP Verified:", enteredOTP);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 flex items-center space-x-10 max-w-3xl w-full">

                {/* Left Side Illustration */}
                <div className="hidden md:block w-1/2">
                    <img
                        src="/images/check-email.png"
                        alt="OTP Verification"
                        className="w-full"
                    />
                </div>


                {/* Right Side Form */}
                <div className="w-full md:w-1/2">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h2>
                    <p className="text-gray-500 mb-6">
                        We have sent a password reset OTP to your email. Please check your inbox.
                    </p>

                    {/* Success Message */}
                    {success && (
                        <p className="text-green-600 bg-green-100 p-3 rounded-lg mb-4">
                            OTP Verified Successfully!
                        </p>
                    )}

                    {/* OTP Input Fields */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex space-x-3 justify-center">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    className="w-12 h-12 text-center text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                />
                            ))}
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        {/* OTP Expiry Notice */}
                        <p className="text-gray-500 text-center mt-2">The code expires in 5:00 minutes</p>

                        {/* Buttons */}
                        <div className="flex space-x-4">
                            <button
                                type="button"
                                className="w-1/2 border py-2 rounded-lg text-gray-700 hover:bg-gray-200"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="w-1/2 bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900"
                            >
                                Continue
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
