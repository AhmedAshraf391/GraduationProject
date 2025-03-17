import Image from 'next/image';
import Link from 'next/link';

export default function AboutUs() {
    return (
        <div className="min-h-screen bg-gray-900 text-white font-Parkinsans">
            {/* Navbar */}
            {/* <nav className="flex justify-between items-center p-5 bg-gray-800">
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
            <section className="text-center py-20 px-5 bg-cover bg-center h-[70vh]" style={{ backgroundImage: 'url(/images/about-background.png)' }}>
                <h1 className="text-4xl font-bold mb-4 mt-8">About Us</h1>
                <p className="mb-8 text-lg max-w-2xl mx-auto">
                    Dedicated to providing professional legal services with integrity, excellence, and a commitment to achieving justice for our clients.
                </p>
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
