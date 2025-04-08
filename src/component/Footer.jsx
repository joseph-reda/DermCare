import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* First Column: Company Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Derma Scan</h3>
                        <p className="text-gray-400 text-sm">
                            Your trusted platform for dermatological insights and care.
                        </p>
                        <p className="text-gray-400 text-sm mt-2">
                            6th of October City, Giza Governorate, Egypt
                        </p>
                    </div>

                    {/* Second Column: Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="text-gray-400 text-sm space-y-2">
                            <li>
                                <Link to="/home" className="hover:text-white">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="hover:text-white">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:text-white">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/doctors" className="hover:text-white">
                                    Find a Doctor
                                </Link>
                            </li>
                            {/* Add more quick links as needed */}
                        </ul>
                    </div>

                    {/* Third Column: Contact & Social */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact & Social</h3>
                        <p className="text-gray-400 text-sm mb-2">
                            Email: info@dermascan.com
                        </p>
                        <p className="text-gray-400 text-sm mb-2">
                            Phone: +20 123 456 7890
                        </p>
                        <div className="flex space-x-4 mt-4">
                            {/* Add your social media icons and links here */}
                            <a href="#" className="hover:text-white">
                                {/* Example: <i className="fab fa-facebook-f"></i> */}
                                Facebook
                            </a>
                            <a href="#" className="hover:text-white">
                                {/* Example: <i className="fab fa-twitter"></i> */}
                                Twitter
                            </a>
                            <a href="#" className="hover:text-white">
                                {/* Example: <i className="fab fa-linkedin-in"></i> */}
                                LinkedIn
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Copyright Section */}
                <div className="mt-8 border-t border-gray-700 py-4 text-center text-gray-400 text-xs">
                    &copy; {new Date().getFullYear()} Derma Scan. All rights reserved.
                    <Link to="/privacy" className="hover:text-white ml-4">
                        Privacy Policy
                    </Link>
                    <Link to="/terms" className="hover:text-white ml-4">
                        Terms of Service
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;