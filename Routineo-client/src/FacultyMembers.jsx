import React from "react";

const FacultyMembers = () => {
  const facultyMembers = [
    {
      name: "Ms. Kasturi Dikpati",
      designation: "Assistant Professor",
      qualifications: "M.E.",
      description:
        "Lorem ipsum is a dummy text that web developers use to test how their HTML templates will look with real data. The original Lorem ipsum came from a section of the book De Finibus Bonorum et Dolorem by the Ancient Roman author Cicero",
      photo: "Routineo/Routineo-client/src/image/DI.webp", 
    },
    {
      name: "Mr. Arindam Chowdhury",
      designation: "Assistant Professor",
      qualifications: "M.Tech",
      description:
        "Lorem ipsum is a dummy text that web developers use to test how their HTML templates will look with real data. The original Lorem ipsum came from a section of the book De Finibus Bonorum et Dolorem by the Ancient Roman author Cicero",
      photo: "Routineo/Routineo-client/src/image/DI.webp",
    },
    {
      name: "Ms. Nabanita Das",
      designation: "Assistant Professor",
      qualifications: "M.E.",
      description:
        "Lorem ipsum is a dummy text that web developers use to test how their HTML templates will look with real data. The original Lorem ipsum came from a section of the book De Finibus Bonorum et Dolorem by the Ancient Roman author Cicero",
      photo: "Routineo/Routineo-client/src/image/DI.webp",
    },
    {
      name: "Dr. Partha Sarathi Chakraborty",
      designation: "Assistant Professor	",
      qualifications: "M.E, PhD",
      description:
        "Lorem ipsum is a dummy text that web developers use to test how their HTML templates will look with real data. The original Lorem ipsum came from a section of the book De Finibus Bonorum et Dolorem by the Ancient Roman author Cicero",
      photo: "Routineo/Routineo-client/src/image/DI.webp",
    },
    {
      name: "Dr. Shiladitya Pujari",
      designation: "Assistant Professor	",
      qualifications: "M.E, PhD",
      description:
        "Lorem ipsum is a dummy text that web developers use to test how their HTML templates will look with real data. The original Lorem ipsum came from a section of the book De Finibus Bonorum et Dolorem by the Ancient Roman author Cicero",
      photo: "Routineo/Routineo-client/src/image/DI.webp",
    },
  ];

  return (
    <div className="bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Meet Our IT Faculty
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {facultyMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={member.photo}
                alt={member.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  {member.name}
                </h2>
                <p className="text-gray-600 italic">{member.designation}</p>
                <p className="text-gray-500 mt-1">
                  <strong>Qualifications:</strong> {member.qualifications}
                </p>
                <p className="text-gray-700 mt-3">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FacultyMembers;
