import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../Home/Home';
import StudentRegistration from '../Registration/StudentRegistration';
import TeacherRegistration from '../Registration/TeacherRegistration';
import CRRegistration from '../Registration/CRRegistration';
import App from '../App';

// Define the routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,  // Main App component
    children: [
      {
        path: "/",
        element: <Home />,  // Home component renders here
      },
      {
        path: "/studentregistration",
        element: <StudentRegistration />,  // Student registration page
      },
      {
        path: "/teacherregistration",
        element: <TeacherRegistration />,  // Teacher registration page
      },
      {
        path: "/crregistration",
        element: <CRRegistration />,  // CR registration page
      },
    ],
  },
]);

export default router;
