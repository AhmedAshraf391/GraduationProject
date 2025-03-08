import Link from 'next/link';

export default function OurServices() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-5 bg-gray-800 text-white">
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
      </nav>

      {/* Hero Section */}
      <section className="text-center py-20 px-5 bg-cover bg-center text-white" style={{ backgroundImage: 'url(/images/legal-bg.jpg)' }}>
        <h1 className="text-4xl font-bold mb-3">Our Services</h1>
        <p className="max-w-2xl mx-auto">
          We offer a comprehensive range of legal services tailored to meet your needs, ensuring professionalism, accuracy, and dedication.
        </p>
      </section>

      {/* Services Filters */}
      <section className="py-10 px-5 max-w-5xl mx-auto bg-white rounded-lg shadow-md mt-5">
        <h2 className="text-center text-2xl font-bold mb-5">Choose your legal service easily</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Service Type</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              <label><input type="checkbox" /> Legal Consultation</label>
              <label><input type="checkbox" /> Legal Document Preparation</label>
              <label><input type="checkbox" /> Legal Representation</label>
              <label><input type="checkbox" /> Online Legal Consultation</label>
              <label><input type="checkbox" /> Corporate Legal Services</label>
            </div>
          </div>
          <div>
            <h3 className="font-semibold">Service Area</h3>
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
            <button className="bg-teal-500 px-6 py-2 text-white rounded-lg hover:bg-teal-600">Find Your Service</button>
          </div>
        </div>
      </section>

      {/* Services List */}
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
      </section>

      {/* Footer */}
      <footer className="py-10 px-5 bg-gray-800 text-white text-center">
        <p>&copy; 2024 MIZAN Legal Services. All rights reserved.</p>
      </footer>
    </div>
  );
}
