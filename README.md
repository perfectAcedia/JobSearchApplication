# Job Search Application

This project is a job search application built with Next.js 14 and TypeScript. It allows users to search for jobs, view job details, like and manage their favorite jobs, create a profile, and receive job recommendations based on their profile data. The application also includes a small Express.js backend for authentication, using MongoDB for user storage.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Job Search**: Users can search for jobs by title and view results as a list of cards.
- **Job Details**: Each job proposal has a details page with information such as title, image, description, etc.
- **Like Jobs**: Users can like jobs, which are stored in LocalStorage and displayed on a separate `/liked` page.
- **Profile Creation**: Users can create a profile with name, desired job title, and additional information, which is stored in LocalStorage.
- **Job Recommendations**: On the `/jobs` page, users receive job recommendations based on their profile data.
- **Authentication**: A small Express.js backend handles user authentication (email and password) with MongoDB for storage.

## Technologies

- **Next.js 14**: Framework for server-rendered React applications.
- **TypeScript**: JavaScript with type definitions for better development experience.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Formik**: Library for managing form state and validation.
- **Yup**: Schema builder for validation.
- **Axios**: HTTP client for making API requests.
- **SWR**: React hook library for data fetching and caching.
- **Express.js**: Backend framework for handling API routes and authentication.
- **MongoDB**: NoSQL database for storing user information.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.

## Installation

To get started with the project, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
