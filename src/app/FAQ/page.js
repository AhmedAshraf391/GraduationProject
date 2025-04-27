"use client";
import { Search, Mail, Heart, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { useState, useEffect } from "react";
import Link from 'next/link';
import { throttle } from "lodash";

export default function FAQ() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = throttle(() => {
            setScrolled(window.scrollY > 100);
        }, 200); // Fires at most once every 200ms

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900">
            {/* Navbar */}
            <nav
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-gray-900 shadow-lg" : "bg-transparent"
                    }`}
            >

                {/* Navbar Container */}
                <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex ml-16 items-center space-x-2 text-2xl font-medium">
                        <span className={`${scrolled ? "text-white" : "text-gray-300"}`}>
                            MIZAN
                        </span>
                    </div>

                    {/* Navigation Links */}
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

                    {/* Right Section: Search & Icons */}
                    <div className="flex items-center space-x-4">
                        {/* Search Bar */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search"
                                className="bg-transparent border border-white text-white text-sm px-4 py-2 rounded-full focus:outline-none  "
                            />
                            <Search className="absolute right-3 top-2 text-gray-400" />
                        </div>

                        {/* Icons */}
                        <Mail className="hover:text-gray-400 text-white cursor-pointer" />
                        <Heart className="hover:text-gray-400 text-white cursor-pointer " />

                        {/* Profile Image */}
                        <img
                            src="images/user-profile.jpg"
                            alt="User Profile"
                            className="w-10 h-10 rounded-full border-2 border-gray-600 cursor-pointer"
                        />
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section
                className="relative text-center py-20 px-5 bg-cover bg-center text-white w-full h-[60vh]"
                style={{ backgroundImage: "url('/images/faq.png')" }}
            >
                {/* Overlay for better readability */}
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>

                {/* Content (placed above overlay) */}
                <div className="relative mt-16 z-10">
                    <h1 className="text-4xl font-bold mb-3">FAQs</h1>
                    <p className="max-w-2xl mx-auto">
                        Find quick answers to common questions about our platform and services.
                    </p>
                </div>
            </section>


            {/* FAQ Section */}
            <section className="py-20 px-5 my-16 bg-white text-gray-900 max-w-6xl mx-auto">
                <h2 className="text-center text-3xl font-bold mb-8">Any Questions? We have Got You Covered</h2>
                <p className="text-center mb-10">
                    Do you have questions about how our platform works or need assistance with a specific service?
                    We have got you covered! Our goal is to make your experience as smooth and efficient as possible.
                    Explore our detailed FAQs for quick answers, or reach out to our support team for personalized help.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Clients Section */}
                    <div>
                        <h3 className="font-bold text-xl mb-4">For Clients</h3>
                        <div className="border-b py-3">
                            <details open>
                                <summary className="font-semibold cursor-pointer">How do I find a lawyer on this platform?</summary>
                                <p className="text-gray-600 mt-2">
                                    Simply sign up as a client, use our search and filter tools to find a lawyer that suits your needs, and book a consultation.
                                </p>
                            </details>
                        </div>
                        <div className="border-b py-3">
                            <details>
                                <summary className="font-semibold cursor-pointer">Is my personal information secure?</summary>
                                <p className="text-gray-600 mt-2">
                                    Yes, we use advanced encryption and security protocols to keep your data safe and confidential.
                                </p>
                            </details>
                        </div>
                        <div className="border-b py-3">
                            <details>
                                <summary className="font-semibold cursor-pointer">How much do legal services cost?</summary>
                                <p className="text-gray-600 mt-2">
                                    Costs vary depending on the type of service and the lawyer’s experience. Prices are displayed before you book a service.
                                </p>
                            </details>
                        </div>
                    </div>

                    {/* Lawyers Section */}
                    <div>
                        <h3 className="font-bold text-xl mb-4">For Lawyers</h3>
                        <div className="border-b py-3">
                            <details open>
                                <summary className="font-semibold cursor-pointer">How do I create a lawyer profile?</summary>
                                <p className="text-gray-600 mt-2">
                                    Sign up as a lawyer, fill out your profile with details like expertise, contact information, and upload required documents.
                                </p>
                            </details>
                        </div>
                        <div className="border-b py-3">
                            <details>
                                <summary className="font-semibold cursor-pointer">Can I manage my availability for consultations?</summary>
                                <p className="text-gray-600 mt-2">
                                    Yes, our platform allows you to set and update your availability for client consultations.
                                </p>
                            </details>
                        </div>
                        <div className="border-b py-3">
                            <details>
                                <summary className="font-semibold cursor-pointer">How do I get paid for my services?</summary>
                                <p className="text-gray-600 mt-2">
                                    Payments are processed securely through our system, and you can withdraw your earnings to your preferred bank account.
                                </p>
                            </details>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-10 px-5 bg-gray-800 text-white">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="space-y-1">
                        <h3 className="font-bold text-3xl">MIZAN</h3>
                        <p className="text-2xl">
                            Your Trusted Legal Patener
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link href="/home" className="relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full">Home</Link></li>
                            <li><Link href="/our-services" className="relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full">Our Services</Link></li>
                            <li><Link href="/contact-us" className="relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full">Contact Us</Link></li>
                            <li><Link href="/about-us" className="relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full">About Us</Link></li>
                            <li><Link href="/faq" className="relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full">FAQ</Link></li>
                        </ul>
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-bold text-lg">Contact Info</h3>
                        <p>Maadi, Cairo, Egypt</p>
                        <p>01148113314</p>
                        <div className="flex space-x-4 mt-4">
                            <ul className="flex items-center space-x-3">
                                <li className="hover:text-gray-400 cursor-pointer"><Facebook /></li>
                                <li className="hover:text-gray-400 cursor-pointer"><Instagram /></li>
                                <li className="hover:text-gray-400 cursor-pointer"><Twitter /></li>
                                <li className="hover:text-gray-400 cursor-pointer"><Linkedin /></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
