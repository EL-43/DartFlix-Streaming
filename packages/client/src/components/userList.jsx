import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { userAPI } from '../lib/api';

export function UserList() {
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState({ name: '', email: '', age: '' });

    // Fetch users
    const { data: users, isLoading, error } = useQuery('users', () =>
        userAPI.getUsers().then(res => res.data)
    );

    // Create user mutation
    const createUserMutation = useMutation(
        (userData) => userAPI.createUser(userData),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('users');
                setFormData({ name: '', email: '', age: '' });
            },
        }
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        createUserMutation.mutate(formData);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (isLoading) return <div className="text-center py-8">Loading users...</div>;
    if (error) return <div className="text-center py-8 text-red-600">Error: {error.message}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">User Management</h1>

            {/* Add User Form */}
            <div className="card mb-8">
                <h2 className="text-xl font-semibold mb-4">Add New User</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="input-field"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="input-field"
                            required
                        />
                        <input
                            type="number"
                            name="age"
                            placeholder="Age"
                            value={formData.age}
                            onChange={handleChange}
                            className="input-field"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={createUserMutation.isLoading}
                    >
                        {createUserMutation.isLoading ? 'Adding...' : 'Add User'}
                    </button>
                </form>
            </div>

            {/* Users List */}
            <div className="card">
                <h2 className="text-xl font-semibold mb-4">Users ({users?.length || 0})</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Age
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users?.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {user.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {user.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {user.age}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}