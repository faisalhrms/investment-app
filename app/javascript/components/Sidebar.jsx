import React from 'react';
import {Link} from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="l-sidebar">
            <div className="l-sidebar__content">
                <nav className="c-menu js-menu" id="mynavi">
                    <ul className="u-list crm_drop_second_ul">
                        <li className="crm_navi_icon">
                            <div className="c-menu__item__inner"><a href="my_account.html"><i
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
                            <a href="my_account.html">
                                <div className="c-menu-item__title"><span>my account</span><i className="no_badge">5</i>
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
                            <div className="c-menu__item__inner"><a href="make_deposit.html"><i
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
                            <a href="make_deposit.html">
                                <div className="c-menu-item__title"><span>finance</span><i className="no_badge">5</i>
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
                                <div className="c-menu-item__title">Approval Requests</div>
                            </Link>
                        </li>
                    </ul>
                    <ul className="u-list crm_drop_second_ul">
                        <li className="crm_navi_icon">
                            <div className="c-menu__item__inner"><a href="referrals.html"><i
                                className="flaticon-settings"></i></a>
                                <ul className="crm_hover_menu">
                                    <li><a href="referrals.html"><i className="fa fa-circle"></i> my referrals </a>
                                    </li>
                                    <li>
                                        <a href="banners.html"> <i className="fa fa-circle"></i>promotionals banners</a>
                                    </li>
                                    <li>
                                        <a href="referral_earnings.html"> <i className="fa fa-circle"></i>referral
                                            earnings</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="c-menu__item is-active has-sub crm_navi_icon_cont">
                            <a href="#">
                                <div className="c-menu-item__title"><span>referrals</span><i
                                    className="no_badge purple">2</i>
                                </div>
                            </a>
                            <ul>
                                <li><a href="referrals.html"><i className="fa fa-circle"></i> my referrals </a>
                                </li>
                                <li>
                                    <a href="banners.html"> <i className="fa fa-circle"></i>promotionals banners</a>
                                </li>
                                <li>
                                    <a href="referral_earnings.html"> <i className="fa fa-circle"></i>referral earnings</a>
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
                                className="flaticon-help"></i></a>
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
