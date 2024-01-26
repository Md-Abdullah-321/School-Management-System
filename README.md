# School Management System

Welcome to the School Management System, a fully dynamic web solution built with the MERN stack. This system provides various features for both public users and administrators, including dynamic pages for public users and a comprehensive admin dashboard with functionalities for managing teachers, students, notices, and settings.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Public User Pages](#public-user-pages)
- [Admin Dashboard](#admin-dashboard)
- [Framer Motion Animation](#framer-motion-animation)
- [Firebase Integration](#firebase-integration)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Public User Pages:**

  - Home
  - About
  - Department
  - Gallery
  - Contact Us

- **Admin Dashboard:**

  - Manage Teachers
    - Show, Create, Delete, Update
  - Manage Students
    - Show, Create, Delete, Update
  - Manage Notices
    - Add, Update, Delete
  - Manage Messages
    - View messages sent by users
  - Track Attendance
    - Monitor attendance of teachers and students
  - Settings
  - Settings
    - Update various settings

- **Framer Motion Animation:**

  - Animated transitions and effects using Framer Motion for an enhanced user experience.

- **Firebase Integration:**
  - Firebase integration for handling storage, or other relevant features.

## Technologies Used

- **Frontend:**

  - React
  - Redux Toolkit
  - Framer Motion

- **Backend:**

  - Node.js
  - Express
  - MongoDB (with Mongoose)

- **Authentication:**

  - Firebase Authentication

- **Cloud Storage:**
  - Firebase Storage

## Installation

1. Clone the repository.
2. Navigate to the project directory.
3. Run `npm install` to install dependencies for both the client and server.
4. Configure Firebase credentials and other environment variables.

## Usage

1. Start the backend server: `npm run dev`.
2. Start the frontend development server: `npm run dev`.
3. Open your browser and navigate to `http://localhost:3000`.

## Public User Pages

The public user pages are designed to provide information about the school and its departments. Users can explore various sections such as the home page, about us, department details, view the gallery, and contact the school.

## Admin Dashboard

The admin dashboard is the central hub for administrators to manage key aspects of the school system. Here are the main functionalities:

- **Teachers:**

  - View a list of teachers.
  - Create new teacher profiles.
  - Delete existing teacher profiles.

- **Students:**

  - View a list of students.
  - Create new student profiles.
  - Delete existing student profiles.

- **Notices:**

  - Add new notices.
  - Update existing notices.
  - Delete notices.

- **Messages:**

  - View messages sent by users.

- **Attendance Tracking:**

  - Monitor attendance of both teachers and students.

- **Settings:**
  - Update system settings.

## Framer Motion Animation

Framer Motion is utilized to incorporate smooth animations and transitions throughout the application, enhancing the overall user experience.

## Firebase Integration

Firebase is integrated for handling cloud storage, or any other relevant features. Ensure to set up Firebase credentials for proper functionality.

## Contributing

Feel free to contribute to this project by following our [Contributing Guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).
