import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FilePlus2, List, Users } from 'lucide-react';

const TenantDashboardPage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Welcome, {user?.organizationName || 'Admin'}!</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
          Here is your central hub for managing forms, submissions, and users.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Create Form Card */}
        <Link to="/form-builder" className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
            <FilePlus2 className="h-8 w-8 text-blue-600 dark:text-blue-300" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Create a New Form</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Design and build custom forms with our easy-to-use form builder.</p>
        </Link>

        {/* View Submissions Card */}
        <Link to="/submissions" className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900 mb-4">
            <List className="h-8 w-8 text-green-600 dark:text-green-300" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">View Submissions</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Access and manage all the data collected from your forms.</p>
        </Link>

        {/* Manage Users Card (for TENANT_ADMIN) */}
        {user?.role === 'TENANT_ADMIN' && (
          <Link to="/manage-users" className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 dark:bg-purple-900 mb-4">
              <Users className="h-8 w-8 text-purple-600 dark:text-purple-300" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Manage Users</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Invite and manage users within your organization.</p>
          </Link>
        )}
      </div>
    </div>
  );
};

export default TenantDashboardPage;