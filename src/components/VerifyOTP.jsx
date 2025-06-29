"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { handleApiError } from '@/utils/errorHandling';
import { useAuth } from '@/contexts/AuthContext';
import { otpRateLimiter } from '@/utils/rateLimiter';

const MAX_ATTEMPTS = 3;
const OTP_EXPIRY_MINUTES = 5;

export default function VerifyOTP() {
	const [otp, setOtp] = useState(["", "", "", "", "", ""]);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);
	const [attempts, setAttempts] = useState(0);
	const [timeLeft, setTimeLeft] = useState(OTP_EXPIRY_MINUTES * 60);
	const [isExpired, setIsExpired] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const searchParams = useSearchParams();
	const userEmail = searchParams.get("email");
	const router = useRouter();
	const { verifyEmail } = useAuth();

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft((prevTime) => {
				if (prevTime <= 1) {
					clearInterval(timer);
					setIsExpired(true);
					return 0;
				}
				return prevTime - 1;
			});
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	const formatTime = (seconds) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
	};

	const handleChange = (index, value) => {
		if (isNaN(value)) return;

		const newOtp = [...otp];
		newOtp[index] = value;
		setOtp(newOtp);

		// Auto focus next input
		if (value && index < otp.length - 1) {
			const nextInput = document.getElementById(`otp-${index + 1}`);
			if (nextInput) nextInput.focus();
		}
	};

	const validateOTP = (enteredOTP) => {
		if (enteredOTP.length !== 6) {
			return "Please enter a valid 6-digit OTP.";
		}
		if (!/^\d{6}$/.test(enteredOTP)) {
			return "OTP must contain only numbers.";
		}
		return "";
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (isExpired) {
			setError("OTP has expired. Please request a new one.");
			return;
		}

		if (attempts >= MAX_ATTEMPTS) {
			setError("Maximum attempts reached. Please request a new OTP.");
			return;
		}

		const enteredOTP = otp.join("");
		const otpError = validateOTP(enteredOTP);
		if (otpError) {
			setError(otpError);
			return;
		}

		if (!userEmail) {
			setError("Email not found. Please try again.");
			return;
		}

		// Check rate limiting
		const rateLimitResult = otpRateLimiter.isRateLimited(userEmail);
		if (rateLimitResult.limited) {
			setError(`Too many attempts. Please try again in ${Math.ceil(rateLimitResult.timeUntilReset / 60)} minutes.`);
			return;
		}

		setIsSubmitting(true);
		setError("");

		try {
			await verifyEmail(userEmail, enteredOTP);
			setSuccess(true);
			setTimeout(() => {
				router.push("/");
			}, 2000);
		} catch (err) {
			setAttempts(prev => prev + 1);
			handleApiError(err, setError);
			if (attempts + 1 >= MAX_ATTEMPTS) {
				setError("Maximum attempts reached. Please request a new OTP.");
			}
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleResendOTP = async () => {
		// Implement resend OTP functionality
		setAttempts(0);
		setTimeLeft(OTP_EXPIRY_MINUTES * 60);
		setIsExpired(false);
		// Call resend OTP API
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
						We have sent an OTP to your email. Please check your inbox.
					</p>

					{success && (
						<p className="text-green-600 bg-green-100 p-3 rounded-lg mb-4">
							OTP Verified Successfully! Redirecting...
						</p>
					)}

					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="flex space-x-3 justify-center">
							{otp.map((digit, index) => (
								<input
									key={index}
									id={`otp-${index}`}
									type="text"
									maxLength="1"
									className={`w-12 h-12 text-center text-lg border text-gray-900 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${error ? "border-red-500" : ""}`}
									value={digit}
									onChange={(e) => handleChange(index, e.target.value)}
									disabled={isExpired || attempts >= MAX_ATTEMPTS || isSubmitting || success}
								/>
							))}
						</div>

						{error && <p className="text-red-500 text-sm text-center">{error}</p>}

						<div className="text-center space-y-2">
							<p className="text-gray-500">
								Time remaining: {formatTime(timeLeft)}
							</p>
							<p className="text-gray-500">
								Attempts remaining: {MAX_ATTEMPTS - attempts}
							</p>
						</div>

						{(isExpired || attempts >= MAX_ATTEMPTS) && (
							<button
								type="button"
								onClick={handleResendOTP}
								className="w-full text-teal-600 underline py-2"
								disabled={isSubmitting || success}
							>
								Resend OTP
							</button>
						)}

						<div className="flex space-x-4">
							<button
								type="button"
								className="w-1/2 border py-2 rounded-lg text-gray-700 hover:bg-gray-200"
								onClick={() => router.back()}
								disabled={isSubmitting || success}
							>
								Cancel
							</button>
							<button
								type="submit"
								className="w-1/2 bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 disabled:opacity-50"
								disabled={isExpired || attempts >= MAX_ATTEMPTS || isSubmitting || success}
							>
								{isSubmitting ? "Verifying..." : "Verify"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
