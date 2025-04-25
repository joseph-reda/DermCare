import React from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const PatientSignup = ({ formData, handleChange }) => {
    return (
        <div className="space-y-6">
            <div className="relative">
                <FaUser className="absolute left-3 top-3 text-gray-500" />
                <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange("name")}
                    className="w-full px-10 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out"
                    required
                />
            </div>

            <div className="relative">
                <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange("email")}
                    className="w-full px-10 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out"
                    required
                />
            </div>

            <div className="relative">
                <FaLock className="absolute left-3 top-3 text-gray-500" />
                <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange("password")}
                    className="w-full px-10 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out"
                    required
                />
            </div>
        </div>
    );
};

export default PatientSignup;
