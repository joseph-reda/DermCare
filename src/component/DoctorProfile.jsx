import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    FaEnvelope,
    FaGraduationCap,
    FaBriefcase,
    FaCheckCircle,
} from "react-icons/fa";
const fetchDoctorById = (id) => {
    // Simulate fetching from an API
    return new Promise((resolve) => {
        setTimeout(() => {
            const doctorData = {
                1: {
                    id: 1,
                    name: "Dr. Ahmed Mohamed",
                    specialty: "General Dermatology",
                    experience: "15 years",
                    education:
                        "Bachelor's Degree in Medicine and Surgery from Cairo University, Diploma in Dermatology",
                    about: "Dr. Ahmed is a highly experienced specialist in general dermatology, dedicated to providing comprehensive care for a wide range of skin conditions. With 15 years of practice, he is known for his thorough approach and patient-centered care.",
                    services: [
                        "Acne and scar treatment",
                        "Diagnosis and treatment of eczema and psoriasis",
                        "Removal of moles and warts",
                        "Hair loss evaluation and treatment",
                        "Skin cancer screening and lesion removal",
                        "Diagnosis of other skin diseases",
                    ],
                    image: "https://via.placeholder.com/150/ABCDEF/FFFFFF?Text=Dr.Ahmed", // Replace with actual image URL
                },
                2: {
                    id: 2,
                    name: "Dr. Sarah Ali",
                    specialty: "Cosmetic Dermatology",
                    experience: "10 years",
                    education:
                        "Bachelor's Degree in Medicine from Ain Shams University, Master's in Dermatology",
                    about: "Dr. Sarah is passionate about enhancing skin health and appearance through advanced cosmetic procedures. With a decade of experience, she specializes in non-invasive treatments to help patients achieve their aesthetic goals.",
                    services: [
                        "Botox and fillers",
                        "Laser skin rejuvenation",
                        "Chemical peels",
                        "Microdermabrasion",
                    ],
                    image: "https://via.placeholder.com/150/FEDCBA/FFFFFF?Text=Dr.Sarah", // Replace with actual image URL
                },
                3: {
                    id: 3,
                    name: "Dr. Mahmoud Ibrahim",
                    specialty: "Pediatric Dermatology",
                    experience: "8 years",
                    education:
                        "Bachelor's Degree in Medicine from Alexandria University, Fellowship in Pediatric Dermatology",
                    about: "Dr. Mahmoud is a dedicated pediatric dermatologist with a gentle approach to treating skin conditions in infants, children, and adolescents. He is committed to providing specialized care for young patients.",
                    services: [
                        "Treatment of childhood eczema",
                        "Management of birthmarks",
                        "Diagnosis of pediatric skin infections",
                    ],
                    image: "https://via.placeholder.com/150/AACCDD/FFFFFF?Text=Dr.Mahmoud", // Replace with actual image URL
                },
                4: {
                    id: 4,
                    name: "Dr. Nadia Hassan",
                    specialty: "Surgical Dermatology",
                    experience: "12 years",
                    education:
                        "Bachelor's Degree in Medicine from Cairo University, Specialization in Dermatologic Surgery",
                    about: "Dr. Nadia is a skilled surgical dermatologist specializing in the treatment of skin cancer and other complex skin conditions requiring surgical intervention. Her expertise ensures optimal outcomes for her patients.",
                    services: [
                        "Mohs surgery",
                        "Excision of skin lesions",
                        "Scar revision",
                    ],
                    image: "https://via.placeholder.com/150/DDEEFF/FFFFFF?Text=Dr.Nadia", // Replace with actual image URL
                },
                // Add data for other doctors based on their IDs
            };
            resolve(doctorData[parseInt(id)]);
        }, 500);
    });
};

const DoctorProfile = () => {
    const { doctorId } = useParams();
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetchDoctorById(doctorId)
            .then((data) => {
                if (data) {
                    setDoctor(data);
                    setLoading(false);
                } else {
                    setError("Doctor not found.");
                    setLoading(false);
                }
            })
            .catch((err) => {
                setError("Failed to load doctor profile.");
                setLoading(false);
                console.error("Error fetching doctor:", err);
            });
    }, [doctorId]);

    if (loading) {
        return (
            <div className="py-8 px-6 text-center">
                Loading doctor profile...
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-8 px-6 text-center text-red-500">{error}</div>
        );
    }

    if (!doctor) {
        return <div className="py-8 px-6 text-center">Doctor not found.</div>;
    }

    const { name, specialty, experience, education, about, services, image } =
        doctor;

    return (
        <div className="bg-gray-100 py-10">
            <div className="container mx-auto px-6 md:px-12 lg:px-24">
                <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                    <div className="relative">
                        <img
                            src={image}
                            alt={name}
                            className="w-full h-64 object-cover"
                        />
                        <div className="absolute bottom-0 left-0 bg-blue-600 bg-opacity-75 text-white w-full p-4">
                            <h2 className="text-xl font-semibold">{name}</h2>
                            <p className="text-sm">{specialty}</p>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center mb-4">
                            <FaBriefcase className="text-blue-500 mr-2" />
                            <p className="text-gray-700 font-semibold">
                                {experience} of experience
                            </p>
                        </div>
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                About the Doctor
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                {about}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                Services Provided
                            </h3>
                            <ul className="list-none pl-0 text-gray-700">
                                {services.map((service, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center mb-1"
                                    >
                                        <FaCheckCircle className="text-green-500 mr-2" />
                                        {service}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {education && (
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                    <FaGraduationCap className="text-blue-500 mr-2" />{" "}
                                    Education
                                </h3>
                                <p className="text-gray-700">{education}</p>
                            </div>
                        )}

                        <div className="mt-6 border-t pt-4">
                            <Link
                                to="/contact"
                                className="inline-flex items-center bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md focus:outline-none focus:shadow-outline"
                            >
                                <FaEnvelope className="mr-2" /> Contact Doctor
                            </Link>
                            <Link
                                to="/doctors"
                                className="inline-block ml-4 text-blue-500 hover:underline"
                            >
                                Back to Doctors
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorProfile;
