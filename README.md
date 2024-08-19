# Job Search Application

## Overview

This project is a job search application built with Next.js 14 and TypeScript. It allows users to search for jobs, view job details, like jobs, and manage their profile. The application also provides job recommendations based on the user's profile data. 

## Features

- **Job Search**: Users can search for jobs by title, with results displayed as a list of cards.
- **Job Details**: Each job card has a "details" button that navigates to a dedicated page showing all relevant job information.
- **Liked Jobs**: Users can like jobs, and the liked jobs are stored in LocalStorage and displayed on a separate page accessible at `/liked`.
- **Remove Liked Jobs**: Users can remove jobs from their liked list.
- **Profile Creation**: Users can create a profile with their name, desired job title, and a brief description, which is stored in LocalStorage.
- **Job Recommendations**: On the `/jobs` page, users receive job recommendations based on their profile data. The search functionality remains available.
- **Express.js Backend**: An Express.js app manages user authentication with email and password, using MongoDB for user storage. This backend can be deployed on Render.

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
  
## Usage

- **Visit /jobs**: To access the job search page and see job recommendations based on your profile data.
- **Visit /job-details/:id**: To view specific job details.
- **Visit /create-profile**:  To create your own profile with the desired Job Title.

## Setup

### Frontend

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   
2. **Install Dependencies**

   ```bash
   npm install
   
3. **Run the Development Server**

   ```bash
   npm run dev

Your application should now be running at http://localhost:3000.

## Project Structure
- **/pages** Contains Next.js pages and API routes.
- **/components** Reusable React components, each with its own folder.
- **/utils** Utility functions and constants
- **/api** functions for making API calls

## API Endpoints
- **GET /jobs**: Fetch jobs based on query parameters.
- **POST /login**: Authenticate user login.
- **POST /sign-up**: Create a new user.

## Deployment
The frontend application is deployed on Vercel. The backend is deployed on Render. You can access the live version of the application through the provided deployment URL.
- **Versel**: https://job-search-application-cyan.vercel.app/

## Contribution
   Feel free to open issues or submit pull requests if you find bugs or have improvements.
