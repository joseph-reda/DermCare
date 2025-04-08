import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../component/Sidebar"; // You are importing Sidebar, but not using it in this component

const About = () => {
    return (
        <div className="bg-gray-100 min-h-screen py-16">
            {" "}
            {/* Increased padding for better visual breathing room */}
            <div className="container mx-auto px-6 md:px-12 lg:px-24">
                {" "}
                {/* More responsive padding */}
                <section className="mb-12">
                    {" "}
                    {/* Increased margin for better separation */}
                    <h2 className="text-3xl font-semibold text-blue-600 mb-8 text-center tracking-tight">
                        Our Mission
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed text-center">
                        At Derma Scan, our mission is to empower individuals
                        with knowledge about their skin health and provide a
                        seamless connection to qualified dermatologists. We
                        leverage the power of artificial intelligence to offer
                        preliminary insights, enabling users to make informed
                        decisions about their dermatological concerns.
                    </p>
                </section>
                <section className="mb-12">
                    <h2 className="text-3xl font-semibold text-blue-600 mb-8 text-center tracking-tight">
                        Who We Are
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        We are a team of passionate technologists, healthcare
                        professionals, and designers dedicated to improving
                        access to dermatological care. Recognizing the
                        challenges of timely diagnosis and the overwhelming
                        amount of skin-related information online, we created
                        Derma Scan to offer a reliable and user-friendly
                        solution.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed mt-6">
                        Our platform combines cutting-edge AI algorithms with
                        the expertise of board-certified dermatologists to
                        provide a comprehensive and trustworthy experience. We
                        are committed to user privacy and data security,
                        ensuring that your information is handled with the
                        utmost care.
                    </p>
                </section>
                <section className="mb-12">
                    <h2 className="text-3xl font-semibold text-blue-600 mb-8 text-center tracking-tight">
                        Our Values
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {" "}
                        {/* Increased gap for better spacing */}
                        <div className="text-center p-6 rounded-lg shadow-md bg-white">
                            {" "}
                            {/* Added subtle background and shadow */}
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                Accuracy
                            </h3>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                We strive for the highest level of accuracy in
                                our AI analysis and information provided.
                            </p>
                        </div>
                        <div className="text-center p-6 rounded-lg shadow-md bg-white">
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                Accessibility
                            </h3>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                We believe everyone should have access to
                                reliable information about their skin health.
                            </p>
                        </div>
                        <div className="text-center p-6 rounded-lg shadow-md bg-white">
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                Trust & Privacy
                            </h3>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                We are committed to protecting your data and
                                maintaining your trust.
                            </p>
                        </div>
                    </div>
                </section>
                <section className="text-center">
                    <h2 className="text-3xl font-semibold text-blue-600 mb-8 tracking-tight">
                        Meet the Team (Optional)
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        Behind Derma Scan is a dedicated team working tirelessly
                        to bring you the best possible experience.
                    </p>
                    <p className="text-gray-600 text-sm mt-6">
                        We are constantly working to improve Derma Scan and
                        welcome your feedback.{" "}
                        <Link
                            to="/contact"
                            className="text-blue-500 hover:underline"
                        >
                            Contact Us
                        </Link>
                    </p>
                </section>
            </div>
        </div>
    );
};

export default About;
