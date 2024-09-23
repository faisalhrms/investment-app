import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const CheckoutPage = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null); // State for image preview
    const [planId, setPlanId] = useState(null);
    const [depositAmount, setDepositAmount] = useState(''); // New state for deposit amount
    const navigate = useNavigate(); // For navigation after success

    // Extract planId from URL
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const extractedPlanId = queryParams.get('planId');
        setPlanId(extractedPlanId);
    }, [location]);

    // Handle file input change and generate preview
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);

        if (selectedFile) {
            const filePreview = URL.createObjectURL(selectedFile);
            setPreview(filePreview); // Set the preview URL for display
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!planId) {
            toast.error('No plan selected. Please go back and select a plan.');
            return;
        }

        if (!depositAmount) {
            toast.error('Please enter a deposit amount.');
            return;
        }

        const formData = new FormData();
        formData.append('attachment', file);
        formData.append('plan_id', planId);
        formData.append('deposit_amount', depositAmount); // Include deposit amount

        try {
            // Submit form data to server
            const response = await axios.post('/checkout', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            toast.success('Plan submitted successfully! Redirecting to dashboard...');

            // Redirect to dashboard after a short delay
            setTimeout(() => {
                navigate('/dashboard');
            }, 1500); // 1.5 seconds delay before redirecting
        } catch (error) {
            toast.error('Failed to submit plan.');
            console.error('Failed to submit plan:', error);
        }
    };

    // Admin's bank details
    const bankDetails = {
        accountName: 'Admin Bank Account',
        accountNumber: '123456789',
        bankName: 'XYZ Bank',
        branch: 'Main Branch',
        swiftCode: 'XYZ123',
        iban: 'PK00XYZ123456789000000'
    };

    return (
        <div style={styles.container}>
            {/* Toaster component for notifications */}
            <Toaster />

            {/* Left side: Upload form */}
            <div style={styles.leftSection}>
                <h2 className={'mb-3'}>Submit Payment Attachment</h2>
                <form onSubmit={handleSubmit}>
                    {/* Input for Deposit Amount */}
                    <div style={styles.inputGroup}>
                        <label htmlFor="depositAmount">Deposit Amount:</label>
                        <input
                            type="number"
                            id="depositAmount"
                            value={depositAmount}
                            onChange={(e) => setDepositAmount(e.target.value)}
                            className="form-control"
                            placeholder="Enter deposit amount"
                            required
                        />
                    </div>

                    {/* File Upload */}
                    <div style={styles.customFileInput} onClick={() => document.getElementById('fileInput').click()}>
                        <input
                            id="fileInput"
                            type="file"
                            onChange={handleFileChange}
                            style={styles.fileInput}
                            required
                        />
                        <p>Drag & drop your file here or click to upload</p>
                    </div>

                    {preview && (
                        <div style={styles.previewContainer}>
                            <img src={preview} alt="Selected file" style={styles.imagePreview} />
                        </div>
                    )}

                    <button className={'mt-3'} type="submit" style={styles.submitButton}>
                        Submit Attachment
                    </button>
                </form>
            </div>

            {/* Right side: Admin bank details */}
            <div style={styles.rightSection}>
                <div style={styles.card}>
                    <h3>Admin Bank Details</h3>
                    <p><strong>Account Name:</strong> {bankDetails.accountName}</p>
                    <p><strong>Account Number:</strong> {bankDetails.accountNumber}</p>
                    <p><strong>Bank Name:</strong> {bankDetails.bankName}</p>
                    <p><strong>Branch:</strong> {bankDetails.branch}</p>
                    <p><strong>SWIFT Code:</strong> {bankDetails.swiftCode}</p>
                    <p><strong>IBAN:</strong> {bankDetails.iban}</p>
                </div>
            </div>
        </div>
    );
};

// Styles for layout and components
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '50px',
        backgroundColor: '#f9f9f9',
        height: '70vh'
    },
    leftSection: {
        flex: 1,
        marginRight: '20px',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column'
    },
    rightSection: {
        flex: 1,
        marginLeft: '20px',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        textAlign: 'center'
    },
    inputGroup: {
        marginBottom: '20px',
        display: 'flex',
        flexDirection: 'column'
    },
    customFileInput: {
        border: '2px dashed #7a00ff',
        padding: '20px',
        borderRadius: '10px',
        textAlign: 'center',
        cursor: 'pointer',
        backgroundColor: '#f9f9f9',
        color: '#7a00ff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    fileInput: {
        opacity: 0,
        position: 'absolute',
        zIndex: -1
    },
    submitButton: {
        padding: '10px 20px',
        backgroundColor: '#7a00ff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    },
    previewContainer: {
        marginTop: '10px',
        textAlign: 'center'
    },
    imagePreview: {
        maxWidth: '100%',
        maxHeight: '150px',
        borderRadius: '10px',
        objectFit: 'cover'
    }
};

export default CheckoutPage;
