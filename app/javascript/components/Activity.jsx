import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';

const ActivityStreams = () => {
    const [activityStreams, setActivityStreams] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchActivityStreams();
    }, []);

    const fetchActivityStreams = async () => {
        try {
            const response = await axios.get('/activity_streams');
            setActivityStreams(response.data.activity_stream); // Ensure this matches the API response
            setLoading(false);
        } catch (error) {
            console.error('Error fetching activity streams:', error);
            setLoading(false);
        }
    };

    // Define columns for the DataTable
    const columns = [
        {
            name: 'Sr #',
            selector: (row, index) => index + 1,
            sortable: true,
            width: '70px',
        },
        {
            name: 'User Name',
            selector: row => row.user_name,
            sortable: true,
        },
        {
            name: 'User Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Action Performed',
            selector: row => row.action_name,
            sortable: true,
        },
        {
            name: 'Action Date Time',
            selector: row => row.action_datetime,
            sortable: true,
        },
    ];

    return (
        <div className="l-main" style={{ marginTop: '11rem', overflow: 'hidden', height: '100vh', width: '100vw' }}>
            <div className="card">
                <div className="card-header d-flex justify-content-between">
                    <h4 className="card-title">Activity Streams</h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <DataTable
                            columns={columns}
                            data={activityStreams}
                            progressPending={loading}
                            pagination
                            highlightOnHover
                            striped
                        />
                    </div>
                </div>
            </div>

            {/* Modal for Filter */}
            <div className="modal fade" id="userModal" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Filter Activity Streams</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {/* Your form content goes here */}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Apply Filter</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActivityStreams;
