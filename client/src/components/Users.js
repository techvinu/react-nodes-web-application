import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-hot-toast';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Mail, 
  Calendar,
  AlertCircle,
  RefreshCw,
  Users as UsersIcon
} from 'lucide-react';

import { getUsers, deleteUser } from '../services/api';
import LoadingSpinner from './LoadingSpinner';

const Users = () => {
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const queryClient = useQueryClient();

  // Fetch users
  const { 
    data: usersData, 
    isLoading, 
    error, 
    refetch 
  } = useQuery('users', getUsers, {
    onError: (error) => {
      toast.error('Failed to fetch users');
      console.error('Error fetching users:', error);
    }
  });

  // Delete user mutation
  const deleteMutation = useMutation(deleteUser, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('users');
      toast.success(`User "${data.data.name}" deleted successfully`);
      setDeleteConfirm(null);
    },
    onError: (error) => {
      toast.error('Failed to delete user');
      console.error('Error deleting user:', error);
    }
  });

  const handleDelete = (user) => {
    setDeleteConfirm(user);
  };

  const confirmDelete = () => {
    if (deleteConfirm) {
      deleteMutation.mutate(deleteConfirm.id);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-64">
          <div className="text-center">
            <LoadingSpinner size="large" />
            <p className="mt-4 text-gray-600">Loading users...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Users</h2>
          <p className="text-gray-600 mb-6">
            {error.response?.data?.error || 'Something went wrong while fetching users.'}
          </p>
          <button
            onClick={() => refetch()}
            className="btn btn-primary flex items-center space-x-2 mx-auto"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    );
  }

  const users = usersData?.data || [];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Users</h1>
          <p className="text-gray-600">
            Manage your application users ({users.length} total)
          </p>
        </div>
        <Link
          to="/users/new"
          className="btn btn-primary flex items-center space-x-2 mt-4 sm:mt-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add User</span>
        </Link>
      </div>

      {/* Users List */}
      {users.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <UsersIcon className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No users found</h3>
          <p className="text-gray-600 mb-6">Get started by creating your first user.</p>
          <Link to="/users/new" className="btn btn-primary">
            Create First User
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div key={user.id} className="card">
              <div className="card-body">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {user.name}
                    </h3>
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <Mail className="w-4 h-4 mr-1" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-xs">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>Created {formatDate(user.createdAt)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-xs text-gray-500">ID: {user.id}</span>
                  <div className="flex items-center space-x-2">
                    <Link
                      to={`/users/${user.id}/edit`}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      title="Edit user"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(user)}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      title="Delete user"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Delete User</h3>
            </div>
            
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <strong>{deleteConfirm.name}</strong>? 
              This action cannot be undone.
            </p>
            
            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="btn btn-outline"
                disabled={deleteMutation.isLoading}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="btn btn-danger flex items-center space-x-2"
                disabled={deleteMutation.isLoading}
              >
                {deleteMutation.isLoading && <LoadingSpinner size="small" />}
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
