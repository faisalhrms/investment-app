import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
const Sidebar = () => {
    const [approvalCount, setApprovalCount] = useState(0);

    useEffect(() => {
        // Fetch the number of pending approval requests
        const fetchApprovalCount = async () => {
            try {
                const response = await axios.get('/packages/pending_requests'); // Assuming this endpoint returns the count of pending requests
                setApprovalCount(response.data.length);
            } catch (error) {
                console.error('Error fetching approval request count:', error);
            }
        };

        fetchApprovalCount();
    }, []);
    return (
        <div className="l-sidebar">
            <div className="l-sidebar__content">
                <nav className="c-menu js-menu" id="mynavi">
                    <ul className="u-list crm_drop_second_ul">
                        <li className="crm_navi_icon">
                            <div className="c-menu__item__inner"><a><i
                                className="flaticon-four-grid-layout-design-interface-symbol"></i></a>
                                <ul className="crm_hover_menu">
                                    <li><Link to="/dashboard"><i className="fas fa-circle"></i> my profile</Link>
                                    </li>
                                    <li><Link to="/user_profile"><i className="fas fa-circle"></i> change password</Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="c-menu__item is-active has-sub crm_navi_icon_cont">
                            <a>
                                <div className="c-menu-item__title"><span>my account</span>
                                </div>
                            </a>
                            <ul>
                                <li><Link to="/dashboard"><i className="fas fa-circle"></i> my profile</Link>
                                </li>

                                <li><Link to="/user_profile"><i className="fas fa-circle"></i> change password</Link>
                                </li>

                            </ul>
                        </li>
                    </ul>
                    <ul className="u-list crm_drop_second_ul">
                        <li className="crm_navi_icon">
                            <div className="c-menu__item__inner"><a><i
                                className="flaticon-movie-tickets"></i></a>
                                <ul className="crm_hover_menu">
                                    <li>
                                        <a href="make_deposit.html"> <i className="fa fa-circle"></i>make deposit</a>
                                    </li>
                                    <li>
                                        <a href="deposit_list.html"> <i className="fa fa-circle"></i> deposit lists</a>
                                    </li>
                                    <li>
                                        <a href="payment_request.html"> <i className="fa fa-circle"></i> payment request</a>
                                    </li>
                                    <li>
                                        <a href="exchange_money.html"> <i className="fa fa-circle"></i>exchange
                                            money</a>
                                    </li>
                                    <li>
                                        <a href="transfer_fund.html"> <i className="fa fa-circle"></i>fund transfer</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="c-menu__item is-active has-sub crm_navi_icon_cont">
                            <a>
                                <div className="c-menu-item__title"><span>finance</span>
                                </div>
                            </a>
                            <ul>
                                <li>
                                    <a href="make_deposit.html"> <i className="fa fa-circle"></i>make deposit</a>
                                </li>
                                <li>
                                    <a href="deposit_list.html"> <i className="fa fa-circle"></i> deposit lists</a>
                                </li>
                                <li>
                                    <a href="payment_request.html"> <i className="fa fa-circle"></i> payment request</a>
                                </li>
                                <li>
                                    <a href="exchange_money.html"> <i className="fa fa-circle"></i>exchange money</a>
                                </li>
                                <li>
                                    <a href="transfer_fund.html"> <i className="fa fa-circle"></i>fund transfer</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <ul className="u-list crm_drop_second_ul">
                        <li className="crm_navi_icon">
                            <div className="c-menu__item__inner"><a href="transfer_fund.html"><i
                                className="flaticon-progress-report"></i></a>
                            </div>
                        </li>
                        <li className="c-menu__item crm_navi_icon_cont">
                            <Link to="/approval_request">
                                <div className="c-menu-item__title">
                                    Approval Requests
                                    {approvalCount > 0 && (
                                        <span style={{marginLeft: '27px'}} className="no_badge">{approvalCount}</span>
                                    )}
                                </div>
                            </Link>
                        </li>
                    </ul>
                    <ul className="u-list crm_drop_second_ul">
                        <li className="crm_navi_icon">
                            <div className="c-menu__item__inner"><a><i
                                className="flaticon-help"></i></a>
                                <ul className="crm_hover_menu">
                                    <li>
                                        <Link to="/referrals"><i className="fas fa-circle"></i> my referrals</Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="c-menu__item is-active has-sub crm_navi_icon_cont">
                            <a href="#">
                                <div className="c-menu-item__title"><span>referrals</span>
                                </div>
                            </a>
                            <ul>
                                <li><Link to="/referrals"><i className="fas fa-circle"></i> my referrals</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>

                    <ul className="u-list crm_drop_second_ul">
                        <li className="crm_navi_icon">
                            <div className="c-menu__item__inner"><a><i
                                className="flaticon-help"></i></a>
                                <ul className="crm_hover_menu">
                                    <li><a><i className="fas fa-circle"></i> Investment Plans</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="c-menu__item is-active has-sub crm_navi_icon_cont">
                            <a>
                                <div className="c-menu-item__title"><span>Investment Plans</span>
                                </div>
                            </a>
                            <ul>
                                <li><Link to="/packages"><i className="fas fa-circle"></i> Packages</Link></li>

                            </ul>
                        </li>
                    </ul>

                    <ul className="u-list crm_drop_second_ul">
                        <li className="crm_navi_icon">
                            <div className="c-menu__item__inner"><a><i
                                className="flaticon-settings"></i></a>
                                <ul className="crm_hover_menu">
                                    <li><a><i className="fas fa-circle"></i> settings</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="c-menu__item is-active has-sub crm_navi_icon_cont">
                            <a>
                                <div className="c-menu-item__title"><span>settings</span>
                                </div>
                            </a>
                            <ul>
                                <li><Link to="/user"><i className="fas fa-circle"></i> Users</Link></li>
                                <li><Link to="/role"><i className="fas fa-circle"></i> Roles & Permissions</Link></li>
                                <li><Link to="/activity_stream"><i className="fas fa-circle"></i> Activity Stream</Link></li>


                            </ul>
                        </li>
                    </ul>

                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
