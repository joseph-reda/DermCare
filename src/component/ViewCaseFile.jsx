import React from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

// Dummy case file data (replace with your actual API fetch)
const dummyCaseFiles = {
    101: {
        patientName: "Alice Smith",
        caseNumber: "001",
        date: "October 23, 2024",
        risk: "Medium (65%)",
        patientCondition: "Psoriasis",
        description:
            "Psoriasis is a chronic autoimmune condition that causes skin cells to grow too quickly, leading to thick, red, scaly patches that can be itchy or painful. These patches often appear on the elbows, knees, scalp, and lower back, but they can occur anywhere on the body. Psoriasis is a non-contagious condition with periods of flare-ups and remission.",
        images: ["/images/psoriasis_example.jpg"], // Replace with actual image paths
    },
    102: {
        patientName: "Bob Johnson",
        caseNumber: "002",
        date: "November 15, 2024",
        risk: "Low (30%)",
        patientCondition: "Eczema",
        description:
            "Eczema (atopic dermatitis) is a condition that makes your skin red and itchy. It's common in children but can occur at any age. Eczema is long-lasting (chronic) and tends to flare periodically. It may be accompanied by asthma or hay fever. The exact cause of eczema is unknown, but it's likely due to a combination of genetic and environmental factors.",
        images: ["/images/eczema_example.jpg"], // Replace with actual image paths
    },
    103: {
        patientName: "Charlie Brown",
        caseNumber: "003",
        date: "December 01, 2024",
        risk: "High (80%)",
        patientCondition: "Severe Acne",
        description:
            "Severe acne is characterized by numerous inflamed papules, pustules, nodules, and cysts. These breakouts can be painful and may lead to scarring. It often requires prescription-strength medication to manage. Factors contributing to severe acne can include hormones, bacteria, excess oil production, and inflammation.",
        images: ["/images/severe_acne_example.jpg"], // Replace with actual image paths
    },
};

const ViewCaseFile = () => {
    const { patientId } = useParams();
    const caseData = dummyCaseFiles[patientId];

    if (!caseData) {
        return (
            <div className="bg-gray-100 min-h-screen py-8">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Case File Not Found
                        </h2>
                        <p className="text-gray-600">
                            No case file found for patient ID: {patientId}
                        </p>
                        <Link
                            to="/my-patients"
                            className="inline-flex items-center mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-md focus:outline-none focus:shadow-outline"
                        >
                            <FaArrowLeft className="mr-2" /> Back to My Patients
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <Link
                            to="/my-patients"
                            className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-md focus:outline-none focus:shadow-outline"
                        >
                            <FaArrowLeft className="mr-2" /> Back to My Patients
                        </Link>
                        <h2 className="text-xl font-semibold text-blue-600 tracking-tight">
                            Case: {caseData.caseNumber}
                        </h2>
                    </div>
                    <div className="bg-gray-50 rounded-md p-4 mb-4">
                        <div className="flex items-center space-x-4 mb-2">
                            <div className="w-16 h-16 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 text-2xl font-semibold">
                                {caseData.patientName.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {caseData.patientName}
                                </h3>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm sm:text-base">
                            <div>
                                <span className="font-semibold text-gray-700">
                                    Date:
                                </span>{" "}
                                {caseData.date}
                            </div>
                            <div>
                                <span className="font-semibold text-gray-700">
                                    Risk:
                                </span>{" "}
                                <span
                                    className={
                                        caseData.risk.includes("High")
                                            ? "text-red-500 font-semibold"
                                            : caseData.risk.includes("Medium")
                                            ? "text-orange-500 font-semibold"
                                            : "text-green-500 font-semibold"
                                    }
                                >
                                    {caseData.risk}
                                </span>
                            </div>
                            <div className="col-span-2">
                                <span className="font-semibold text-gray-700">
                                    Patient's Condition:
                                </span>{" "}
                                {caseData.patientCondition}
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">
                            Description
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                            {caseData.description}
                        </p>
                    </div>
                    {caseData.images && caseData.images.length > 0 && (
                        <div>
                            <h4 className="text-lg font-semibold text-gray-800 mb-2">
                                Images
                            </h4>
                            <div className="grid grid-cols-1 gap-4">
                                {caseData.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`Case Image ${index + 1}`}
                                        className="rounded-md shadow-sm"
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <footer className="py-6 mt-8 bg-gray-200 rounded-lg shadow-md">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-gray-600 text-sm">
                        <div>Contact Us</div>
                        <div>Follow Us</div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default ViewCaseFile;
