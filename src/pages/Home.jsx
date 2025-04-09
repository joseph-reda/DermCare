import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    return (
        <div className="bg-gray-100 min-h-screen container mx-auto py-4">
            <header className="bg-blue-500 text-white py-20 text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-4">
                        Welcome to Derma Scan
                    </h1>
                    <p className="text-lg mb-8">
                        Your AI-powered solution for dermatological insights.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <Link
                            to="/about"
                            className="bg-white text-blue-500 py-3 px-6 rounded-full font-semibold hover:bg-blue-100 transition duration-300"
                        >
                            Learn More
                        </Link>
                        {!isAuthenticated && (
                            <Link
                                to="/login"
                                className="bg-yellow-400 text-blue-800 py-3 px-6 rounded-full font-semibold hover:bg-yellow-300 transition duration-300"
                            >
                                Login
                            </Link>
                        )}
                        {isAuthenticated && user?.role === "patient" && (
                            <Link
                                to="/doctors"
                                className="bg-yellow-400 text-blue-800 py-3 px-6 rounded-full font-semibold hover:bg-yellow-300 transition duration-300"
                            >
                                Find a Doctor
                            </Link>
                        )}
                        {isAuthenticated && user?.role === "doctor" && (
                            <Link
                                to="/my-patients"
                                className="bg-green-400 text-white py-3 px-6 rounded-full font-semibold hover:bg-green-300 transition duration-300"
                            >
                                My Patients
                            </Link>
                        )}
                    </div>
                </div>
            </header>

            <section className="py-12 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                        How It Works
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <div className="bg-blue-100 text-blue-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <svg
                                    className="w-8 h-8 fill-current"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                Upload Image
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Easily upload a clear image of your skin
                                concern.
                            </p>
                        </div>
                        <div>
                            <div className="bg-yellow-100 text-yellow-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <svg
                                    className="w-8 h-8 fill-current"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                AI Analysis
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Our advanced AI algorithms analyze the image for
                                potential conditions.
                            </p>
                        </div>
                        <div>
                            <div className="bg-green-100 text-green-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <svg
                                    className="w-8 h-8 fill-current"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M17 18c-1.57-2.75-5.43-2.75-7 0V5h7v13zm-4-2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                Get Insights
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Receive preliminary insights and
                                recommendations.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {isAuthenticated && user?.role === "patient" && (
                <section className="py-12 bg-gray-200">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                            Find Experienced Dermatologists
                        </h2>
                        <p className="text-lg text-gray-700 mb-8">
                            Connect with qualified doctors for further
                            consultation and diagnosis.
                        </p>
                        <Link
                            to="/doctors"
                            className="bg-blue-500 text-white py-3 px-6 rounded-full font-semibold hover:bg-blue-600 transition duration-300"
                        >
                            Browse Doctors
                        </Link>
                    </div>
                </section>
            )}

            {isAuthenticated && user?.role === "doctor" && (
                <section className="py-12 bg-gray-200">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                            Manage Your Patients
                        </h2>
                        <p className="text-lg text-gray-700 mb-8">
                            View and manage the patients who are connected with you.
                        </p>
                        <Link
                            to="/my-patients"
                            className="bg-green-500 text-white py-3 px-6 rounded-full font-semibold hover:bg-green-600 transition duration-300"
                        >
                            View My Patients
                        </Link>
                    </div>
                </section>
            )}
        </div>
    );
};

export default Home;