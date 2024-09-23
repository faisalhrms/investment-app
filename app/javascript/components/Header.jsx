import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import logo from '../images/logo.png';

const Header = () => {
    const location = useLocation();
    const isRegisterPage = location.pathname === '/register';
    return (
        <React.Fragment>
        <nav className="cd-dropdown d-block d-sm-block d-md-block d-lg-none d-xl-none">
            <h2><Link to="/"> savehyip </Link></h2>
            <a href="#0" className="cd-close">Close</a>
            <ul className="cd-dropdown-content">
                <li>
                    <form className="cd-search">
                        <input type="search" placeholder="Search..." />
                    </form>
                </li>
                <li className="has-children">
                    <Link to="#">Index</Link>
                    <ul className="cd-secondary-dropdown icon_menu is-hidden">
                        <li className="go-back"><a href="#0">Menu</a></li>
                        <li><Link to="/index">Index I</Link></li>
                        <li><Link to="/index2">Index II</Link></li>
                        <li><Link to="/index3">Index III</Link></li>
                    </ul>
                </li>
                <li><Link to="/about_us"> About Us </Link></li>
                <li><Link to="/investment"> Investment Plan </Link></li>
                <li><Link to="/faq"> FAQ </Link></li>
                <li className="has-children">
                    <Link to="#">Dashboard</Link>
                    <ul className="cd-secondary-dropdown icon_menu is-hidden">
                        <li className="go-back"><a href="#0">Menu</a></li>
                        <li><Link to="/all_transactions">All Transactions</Link></li>
                        <li><Link to="/banners">Banners</Link></li>
                        <li><Link to="/change_password">Change Password</Link></li>
                        <li><Link to="/change_pin">Change Pin</Link></li>
                        <li><Link to="/deposit_history">Deposit History</Link></li>
                        <li><Link to="/deposit_list">Deposit List</Link></li>
                        <li><Link to="/earnings_history">Earnings History</Link></li>
                        <li><Link to="/email_notification">Email Notification</Link></li>
                        <li><Link to="/exchange_history">Exchange History</Link></li>
                        <li><Link to="/exchange_money">Exchange Money</Link></li>
                        <li><Link to="/make_deposit">Make Deposit</Link></li>
                        <li><Link to="/my_account">My Account</Link></li>
                        <li><Link to="/payment_request">Payment Request</Link></li>
                        <li><Link to="/pending_history">Pending History</Link></li>
                        <li><Link to="/referral_earnings">Referral Earnings</Link></li>
                        <li><Link to="/referrals">Referrals</Link></li>
                        <li><Link to="/tickets">Tickets</Link></li>
                        <li><Link to="/transfer_fund">Transfer Fund</Link></li>
                        <li><Link to="/view_profile">View Profile</Link></li>
                    </ul>
                </li>
                <li className="has-children">
                    <Link to="#">Blog</Link>
                    <ul className="cd-secondary-dropdown icon_menu is-hidden">
                        <li className="go-back"><a href="#0">Menu</a></li>
                        <li><Link to="/blog_category">Blog Category</Link></li>
                        <li><Link to="/blog_single">Blog Single</Link></li>
                    </ul>
                </li>
                <li><Link to="/contact_us"> Contact Us </Link></li>
                <li><Link to="/login"> Login </Link></li>
                <li><Link to="/register"> Register </Link></li>
            </ul>
        </nav>
        <header className="cp_navi_main_wrapper float_left">
            <div className="container-fluid">
                {/* Logo */}
                <div className="cp_logo_wrapper">
                    <Link to="/">
                        <img src={logo} alt="logo" />
                    </Link>
                </div>
                {/* Mobile Menu */}
                <header className="mobail_menu d-block d-sm-block d-md-block d-lg-none d-xl-none">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="cd-dropdown-wrapper">
                                    <a className={`house_toggle ${isRegisterPage ? 'inner_toggle' : ''}`} href="#0">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 31.177 31.177">
                                            <g>
                                                <path className="menubar" d="M30.23,1.775H0.946c-0.489,0-0.887-0.398-0.887-0.888S0.457,0,0.946,0H30.23c0.49,0,0.888,0.398,0.888,0.888S30.72,1.775,30.23,1.775z" fill="#004165"></path>
                                                <path className="menubar" d="M30.23,9.126H12.069c-0.49,0-0.888-0.398-0.888-0.888c0-0.49,0.398-0.888,0.888-0.888H30.23c0.49,0,0.888,0.397,0.888,0.888C31.118,8.729,30.72,9.126,30.23,9.126z" fill="#004165"></path>
                                                <path className="menubar" d="M30.23,16.477H0.946c-0.489,0-0.887-0.398-0.887-0.888c0-0.49,0.398-0.888,0.887-0.888H30.23c0.49,0,0.888,0.397,0.888,0.888C31.118,16.079,30.72,16.477,30.23,16.477z" fill="#004165"></path>
                                                <path className="menubar" d="M30.23,23.826H12.069c-0.49,0-0.888-0.396-0.888-0.887c0-0.49,0.398-0.888,0.888-0.888H30.23c0.49,0,0.888,0.397,0.888,0.888C31.118,23.43,30.72,23.826,30.23,23.826z" fill="#004165"></path>
                                            </g>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Desktop Menu */}
                <div className="cp_navigation_wrapper">
                    <div className="mainmenu d-xl-block d-lg-block d-md-none d-sm-none d-none">
                        <ul className="main_nav_ul">
                            <li className="has-mega gc_main_navigation">
                                <Link to="/" className="gc_main_navigation active_class">Index <i className="fas fa-caret-down"></i></Link>
                                <ul className="navi_2_dropdown">
                                    <li className="parent"><Link to="/index">Index I</Link></li>
                                    <li className="parent"><Link to="/index2">Index II</Link></li>
                                    <li className="parent"><Link to="/index3">Index III</Link></li>
                                </ul>
                            </li>
                            <li><Link to="/about_us" className="gc_main_navigation">About Us</Link></li>
                            <li><Link to="/investment" className="gc_main_navigation">Investment Plan</Link></li>
                            <li className="has-mega gc_main_navigation">
                                <Link to="#" className="gc_main_navigation">Dashboard <i className="fas fa-caret-down"></i></Link>
                                <ul className="navi_2_dropdown">
                                    <li><Link to="/my_account">My Account</Link></li>
                                    <li><Link to="/view_profile">View Profile</Link></li>
                                    <li><Link to="/deposit_history">Deposit History</Link></li>
                                    <li><Link to="/change_password">Change Password</Link></li>
                                </ul>
                            </li>
                            <li><Link to="/blog" className="gc_main_navigation">Blog</Link></li>
                            <li><Link to="/contact_us" className="gc_main_navigation">Contact Us</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Header Buttons */}
            <div className="top_header_right_wrapper">
                <p><i className="flaticon-phone-contact"></i> (+91) 123 123 4567</p>
                <div className="header_btn">
                    <ul>
                        <li><Link to="/register">Register</Link></li>
                        <li>
                            <a href="/login"> login </a> </li>
                    </ul>
                </div>
            </div>
        </header>
        </React.Fragment>
    );
};

export default Header;
