import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import partner1 from '../images/partner1.png';
import partner2 from '../images/partner2.png';
import partner3 from '../images/partner3.png';
import partner4 from '../images/partner4.png';
import backgroundImage from '../images/login.jpg';
import toast, { Toaster } from 'react-hot-toast';  

const Register = () => {
    const navigate = useNavigate();  // Initialize useNavigate hook

    // State to manage form inputs
    const [formData, setFormData] = useState({
        referralId: '',
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        confirmPassword: '',
        email: ''
    });

    // Function to handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation for password match
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match!');
            return;
        }

        // API call to backend to save the user data
        try {
            const response = await fetch('/new_user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                toast.success(data.message || 'User created successfully!');
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                toast.error(data.message || 'Something went wrong!');
            }
        } catch (error) {
            toast.error('An error occurred while creating the user!');
        }
    };

    return (
        <div>
            <Toaster position="top-right" reverseOrder={false} />
            <div className="login_wrapper float_left">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="login_top_box float_left">
                                <div className="login_banner_wrapper register_banner_wrapper" style={{ backgroundImage: `url(${backgroundImage})` }}>
                                    <div className="about_btn facebook_wrap float_left">
                                        <a href="#">Login with Facebook <i className="fab fa-facebook-f"></i></a>
                                    </div>
                                    <div className="about_btn google_wrap float_left">
                                        <a href="#">Login with Pinterest <i className="fab fa-pinterest-p"></i></a>
                                    </div>
                                    <div className="jp_regis_center_tag_wrapper jb_register_red_or">
                                        <h1>OR</h1>
                                    </div>
                                </div>

                                {/* Form with hidden dummy fields and corrected username field */}
                                <form onSubmit={handleSubmit} className="login_form_wrapper register_wrapper" autoComplete="off">
                                    <input type="text" name="dummy" style={{ display: 'none' }} autoComplete="off" />
                                    <input type="password" name="fakePassword" style={{ display: 'none' }} autoComplete="off" />
                                    <div className="sv_heading_wraper heading_wrapper_dark dark_heading hwd">
                                        <h3> Register To Enter</h3>
                                    </div>
                                    <div className="form-group icon_form comments_form register_contact">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="referralId"
                                            placeholder="Referral ID"
                                            value={formData.referralId}
                                            onChange={handleChange}
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="form-group icon_form comments_form register_contact">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="firstName"
                                            placeholder="First Name*"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="form-group icon_form comments_form register_contact">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="lastName"
                                            placeholder="Last Name*"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="form-group icon_form comments_form register_contact">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="username"  // Use "username" to match state key
                                            placeholder="Username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="form-group icon_form comments_form register_contact">
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            placeholder="Password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            autoComplete="new-password"
                                        />
                                    </div>
                                    <div className="form-group icon_form comments_form register_contact">
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="confirmPassword"
                                            placeholder="Confirm Password"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            autoComplete="new-password"
                                        />
                                    </div>
                                    <div className="form-group icon_form comments_form register_contact">
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            placeholder="Email Address*"
                                            value={formData.email}
                                            onChange={handleChange}
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="login_remember_box">
                                        <label className="control control--checkbox">
                                            I agree to the Terms and Conditions.
                                            <input type="checkbox" />
                                            <span className="control__indicator"></span>
                                        </label>
                                    </div>
                                    <div className="about_btn login_btn register_btn float_left">
                                        <a  onClick={handleSubmit} l>Submit</a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="payments_wrapper float_left">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="sv_heading_wraper half_section_headign">
                                <h4>Payment Methods</h4>
                                <h3>Accepted Payment Method</h3>
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                            <div className="payment_slider_wrapper">
                                <OwlCarousel className="owl-theme" loop margin={10} nav>
                                    <div className="item">
                                        <div className="partner_img_wrapper float_left">
                                            <img src={partner1} className="img-responsive" alt="img" />
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="partner_img_wrapper float_left">
                                            <img src={partner2} className="img-responsive" alt="img" />
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="partner_img_wrapper float_left">
                                            <img src={partner3} className="img-responsive" alt="img" />
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="partner_img_wrapper float_left">
                                            <img src={partner4} className="img-responsive" alt="img" />
                                        </div>
                                    </div>
                                </OwlCarousel>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
