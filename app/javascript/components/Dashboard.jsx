import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import user from '../images/user.png';

const Dashboard = ({ currentUser }) => {

    const [plans, setPlans] = useState([]); // State to hold the investment plans
    const [loading, setLoading] = useState(true); // Loading state
    const [activePlan, setActivePlan] = useState(null); // Active plan for the user
    const [planTransaction, setPlanTransaction] = useState(null); // Plan transaction for the user
    const [showModal, setShowModal] = useState(false); // Modal visibility state
    const [selectedPlan, setSelectedPlan] = useState(null); // Selected plan for cancellation

    useEffect(() => {
        fetchPlans();
        fetchActivePlan();
    }, []);

    // Fetch investment plans from the backend
    const fetchPlans = async () => {
        try {
            const response = await axios.get('/packages/list');
            setPlans(response.data); // Assuming response.data contains the plans array
            setLoading(false); // Set loading to false after fetching data
        } catch (error) {
            console.error('Error fetching investment plans:', error);
            setLoading(false); // Stop loading in case of error
        }
    };

    // Fetch the active plan and plan transaction of the current user
    const fetchActivePlan = async () => {
        try {
            const response = await axios.get(`/packages/active_plan`);

            // Check if the plan and the transaction are present
            if (response.data && response.data.plan && response.data.plan_transaction) {
                setActivePlan(response.data.plan);  // Set active plan regardless of status
                setPlanTransaction(response.data.plan_transaction);  // Set plan transaction
            } else {
                console.log(response.data.message);
                setActivePlan(null);
                setPlanTransaction(null);
            }
        } catch (error) {
            console.error('Error fetching active plan:', error);
        }
    };



    const handleCancelClick = (plan) => {
        setSelectedPlan(plan);
        setShowModal(true); // Show the confirmation modal
    };

    const handleConfirmCancel = async () => {
        try {
            await axios.delete(`/packages/${activePlan.id}/cancel_plan`); // Delete the active plan transaction
            setShowModal(false); // Close the modal
            setActivePlan(null); // Clear the active plan
            fetchPlans(); // Refresh plans after deletion
        } catch (error) {
            console.error('Error cancelling the plan:', error);
        }
    };

    const navigate = useNavigate();

    const handleBuyClick = (plan) => {
        navigate('/cart', { state: { plan } });  // Pass the selected plan information to the cart page
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return '-';
        const date = new Date(timestamp);
        return date.toLocaleString(); // This will show the date in a readable format based on the user's locale
    };

    const handleCopyReferralLink = () => {
        const referralLink = `${window.location.origin}/register?ref=${currentUser.referral_id}`;
        navigator.clipboard.writeText(referralLink);
        alert('Referral link copied!');
    };


    return (
        <div>
            <div className="l-main">
                <div className="account_top_information">
                    <div className="account_overlay"></div>
                    <div className="useriimg"><img src={user} alt="users" /></div>
                    <div className="userdet uderid">
                        <h3>{currentUser ? currentUser.full_name : 'User'}</h3>
                        <dl className="userdescc">
                            <dt>Registration Date</dt>
                            <dd>: &nbsp; {currentUser ? formatDate(currentUser.created_at) : '-'}</dd>
                            <dt>User Type</dt>
                            <dd>: &nbsp; {currentUser ? currentUser.user_type : '-'}</dd>
                            <dt>Address</dt>
                            <dd>: &nbsp; {currentUser ? currentUser.address : '-'}</dd>
                            <dt>Current Plan</dt>
                            <dd>: &nbsp; {activePlan ? activePlan.name : '-'}</dd>
                        </dl>
                    </div>

                    <div className="userdet user_transcation">
                        <h3>Available Balance</h3>
                        <dl className="userdescc">
                            <dt>Paypal</dt>
                            <dd>392.79</dd>
                        </dl>
                    </div>
                </div>

                <div className="account_wrapper float_left">
                    <div className="row">
                        <div className="col-md-12 col-lg-12 col-sm-12 col-12">
                            <div className="sv_heading_wraper">
                                <h3>my account</h3>
                            </div>
                        </div>
                        {/* Existing Cards */}
                        {/* ... your existing cards code ... */}

                        {/* Referral Card with Font Awesome icon */}
                        <div className="col-md-4 col-lg-4 col-xl-3 col-sm-6 col-12">
                            <div className="investment_box_wrapper color_5 float_left">
                                <a href="#">
                                    <div className="investment_icon_wrapper float_left">
                                        <i className="far fa-money-bill-alt"></i>
                                        <h1>referral</h1>
                                    </div>
                                    <div className="invest_details float_left">
                                        <table className="invest_table">
                                            <tbody>
                                            <tr>
                                                <td className="invest_td1">Total Referrals</td>
                                                <td className="invest_td1"> : 11</td>
                                            </tr>
                                            <tr>
                                                <td className="invest_td1">Earnings</td>
                                                <td className="invest_td1">: $192.00 USD</td>
                                            </tr>
                                            <tr>
                                                <td className="invest_td1">Copy Referral Link</td>
                                                <td className="invest_td1">
                                                    <FontAwesomeIcon icon={faCopy} onClick={handleCopyReferralLink} style={{ cursor: 'pointer' }} />
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className="col-md-4 col-lg-4 col-xl-3 col-sm-6 col-12">
                            <div className="investment_box_wrapper color_1 float_left">
                                <a href="#">
                                    <div className="investment_icon_wrapper float_left">
                                        <i className="far fa-money-bill-alt"></i>
                                        <h1>deposits</h1>
                                    </div>

                                    <div className="invest_details float_left">
                                        <table className="invest_table">
                                            <tbody>
                                            <tr>
                                                <td className="invest_td1">Active Deposit</td>
                                                <td className="invest_td1"> :{planTransaction ? planTransaction.deposit_amount : '-'}</td>
                                            </tr>
                                            <tr>
                                                <td className="invest_td1">New Deposit</td>
                                                <td className="invest_td1">: $0.00 USD</td>
                                            </tr>
                                            <tr>
                                                <td className="invest_td1">Matured Deposit</td>
                                                <td className="invest_td1">: $0.00 USD</td>
                                            </tr>
                                            <tr>
                                                <td className="invest_td1">Released Deposit</td>
                                                <td className="invest_td1">: $0.00 USD</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className="col-md-4 col-lg-4 col-xl-3 col-sm-6 col-12">
                            <div className="investment_box_wrapper color_2 float_left">
                                <a href="#">
                                    <div className="investment_icon_wrapper float_left">
                                        <i className="far fa-money-bill-alt"></i>
                                        <h1>payouts</h1>
                                    </div>

                                    <div className="invest_details float_left">
                                        <table className="invest_table">
                                            <tbody>
                                            <tr>
                                                <td className="invest_td1">total payouts</td>
                                                <td className="invest_td1"> : $0.00 USD</td>
                                            </tr>
                                            <tr>
                                                <td className="invest_td1">pending payouts</td>
                                                <td className="invest_td1">: $0.00 USD</td>
                                            </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className="col-md-4 col-lg-4 col-xl-3 col-sm-6 col-12">
                            <div className="investment_box_wrapper color_3 float_left">
                                <a href="#">
                                    <div className="investment_icon_wrapper float_left">
                                        <i className="far fa-money-bill-alt"></i>
                                        <h1>interest earn</h1>
                                    </div>

                                    <div className="invest_details float_left">
                                        <table className="invest_table">
                                            <tbody>
                                            <tr>
                                                <td className="invest_td1">interest today</td>
                                                <td className="invest_td1"> : $0.00 USD</td>
                                            </tr>
                                            <tr>
                                                <td className="invest_td1">interest this week</td>
                                                <td className="invest_td1">: $0.00 USD</td>
                                            </tr>
                                            <tr>
                                                <td className="invest_td1">interest this month</td>
                                                <td className="invest_td1">: $0.00 USD</td>
                                            </tr>
                                            <tr>
                                                <td className="invest_td1">interest earnings</td>
                                                <td className="invest_td1">: $0.00 USD</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className="col-md-4 col-lg-4 col-xl-3 col-sm-6 col-12">
                            <div className="investment_box_wrapper color_4 float_left">
                                <a href="#">
                                    <div className="investment_icon_wrapper float_left">
                                        <i className="far fa-money-bill-alt"></i>
                                        <h1>earnings</h1>
                                    </div>

                                    <div className="invest_details float_left">
                                        <table className="invest_table">
                                            <tbody>
                                            <tr>
                                                <td className="invest_td1">interest today</td>
                                                <td className="invest_td1"> : $0.00 USD</td>
                                            </tr>
                                            <tr>
                                                <td className="invest_td1">interest this week</td>
                                                <td className="invest_td1">: $0.00 USD</td>
                                            </tr>
                                            <tr>
                                                <td className="invest_td1">interest this month</td>
                                                <td className="invest_td1">: $0.00 USD</td>
                                            </tr>
                                            <tr>
                                                <td className="invest_td1">total earnings</td>
                                                <td className="invest_td1">: $192.00 USD</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </a>
                            </div>
                        </div>


                    </div>
                </div>

                {/* Investment Plans Section */}
                <div className="investment_plans float_left">
                    <div className="investment_overlay"></div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-lg-12 col-sm-12 col-12">
                                <div className="sv_heading_wraper heading_wrapper_dark">
                                    <h4>Our Plans</h4>
                                    <h3>Our Investment Plans</h3>
                                </div>
                            </div>

                            {loading ? (
                                <p>Loading investment plans...</p>
                            ) : (
                                plans.map((plan) => (
                                    <div className={`col-xl-3 col-md-6 col-lg-6 col-sm-6 col-12`} key={plan.id}>
                                        <div className={`investment_box_wrapper float_left ${activePlan && activePlan.id === plan.id ? 'active-plan' : ''}`}>
                                            <div className="investment_icon_circle">
                                                <i className={`fa ${activePlan && activePlan.id === plan.id ? 'fa-check-circle' : 'flaticon-bar-chart'}`}></i>
                                            </div>
                                            <div className="investment_border_wrapper"></div>
                                            {activePlan && activePlan.id === plan.id && (
                                                <>
                                                    <h5 className="active-label">Active Plan</h5>
                                                    {activePlan && activePlan.status === 'active' ? (
                                                        <a onClick={() => handleCancelClick(plan)} style={{ color: 'white' }}>Cancel</a>
                                                    ) : (
                                                        <span style={{ color: 'orange' }}>Pending Approval</span>
                                                    )}
                                                </>
                                            )}

                                            <div className="investment_content_wrapper">
                                                <h1><a href="#">{plan.name}</a></h1>
                                                <p>
                                                    {plan.description} <br />
                                                    Principal {plan.principal_return ? 'Return' : 'No Return'}<br />
                                                    Compound {plan.compound_available ? 'Available' : 'Not Available'}
                                                </p>
                                                <br />
                                                <h3><a href="#">{plan.price} PKR</a></h3>
                                            </div>
                                            <div className="about_btn plans_btn">
                                                <ul>
                                                    <li>
                                                        {activePlan && activePlan.id === plan.id ? (
                                                            planTransaction && planTransaction.status === 'active' ? (
                                                                <a onClick={() => handleCancelClick(plan)} style={{ color: 'white' }}>Cancel</a>
                                                            ) : (
                                                                <a style={{ color: 'gray', pointerEvents: 'none', cursor: 'default' }}>
                                                                    Pending Approval
                                                                </a>
                                                            )
                                                        ) : (
                                                            <a onClick={() => handleBuyClick(plan)}>Buy</a>
                                                        )}
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className="investment_border_wrapper"></div>

                                            {/* Mark the active plan */}

                                        </div>
                                    </div>
                                ))
                            )}
                            <Modal show={showModal} onHide={() => setShowModal(false)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Confirm Cancellation</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    Are you sure you want to cancel the plan: <strong>{selectedPlan?.name}</strong>?
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                                        Close
                                    </Button>
                                    <Button variant="danger" onClick={handleConfirmCancel}>
                                        Yes, Cancel Plan
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>
                </div>
                {/* Investment Plans Section End */}

                {/* Last Transactions */}
                <div className="last_transaction_wrapper float_left">
                    <div className="row">
                        <div className="col-md-12 col-lg-12 col-sm-12 col-12">
                            <div className="sv_heading_wraper">
                                <h3>LAST 5 TRANSACTIONS</h3>
                            </div>
                        </div>
                        <div className="crm_customer_table_main_wrapper float_left">
                            <div className="crm_ct_search_wrapper">
                                <div className="crm_ct_search_bottom_cont_Wrapper"></div>
                            </div>
                            <div className="table-responsive">
                                <table className="myTable table datatables cs-table crm_customer_table_inner_Wrapper">
                                    <thead>
                                    <tr>
                                        <th className="width_table1">transaction ID</th>
                                        <th className="width_table1">amount ($)</th>
                                        <th className="width_table1">description</th>
                                        <th className="width_table1">payment mode</th>
                                        <th className="width_table1">date</th>
                                        <th className="width_table1">options</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {/* Transaction data */}
                                    {/* ... your existing transaction rows ... */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
