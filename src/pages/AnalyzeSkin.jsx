import React, { useState, useEffect } from "react";

// Mock data for doctors (replace with actual data fetching)
const mockDoctors = [
    { id: "doctor1", name: "Dr. Alice Smith" },
    { id: "doctor2", name: "Dr. Bob Johnson" },
    { id: "doctor3", name: "Dr. Carol Williams" },
];

const AnalyzeSkin = () => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [analysisLoading, setAnalysisLoading] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const [analysisError, setAnalysisError] = useState(null);
    const [showSendToDoctor, setShowSendToDoctor] = useState(false);  // Control visibility
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [sendToDoctorLoading, setSendToDoctorLoading] = useState(false);
    const [sendToDoctorError, setSendToDoctorError] = useState(null);
    const [sendToDoctorSuccess, setSendToDoctorSuccess] = useState(false);

    // Clear messages
    useEffect(() => {
        setSendToDoctorError(null);
        setSendToDoctorSuccess(false);
    }, [selectedDoctor, analysisResult]);

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
            alert("Please select at least one image."); // Basic validation
            return;
        }

        setUploading(true);
        setAnalysisLoading(true);
        setUploadError(null);
        setAnalysisError(null);
        setShowSendToDoctor(false); // Reset send to doctor state

        try {
            console.log("Uploading and analyzing images:", selectedImages);
            await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate longer analysis

            const dummyResult = {
                title: "Combined Skin Analysis",
                description:
                    "Analysis of the uploaded images suggests potential areas of concern. Further examination by a dermatologist is recommended for a comprehensive evaluation.",
            };
            setAnalysisResult(dummyResult);
            setShowSendToDoctor(true); // Show button after successful analysis
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
        setShowSendToDoctor(false); // Also reset this state
        setSelectedDoctor("");
        setSendToDoctorError(null);
        setSendToDoctorSuccess(false);
    };

    const handleSendToDoctor = async () => {
        if (!selectedDoctor) {
            setSendToDoctorError("Please select a doctor.");
            return;
        }
        setSendToDoctorLoading(true);
        setSendToDoctorError(null);
        setSendToDoctorSuccess(false);

        try {
            // Simulate sending data
            console.log(
                "Sending analysis result to doctor:",
                selectedDoctor,
                analysisResult
            );
            await new Promise((resolve) => setTimeout(resolve, 2000));

            setSendToDoctorSuccess(true);
        } catch (error) {
            console.error("Failed to send result to doctor", error);
            setSendToDoctorError(
                "Failed to send analysis to the doctor. Please try again."
            );
        } finally {
            setSendToDoctorLoading(false);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <div className="container mx-auto p-6 bg-white rounded-lg shadow-md flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2 ">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        Uploaded Images
                    </h3>
                    {imagePreviewUrls.length > 0 ? (
                        <div className="flex flex-wrap -mx-2">
                            {imagePreviewUrls.map((previewUrl, index) => (
                                <div
                                    key={index}
                                    className="w-1/2 sm:w-1/3 md:w-1/2 lg:w-1/3 xl:w-1/4 px-2 mb-4 relative"
                                >
                                    <img
                                        src={previewUrl}
                                        alt={`Uploaded Skin ${index + 1}`}
                                        className="w-full h-32 object-cover rounded-md shadow-md"
                                    />
                                    <button
                                        type="button"
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-700 focus:outline-none focus:shadow-outline"
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
                        onClick={handleUploadAnotherImage}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline"

                    >
                        Clear Images
                    </button>
                    {uploadError && (
                        <p className="text-red-500 text-xs italic mt-1">{uploadError}</p>
                    )}
                </div>

                <div className="md:w-1/2 ">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Analysis</h3>
                    {analysisResult ? (
                        <div className="rounded-md shadow-md p-4 bg-gray-100 mb-4">
                            <h4 className="text-xl font-semibold text-blue-700 mb-2">
                                {analysisResult.title}
                            </h4>
                            <p className="text-gray-700 mb-4">{analysisResult.description}</p>
                        </div>
                    ) : (
                        <div className="bg-gray-100 rounded-md p-4 text-gray-600 italic">
                            Upload one or more skin images to begin analysis.
                        </div>
                    )}

                    <div className="mb-4">
                        <label
                            htmlFor="imageUpload"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Upload More Images
                        </label>
                        <input
                            type="file"
                            id="imageUpload"
                            onChange={handleImageChange}
                            accept="image/*"
                            multiple
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

                        />
                    </div>

                    <button
                        onClick={handleUploadAndAnalyze}
                        disabled={
                            selectedImages.length === 0 || uploading || analysisLoading
                        }
                        className={`w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline ${
                            uploading || analysisLoading || selectedImages.length === 0
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                        }`}
                    >
                        {uploading
                            ? "Uploading..."
                            : analysisLoading
                            ? "Analyzing..."
                            : "Analyze Images"}
                    </button>
                    {analysisError && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
                            <strong className="font-bold">Error: </strong>
                            <span className="block sm:inline">{analysisError}</span>
                        </div>
                    )}

                    {/* Send to Doctor Section */}
                    {showSendToDoctor && analysisResult && (
                        <div className="mt-6">
                            <h4 className="text-md font-semibold text-gray-800 mb-3">
                                Send Results to Doctor
                            </h4>
                            <select
                                onChange={(e) => setSelectedDoctor(e.target.value)}
                                value={selectedDoctor}
                                disabled={sendToDoctorLoading}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

                            >
                                <option value="">Select a doctor</option>
                                {mockDoctors.map((doctor) => (
                                    <option key={doctor.id} value={doctor.id}>
                                        {doctor.name}
                                    </option>
                                ))}
                            </select>
                            {sendToDoctorError && (
                                <p className="text-red-500 text-xs italic mt-2">
                                    {sendToDoctorError}
                                </p>
                            )}
                            {sendToDoctorSuccess && (
                                <p className="text-green-500 text-sm mt-2">
                                    Analysis sent to doctor successfully!
                                </p>
                            )}
                            <button
                                onClick={handleSendToDoctor}
                                disabled={sendToDoctorLoading || !selectedDoctor}
                                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline"

                            >
                                {sendToDoctorLoading ? "Sending..." : "Send to Doctor"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AnalyzeSkin;
