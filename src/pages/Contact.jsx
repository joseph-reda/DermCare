import React, { useState } from "react";

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [submissionStatus, setSubmissionStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmissionStatus("loading");

        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            console.log("Form submitted:", { name, email, message });
            setName("");
            setEmail("");
            setMessage("");
            setSubmissionStatus("success");
        } catch (error) {
            console.error("Form submission error:", error);
            setSubmissionStatus("error");
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen py-16">
            <div className="container mx-auto px-6 md:px-12 lg:px-24">
                <section className="mb-12 text-center">
                    <h2 className="text-3xl font-semibold text-blue-600 mb-6 tracking-tight">
                        Contact Us
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        We'd love to hear from you. Please fill out the form
                        below.
                    </p>
                </section>

                <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-8 md:p-10 lg:p-12">
                    {submissionStatus === "success" && (
                        <div
                            className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-sm"
                            role="alert"
                        >
                            <p className="font-semibold">Success!</p>
                            <p>
                                Your message has been sent. We will get back to
                                you as soon as possible.
                            </p>
                        </div>
                    )}

                    {submissionStatus === "error" && (
                        <div
                            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-sm"
                            role="alert"
                        >
                            <p className="font-semibold">Error!</p>
                            <p>
                                There was an error submitting your message.
                                Please try again later.
                            </p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="message"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Message
                            </label>
                            <textarea
                                id="message"
                                rows="5"
                                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline transition duration-300"
                            disabled={submissionStatus === "loading"}
                        >
                            {submissionStatus === "loading"
                                ? "Sending..."
                                : "Send Message"}
                        </button>
                    </form>

                    <div className="mt-10 text-center text-gray-600">
                        <h3 className="text-xl font-semibold mb-3">
                            Our Location
                        </h3>
                        <p className="mb-2">
                            6th of October City, Giza Governorate, Egypt
                        </p>
                        <p className="mt-4">
                            For urgent inquiries, please email us at
                            <a
                                href="mailto:info@dermascan.com"
                                className="text-blue-500 hover:underline transition duration-300"
                            >
                                info@dermascan.com
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
