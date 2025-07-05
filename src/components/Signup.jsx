"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");


  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setServerError("");
    setLoading(true);

    let errors = {};

    if (formData.firstName.length < 3)
      errors.firstName = "Enter a valid first name";
    if (formData.lastName.length < 3)
      errors.lastName = "Enter a valid last name";
    if (!formData.email.includes("@")) errors.email = "Enter a valid email";
    if (formData.phoneNumber.length < 10)
      errors.phoneNumber = "Enter a valid phone number";
    if (formData.password.length < 6)
      errors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      errors.confirmPassword = "Passwords do not match";
    if (!formData.role) errors.role = "Please select a role";
  
    setError(errors);

    if (Object.keys(errors).length > 0) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          FirstName: formData.firstName,
          LastName: formData.lastName,
          Email: formData.email,
          PhoneNumber: formData.phoneNumber,
          Password: formData.password,
          ConfirmPassword: formData.confirmPassword,
          UserType: formData.role,
        }),
      });

      const data = await response.json();

      if (response.status === 201) {
        console.log("Created successfully:", data);
        alert("Signup successful! Redirecting to verify email...");

        router.push(
          `/verify-email?email=${encodeURIComponent(formData.email)}`
        );
      } else {
        throw new Error(data.message || "Signup failed");
      }
    } catch (error) {
      console.error(error);
      setServerError(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-gray-200">
      <div className="w-1/2 hidden md:block">
        <img
          src="/images/sign-up.png"
          alt="Signup Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full md:w-1/2 flex justify-center items-center">
        <div className="max-w-md w-full space-y-6 p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-gray-900 text-center">
            Sign-Up
          </h2>
          <p className="text-gray-500 text-center">
            Create your account in just a few steps
          </p>

          {serverError && (
            <p className="text-red-500 text-center">{serverError}</p>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                className={`w-full text-gray-900 p-2 border ${
                  error.firstName ? "border-red-500" : "border-gray-300"
                } rounded-lg`}
                value={formData.firstName}
                onChange={handleChange}
              />
              {error.firstName && (
                <p className="text-red-500 text-sm">{error.firstName}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                className={`w-full text-gray-900 p-2 border ${
                  error.lastName ? "border-red-500" : "border-gray-300"
                } rounded-lg`}
                value={formData.lastName}
                onChange={handleChange}
              />
              {error.lastName && (
                <p className="text-red-500 text-sm">{error.lastName}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className={`w-full text-gray-900 p-2 border ${
                  error.email ? "border-red-500" : "border-gray-300"
                } rounded-lg`}
                value={formData.email}
                onChange={handleChange}
              />
              {error.email && (
                <p className="text-red-500 text-sm">{error.email}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Enter your phone number"
                className={`w-full text-gray-900 p-2 border ${
                  error.phoneNumber ? "border-red-500" : "border-gray-300"
                } rounded-lg`}
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              {error.phoneNumber && (
                <p className="text-red-500 text-sm">{error.phoneNumber}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className={`w-full text-gray-900 p-2 border ${
                  error.password ? "border-red-500" : "border-gray-300"
                } rounded-lg`}
                value={formData.password}
                onChange={handleChange}
              />
              {error.password && (
                <p className="text-red-500 text-sm">{error.password}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                className={`w-full text-gray-900 p-2 border ${
                  error.confirmPassword ? "border-red-500" : "border-gray-300"
                } rounded-lg`}
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {error.confirmPassword && (
                <p className="text-red-500 text-sm">{error.confirmPassword}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700">Select Role:</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="Lawyer"
                    checked={formData.role === "Lawyer"}
                    onChange={handleChange}
                  />
                  <span className="ml-2 text-gray-500">Lawyer</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="User"
                    checked={formData.role === "User"}
                    onChange={handleChange}
                  />
                  <span className="ml-2 text-gray-500">User</span>
                </label>
              </div>
              {error.role && (
                <p className="text-red-500 text-sm">{error.role}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Signup"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
