import React from "react";

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-gray-100 py-10 px-5">
            <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">About Us</h1>
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Sourav Karmakar Section */}
                    <div className="flex flex-col items-center">
                        <div className="w-48 h-48 rounded-full bg-gray-300 overflow-hidden shadow-md">
                            {/* Replace with actual photo */}
                            <img
                                src="Routineo/Routineo-client/src/image/DI.webp"
                                alt="Sourav Karmakar"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-700 mt-6">Sourav Karmakar</h2>
                        <p className="text-gray-500 mt-2 italic">Information Technology</p>
                        <p className="text-gray-600 mt-4 text-center">
                            Sourav Karmakar is an aspiring IT professional with expertise in developing and
                            optimizing web-based applications. His passion for coding and innovative thinking
                            drives him to deliver effective solutions that simplify complex processes.
                        </p>
                    </div>

                    {/* Suraia Midda Section */}
                    <div className="flex flex-col items-center">
                        <div className="w-48 h-48 rounded-full bg-gray-300 overflow-hidden shadow-md">
                            {/* Replace with actual photo */}
                            <img
                                src="Routineo/Routineo-client/src/image/DI.webp"
                                alt="Sourav Karmakar"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-700 mt-6">Suraia Midda</h2>
                        <p className="text-gray-500 mt-2 italic">Information Technology</p>
                        <p className="text-gray-600 mt-4 text-center">
                            Suraia Midda is an aspiring IT professional with expertise in developing and
                            optimizing web-based applications. His passion for coding and innovative thinking
                            drives him to deliver effective solutions that simplify complex processes.
                        </p>
                    </div>


                    {/* Srijon Sinha Section */}
                    <div className="flex flex-col items-center">
                        <div className="w-48 h-48 rounded-full bg-gray-300 overflow-hidden shadow-md">
                            {/* Replace with actual photo */}
                            <img
                                src="Routineo/Routineo-client/src/image/DI.webp"
                                alt="Srijon Sinha"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-700 mt-6">Srijon Sinha</h2>
                        <p className="text-gray-500 mt-2 italic">Information Technology</p>
                        <p className="text-gray-600 mt-4 text-center">
                            Srijon Sinha brings a creative and analytical approach to IT. He is dedicated to
                            building user-friendly and efficient systems while continuously expanding his skillset
                            in the ever-evolving tech industry.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
