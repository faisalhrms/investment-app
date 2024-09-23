import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
const CartPage = () => {

    const location = useLocation();
    const plan = location.state?.plan;  // Access the plan passed from the HomePage
    const navigate = useNavigate();

    if (!plan) {
        return <p>No plan selected. Please go back and select a plan.</p>;
    }

    const cartStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: '#f6f0ff',
        padding: '30px',
        borderRadius: '10px',
        width: '100%',
        maxWidth: '900px',
        margin: 'auto',
        marginTop: '50px',
        color: '#333'
    };

    const leftSectionStyle = {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        flex: '3',
        marginRight: '20px'
    };

    const rightSectionStyle = {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        flex: '1',
        textAlign: 'center'
    };

    const purpleText = {
        color: '#6f2ed6'
    };

    const greenButtonStyle = {
        backgroundColor: '#00d100',
        color: '#fff',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    };

    const continueButtonStyle = {
        backgroundColor: '#7a00ff',
        color: '#fff',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        width: '100%'
    };
    if (!plan) {
        return <p>No plan selected. Please go back and select a plan.</p>;
    }
    const handleContinueClick = () => {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = '/checkout';

        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        const csrfInput = document.createElement('input');
        csrfInput.type = 'hidden';
        csrfInput.name = 'authenticity_token';
        csrfInput.value = csrfToken;
        form.appendChild(csrfInput);

        const planInput = document.createElement('input');
        planInput.type = 'hidden';
        planInput.name = 'planId';
        planInput.value = plan.id;
        form.appendChild(planInput);

        document.body.appendChild(form);
        form.submit();
    };



    return (
        <div style={{ padding: '20px',marginTop: '11rem', backgroundColor: '#f9f9f9', height: '100vh' }}>
            <div style={{ maxWidth: '1200px', margin: 'auto' }}>
                <h1 style={purpleText}>Your Cart</h1>
                <div style={cartStyle}>
                    {/* Left section (Package details) */}
                    <div style={leftSectionStyle}>
                        <h2>{plan.name}</h2>

                        <p style={{ backgroundColor: '#e0ffec', padding: '10px', borderRadius: '5px', marginTop: '10px' }}>
                            {plan.description}
                        </p>
                    </div>

                    {/* Right section (Subtotal & checkout) */}
                    <div style={rightSectionStyle}>
                        <h4>Subtotal</h4>
                        <p style={{ fontSize: '24px',marginTop: '20px', fontWeight: 'bold' }}>{plan.price} PKR</p>
                        <input
                            type="text"
                            placeholder="Have a coupon code?"
                            style={{
                                width: '100%',
                                padding: '10px',
                                marginBottom: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                                marginTop: '10px',
                            }}
                        />
                        <button style={continueButtonStyle} onClick={handleContinueClick}>
                            Continue
                        </button>
                        <p style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
                            30-day money-back guarantee
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CartPage;
