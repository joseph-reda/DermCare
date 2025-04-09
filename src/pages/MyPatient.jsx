import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";

const dummyPatients = [
    {
        id: 101,
        name: "Alice Smith",
        lastVisit: "2025-04-01",
        condition: "Acne",
    },
    {
        id: 102,
        name: "Bob Johnson",
        lastVisit: "2025-03-28",
        condition: "Eczema",
    },
    {
        id: 103,
        name: "Charlie Brown",
        lastVisit: "2025-04-04",
        condition: "Psoriasis",
    },
];

const MyPatient = () => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const [patients, setPatients] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredPatients, setFilteredPatients] = useState([]);

    useEffect(() => {
        setPatients(dummyPatients);
        setFilteredPatients(dummyPatients);
    }, []);

    useEffect(() => {
        const results = patients.filter(
            (patient) =>
                patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (patient.condition &&
                    patient.condition
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()))
        );
        setFilteredPatients(results);
    }, [searchTerm, patients]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    if (!isAuthenticated || user?.role !== "doctor") {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <section className="mb-8 text-center">
                    <h2 className="text-3xl font-semibold text-blue-600 tracking-tight">
                        My Patients
                    </h2>
                    <p className="text-lg text-gray-600 mt-2">
                        Manage your list of patients and access their case
                        files.
                    </p>
                </section>

                <div className="mb-6 flex justify-center">
                    <input
                        type="text"
                        placeholder="Search by patient name or condition..."
                        className="shadow-sm appearance-none border rounded-lg w-[80%] py-5 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        aria-label="Search patients"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPatients.map((patient) => (
                        <div
                            key={patient.id}
                            className="bg-white rounded-lg shadow-md p-6 flex flex-col h-full border border-gray-200 transition-shadow hover:shadow-lg"
                        >
                            <div className="flex items-center mb-4">
                                <FaUser className="text-gray-500 text-xl sm:text-2xl mr-3" />
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 tracking-tight">
                                    {patient.name}
                                </h3>
                            </div>
                            <p className="text-gray-600 text-sm sm:text-base mb-2">
                                <span className="font-semibold">
                                    Last Visit:
                                </span>{" "}
                                {patient.lastVisit}
                            </p>
                            {patient.condition && (
                                <p className="text-gray-600 text-sm sm:text-base mb-4">
                                    <span className="font-semibold">
                                        Condition:
                                    </span>{" "}
                                    {patient.condition}
                                </p>
                            )}
                            <Link
                                to={`/viewCaseFile/${patient.id}`}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mt-auto focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                            >
                                View Case File
                            </Link>
                        </div>
                    ))}
                    {filteredPatients.length === 0 && (
                        <div className="col-span-full text-center py-6">
                            <p className="text-gray-600 italic">
                                No patients found matching your search criteria.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyPatient;
