import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../Home/Home";
import StudentRegistration from "../Registration/StudentRegistration";
import TeacherRegistration from "../Registration/TeacherRegistration";
import CRRegistration from "../Registration/CRRegistration";
import App from "../App";
import NewRoutine from "../NewRourine.jsx/NewRoutine";
import ClassRoutine from "../ClassRoutine/ClassRoutine";
import FullRoutine from "../Table/FullRoutine";
import ClassAttendance from "../ClassAttendance/ClassAttendance";
import FacultyMembers from "../FacultyMembers";
import AboutUs from "../AboutUs";
import Contact from "../Contact";
import Help from "../Help";
import StudentLogin from "../Login/StudentLogin";
import TeacherLogin from "../Login/TeacherLogin";
import OTPVerification from "../Components/OTPVerification";
import ForgotPassword from "../Components/ForgotPassword";
import ResetPassword from "../Components/ResetPassword";
import Logout from "../Components/Logout";
import UploadStudents from "../UploadStudents/UploadStudents";

// Define the routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Main App component
    children: [
      {
        path: "/",
        element: <Home />, // Home component renders here
      },
      // {
      //   path: "/loader",
      //   element:<HashLoader />,
      // },
      {
        path: "/uploadstudents",
        element: <UploadStudents/>, // Home component renders here
      },
      {
        path: "/studentregistration",
        element: <StudentRegistration />, // Student registration page
      },
      {
        path: "/studentlogin",
        element: <StudentLogin />, // Student registration page
      },
      {
        path:"/logout",
        element:<Logout/>
      },
      {
        path: "/teacherregistration",
        element: <TeacherRegistration />, // Teacher registration page
      },
      {
        path: "/teacherlogin",
        element: <TeacherLogin />, // Teacher registration page
      },
      {
        path: "/crregistration",
        element: <CRRegistration />, // CR registration page
      },
      {
        path: "/otpverification",
        element: <OTPVerification />,
      },
      {
        path: "/forgotpassword",
        element: <ForgotPassword />,
      },
      {
        path: "/resetpassword/:token",
        element: <ResetPassword />,
      },
      {
        path: "/newroutine",
        element: <NewRoutine />,
      },
      {
        path: "/classroutine",
        element: <ClassRoutine />,
      },
      {
        path: "/fullroutine",
        element: <FullRoutine />,
      },
      {
        path: "/classattendance",
        element: <ClassAttendance />,
      },
      {
        path: "/facultymembers",
        element: <FacultyMembers />,
      },
      {
        path: "/aboutus",
        element: <AboutUs />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/help",
        element: <Help />,
      },
    ],
  },
]);

export default router;
