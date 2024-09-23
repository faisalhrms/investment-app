import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Import images
import bannerImg from '../images/banner.png';
import sliderImg from '../images/slider_img.png';
import aboutImg from '../images/about_img.jpg';
import {useNavigate} from "react-router-dom";

const HomePage = () => {
    const [plans, setPlans] = useState([]); // State to hold the investment plans
    const [loading, setLoading] = useState(true); // Loading state

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
    const navigate = useNavigate();

    const handleBuyClick = (plan) => {
        navigate('/cart', { state: { plan } });  // Pass the selected plan information to the cart page
    };
    // UseEffect to fetch data when component mounts
    useEffect(() => {
        fetchPlans();
    }, []);

    return (
        <div>
            {/* Slider Area Start */}
            <div className="slider-area float_left">
                <div className="banner_img_top">
                    <img src={bannerImg} alt="banner" />
                </div>

                <div id="carousel-example-generic" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner" role="listbox">
                        <div className="carousel-item active">
                            <div className="carousel-captions caption-1">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12">
                                            <div className="content">
                                                <h2 data-animation="animated bounceInUp">Often Have Small</h2>
                                                <h3 data-animation="animated bounceInUp">
                                                    Invest Your Money <br /> For Future
                                                </h3>
                                                <div className="slider_btn float_left">
                                                    <ul>
                                                        <li data-animation="animated bounceInLeft">
                                                            <a href="#">start now</a>
                                                        </li>
                                                        <li data-animation="animated bounceInLeft">
                                                            <a href="#">view plans</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12">
                                            <div className="slider_main_img_wrapper">
                                                <img src={sliderImg} alt="slider" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ol className="carousel-indicators">
                        <li data-target="#carousel-example-generic" data-slide-to="0" className="active">
                            <span className="number"></span>
                        </li>
                        <li data-target="#carousel-example-generic" data-slide-to="1">
                            <span className="number"></span>
                        </li>
                        <li data-target="#carousel-example-generic" data-slide-to="2">
                            <span className="number"></span>
                        </li>
                    </ol>

                    <div className="carousel-nevigation">
                        <a className="prev" href="#carousel-example-generic" role="button" data-slide="prev">
                            <span></span>
                            <i className="flaticon-left-arrow"></i>
                        </a>
                        <a className="next" href="#carousel-example-generic" role="button" data-slide="next">
                            <span></span>
                            <i className="flaticon-arrow-pointing-to-right"></i>
                        </a>
                    </div>
                </div>
            </div>
            {/* Slider Area End */}

            {/* About Us Section */}
            <div className="about_us_wrapper float_left">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-lg-6 col-sm-12 col-12">
                            <div className="about_img_wrapper">
                                <img src={aboutImg} alt="About" className="img-responsive" />
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-6 col-sm-12 col-12">
                            <div className="about_content_wrapper">
                                <div className="sv_heading_wraper">
                                    <h4>who we are</h4>
                                    <h3>Welcome to SaveHyip</h3>
                                </div>
                                <div className="welcone_savehiyp float_left">
                                    <p>Put your investing ideas into action with full range of investments. Enjoy real benefits and rewards on your accrue investing.</p>
                                    <div className="welcome_save_inpvate_wrapper">
                                        <ul>
                                            <li className="purple_inovate">
                                                <a href="#">
                                                    <i className="flaticon-check-box"></i> We Innovate
                                                </a>
                                            </li>
                                            <li className="blue_inovate">
                                                <a href="#">
                                                    <i className="flaticon-check-box"></i> Licenced & Certified
                                                </a>
                                            </li>
                                            <li className="green_inovate">
                                                <a href="#">
                                                    <i className="flaticon-check-box"></i> Saving & Investments
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="about_btn float_left">
                                        <ul>
                                            <li>
                                                <a href="#">get more</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* About Us Section End */}

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
                                <div className="col-xl-3 col-md-6 col-lg-6 col-sm-6 col-12" key={plan.id}>
                                    <div className="investment_box_wrapper float_left">
                                        <div className="investment_icon_circle">
                                            <i className="flaticon-bar-chart"></i>
                                        </div>
                                        <div className="investment_border_wrapper"></div>
                                        <div className="investment_content_wrapper">
                                            <h1><a href="#">{plan.name}</a></h1>
                                            <p>
                                                {plan.description} <br />
                                                Principal {plan.principal_return ? 'Return' : 'Not Return'}<br />
                                                Compound {plan.compound_available ? 'Available' : 'Not Available'}
                                            </p>
                                            <br/>
                                            <h3><a href="#">{plan.price} PKR</a></h3>

                                        </div>
                                        <div className="about_btn plans_btn">
                                            <ul>
                                                <li>
                                                    <a onClick={() => handleBuyClick(plan)}>Buy</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            {/* Investment Plans Section End */}

            {/* Calculator Section */}
            <div className="calculator_wrapper float_left">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-lg-12 col-sm-12 col-12">
                            <div className="sv_heading_wraper heading_wrapper_dark dark_heading">
                                <h4>Plans Calculator</h4>
                                <h3>How Much Can You Save With Plans?</h3>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-12 col-sm-12 col-12 calc">
                            <div className="calculator_portion float_left">
                                <div className="caluclator_text_wrapper">
                                    <p>Deposit Amount: <i className="fas fa-info-circle"></i></p>
                                    <p className="dollar_wrap"><i className="fa fa-rupee-sign"></i>
                                        <input type="text" id="investmentAmount" />
                                    </p>
                                </div>
                                <div className="caluclator_text_wrapper">
                                    <p>Monthly SIP: <i className="fas fa-info-circle"></i></p>
                                    <p className="dollar_wrap"><i className="fa fa-rupee-sign"></i>
                                        <input type="text" id="investmentAmountSIP" />
                                    </p>
                                </div>

                                <div className="caluclator_text_wrapper">
                                    <p>Investment Year: <i className="fas fa-info-circle"></i></p>
                                    <select className="custom-select" id="investmentYears">
                                        <option value="5">5 Years</option>
                                        <option value="10">10 Years</option>
                                        <option value="15">15 Years</option>
                                        <option value="20">20 Years</option>
                                        <option value="25">25 Years</option>
                                    </select>
                                </div>

                                <div className="about_btn calc_btn float_left">
                                    <ul>
                                        <li>
                                            <a href="#">Calculate Profit</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
