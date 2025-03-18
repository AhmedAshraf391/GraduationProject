"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from "react";
import { throttle } from "lodash";

export default function AboutUs() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = throttle(() => {
            setScrolled(window.scrollY > 100);
        }, 200); // Fires at most once every 200ms

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    return (
        <div className="min-h-screen bg-gray-900 text-white font-Parkinsans">
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
                        className={`hidden md:flex ml-8 space-x-6 ${scrolled ? "text-gray-300" : "text-white"
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
                            {/* <FiSearch className="absolute right-3 top-2 text-gray-400" /> */}
                        </div>

                        {/* Icons */}
                        {/* <FiMessageCircle className="text-xl hover:text-blue-400 cursor-pointer" /> */}
                        {/* <FiHeart className="text-xl hover:text-blue-400 cursor-pointer" /> */}

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
                className="relative text-center py-20 px-5 bg-cover bg-center h-[70vh] w-full text-white"
                style={{ backgroundImage: "url('/images/about-background.png')" }}
            >
                {/* Overlay for better readability */}
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>

                {/* Content (placed above overlay) */}
                <div className="relative mt-16 z-10">
                    <h1 className="text-4xl font-bold mb-4 mt-8">About Us</h1>
                    <p className="mb-8 text-lg max-w-2xl mx-auto">
                        Dedicated to providing professional legal services with integrity, excellence,
                        and a commitment to achieving justice for our clients.
                    </p>
                </div>
            </section>


            {/* About Section */}
            <section className="py-20 px-5 bg-white text-gray-900">
                <h2 className="text-center text-3xl font-bold mb-10">What About Us?</h2>
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <div>
                        <p className="mb-6">
                            Our platform connects you with professional lawyers tailored to your specific needs. We simplify finding the right lawyer with advanced filters like specialization, location, and payment methods. Whether you need advice or representation, we ensure a seamless and trusted experience.
                        </p>
                        <button className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600">
                            Read More
                        </button>
                    </div>
                    <Image
                        src="/images/about-us.png"
                        alt="About Us"
                        width={500}
                        height={300}
                        className="rounded-lg shadow-lg"
                    />
                </div>
            </section>

            {/* Footer Section */}
            <footer className="py-10 px-5 bg-gray-200 text-stone-700">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div>
                        <h3 className="font-bold text-lg">MIZAN</h3>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">Quick Links</h3>
                        <ul>
                            <li><Link href="/home">Home</Link></li>
                            <li><Link href="/services">Our Services</Link></li>
                            <li><Link href="/contact-us">Contact Us</Link></li>
                            <li><Link href="/about-us">About Us</Link></li>
                            <li><Link href="/faq">FAQ</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">Contact Info</h3>
                        <p>Lorem Ipsum, Cairo, Egypt</p>
                        <p>01148113314</p>
                        {/* <div className="flex space-x-4 mt-4">
                            <span>FB</span>
                            <span>IG</span>
                            <span>TW</span>
                            <span>LN</span>
                        </div> */}
                    </div>
                </div>
            </footer>
        </div>
    );
}
