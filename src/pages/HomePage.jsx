import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 text-gray-800 dark:text-white">Karibu Data Collector</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">Your solution for simple and efficient data collection.</p>
      </header>

      <main className="flex flex-col md:flex-row gap-8">
        <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-sm">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">For Businesses</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Create custom forms, manage tenants, and analyze submissions with ease.</p>
          <Link to="/register" className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
            Get Started
          </Link>
        </div>

        <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-sm">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">For Users</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Already have an account? Log in to access your dashboard and manage your data.</p>
          <Link to="/login" className="w-full text-center bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
            Login
          </Link>
        </div>
      </main>

      <footer className="mt-16 text-center text-gray-500 dark:text-gray-400">
        <p>&copy; 2025 Kazi Data Solutions. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;