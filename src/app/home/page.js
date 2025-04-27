"use client";
import { Search, Mail, Heart, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Link from 'next/link';
import { throttle } from "lodash";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  useEffect(() => {
    const handleScroll = throttle(() => {
      setScrolled(window.scrollY > 100);
    }, 200); // Fires at most once every 200ms

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="min-h-screen text-white font-Parkinsans">

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
            <Mail className="hover:text-gray-400 cursor-pointer" />
            <Heart className="hover:text-gray-400 cursor-pointer" />

            {/* Profile Image */}
            <div className="relative" ref={menuRef}>
              <img
                src="/images/user-profile.jpg"
                alt="User Profile"
                className="w-10 h-10 rounded-full border-2 border-gray-600 cursor-pointer"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg z-50 animate-fadeInDown">
                  <div className="px-4 py-2 border-b font-semibold">Ahmed</div>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      router.push('/');
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </nav>


      {/* Hero Section */}
      <section
        className="relative text-center py-20 px-5 bg-cover text-stone-800 bg-center h-screen"
        style={{ backgroundImage: 'url(/images/home-background.png)' }}
      >
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content with relative positioning */}
        <div className="relative top-10 z-10">
          <h1 className="text-4xl font-bold mb-5 mt-16 text-white">
            Your Trusted Partner for Innovative Legal Services
          </h1>
          <p className="mb-8 text-lg max-w-2xl mx-auto text-white">
            We provide tailored legal services that combine expertise, innovation,
            and efficiency to help businesses navigate challenges and achieve
            success.
          </p>

          {/* Search Bar */}
          <div className="flex justify-center items-center">
            <input
              type="text"
              placeholder="Find the perfect lawyer or explore legal solutions for your case"
              className="w-1/2 px-4 py-3 rounded-l-lg focus:outline-none text-gray-800 shadow-lg"
            />
            <button className="bg-teal-500 px-6 py-3 rounded-r-lg hover:bg-teal-600 text-white font-semibold shadow-lg">
              Let&apos;s Go
            </button>
          </div>

          {/* Stats Section */}
          <div className="flex justify-center mt-10 space-x-10">
            <div className="text-center text-white">
              <p className="text-3xl font-bold">17,820</p>
              <p>Cases</p>
            </div>
            <div className="text-center text-white">
              <p className="text-3xl font-bold">8,540</p>
              <p>Lawyers</p>
            </div>
            <div className="text-center text-white">
              <p className="text-3xl font-bold">732</p>
              <p>Connections</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 px-5 bg-white text-gray-900">
        <h2 className="text-center text-3xl font-bold mb-10">About Us</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="mb-6 text-xl">
              Our platform connects you with professional lawyers tailored to
              your specific needs. We simplify finding the right lawyer with
              advanced filters like specialization, location, and payment
              methods. Whether you need advice or representation, we ensure a
              seamless and trusted experience.
            </p>
            <button className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600">
              Read more
            </button>
          </div>
          <img src="/images/home-about-us.png" alt="About Us" className="rounded-lg shadow-lg" />
        </div>
      </section>

      {/* Lawyers Section */}
      <section className="py-20 px-5 bg-gray-100 text-gray-900">
        <h2 className="text-center text-3xl font-bold mb-10">Our Lawyers</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-5">
          {[
            "Ahmed Al-Janaini",
            "Mohamed Al-Najjar",
            "Laila Al-Makkawi",
            "Heba Al-Sioufi",
          ].map((lawyer, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-lg text-center"
            >
              <img src={`/images/lawyer-${index + 1}.png`} alt={lawyer} className="rounded-md w-48 h-72 mx-auto mb-4" />
              <h3 className="font-bold text-lg">{lawyer}</h3>
              <p>Specialization: Criminal Law</p>
              <p>Rating: ⭐⭐⭐⭐⭐</p>
              <p>Cases Handled: {Math.floor(Math.random() * 500) + 100}</p>
              <div className="flex justify-between mt-4">
                <button className="px-2 py-1 bg-teal-500 text-white rounded">
                  Learn more
                </button>
                <button className="px-2 py-1 bg-gray-700 text-white rounded">
                  Message
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-5 bg-white text-gray-900">
        <h2 className="text-center text-3xl font-bold mb-10">Our Features</h2>
        <div className="max-w-4xl mx-auto space-y-6">
          {[
            {
              id: 1,
              title: "Legal Advice",
              description:
                "30-minute consultation session to provide accurate advice and legal solutions.",
              cost: "200 EGP/session",
              img: "/images/legal-advice.png"
            },
            {
              id: 2,
              title: "Preparing Legal Documents",
              description:
                "Drafting contracts and legal documents to protect your rights.",
              cost: "500 EGP/session",
              img: "/images/preparing-legal-documents.png"
            },
            {
              id: 3,
              title: "Legal Representation in Court",
              description:
                "Full representation service for any case in civil, criminal, or commercial law.",
              cost: "1500 EGP/session",
              img: "/images/legal-representation.png"
            },
          ].map((feature) => (
            <div key={feature.id} className="bg-gray-100 p-6 rounded-lg shadow-md flex">
              <div key={feature.id} className="bg-gray-100 p-6 rounded-lg w-[60%]">
                <img src={feature.img} className='w-80'></img>
              </div>
              <div key={feature.id} className="bg-gray-100 p-6 max-w-[48%] rounded-lg">
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p>{feature.description}</p>
                <p className="font-semibold mt-2">Cost: {feature.cost}</p>
                <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                  <Link href="/lawyer" className="cursor-pointer">Book Now</Link>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-20 px-5 bg-gray-200 text-gray-900">
        <h2 className="text-center text-3xl font-bold mb-10">Contact Us</h2>
        <div className="max-w-xl mx-auto space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-2 rounded-lg"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded-lg"
          />
          <textarea
            placeholder="Message"
            className="w-full px-4 py-2 rounded-lg"
            rows="4"
          />
          <button className="w-full px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600">
            Submit
          </button>
        </div>
      </section>

      {/* Footer Section */}
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
