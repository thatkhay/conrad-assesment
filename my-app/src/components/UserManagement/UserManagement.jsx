import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import { 
  PlusCircle, 
  Search, 
  Edit2, 
  Trash2, 
  ChevronLeft, 
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react';
import UserForm from './UserForm';
import ConfirmationModal from '../ui/ComfirmModal';

const UserManagement = ({ showNotification }) => {
  const { users, addUser, updateUser, deleteUser } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [confirmDeleteUser, setConfirmDeleteUser] = useState(null);

  // Filter users based on search and role
  const filteredUsers = users.filter(user => {
    const matchesSearch = searchTerm === '' || 
      (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to first page when filters or page size changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, roleFilter, itemsPerPage]);

  // Navigation functions
  const goToPage = (page) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };

  const goToFirstPage = () => goToPage(1);
  const goToLastPage = () => goToPage(totalPages);
  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);

  // CRUD Operations
  const handleSubmit = (formData) => {
    try {
      if (editingUser) {
        updateUser({ ...formData, id: editingUser.id });
        showNotification('User updated successfully', 'success');
      } else {
        addUser(formData);
        showNotification('User added successfully', 'success');
      }
      setIsModalOpen(false);
      setEditingUser(null);
    } catch (error) {
      showNotification('Error processing user', 'error');
    }
  };

  const handleDeleteConfirm = () => {
    if (confirmDeleteUser) {
      try {
        deleteUser(confirmDeleteUser.id);
        showNotification('User deleted successfully', 'success');
        setConfirmDeleteUser(null);
      } catch (error) {
        showNotification('Error deleting user', 'error');
      }
    }
  };

  const handleDeleteCancel = () => {
    setConfirmDeleteUser(null);
  };

  return (
    <div className="space-y-6 container mt-14">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <div className="flex-1 w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="border rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Editor">Editor</option>
            <option value="Viewer">Viewer</option>
          </select>
          <button
            onClick={() => {
              setEditingUser(null);
              setIsModalOpen(true);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Add User
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.role === 'Admin' ? 'bg-red-100 text-red-800' :
                      user.role === 'Editor' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                    <button
                      onClick={() => {
                        setEditingUser(user);
                        setIsModalOpen(true);
                      }}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setConfirmDeleteUser(user)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            {/* Page Size Selection */}
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <span className="text-sm text-gray-700 whitespace-nowrap">Show</span>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="border rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-20"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
              <span className="text-sm text-gray-700 whitespace-nowrap">entries</span>
            </div>

            {/* Pagination Info */}
            <div className="text-sm text-gray-700 text-center w-full sm:w-auto">
              Showing{' '}
              <span className="font-medium">
                {filteredUsers.length === 0 ? 0 : ((currentPage - 1) * itemsPerPage) + 1}
              </span>
              {' '}-{' '}
              <span className="font-medium">
                {Math.min(currentPage * itemsPerPage, filteredUsers.length)}
              </span>
              {' '}of{' '}
              <span className="font-medium">{filteredUsers.length}</span>
              {' '}results
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-wrap justify-center sm:justify-end items-center space-x-2 w-full sm:w-auto">
              {/* Desktop View - Full Navigation */}
              <div className="hidden sm:flex space-x-2">
                <button
                  onClick={goToFirstPage}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  <ChevronsLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </button>
              </div>

              {/* Mobile View - Simplified Navigation */}
              <div className="flex sm:hidden space-x-2">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                </button>
              </div>

              {/* Page Number Display */}
              <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                Page {currentPage} of {totalPages}
              </span>

              {/* Desktop View - Full Navigation */}
              <div className="hidden sm:flex space-x-2">
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </button>
                <button
                  onClick={goToLastPage}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  <ChevronsRight className="h-4 w-4" />
                </button>
              </div>

              {/* Mobile View - Simplified Navigation */}
              <div className="flex sm:hidden space-x-2">
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmDeleteUser && (
        <ConfirmationModal
          isOpen={!!confirmDeleteUser}
          title="Delete User"
          message={`Are you sure you want to delete user ${confirmDeleteUser.name}?`}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}

      {/* Modal for Add/Edit User */}
      {isModalOpen && (
        <UserForm
          user={editingUser}
          onSubmit={handleSubmit}
          onClose={() => {
            setIsModalOpen(false);
            setEditingUser(null);
          }}
        />
      )}
    </div>
  );
};

export default UserManagement;