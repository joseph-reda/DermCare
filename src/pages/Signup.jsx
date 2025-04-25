import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearError } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaBriefcase,
    FaUniversity,
} from "react-icons/fa";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("patient");
    const [experience, setExperience] = useState("");
    const [education, setEducation] = useState("");
    const [isDoctor, setIsDoctor] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, user } = useSelector((state) => state.auth);

    const handleSignup = (e) => {
        e.preventDefault();
        const userData = { name, email, password, role };
        if (isDoctor) {
            userData.experience = experience;
            userData.education = education;
        }
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

    const handlePatientView = () => {
        setIsDoctor(false);
        setRole("patient");
        setExperience("");
        setEducation("");
    };

    const handleDoctorView = () => {
        setIsDoctor(true);
        setRole("doctor");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 shadow-lg rounded-lg w-96">
                <h2 className="text-2xl font-semibold text-center mb-6">
                    Sign Up
                </h2>
                {error && (
                    <p className="text-red-500 text-sm text-center mb-4">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSignup} className="space-y-6">
                    <div className="relative">
                        <FaUser className="absolute left-3 top-3 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-10 py-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="relative">
                        <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-10 py-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="relative">
                        <FaLock className="absolute left-3 top-3 text-gray-500" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-10 py-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {isDoctor && (
                        <>
                            <div className="relative">
                                <FaBriefcase className="absolute left-3 top-3 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Experience (Years)"
                                    value={experience}
                                    onChange={(e) =>
                                        setExperience(e.target.value)
                                    }
                                    className="w-full px-10 py-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="relative">
                                <FaUniversity className="absolute left-3 top-3 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="University"
                                    value={education}
                                    onChange={(e) =>
                                        setEducation(e.target.value)
                                    }
                                    className="w-full px-10 py-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </>
                    )}

                    <div className="flex flex-col sm:flex-row justify-between mt-6 text-[15px]">
                        <button
                            type="submit"
                            className="w-[100px] bg-green-600 p-2 text-white py-3 rounded-md hover:bg-green-700 transition"
                            disabled={loading}
                        >
                            {loading
                                ? "Signing up..."
                                : isDoctor
                                ? "Sign Up"
                                : "Sign Up"}
                        </button>
                        <button
                            type="button"
                            className="bg-gray-300 p-2 text-gray-700 py-3 rounded-md hover:bg-gray-400 transition"
                            onClick={
                                isDoctor ? handlePatientView : handleDoctorView
                            }
                        >
                            {isDoctor
                                ? "Sign Up as Patient"
                                : "Sign Up as Doctoe"}
                        </button>
                    </div>
                </form>

                <p className="text-sm text-center mt-6">
                    Already have an account?
                    <a href="/login" className="text-blue-500 hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Signup;
