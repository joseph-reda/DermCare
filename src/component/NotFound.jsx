import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-blue-500 mb-4">404</h1>
                <h2 className="text-3xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
                <p className="text-lg text-gray-600 mb-8">
                    The page you are looking for does not exist or has been moved.
                </p>
                <Link
                    to="/"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline"
                >
                    Go Back to Homepage
                </Link>
            </div>
        </div>
    );
};

export default NotFound;