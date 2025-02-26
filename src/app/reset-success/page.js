"use client";
import { useRouter } from "next/navigation";

export default function ResetSuccess() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-md w-full">
                {/* ✅ Success Icon */}
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 flex items-center justify-center bg-green-100 rounded-full">
                        <svg
                            className="w-10 h-10 text-green-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                </div>

                {/* 🎉 Success Message */}
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Your password has been successfully reset!
                </h2>
                <p className="text-gray-500 mb-6">
                    You can now login with your new password.
                </p>

                {/* 🔑 Login Button */}
                <button
                    onClick={() => router.push("/login")}
                    className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
                >
                    Login ?
                </button>
            </div>
        </div>
    );
}
