import React from 'react'
import './Footer.css';
import img from "../../Image/WhatsApp_icon.png"
import Swal from 'sweetalert2'


export default function Footer() {
  return (

    <>
        <footer className="footer-area footer-one">
            <div className="footer-widget">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 col-lg-4 col-sm-12">
                        <div className="f-about">
                            <div className="footer-logo">
                                <a href="/#">
                                <img src="assets/images/logo2.jpg" alt="Logo" />
                                </a>
                            </div>
                            <p className="text">

                            Buy Airtime, Data, Pay Electricity bill, Cable-TV Subscription, Internet Bills, 
                            Water Bills,  Pay-all offer an all-in-one simple and convenient payment, 
                            collection and disbursement solutions with awesome discounts.
                           
                            </p>
                        </div>
                        
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-4">
                        <div className="footer-link">
                            <h6 className="footer-title">Company</h6>
                            <ul>
                                <li><a href="#services">Service</a></li>
                                <li><a href="#plan">Plan</a></li>
                                {localStorage.getItem("code")?
                                    <li><a href="/#" onClick={()=>{

                                        Swal.fire({
                                        title: 'last prepaid code',
                                        text: `${localStorage.getItem("code")}`,

                                        showClass: {
                                            popup: 'animate__animated animate__fadeInDown'
                                        },
                                        hideClass: {
                                            popup: 'animate__animated animate__fadeOutUp'
                                        },
                                        allowOutsideClick: false
                                        })
                                    }}>code</a></li>:""}
                            </ul>
                        </div>
                        </div>
                      
                        <div className="col-xl-2 col-lg-3 col-sm-4">
                        <div className="footer-contact">
                            <h6 className="footer-title">Help & Suuport</h6>
                            <ul>
                                <li>
                                    <i className="lni lni-map-marker"></i> 3rd floor, No. 22 Koforidua street, Zone 2, Wuse Abuja - Nigeria
                                </li>
                                <li><i className="lni lni-phone-set"></i> +2348184724615</li>
                                <li><i className="lni lni-envelope"></i> customerservicepayall@gmail.com</li>
                            </ul>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-copyright">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                        <div
                            className="
                            copyright
                            text-center
                            d-md-flex
                            justify-content-between
                            align-items-center
                            "
                            >
                            <p className="text">Copyright © 2024 AyroUI. All Rights Reserved</p>
                            <ul className="social">
                                <li>
                                    <a href="/#">
                                    <i className="lni lni-facebook-filled"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="/#">
                                    <i className="lni lni-twitter-original"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="/#">
                                    <i className="lni lni-instagram-filled"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="/#"><i className="lni lni-linkedin-original"></i></a>
                                </li>
                            </ul>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        
        <div className="made-in-ayroui mt-4">
            <a href="https://api.whatsapp.com/send?phone=23408184724615&text=Good day"  target="_blank" rel="noreferrer">
                <img style={{"width":"70px"}} alt="/#" src={img}/>
            </a>
        </div>
        <a href="/#" className="scroll-top btn-hover">
            <i className="lni lni-chevron-up"></i>
        </a>
    </>
  )
}
