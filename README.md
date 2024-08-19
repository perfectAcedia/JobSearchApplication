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

- **Next.js 14** with TypeScript
- **Tailwind CSS** for basic styling
- **Formik** for form handling, with **Yup** for validation
- **Axios** for making API requests
- **SWR** for data fetching and caching
- **Express** for the backend API
- **MongoDB** with **Mongoose** for database management

## Setup

### Frontend

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
