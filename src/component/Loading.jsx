import React from 'react';

const Loading = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-100 bg-opacity-50 flex flex-col justify-center items-center z-50">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
            <p className="mt-4 text-lg text-gray-700">Loading...</p>
        </div>
    );
};

export default Loading;