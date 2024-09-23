import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Select from 'react-select';

const UserModal = ({ isOpen, onClose, user, roles, onUserAdded }) => {
    const initialFormData = {
        full_name: '',
        email: '',
        role_id: roles.length > 0 ? roles[0].id : '',
        password: '',
        avatar: null,
        is_active: true,
        user_type: '',
    };

    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        if (user) {
            setFormData({
                full_name: user.full_name || '',
                email: user.email || '',
                role_id: user.role_id || (roles.length > 0 ? roles[0].id : ''),
                avatar: user.avatar || null,
                is_active: user.is_active !== undefined ? user.is_active : true,
                user_type: user.user_type || '',
            });
        } else {
            setFormData(initialFormData);
        }
    }, [user, roles]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                handleCloseModal();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSelectChange = (selectedOption, name) => {
        setFormData({
            ...formData,
            [name]: selectedOption ? selectedOption.value : '',
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            avatar: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToSend = new FormData();
        for (const key in formData) {
            if (key !== 'avatar' || formData[key]) {
                dataToSend.append(key, formData[key]);
            }
        }

        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            const response = user
                ? await axios.post(`/update_user/${user.id}`, dataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'X-CSRF-Token': csrfToken,
                    },
                })
                : await axios.post('/new_user', dataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'X-CSRF-Token': csrfToken,
                    },
                });

            const { message, success } = response.data;
            if (success) {
                toast.success(message);
                onUserAdded();
            } else {
                toast.error(message);
            }
            handleCloseModal();
        } catch (error) {
            toast.error('Error saving user');
            console.error('Error saving user:', error);
        }
    };

    const handleCloseModal = () => {
        setFormData(initialFormData);
        onClose();
    };

    const roleOptions = roles.map(role => ({ value: role.id, label: role.name }));
    const userTypeOptions = [
        { value: 'Administration', label: 'Administration' },
        { value: 'SR Manager', label: 'SR Manager' },
        { value: 'Employee', label: 'Employee' },
        { value: 'Client', label: 'Client' },
    ];

    return (
        <div className={`modal fade ${isOpen ? 'show' : ''}`} style={{ display: isOpen ? 'block' : 'none' }} tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{user ? 'Edit User' : 'Add New User'}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleCloseModal}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="fullName">Full Name <span style={{ color: 'red' }}>*</span></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="fullName"
                                            name="full_name"
                                            value={formData.full_name}
                                            onChange={handleChange}
                                            placeholder="Enter Full Name"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="col-form-label">User Type <span style={{ color: 'red' }}>*</span></label>
                                        <Select
                                            options={userTypeOptions}
                                            value={userTypeOptions.find(option => option.value === formData.user_type)}
                                            onChange={option => handleSelectChange(option, 'user_type')}
                                            isClearable
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="Email">Email <span style={{ color: 'red' }}>*</span></label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="Email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter Email"
                                        />
                                    </div>
                                </div>
                                {!user &&
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="passwordUser">Password <span style={{ color: 'red' }}>*</span></label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="passwordUser"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                placeholder="Enter Password"
                                            />
                                        </div>
                                    </div>
                                }
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="col-form-label">Role <span style={{ color: 'red' }}>*</span></label>
                                        <Select
                                            options={roleOptions}
                                            value={roleOptions.find(option => option.value === formData.role_id)}
                                            onChange={option => handleSelectChange(option, 'role_id')}
                                            isClearable
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="col-form-label" htmlFor="avatar">Profile Picture</label>
                                        <div className="input-group">
                                            <div className="custom-file">
                                                <input
                                                    type="file"
                                                    className="custom-file-input"
                                                    id="avatar"
                                                    name="avatar"
                                                    accept=".jpg, .jpeg, .png"
                                                    onChange={handleFileChange}
                                                />
                                                <label className="custom-file-label" htmlFor="avatar">Choose file...</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <div className="custom-control custom-checkbox">
                                            <input
                                                type="checkbox"
                                                className="custom-control-input"
                                                id="ActiveUser"
                                                name="is_active"
                                                checked={formData.is_active}
                                                onChange={handleChange}
                                            />
                                            <label className="custom-control-label" htmlFor="ActiveUser">Inactive / Active</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleCloseModal}>Close</button>
                                <button type="submit" className="btn btn-primary">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserModal;
