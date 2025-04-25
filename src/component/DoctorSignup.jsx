import React from "react";
import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaBriefcase,
    FaUniversity,
    FaList,
    FaInfoCircle,
} from "react-icons/fa";

const DoctorSignup = ({ formData, handleChange, showExtraFields, setShowExtraFields, setFormData }) => {

    const handleServiceChange = (index) => (e) => {
        const newServices = [...formData.services];
        newServices[index] = e.target.value;
        setFormData({ ...formData, services: newServices });
    };
    
    const addServiceField = () => {
        setFormData({ ...formData, services: [...formData.services, ""] });
    };
    

    return (
        <div className="space-y-6">
            {!showExtraFields ? (
                <>
                    <div className="relative">
                        <FaUser className="absolute left-3 top-3 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange("name")}
                            className="w-full px-10 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                            className="w-full px-10 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                            className="w-full px-10 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    <div className="relative">
                        <FaBriefcase className="absolute left-3 top-3 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Experience"
                            value={formData.experience}
                            onChange={handleChange("experience")}
                            className="w-full px-10 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    <div className="relative">
                        <FaUniversity className="absolute left-3 top-3 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Education"
                            value={formData.education}
                            onChange={handleChange("education")}
                            className="w-full px-10 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    <button
                        type="button"
                        onClick={() => setShowExtraFields(true)}
                        className="w-full bg-yellow-500 text-white py-3 rounded-md hover:bg-yellow-600 transition duration-300 ease-in-out"
                    >
                        Complete More Info
                    </button>
                </>
            ) : (
                <>
                <div className="relative mt-4">
                        <FaInfoCircle className="absolute left-3 top-3 text-gray-500" />
                        <textarea
                            placeholder="About You"
                            value={formData.about}
                            onChange={handleChange("about")}
                            className="w-full h-[120px] px-10 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>
                    {/* Service Fields */}
                    {formData.services.map((service, index) => (
                        <div key={index} className="relative mb-4">
                            <FaList className="absolute left-3 top-3 text-gray-500" />
                            <input
                                type="text"
                                placeholder={`Service #${index + 1}`}
                                value={service}
                                onChange={handleServiceChange(index)}
                                className="w-full px-10 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addServiceField}
                        className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
                    >
                        + Add Another Service
                    </button>                    
                </>
            )}
        </div>
    );
};

export default DoctorSignup;
