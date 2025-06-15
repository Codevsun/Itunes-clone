# Itunes clone

A full-stack web application built with Next.js and NestJS.
A full-stack web application for searching and storing music tracks using the iTunes API. Built with **Next.js** for the frontend and **NestJS** for the backend. Data is stored in a **PostgreSQL** or **MongoDB** database.

## 🧱 Features

🔍 Search music using iTunes API

💾 Save tracks in your database

🎧 Stream preview clips

🌐 Full-stack TypeScript support

🧠 Shared types between frontend and backend

## Project Structure

The project is divided into two main directories:

- `frontend/`: Next.js application with TypeScript
- `backend/`: NestJS application with TypeScript

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run start:dev
   ```

The backend server will start on `http://localhost:3000` by default.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend application will start on `http://localhost:3001` by default.

## Development

### Backend

The backend is built with NestJS and includes:
- TypeScript support
- ESLint for code linting
- Prettier for code formatting
- Jest for testing

### Frontend

The frontend is built with Next.js and includes:
- TypeScript support
- ESLint for code linting
- PostCSS for styling
- Modern React features

## Scripts

### Backend Scripts

- `npm run start`: Start the production server
- `npm run start:dev`: Start the development server
- `npm run build`: Build the application
- `npm run test`: Run tests
- `npm run lint`: Run linting
- `npx drizzle-kit push
npx drizzle-kit generate
npx drizzle-kit migrate
`


### Frontend Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the application
- `npm run start`: Start the production server
- `npm run lint`: Run linting



## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

This project is licensed under the MIT License.
