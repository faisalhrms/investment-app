import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserModal from './UserModal';
import man from '../images/user.png';
import { Toaster, toast } from 'react-hot-toast';
import DataTable from 'react-data-table-component';
import { debounce } from 'lodash';

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [searchText, setSearchText] = useState('');

    const perPage = 10;

    useEffect(() => {
        fetchUsers();
        fetchRoles();
    }, [searchText]);

    const fetchUsers = async (page = 1) => {
        try {
            const response = await axios.get('/users.json', {
                params: {
                    page: page,
                    per_page: perPage,
                    search: searchText
                },
            });
            setUsers(response.data.users);
            setTotalPages(response.data.total_pages);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchRoles = async () => {
        try {
            const response = await axios.get('/roles.json');
            setRoles(response.data);
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    };

    const handleAddUser = () => {
        setSelectedUser(null);
        setAddModalOpen(true);
    };

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setAddModalOpen(true);
    };

    const handleDeleteUser = (userId) => {
        setUserToDelete(userId);
        setDeleteModalOpen(true);
    };

    const handleCloseModal = () => {
        setAddModalOpen(false);
        setDeleteModalOpen(false);
        setSelectedUser(null);
        setUserToDelete(null);
    };

    const handleSubmit = async (formData) => {
        try {
            if (selectedUser) {
                await axios.post(`/update_user/${selectedUser.id}`, formData);
            } else {
                await axios.post('/new_user', formData);
            }
            handleCloseModal();
            fetchUsers();
        } catch (error) {
            console.error('Error submitting user data:', error);
        }
    };

    const confirmDeleteUser = async () => {
        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': csrfToken,
                },
            };

            await axios.post(`/delete_user/${userToDelete}`, {}, config);
            toast.success('User deleted successfully');
            fetchUsers();
            handleCloseModal();
        } catch (error) {
            toast.error('Error deleting user');
            console.error('Error deleting user:', error);
        }
    };

    const handlePageChange = (page) => {
        fetchUsers(page);
    };

    const handleSearch = debounce((e) => {
        setSearchText(e.target.value);
    }, 500);

    const userToDeleteData = users.find(user => user.id === userToDelete);

    const columns = [
        {
            name: '',
            selector: row => <img src={row.avatar_url || man} className="rounded-circle img-fluid" alt="profile" />,
            sortable: false,
            width: '60px'
        },
        {
            name: 'User Name',
            selector: row => row.full_name,
            sortable: true,
        },
        {
            name: 'Role/Permission',
            selector: row => row.role ? row.role.name : 'Not Assigned',
            sortable: true,
            cell: row => (
                <span className={`badge ${row.role ? 'badge-success' : 'badge-warning'}`}>
                    {row.role ? row.role.name : 'Not Assigned'}
                </span>
            )
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Is Active?',
            selector: row => row.is_active,
            sortable: true,
            cell: row => (
                <span className={`badge ${row.is_active ? 'badge-info' : 'badge-danger'}`}>
                    {row.is_active ? 'Active' : 'In Active'}
                </span>
            )
        },
        {
            name: 'Action',
            cell: row => (
                <React.Fragment>
                    <a onClick={() => handleEditUser(row)} className="text-success mr-2">
                        <i className="fas fa-pen"></i>
                    </a>
                    <a onClick={() => handleDeleteUser(row.id)} className="text-danger">
                        <i className="fas fa-trash"></i>
                    </a>
                </React.Fragment>
            ),
            ignoreRowClick: true,
        }
    ];

    return (
        <React.Fragment>
            <Toaster />
            <div className="l-main " style={{ marginTop: '11rem', overflow: 'hidden', height: '100vh', width: '100vw' }}>
                <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <button className="btn btn-primary" onClick={handleAddUser}>
                            <i className="ri-add-fill"><span className="pl-1">Add New</span></i>
                        </button>
                        <h4 className="card-title">User Management</h4>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="form-control w-25"
                            onChange={handleSearch}
                        />
                    </div>
                    <div className="card-body">
                        <DataTable
                            columns={columns}
                            data={users}
                            pagination
                            paginationServer
                            paginationTotalRows={totalPages * perPage}
                            paginationPerPage={perPage}
                            onChangePage={handlePageChange}
                            responsive
                            noHeader
                            customStyles={{
                                table: {
                                    style: {
                                        paddingLeft: '10px',
                                        paddingRight: '10px',
                                    },
                                },
                                headCells: {
                                    style: {
                                        fontWeight: 'bold',
                                    },
                                },
                                cells: {
                                    style: {
                                        padding: '10px',
                                    },
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
            <UserModal
                isOpen={isAddModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSubmit}
                user={selectedUser}
                roles={roles}
                onUserAdded={fetchUsers}
            />
            {/* Confirmation Modal */}
            <div className={`modal fade ${isDeleteModalOpen ? 'show d-block' : ''}`} id="confirmModal" tabIndex="-1"
                 aria-labelledby="confirmModalLabel" aria-hidden={!isDeleteModalOpen}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="confirmModalLabel">Confirm Delete</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                                    onClick={handleCloseModal}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete user: {userToDeleteData ? userToDeleteData.full_name : ''}?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                    onClick={handleCloseModal}>Cancel
                            </button>
                            <button type="button" className="btn btn-danger" onClick={confirmDeleteUser}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default UsersList;
