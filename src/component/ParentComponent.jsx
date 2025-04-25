import React, { useState } from "react";
import DoctorSignup from "./DoctorSignup"; // Adjust the import path as necessary

const ParentComponent = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        experience: "",
        education: "",
        services: [""], // Start with one service field
        about: "",
    });

    const [showExtraFields, setShowExtraFields] = useState(false); // Add state for toggling extra fields

    const handleChange = (field) => (e) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    return (
        <div>
            <DoctorSignup
                formData={formData}
                handleChange={handleChange}
                setFormData={setFormData}  // Pass setFormData as a prop
                showExtraFields={showExtraFields}  // Pass showExtraFields state
                setShowExtraFields={setShowExtraFields} // Pass setShowExtraFields to toggle visibility of extra fields
            />
        </div>
    );
};

export default ParentComponent;
