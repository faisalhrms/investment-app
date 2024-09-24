import React, {useEffect, useState} from 'react';
import logo from '../images/logo.png';

const Referrals = ({currentUser}) => {
    const [activeReferrals, setActiveReferrals] = useState(0);
    const [inactiveReferrals, setInactiveReferrals] = useState(0);
    const [totalReferralAmount, setTotalReferralAmount] = useState(0.00);
    const [firstLevelReferrals, setFirstLevelReferrals] = useState([]);

    useEffect(() => {
        if (currentUser) {
            // Fetch referral and transaction data from backend
            const fetchReferralData = async () => {
                try {
                    const response = await fetch(`/users/${currentUser.id}/referral_data`);
                    const data = await response.json();

                    setActiveReferrals(data.activeReferrals);
                    setInactiveReferrals(data.inactiveReferrals);
                    setTotalReferralAmount(data.totalReferralAmount);
                    setFirstLevelReferrals(data.firstLevelReferrals);
                } catch (error) {
                    console.error('Error fetching referral data:', error);
                }
            };

            fetchReferralData();
        }
    }, [currentUser]);

    // Return null or a loading state if currentUser is not yet available
    if (!currentUser) {
        return <div>Loading...</div>; // You can replace this with a spinner or loader
    }

    return (
        <div class="l-main" style={{marginTop: '11rem', overflow: 'auto', height: '100vh', width: '100vw'}}>
            {/* Referrals Wrapper Start */}
            <div className="view_profile_wrapper_top float_left">
                <div className="row">
                    <div className="col-md-12 col-lg-12 col-sm-12 col-12">
                        <div className="sv_heading_wraper">

                            <h3>REFERRAL HISTORY</h3>

                        </div>
                    </div>
                    <div className="col-xl-12 col-md-12 col-lg-12 col-sm-12 col-12">
                        <div className="view_profile_wrapper float_left">
                            <ul className="profile_list referal_list">
                                <li><span className="detail_left_part">Active Referrals</span> <span
                                    className="detail_right_part">{activeReferrals}</span></li>
                                <li><span className="detail_left_part">Inactive Referrals</span> <span
                                    className="detail_right_part">{inactiveReferrals}</span></li>
                                <li><span className="detail_left_part">Total Referral Deposited Amount</span> <span
                                    className="detail_right_part">${totalReferralAmount.toFixed(2)} USD</span></li>
                                <li>
                                    <span className="detail_left_part">Referral Link</span>
                                    <span className="detail_right_part">
        {`${window.location.origin}/register?ref=${currentUser.referral_id}`}
    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Transactions Wrapper Start */}
            <div className="last_transaction_wrapper float_left">
                <div className="row">
                    <div className="crm_customer_table_main_wrapper float_left">
                        <div className="table-responsive">
                            <table className="myTable table datatables cs-table crm_customer_table_inner_Wrapper">
                                <thead>
                                <tr>
                                    <th className="width_table1">Level</th>
                                    <th className="width_table1">Username</th>
                                    <th className="width_table1">First Name</th>
                                    <th className="width_table1">E-mail</th>
                                    <th className="width_table1">Status</th>
                                </tr>
                                </thead>
                                <tbody>
                                {firstLevelReferrals.length > 0 ? (
                                    firstLevelReferrals.map((referral, index) => (
                                        <tr className="background_white" key={index}>
                                            <td>
                                                <div className="media cs-media">
                                                    <div className="media-body">
                                                        <h5>Level 1</h5>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{referral.username}</td>
                                            <td>{referral.first_name}</td>
                                            <td>{referral.email}</td>
                                            <td>{referral.is_active ? 'Active' : 'Inactive'}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5">No referrals found.</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/* Transactions Wrapper End */}
        </div>
    );
};

export default Referrals;
