// component/ProfileLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar'; // Assuming Sidebar is in the same directory

const ProfileLayout = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex">
            <Sidebar />
            <div className="flex-1 py-12 px-6 md:px-12 lg:px-24">
                <Outlet />
            </div>
        </div>
    );
};

export default ProfileLayout;