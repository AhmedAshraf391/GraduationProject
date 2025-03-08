/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-5 bg-gray-800">
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
      <section
        className="text-center py-20 px-5 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/court.jpg)' }}
      >
        <h1 className="text-4xl font-bold mb-5">
          Your Trusted Partner for Innovative Legal Services
        </h1>
        <p className="mb-8 text-lg max-w-2xl mx-auto">
          We provide tailored legal services that combine expertise, innovation,
          and efficiency to help businesses navigate challenges and achieve
          success.
        </p>
        <div className="flex justify-center items-center">
          <input
            type="text"
            placeholder="Find the perfect lawyer or explore legal solutions for your case"
            className="w-1/2 px-4 py-2 rounded-l-lg focus:outline-none text-gray-800"
          />
          <button className="bg-teal-500 px-6 py-2 rounded-r-lg hover:bg-teal-600">
            Let&apos;s Go
          </button>
        </div>
        <div className="flex justify-center mt-10 space-x-10">
          <div className="text-center">
            <p className="text-3xl font-bold">17,820</p>
            <p>Cases</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">8,540</p>
            <p>Lawyers</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">732</p>
            <p>Connections</p>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 px-5 bg-white text-gray-900">
        <h2 className="text-center text-3xl font-bold mb-10">About Us</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="mb-6">
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
          <img src="../images/Rectangle 19.png" alt="About Us" className="rounded-lg shadow-lg" />
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
              <img src={`/images/lawyer${index + 1}.jpg`} alt={lawyer} className="rounded-full w-24 h-24 mx-auto mb-4" />
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
              title: "Legal Advice",
              description:
                "30-minute consultation session to provide accurate advice and legal solutions.",
              cost: "200 EGP/session",
            },
            {
              title: "Preparing Legal Documents",
              description:
                "Drafting contracts and legal documents to protect your rights.",
              cost: "500 EGP/session",
            },
            {
              title: "Legal Representation in Court",
              description:
                "Full representation service for any case in civil, criminal, or commercial law.",
              cost: "1500 EGP/session",
            },
          ].map((feature, index) => (
            <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p>{feature.description}</p>
              <p className="font-semibold mt-2">Cost: {feature.cost}</p>
              <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                Book now
              </button>
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
          <div>
            <h3 className="font-bold text-lg">MIZAN</h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg">Quick Links</h3>
            <ul>
              <li><Link href="/home">Home</Link></li>
              <li><Link href="/our-services">Our Services</Link></li>
              <li><Link href="/contact-us">Contact Us</Link></li>
              <li><Link href="/about-us">About Us</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg">Contact Info</h3>
            <p>Lorem Ipsum, Cairo, Egypt</p>
            <p>01148113314</p>
            <div className="flex space-x-4 mt-4">
              <span>FB</span>
              <span>IG</span>
              <span>TW</span>
              <span>LN</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
