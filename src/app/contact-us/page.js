import Link from "next/link";

export default function ContactUs() {
    return (
        <div className="min-h-screen bg-gray-100 text-gray-900">
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
            <section
                className="text-center py-20 px-5 bg-cover bg-center text-white h-[60vh]"
                style={{ backgroundImage: 'url(/images/contact-background.png)' }}
            >
                <h1 className="text-4xl font-bold mb-3">Contact Us</h1>
                <p>Get in touch with us for personalized legal assistance and professional guidance tailored to your needs.</p>
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
