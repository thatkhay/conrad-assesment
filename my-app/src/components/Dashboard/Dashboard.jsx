import React, { useContext, useState } from 'react';
import { 
  Users, 
  ShieldCheck, 
  Edit3, 
  Eye, 
  Activity,
  UserPlus,
  BarChart as BarChartIcon,
  Clock
} from 'lucide-react';
import { 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { UserContext } from '../../context/UserContext';
import UserForm from '../UserManagement/UserForm';

const Dashboard = ({ showNotification }) => {
  // Get users from context
  const { users, addUser } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userStats = {
    total: users.length,
    admin: users.filter(u => u.role === 'Admin').length,
    editor: users.filter(u => u.role === 'Editor').length,
    viewer: users.filter(u => u.role === 'Viewer').length,
  };

  // Data for pie chart
  const pieData = [
    { name: 'Admin', value: userStats.admin, color: '#EF4444' },
    { name: 'Editor', value: userStats.editor, color: '#F59E0B' },
    { name: 'Viewer', value: userStats.viewer, color: '#10B981' }
  ];

  // Simulated activity data
  const recentActivity = [
    { user: 'Alice Johnson', action: 'Created new user', time: '5 min ago' },
    { user: 'Bob Smith', action: 'Updated profile', time: '15 min ago' },
    { user: 'Charlie Brown', action: 'Changed role', time: '1 hour ago' }
  ];

  // Handle user form submission
  const handleSubmit = (formData) => {
    try {
      addUser(formData);
      showNotification('User added successfully', 'success');
      setIsModalOpen(false);
    } catch (error) {
      showNotification('Error adding user', 'error');
    }
  };

  return (
    <div className="space-y-6 container mt-14 ">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Users Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Users
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {userStats.total}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm text-gray-500">
              Updated just now
            </div>
          </div>
        </div>

        {/* Admins Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ShieldCheck className="h-6 w-6 text-red-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Admins
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {userStats.admin}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm text-gray-500">
              {((userStats.admin / userStats.total) * 100).toFixed(1)}% of total
            </div>
          </div>
        </div>

        {/* Editors Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Edit3 className="h-6 w-6 text-yellow-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Editors
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {userStats.editor}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm text-gray-500">
              {((userStats.editor / userStats.total) * 100).toFixed(1)}% of total
            </div>
          </div>
        </div>

        {/* Viewers Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Eye className="h-6 w-6 text-green-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Viewers
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {userStats.viewer}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm text-gray-500">
              {((userStats.viewer / userStats.total) * 100).toFixed(1)}% of total
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribution Chart */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">User Role Distribution</h3>
            <BarChartIcon className="h-5 w-5 text-gray-400" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {pieData.map((entry) => (
              <div key={entry.name} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm text-gray-600">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
            <Clock className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Activity className="h-5 w-5 text-gray-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.user}
                  </p>
                  <p className="text-sm text-gray-500">
                    {activity.action}
                  </p>
                  <p className="text-xs text-gray-400">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-all duration-300 hover:bg-gray-50"
        >
          <div className="flex items-center space-x-3">
            <UserPlus className="h-5 w-5 text-blue-500" />
            <span className="text-sm font-medium text-gray-900">Add New User</span>
          </div>
        </button>
      </div>

      {/* Modal for Adding New User */}
      {isModalOpen && (
        <UserForm
          onSubmit={handleSubmit}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;