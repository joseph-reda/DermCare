import React, { useState, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearError } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import DoctorSignup from "../component/DoctorSignup";
import PatientSignup from "../component/PatientSignup";

const Signup = () => {
    const [isDoctor, setIsDoctor] = useState(false);
    const [showExtraFields, setShowExtraFields] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        experience: "",
        education: "",
        services: [""],
        about: ""
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, user } = useSelector((state) => state.auth);

    const handleChange = (field) => (e) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const handleSignup = (e) => {
        e.preventDefault();
        const { name, email, password, experience, education, services, about } = formData;
        const userData = {
            name,
            email,
            password,
            role: isDoctor ? "doctor" : "patient",
            ...(isDoctor && { experience, education, services, about }),
        };
        dispatch(registerUser(userData));
    };

    useLayoutEffect(() => {
        if (user) {
            navigate("/home");
        }
        return () => {
            dispatch(clearError());
        };
    }, [user, navigate, dispatch]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-blue-600 text-white">
            <div className="w-full max-w-md p-8 rounded-lg shadow-xl bg-white text-gray-800">
                <div className="mb-6 text-center">
                    <h2 className="text-3xl font-bold">Create an Account</h2>
                    <p className="text-sm text-gray-500 mt-2">Please choose your role and provide the necessary information.</p>
                </div>

                <div className="flex justify-center mb-6 space-x-4">
                    <button
                        onClick={() => { setIsDoctor(false); setShowExtraFields(false); }}
                        className={`px-6 py-3 rounded-md text-lg font-medium transition duration-300 ease-in-out ${
                            !isDoctor ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-800"
                        } hover:bg-blue-700`}
                    >
                        Patient Sign Up
                    </button>
                    <button
                        onClick={() => { setIsDoctor(true); setShowExtraFields(false); }}
                        className={`px-6 py-3 rounded-md text-lg font-medium transition duration-300 ease-in-out ${
                            isDoctor ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-800"
                        } hover:bg-blue-700`}
                    >
                        Doctor Sign Up
                    </button>
                </div>

                <form onSubmit={handleSignup} className="space-y-6">
                    {error && <p className="text-red-500 text-center">{error}</p>}

                    {isDoctor ? (
                        <DoctorSignup
                            formData={formData}
                            handleChange={handleChange}
                            showExtraFields={showExtraFields}
                            setShowExtraFields={setShowExtraFields}
                            setFormData={setFormData}
                        />
                    ) : (
                        <PatientSignup
                            formData={formData}
                            handleChange={handleChange}
                            setFormData={setFormData}
                        />
                    )}

                    {(!isDoctor || showExtraFields) && (
                        <button
                            type="submit"
                            className="w-full bg-green-600 p-3 rounded-md text-white font-semibold transition duration-300 ease-in-out hover:bg-green-700"
                            disabled={loading}
                        >
                            {loading ? "Signing up..." : "Sign Up"}
                        </button>
                    )}

                    <p className="text-sm text-center mt-6 text-gray-500">
                        Already have an account? 
                        <a href="/login" className="text-blue-500 hover:underline ml-1">Login</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
