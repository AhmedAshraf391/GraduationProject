"use client";
import { Search, Mail, Heart, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { useState, useEffect } from "react";
import Link from 'next/link';
import { throttle } from "lodash";

export default function ContactUs() {
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
                    <ul
                        className={`hidden md:flex ml-16 space-x-6 ${scrolled ? "text-gray-300" : "text-white"
                            } font-medium`}
                    >
                        {["Home", "Our Services", "Contact us", "About us", "FAQ"].map(
                            (item, index) => (
                                <li key={index}>
                                    <Link href={`/${item.toLowerCase().replace(/\s/g, "-")}`}>
                                        <span className="relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full">
                                            {item}
                                        </span>
                                    </Link>
                                </li>
                            )
                        )}
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
                        <Heart className="hover:text-gray-400 text-white cursor-pointer" />

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
                className="relative text-center py-20 px-5 bg-cover bg-center text-white h-[60vh] w-full"
                style={{ backgroundImage: "url('/images/contact-background.png')" }}
            >
                {/* Overlay for better readability */}
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>

                {/* Content (placed above overlay) */}
                <div className="relative mt-12 z-10">
                    <h1 className="text-4xl font-bold mb-3">Contact Us</h1>
                    <p className="max-w-2xl mx-auto">
                        Get in touch with us for personalized legal assistance and professional guidance tailored to your needs.
                    </p>
                </div>
            </section>


            {/* Contact Form Section */}
            <section className="py-20 px-5 bg-white text-gray-900 max-w-4xl mx-auto mt-12 rounded-md">
                <h2 className="text-center text-3xl font-bold mb-6">Contact us</h2>
                <p className="text-center mb-8">
                    We’d love to hear from you! Please fill out the form below and we will get in touch with you shortly.
                </p>
                <form className="space-y-4">
                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                    <textarea
                        placeholder="Message"
                        className="w-full px-4 py-2 border rounded-lg"
                        rows="4"
                    ></textarea>
                    <button className="w-full px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600">
                        Submit
                    </button>
                </form>
            </section>

            {/* Google Maps Section */}
            <section className="py-20 px-5 bg-gray-100 text-gray-900">
                <h2 className="text-center text-3xl font-bold mb-6">Find us in Google Maps</h2>
                <div className="w-full max-w-6xl mx-auto">
                    <iframe
                        className="w-full h-96 rounded-lg shadow-lg"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55319.29548449978!2d31.223444228169076!3d30.044419584492707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145840b7b87a8c9d%3A0xa0b6841e5a64e053!2sCairo%2C%20Egypt!5e0!3m2!1sen!2seg!4v1677612904974!5m2!1sen!2seg"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
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
