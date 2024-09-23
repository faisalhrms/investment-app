import React, { useState, useEffect } from 'react';
import axios from 'axios';
import bg from '../images/profile-bg.jpg';
import user from '../images/user.png';
import { Toaster, toast } from 'react-hot-toast';

const ProfilePage = ({ currentUser, avatarUrl }) => {
    const [form, setForm] = useState({
        old_password: '',
        password: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const validatePassword = (password) => {
        const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
        return passwordPattern.test(password);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { old_password, password } = form;

        if (!validatePassword(password)) {
            toast.error('Password must be at least 8 characters long, start with a capital letter, and include a number and a special character.');
            return;
        }

        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            const id = currentUser ? currentUser.id : null;
            const response = await axios.post('/change_password_user', {
                old_password,
                password,
                id
            }, {
                headers: {
                    'X-CSRF-Token': csrfToken
                }
            });

            if (response.data.success) {
                toast.success(response.data.message || 'Password changed successfully');
                window.location.href = `/logout`;
            } else {
                toast.error(response.data.message || 'Failed to change password');
            }
        } catch (error) {
            console.error('Error changing password:', error);
            toast.error('An error occurred while changing the password.');
        }
    };

    return (
        <div>
            <Toaster />
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body p-0">
                                <div className="profile-header">
                                    <div className="cover-container">
                                        <img src={bg} alt="profile-bg" className="img-fluid rounded" />
                                    </div>
                                    <div className="profile-info p-4">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="user-detail pl-3">
                                                    <div className="d-flex align-items-center">
                                                        <div className="pr-3">
                                                            <img
                                                                src={avatarUrl ? avatarUrl : user}
                                                                alt="profile"
                                                                className="rounded-circle"
                                                                width="130"
                                                            />
                                                        </div>
                                                        <div>
                                                            <h3>{currentUser && currentUser.full_name}</h3>
                                                            <p className="text-muted"> - {currentUser && currentUser.role && currentUser.role.name}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <ul className="nav nav-tabs float-right">
                                                    <li className="nav-item">
                                                        <a
                                                            className="nav-link active"
                                                            style={{ color: 'white' }}
                                                            data-toggle="tab"
                                                            href="#change-password"
                                                        >
                                                            Change Password
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-lg-6">
                        <div className="tab-content">
                            <div
                                className="tab-pane fade show active"
                                id="change-password"
                                role="tabpanel"
                            >
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-title">Change Password</h4>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <label htmlFor="cPass">Current Password:</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    name="old_password"
                                                    id="cPass"
                                                    value={form.old_password}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="nPass">New Password:</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    name="password"
                                                    id="nPass"
                                                    value={form.password}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <button type="submit" className="btn btn-primary">Submit</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
