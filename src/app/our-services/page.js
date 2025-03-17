/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import Image from "next/image";
export default function OurServices() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-Parkinsans">
      {/* Navbar */}
      {/* <nav className="flex justify-between items-center p-5 bg-gray-800 text-white">
        <div className="text-2xl font-bold">MIZAN</div>
        <ul className="flex space-x-6">
          <li>
            <Link href="/home" className="hover:text-teal-400 cursor-pointer">Home</Link>
          </li>
          <li>
            <Link href="/our-services" className="hover:text-teal-400 cursor-pointer">Our Services</Link>
          </li>
          <li>
            <Link href="/contact-us" className="hover:text-teal-400 cursor-pointer">Contact Us</Link>
          </li>
          <li>
            <Link href="/about-us" className="hover:text-teal-400 cursor-pointer">About Us</Link>
          </li>
          <li>
            <Link href="/faq" className="hover:text-teal-400 cursor-pointer">FAQ</Link>
          </li>
        </ul>
      </nav> */}

      {/* Nav */}
      <nav className="fixed top-0 left-0 w-full bg-transparent ">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          
          <div className="flex items-center space-x-2 text-2xl text-white font-medium">MIZAN</div>

          {/* Navigation Links */}
          <ul className="hidden md:flex space-x-6 text-white font-medium">
            <li><Link href="/home" className="hover:text-stone-300">Home</Link></li>
            <li><Link href="/our-services" className="hover:text-stone-300">Our Services</Link></li>
            <li><Link href="/contact-us" className="hover:text-stone-300">Contact us</Link></li>
            <li><Link href="/about-us" className="hover:text-stone-300">About us</Link></li>
            <li><Link href="/faq" className="hover:text-stone-300">FAQ</Link></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-20 px-5 bg-cover bg-center bg-stone-200 text-white h-[60vh]" style={{ backgroundImage: 'url(/images/blur-effect-3.png)' }}>
        <h1 className="text-4xl font-bold my-4">Our Services</h1>
        <p className="max-w-2xl mx-auto">
          We offer a comprehensive range of legal services tailored to meet your needs, ensuring professionalism, accuracy, and dedication.
        </p>
      </section>

      {/* Services Filters */}
      <section className="py-10 px-5 max-w-5xl mx-auto bg-white rounded-lg shadow-md mt-12 mb-12">
        <h2 className="text-center text-2xl font-bold mb-5">Choose your legal service easily</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-3">Service Type</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              <label><input type="checkbox" /> Legal Consultation</label>
              <label><input type="checkbox" /> Legal Document Preparation</label>
              <label><input type="checkbox" /> Legal Representation</label>
              <label><input type="checkbox" /> Online Legal Consultation</label>
              <label><input type="checkbox" /> Corporate Legal Services</label>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Service Area</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              <label><input type="checkbox" /> Civil Cases</label>
              <label><input type="checkbox" /> Criminal Cases</label>
              <label><input type="checkbox" /> Insurance Claims</label>
              <label><input type="checkbox" /> Family Law</label>
              <label><input type="checkbox" /> Employment Law</label>
              <label><input type="checkbox" /> Intellectual Property</label>
            </div>
          </div>
          <div className="flex justify-center mt-5">
            <button className="bg-teal-500 px-6 py-2 mt-5 text-white rounded-lg hover:bg-teal-600">Find Your Service</button>
          </div>
        </div>
      </section>

      {/* Services List
      <section className="py-20 px-5 max-w-5xl mx-auto">
        <h2 className="text-center text-3xl font-bold mb-10">Our Features</h2>
        <div className="space-y-6">
          {[{
            title: "Legal Advice",
            description: "30-minute consultation session providing accurate advice and legal solutions.",
            cost: "200 EGP/session",
            image: "/images/legal-advice.jpg"
          }, {
            title: "Preparing Legal Documents",
            description: "Drafting contracts and legal documents to protect your rights.",
            cost: "500 EGP/session",
            image: "/images/legal-docs.jpg"
          }, {
            title: "Legal Representation in Court",
            description: "Full representation service for any case in civil, criminal, or commercial law.",
            cost: "1500 EGP/session",
            image: "/images/court-representation.jpg"
          }].map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center">
              <img src={service.image} alt={service.title} className="w-32 h-32 rounded-lg md:mr-6" />
              <div>
                <h3 className="text-xl font-bold">{service.title}</h3>
                <p>{service.description}</p>
                <p className="font-semibold mt-2">Cost: {service.cost}</p>
                <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Book now</button>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      {/* Footer */}
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
