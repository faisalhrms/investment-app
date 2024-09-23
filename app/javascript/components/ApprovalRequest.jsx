import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import logo from '../images/logo.png';
import { toast, Toaster } from 'react-hot-toast';

const ApprovalRequest = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPendingRequests();
    }, []);

    // Fetch all packages with pending transactions
    const fetchPendingRequests = async () => {
        try {
            const response = await axios.get('/packages/pending_requests'); // Assuming this endpoint returns packages with "pending" status
            setRequests(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching pending requests:', error);
            toast.error('Failed to fetch pending requests');
            setLoading(false);
        }
    };

    // Handle approval of the request
    const handleApprove = async (id) => {
        try {
            await axios.put(`/packages/${id}/approve`, { status: 'active' });
            toast.success('Request approved successfully');
            fetchPendingRequests(); // Refresh the list after approval
        } catch (error) {
            console.error('Error approving request:', error);
            toast.error('Failed to approve request');
        }
    };

    // Handle rejection of the request
    const handleReject = async (id) => {
        try {
            await axios.put(`/packages/${id}/reject`, { status: 'rejected' });
            toast.success('Request rejected successfully');
            fetchPendingRequests(); // Refresh the list after rejection
        } catch (error) {
            console.error('Error rejecting request:', error);
            toast.error('Failed to reject request');
        }
    };

    // Define columns for the DataTable
    const columns = [
        {
            name: 'Package Name',
            selector: row => row.package_name,
            sortable: true
        },
        {
            name: 'Requester Name',
            selector: row => row.requester_name,
            sortable: true
        },
        {
            name: 'Deposit Amount',
            selector: row => row.deposit_amount,
            sortable: true
        },
        {
            name: 'Submitted Date',
            selector: row => new Date(row.submitted_date).toLocaleDateString(),
            sortable: true
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true
        },
        {
            name: 'Actions',
            cell: row => (
                <>
                    <button
                        onClick={() => handleApprove(row.id)}
                        className="btn btn-success"
                        style={{ marginRight: '10px' }}
                    >
                        Approve
                    </button>
                    <button
                        onClick={() => handleReject(row.id)}
                        className="btn btn-danger"
                    >
                        Reject
                    </button>
                </>
            )
        }
    ];

    return (
        <div className="l-main " style={{ marginTop: '11rem', overflow: 'hidden', height: '100vh', width: '100vw' }}>
            <Toaster />
            <DataTable
                title="Pending Approval Requests"
                columns={columns}
                data={requests}
                progressPending={loading}
                pagination
            />
        </div>
    );
};

export default ApprovalRequest;
