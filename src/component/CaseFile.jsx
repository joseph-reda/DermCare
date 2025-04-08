import React from "react";
import { FaTimes } from "react-icons/fa"; // Import the close icon

import case1 from "../assets/images/skin1.jpeg";
import case2 from "../assets/images/skin2.jpeg";

const CaseFile = () => {
    // Simulate fetching case data (replace with your actual data fetching logic)
    const [caseData, setCaseData] = React.useState([
        {
            id: 1, // Added a unique ID for each case
            title: "Possible Eczema on Forearm",
            date: "2025-04-07",
            description:
                "Patient presented with a red, itchy rash on the inner forearm. The area is slightly raised and dry.",
            diagnosis: "Likely Atopic Dermatitis (Eczema)",
            images: [case1],
        },
        {
            id: 2, // Added a unique ID for each case
            title: "Suspected Psoriasis on Elbow",
            date: "2024-01-09",
            description:
                "Patient presented with scaly, silvery patches on the elbow. The skin is thickened and slightly inflamed.",
            diagnosis: "Likely Psoriasis",
            images: [case2],
        },
        // Add more case data here
    ]);

    const handleDeleteCase = (caseId) => {
        // In a real application, you would likely make an API call to delete the case
        console.log(`Deleting case with ID: ${caseId}`);
        setCaseData(caseData.filter((caseItem) => caseItem.id !== caseId));
    };

    if (!caseData || caseData.length === 0) {
        return <div className="p-6 text-gray-600">No case data available.</div>;
    }

    return (
        <div className="bg-gray-100 min-h-screen py-12">
            <div className="container mx-auto px-6 md:px-12 lg:px-24">
                <h2 className="text-3xl font-semibold text-blue-600 mb-8 tracking-tight text-center">
                    Case Files
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {caseData.map((caseItem) => (
                        <div
                            key={caseItem.id}
                            className="bg-white rounded-lg shadow-md p-6 flex flex-col h-full relative" // Added relative for absolute positioning of the button
                        >
                            <button
                                onClick={() => handleDeleteCase(caseItem.id)}
                                className="absolute top-2 right-2 text-gray-500 hover:text-red-500 focus:outline-none transition duration-200"
                            >
                                <FaTimes />
                            </button>
                            <h3 className="text-xl font-semibold text-blue-700 mb-4">
                                {caseItem.title}
                            </h3>
                            <p className="text-gray-600 mb-2">
                                <span className="font-semibold">Date:</span>{" "}
                                {caseItem.date}
                            </p>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                                <span className="font-semibold">
                                    Description:
                                </span>{" "}
                                {caseItem.description}
                            </p>
                            {caseItem.diagnosis && (
                                <p className="text-green-600 font-semibold mb-4">
                                    Diagnosis: {caseItem.diagnosis}
                                </p>
                            )}

                            {caseItem.images && caseItem.images.length > 0 && (
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                                        Images:
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {caseItem.images.map(
                                            (image, imgIndex) => (
                                                <img
                                                    key={imgIndex}
                                                    src={image}
                                                    alt={`Case Image ${
                                                        imgIndex + 1
                                                    } for ${caseItem.title}`}
                                                    className="rounded-md shadow-sm object-cover aspect-square"
                                                />
                                            )
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CaseFile;
