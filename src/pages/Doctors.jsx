import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { FaUserMd, FaSearch } from "react-icons/fa"; // Added FaSearch icon
import { useSelector } from "react-redux";

// Dummy doctor data (replace with your API fetch)
const dummyDoctors = [
    {
        id: 1,
        name: "Dr. Amina Khan",
        specialty: "General Dermatology",
        location: "Cairo",
    },
    {
        id: 2,
        name: "Dr. Omar Hassan",
        specialty: "Cosmetic Dermatology",
        location: "Alexandria",
    },
    {
        id: 3,
        name: "Dr. Fatima Ahmed",
        specialty: "Pediatric Dermatology",
        location: "Giza",
    },
    {
        id: 4,
        name: "Dr. Youssef Ali",
        specialty: "Surgical Dermatology",
        location: "Aswan",
    },
    // Add more dummy doctors here
];

const Doctors = () => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const [doctors, setDoctors] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredDoctors, setFilteredDoctors] = useState([]);

    useEffect(() => {
        setDoctors(dummyDoctors);
        setFilteredDoctors(dummyDoctors);
    }, []);

    useEffect(() => {
        const results = doctors.filter(
            (doctor) =>
                doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                doctor.specialty
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                doctor.location.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredDoctors(results);
    }, [searchTerm, doctors]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    if (isAuthenticated && user?.role === "doctor") {
        return <Navigate to="/my-patients" replace />;
    }

    return (
        <div className="bg-gray-100 min-h-screen py-12">
            <div className="container mx-auto px-6 md:px-12 lg:px-24">
                <section className="mb-10 text-center">
                    <h2 className="text-3xl font-semibold text-blue-600 mb-6 tracking-tight">
                        Find a Dermatologist
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Search for dermatologists by name, specialty, or
                        location.
                    </p>
                </section>

                <div className="relative mb-8 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <FaSearch className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by name, specialty, or location"
                        className="appearance-none block w-full pl-10 pr-3 py-5 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredDoctors.map((doctor) => (
                        <div
                            key={doctor.id}
                            className="bg-white rounded-lg shadow-md p-6 flex flex-col h-full transition duration-300 hover:shadow-lg"
                        >
                            <div className="flex items-center mb-4">
                                <FaUserMd className="text-blue-500 text-2xl mr-4" />
                                <h3 className="text-xl font-semibold text-gray-800">
                                    {doctor.name}
                                </h3>
                            </div>
                            <p className="text-gray-600 mb-3">
                                <span className="font-semibold">
                                    Specialty:
                                </span>{" "}
                                {doctor.specialty}
                            </p>
                            <p className="text-gray-600 mb-4">
                                <span className="font-semibold">Location:</span>{" "}
                                {doctor.location}
                            </p>
                            <Link
                                to={`/${doctor.id}`}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded mt-auto focus:outline-none focus:shadow-outline transition duration-300"
                            >
                                View Profile
                            </Link>
                        </div>
                    ))}
                    {filteredDoctors.length === 0 && (
                        <div className="col-span-full text-center py-8">
                            <p className="text-gray-600">
                                No doctors found matching your search criteria.
                                Please try a different search term.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Doctors;
