import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ProfileInfo = () => {
    const { user } = useSelector((state) => state.auth);

    if (!user) {
        return (
            <div className=""> 
            </div>
        );
    }

    return (
        <div className="rounded-lg shadow-md p-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 col-span-full">
                Your Profile
            </h2>
            <div>
                <strong className="block text-gray-700 mb-1">
                    Full Name:
                </strong>
                <p className="text-gray-800">
                    {user.name || "Not available"}
                </p>
            </div>
            <div>
                <strong className="block text-gray-700 mb-1">
                    Email:
                </strong>
                <p className="text-gray-800">
                    {user.email || "Not available"}
                </p>
            </div>
            {user.role && (
                <div>
                    <strong className="block text-gray-700 mb-1">
                        Role:
                    </strong>
                    <p className="text-gray-800">{user.role}</p>
                </div>
            )}
            {user?.role === "doctor" && user.specialty && (
                <div>
                    <strong className="block text-gray-700 mb-1">
                        Specialty:
                    </strong>
                    <p className="text-gray-800">
                        {user.specialty}
                    </p>
                </div>
            )}
            {user?.role === "doctor" && user.location && (
                <div>
                    <strong className="block text-gray-700 mb-1">
                        Location:
                    </strong>
                    <p className="text-gray-800">{user.location}</p>
                </div>
            )}
            {user?.role === "doctor" && (
                <div className="md:col-span-2 mt-6 border-t pt-6">
                    <Link
                        to="/my-patients"
                        className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        View My Patients
                    </Link>
                </div>
            )}
            {user?.role === "patient" && (
                <div className="md:col-span-2 mt-6 border-t pt-6">
                    <p className="text-gray-600 mb-4">
                        Welcome, Patient! You can browse doctors and
                        manage your appointments here.
                    </p>
                    <Link
                        to="/doctors"
                        className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Find a Doctor
                    </Link>
                </div>
            )}
        </div>
    );
};

export default ProfileInfo;