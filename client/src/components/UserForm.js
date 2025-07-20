import React, { useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-hot-toast';
import { ArrowLeft, Save, User } from 'lucide-react';

import { getUser, createUser, updateUser } from '../services/api';
import LoadingSpinner from './LoadingSpinner';

const UserForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue
  } = useForm({
    defaultValues: {
      name: '',
      email: ''
    }
  });

  // Fetch user data for editing
  const { data: userData, isLoading: isLoadingUser } = useQuery(
    ['user', id],
    () => getUser(id),
    {
      enabled: isEditing,
      onSuccess: (data) => {
        const user = data.data;
        setValue('name', user.name);
        setValue('email', user.email);
      },
      onError: (error) => {
        toast.error('Failed to load user data');
        console.error('Error fetching user:', error);
      }
    }
  );

  // Create user mutation
  const createMutation = useMutation(createUser, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('users');
      toast.success(`User "${data.data.name}" created successfully`);
      navigate('/users');
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.error || 'Failed to create user';
      toast.error(errorMessage);
      console.error('Error creating user:', error);
    }
  });

  // Update user mutation
  const updateMutation = useMutation(
    (userData) => updateUser(id, userData),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries('users');
        queryClient.invalidateQueries(['user', id]);
        toast.success(`User "${data.data.name}" updated successfully`);
        navigate('/users');
      },
      onError: (error) => {
        const errorMessage = error.response?.data?.error || 'Failed to update user';
        toast.error(errorMessage);
        console.error('Error updating user:', error);
      }
    }
  );

  const onSubmit = (data) => {
    if (isEditing) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  const isLoading = isLoadingUser || createMutation.isLoading || updateMutation.isLoading;

  if (isEditing && isLoadingUser) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-64">
          <div className="text-center">
            <LoadingSpinner size="large" />
            <p className="mt-4 text-gray-600">Loading user data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/users"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Users
        </Link>
        
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {isEditing ? 'Edit User' : 'Create New User'}
            </h1>
            <p className="text-gray-600">
              {isEditing 
                ? 'Update user information below' 
                : 'Fill in the details to create a new user'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl">
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Field */}
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Full Name *
                </label>
                <input
                  id="name"
                  type="text"
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  placeholder="Enter full name"
                  {...register('name', {
                    required: 'Name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 characters long'
                    },
                    maxLength: {
                      value: 50,
                      message: 'Name must be less than 50 characters'
                    },
                    pattern: {
                      value: /^[a-zA-Z\s]+$/,
                      message: 'Name can only contain letters and spaces'
                    }
                  })}
                />
                {errors.name && (
                  <p className="form-error">{errors.name.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="Enter email address"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Please enter a valid email address'
                    }
                  })}
                />
                {errors.email && (
                  <p className="form-error">{errors.email.message}</p>
                )}
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                <Link
                  to="/users"
                  className="btn btn-outline"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-primary flex items-center space-x-2"
                >
                  {isLoading && <LoadingSpinner size="small" />}
                  <Save className="w-4 h-4" />
                  <span>{isEditing ? 'Update User' : 'Create User'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-medium text-blue-900 mb-2">Form Guidelines</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Name should contain only letters and spaces</li>
            <li>• Email must be a valid email address format</li>
            <li>• All fields marked with * are required</li>
            {isEditing && (
              <li>• Changes will be saved immediately upon submission</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
