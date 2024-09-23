import React from 'react';
import logo from '../images/logo.png'

const Footer = () => {
    return (
        <div className="footer_main_wrapper float_left">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-6 col-12 col-sm-12">
                        <div className="wrapper_second_about">
                            <div className="wrapper_first_image">
                                <a href="/"><img src={logo} className="img-responsive" alt="logo" /></a>
                            </div>
                            <p>We are a full service Digital Marketing Agency all the foundational tools you need.</p>
                            <div className="counter-section">
                                <div className="ft_about_icon float_left">
                                    <i className="flaticon-user"></i>
                                    <div className="ft_abt_text_wrapper">
                                        <p className="timer"> 62236</p>
                                        <h4>Total Members</h4>
                                    </div>
                                </div>
                                <div className="ft_about_icon float_left">
                                    <i className="flaticon-money-bag"></i>
                                    <div className="ft_abt_text_wrapper">
                                        <p className="timer">27236</p>
                                        <h4>Total Deposited</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-2 col-md-3 col-12 col-sm-4">
                        <div className="wrapper_second_useful">
                            <h4>Useful Links</h4>
                            <ul>
                                <li><a href="#"><i className="fa fa-angle-right"></i>About Us</a></li>
                                <li><a href="#"><i className="fa fa-angle-right"></i>Contact</a></li>
                                <li><a href="#"><i className="fa fa-angle-right"></i>Services</a></li>
                                <li><a href="#"><i className="fa fa-angle-right"></i>News</a></li>
                                <li><a href="#"><i className="fa fa-angle-right"></i>Blog</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-lg-2 col-md-3 col-12 col-sm-4">
                        <div className="wrapper_second_useful wrapper_second_links">
                            <ul>
                                <li><a href="#"><i className="fa fa-angle-right"></i>Sitemap</a></li>
                                <li><a href="#"><i className="fa fa-angle-right"></i>FAQ</a></li>
                                <li><a href="#"><i className="fa fa-angle-right"></i>Awards</a></li>
                                <li><a href="#"><i className="fa fa-angle-right"></i>Testimonials</a></li>
                                <li><a href="#"><i className="fa fa-angle-right"></i>Career</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6 col-12 col-sm-12">
                        <div className="wrapper_second_useful wrapper_second_useful_2">
                            <h4>Contact Us</h4>
                            <ul>
                                <li><h1>+800 568 322</h1></li>
                                <li><a href="#"><i className="flaticon-mail"></i>-</a></li>
                                <li><a href="#"><i className="flaticon-language"></i>www.example.com</a></li>
                                <li><i className="flaticon-placeholder"></i>-</li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                        <div className="copyright_wrapper float_left">
                            <div className="copyright">
                                <p>Copyright <i className="far fa-copyright"></i> 2024 <a href="/"></a>. All rights reserved -</p>
                            </div>
                            <div className="social_link_foter">
                                <ul>
                                    <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                                    <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                                    <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                                    <li><a href="#"><i className="fab fa-google-plus-g"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
