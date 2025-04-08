import React, { useState } from "react";

const PatientProfile = () => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [analysisLoading, setAnalysisLoading] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const [analysisError, setAnalysisError] = useState(null);

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        const newImages = [];
        const newPreviewUrls = [];
        let reader;

        files.forEach((file) => {
            reader = new FileReader();
            reader.onloadend = () => {
                newImages.push(file);
                newPreviewUrls.push(reader.result);

                if (newImages.length === files.length) {
                    setSelectedImages([...selectedImages, ...newImages]);
                    setImagePreviewUrls([...imagePreviewUrls, ...newPreviewUrls]);
                }
            };

            if (file) {
                reader.readAsDataURL(file);
            }
        });
    };

    const handleRemoveImage = (index) => {
        const newSelectedImages = [...selectedImages];
        newSelectedImages.splice(index, 1);
        setSelectedImages(newSelectedImages);

        const newImagePreviewUrls = [...imagePreviewUrls];
        newImagePreviewUrls.splice(index, 1);
        setImagePreviewUrls(newImagePreviewUrls);
    };

    const handleUploadAndAnalyze = async () => {
        if (selectedImages.length === 0) {
            alert("Please select at least one image.");
            return;
        }

        setUploading(true);
        setAnalysisLoading(true);
        setUploadError(null);
        setAnalysisError(null);

        try {
            // Simulate API call for image upload and analysis of multiple images
            console.log("Uploading and analyzing images:", selectedImages);
            await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate longer analysis

            // Simulate analysis result for multiple images
            const dummyResult = {
                title: "Combined Skin Analysis",
                description: "Analysis of the uploaded images suggests potential areas of concern. Further examination by a dermatologist is recommended for a comprehensive evaluation.",
                // You might have more detailed results per image in a real scenario
            };
            setAnalysisResult(dummyResult);
        } catch (error) {
            console.error("Error during upload and analysis:", error);
            setAnalysisError("Failed to analyze images. Please try again.");
        } finally {
            setUploading(false);
            setAnalysisLoading(false);
        }
    };

    const handleUploadAnotherImage = () => {
        setSelectedImages([]);
        setImagePreviewUrls([]);
        setAnalysisResult(null);
        setUploadError(null);
        setAnalysisError(null);
    };

    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <div className="container mx-auto p-6 bg-white rounded-lg shadow-md flex flex-col md:flex-row">
                {/* Image Area */}
                <div className="md:w-1/2 pr-4 mb-4 md:mb-0">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Uploaded Images</h3>
                    {imagePreviewUrls.length > 0 ? (
                        <div className="flex flex-wrap -mx-2">
                            {imagePreviewUrls.map((previewUrl, index) => (
                                <div key={index} className="w-1/2 sm:w-1/3 md:w-1/2 lg:w-1/3 xl:w-1/4 px-2 mb-4 relative">
                                    <img
                                        src={previewUrl}
                                        alt={`Uploaded Skin ${index + 1}`}
                                        className="w-full h-32 object-cover rounded-md shadow-md"
                                    />
                                    <button
                                        type="button"
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-700 focus:outline-none focus:shadow-outline"
                                        onClick={() => handleRemoveImage(index)}
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="w-full h-32 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                            No images uploaded
                        </div>
                    )}
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline"
                        onClick={handleUploadAnotherImage}
                    >
                        Clear Images
                    </button>
                    {uploadError && <p className="text-red-500 text-xs italic mt-1">{uploadError}</p>}
                </div>

                {/* Analysis Area */}
                <div className="md:w-1/2 pl-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Analysis</h3>
                    {analysisResult ? (
                        <div className="rounded-md shadow-md p-4 bg-gray-100">
                            <h4 className="text-xl font-semibold text-blue-700 mb-2">
                                {analysisResult.title}
                            </h4>
                            <p className="text-gray-700 mb-4">{analysisResult.description}</p>
                            {/* Add more detailed analysis results here if needed */}
                        </div>
                    ) : (
                        <div className="bg-gray-100 rounded-md p-4 text-gray-600 italic">
                            Upload one or more skin images to begin analysis.
                        </div>
                    )}

                    <div className="mt-4">
                        <label
                            htmlFor="imageUpload"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Upload More Images
                        </label>
                        <input
                            type="file"
                            id="imageUpload"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            onChange={handleImageChange}
                            accept="image/*"
                            multiple
                        />
                    </div>

                    <button
                        className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline ${uploading || analysisLoading || selectedImages.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={handleUploadAndAnalyze}
                        disabled={selectedImages.length === 0 || uploading || analysisLoading}
                    >
                        {uploading ? 'Uploading...' : (analysisLoading ? 'Analyzing...' : 'Analyze Images')}
                    </button>
                    {analysisError && <p className="text-red-500 mt-2 text-xs italic">{analysisError}</p>}
                </div>
            </div>
        </div>
    );
};

export default PatientProfile;