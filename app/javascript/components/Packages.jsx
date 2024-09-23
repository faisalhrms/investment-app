import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PackageModal from './PackageModal';
import { Toaster, toast } from 'react-hot-toast';
import DataTable from 'react-data-table-component';
import { debounce } from 'lodash';

const PackagesList = () => {
    const [packages, setPackages] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [packageToDelete, setPackageToDelete] = useState(null);
    const [searchText, setSearchText] = useState('');

    // Fetch packages when the component mounts and whenever searchText changes
    useEffect(() => {
        fetchPackages();
    }, [searchText]);

    // Fetch packages from the backend
    const fetchPackages = async () => {
        try {
            const response = await axios.get('/packages/list', {
                params: { search: searchText },
                headers: { 'Accept': 'application/json' }, // Ensure JSON format
            });
            setPackages(response.data); // Assuming the API returns an array of packages directly
        } catch (error) {
            console.error('Error fetching packages:', error);
        }
    };

    const handleAddPackage = () => {
        setSelectedPackage(null);
        setAddModalOpen(true);
    };

    const handleEditPackage = (pkg) => {
        setSelectedPackage(pkg);
        setAddModalOpen(true);
    };

    const handleDeletePackage = (packageId) => {
        setPackageToDelete(packageId);
        setDeleteModalOpen(true);
    };

    const handleCloseModal = () => {
        setAddModalOpen(false);
        setDeleteModalOpen(false);
        setSelectedPackage(null);
        setPackageToDelete(null);
    };

    const handleSubmit = async (formData) => {
        try {
            if (selectedPackage) {
                await axios.put(`/packages/${selectedPackage.id}`, formData); // PUT request
            } else {
                await axios.post('/packages', formData); // POST request for new package
            }
            handleCloseModal();
            fetchPackages();
        } catch (error) {
            console.error('Error submitting package data:', error);
        }
    };


    const confirmDeletePackage = async () => {
        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': csrfToken,
                },
            };

            await axios.delete(`/packages/${packageToDelete}`, config); // DELETE request
            toast.success('Package deleted successfully');
            fetchPackages();
            handleCloseModal();
        } catch (error) {
            toast.error('Error deleting package');
            console.error('Error deleting package:', error);
        }
    };


    const handleSearch = debounce((e) => {
        setSearchText(e.target.value);
    }, 500);

    const packageToDeleteData = packages.find(pkg => pkg.id === packageToDelete);

    // Columns definition for DataTable
    const columns = [
        {
            name: 'Package Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Description',
            selector: row => row.description,
            sortable: true,
        },
        {
            name: 'Price',
            selector: row => row.price,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
            cell: row => (
                <span className={`badge ${row.status === 'active' ? 'badge-info' : 'badge-danger'}`}>
                    {row.status === 'active' ? 'Active' : 'Inactive'}
                </span>
            )
        },
        {
            name: 'Action',
            cell: row => (
                <React.Fragment>
                    <a onClick={() => handleEditPackage(row)} className="text-success mr-2">
                        <i className="fas fa-pen"></i>
                    </a>
                    <a onClick={() => handleDeletePackage(row.id)} className="text-danger">
                        <i className="fas fa-trash"></i>
                    </a>
                </React.Fragment>
            ),
            ignoreRowClick: true,
        }
    ];

    return (
        <div>
            <Toaster />
            <div className="container" style={{marginTop: '11rem'}}>
                <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <button className="btn btn-primary" onClick={handleAddPackage}>
                            <i className="ri-add-fill"><span className="pl-1">Add New Package</span></i>
                        </button>
                        <h4 className="card-title">Package Management</h4>
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
                            data={packages}
                            pagination
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
            <PackageModal
                isOpen={isAddModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSubmit}
                pkg={selectedPackage}
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
                            Are you sure you want to delete package: {packageToDeleteData ? packageToDeleteData.name : ''}?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                    onClick={handleCloseModal}>Cancel
                            </button>
                            <button type="button" className="btn btn-danger" onClick={confirmDeletePackage}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PackagesList;
