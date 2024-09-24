import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from "../components/Header";
import Header2 from "../components/HeaderDashboard";
import HomePage from "../components/HomePage";
import Register from "../components/Register";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import User from "../components/User";
import Title from "../components/Title";
import Role from "../components/Role";
import ActivityStreams from "../components/Activity";
import Packages from "../components/Packages";
import CartPage from "../components/CartPage";
import CheckoutPage from "../components/CheckoutPage";
import ChangePassword from "../components/ChangePassword";
import ApprovalRequest from "../components/ApprovalRequest";
import Referrals from "../components/Referrals";

const App = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const showSidebar = location.pathname.startsWith('/dashboard')
        || location.pathname.startsWith('/user')
        || location.pathname.startsWith('/role')
        || location.pathname.startsWith('/packages')
        || location.pathname.startsWith('/user_profile')
        || location.pathname.startsWith('/approval_request')
        || location.pathname.startsWith('/activity_stream')
        || location.pathname.startsWith('/referrals');
    const [currentUser, setCurrentUser] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);

    useEffect(() => {
        const currentUserElement = document.getElementById('current-user');
        if (currentUserElement) {
            try {
                const data = JSON.parse(currentUserElement.textContent);
                setCurrentUser(data?.current_user || null);
                setAvatarUrl(data?.avatar_url || null);
            } catch (error) {
                console.error("Error parsing current user data:", error);
            }
        }
    }, []);

    return (
        <div>
            {showSidebar && <Title  currentPath={location.pathname}/>}

            <header>
                {isHomePage ? <Header currentUser={currentUser} /> : <Header2 currentUser={currentUser} />}
            </header>

            <div className="d-flex">
                {showSidebar && <Sidebar />}
                <div className="content-area flex-grow-1">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/dashboard" element={<Dashboard currentUser={currentUser} avatarUrl={avatarUrl} />} />
                        <Route path="/user" element={<User currentUser={currentUser} avatarUrl={avatarUrl}/>} />
                        <Route path="/referrals" element={<Referrals currentUser={currentUser} avatarUrl={avatarUrl}/>} />
                        <Route path="/role" element={<Role currentUser={currentUser} avatarUrl={avatarUrl}/>} />
                        <Route path="/packages" element={<Packages currentUser={currentUser} avatarUrl={avatarUrl}/>} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/checkout_page" element={<CheckoutPage />} />
                        <Route path="/user_profile" element={<ChangePassword currentUser={currentUser} avatarUrl={avatarUrl} />} />
                        <Route path="/approval_request" element={<ApprovalRequest currentUser={currentUser} avatarUrl={avatarUrl} />} />
                        <Route path="/activity_stream" element={<ActivityStreams currentUser={currentUser} avatarUrl={avatarUrl}/>} />
                    </Routes>
                </div>
            </div>

            {isHomePage && (
                <footer>
                    <Footer />
                </footer>
            )}
        </div>
    );
};

const RootApp = () => {
    return (
        <Router>
            <App />
        </Router>
    );
};

export default RootApp;
