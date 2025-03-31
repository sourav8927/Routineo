# Routineo

Routineo is a comprehensive application designed to simplify classroom management by automating daily routine updates and attendance tracking. It is built to support teachers in streamlining their administrative tasks.

## App Functions

### 1. Daily Routine Update

- **Routine Setup:**  
  At the start of each semester, the teacher sets up the daily class routine.
- **Status Update:**  
  On a daily basis, the teacher simply selects the class status—confirmed, not confirmed, or canceled—from a drop-down menu. Teachers also have the ability to update the routine when necessary. Any changes made by teachers trigger an alert notification for all students enrolled in that class.

### 2. Attendance

- **Initial Class Setup:**  
  At the beginning of the session, the teacher updates the class strength by entering the names and roll numbers provided by the college. This setup also involves uploading student details, which are tied to their roll numbers.
- **Unique Identification:**  
  Each teacher is assigned a unique ID. For each semester, every class under a teacher is given a unique identifier for the specific date, under which attendance data is recorded.
- **Attendance Calculation:**  
  The application records the number of students present in the class for each day. At the end of the semester, students can view the total number of classes conducted, the classes they attended, and their overall attendance percentage per subject.
- **Notifications:**  
  If a student's attendance percentage falls below the required threshold, both the teacher and the student are notified, with the information highlighted for easy reference.
- **Special Cases:**  
  - For students on internship, the Head Of Department (HOD) marks the start and end dates of the internship, adjusting the attendance percentage accordingly.
  - Similarly, for students who are ill or facing a family emergency, the HOD records the relevant dates to ensure that attendance calculations reflect these exceptions.

---
# Student Dashboard

 Student Dashboard is designed to streamline academic information for students. It offers a one-stop interface for daily schedules, attendance tracking, class reports, syllabus management, class routines, and faculty information – all integrated into a modern, responsive dashboard.

## Description

Student Dashboard aims to simplify student life by providing real-time updates and detailed insights into daily routines, attendance, and academic schedules. Whether you need to check your class timings, view attendance reports, or review semester syllabus and routines, StudentDashboard brings all relevant information together on one intuitive platform.

## Features

- **Dashboard Navigation:**  
  Easily switch between sections such as Home, Class Report, Semester Syllabus, Class Routine, Faculty Members, and About Us using a clear and intuitive menu.

- **Real-Time Updates:**  
  The Home page displays a live clock and today’s schedule with smooth, animated transitions to keep you informed at a glance.

- **Attendance Reports:**  
  Access both daily and monthly attendance reports. Use interactive filters to narrow down results by date or month for detailed insights.

- **Class Routine Management:**  
  Import routine files (CSV, Excel, Word) to automatically update class schedules. Edit and save changes directly within the dashboard for efficient routine management.

- **Faculty & About Sections:**  
  Explore comprehensive profiles of faculty members and learn more about the team behind StudentDashboard.

## Code Overview

- **Home Component:**  
  Implements the real-time clock, displays the daily schedule, and provides a basic attendance summary. Smooth animations are powered by Framer Motion.

- **Class Report Components:**  
  Deliver daily and monthly attendance reports with filtering options and dynamic data display in interactive tables.

- **Semester Syllabus:**  
  Presents syllabus details for each semester in a responsive table format, making academic information easily accessible.

- **Class Routine Module:**  
  Manages class schedules with robust file parsing using Papa Parse, XLSX, and Mammoth. It also supports interactive editing of routine details.

- **Faculty Members & About Us:**  
  Showcase detailed profiles and information about the project team, ensuring that users can get to know the experts behind the application.

- **Libraries & Tools:**  
  Built using React.js, enhanced with Framer Motion for animations, and equipped with Papa Parse, XLSX, and Mammoth for seamless file handling.

---

## Additional Features

### A. Securities Used

- **Google reCAPTCHA:**  
  Protects the application from bots and spam by verifying that the user is human.
- **6-Digit OTP Gmail Authentication using Nodemailer:**  
  Adds an extra layer of security during user login and verification via a one-time password sent to the user's Gmail.
- **JWT Token for Authentication:**  
  Utilizes JSON Web Tokens (JWT) to securely authenticate users and maintain session integrity.
- **Password Hashing with Gensalt and Bcrypt:**  
  Ensures that user passwords are stored securely by hashing them before saving to the database.
- **Student Registration Verification:**  
  Registration is permitted only if the provided registration number and roll number match the records updated by the teacher.
- **Secure Password Reset using Gmail:**  
  Allows users to securely reset their passwords through verification emails sent via Gmail.
- **RBAC (Role-Based Access Control):**  
  Manages access control for both students and teachers, ensuring that functionalities are accessible only to authorized users.

### B. Technologies Used

- **Frontend:**  
  - React.js  
  - React Icons  
  - Tailwind CSS  
  - Framer Motion  
  - React Testify
- **Backend:**  
  - Express.js  
  - Node.js  
  - JWT for authentication  
  - Bcrypt for password security  
  - ZOD for validation  
  - Multer for file uploads
- **Database:**  
  - MongoDB with Mongoose
- **Authentication & Email:**  
  - Two Factor Authentication  
  - Google reCAPTCHA  
  - NodeMailer
- **Development Tools:**  
  - Nodemon  
  - NPM

### C. IDE for Coding & Testing

- **Visual Studio Code (VS Code):**  
  Primary code editor for development.
- **Postman:**  
  Used for testing API endpoints.
- **MongoDB Atlas:**  
  Cloud-based database service for development and testing.

### D. Version Control

- **GitHub:**  
  Repository hosting and collaboration.
- **Git:**  
  Distributed version control system for tracking code changes.

---

Routineo is designed to offer a user-friendly and efficient way to manage classroom routines and attendance, ensuring that both administrative tasks and notifications are handled automatically.
