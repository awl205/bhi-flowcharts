import React from "react";
import logo from '../pages/assets/BHI Logo_Half_Knockout.svg'
import linkedin_logo from '../pages/assets/linkedin-logo.png'
import facebook_logo from '../pages/assets/facebook-logo.webp'
import x_logo from '../pages/assets/X-Logo.jpg'
import instagram_logo from '../pages/assets/instagram-logo.webp'
import youtube_logo from '../pages/assets/youtube-logo.webp'
import medium_logo from '../pages/assets/medium-logo.svg'


import './Footer.css';

const Footer = () => {
    return (
        <footer className='footer'>
            <div className='content'>
                <img src={logo} className='logo' alt='BHI Logo'></img>
                <p className='address'> Build Health International <br/>
                    100 Cummings Center #120B <br/>
                    Beverly, MA 01915, USA <br/>
                    +1-978-969-0920 <br/> <br/>
                    oxygen@buildhealthinternational.org
                </p>
                <div className='websites'>
                    <p> For more information: </p>
                        <a href='https://buildhealthinternational.org/'
                            target="_blank" rel="noreferrer">
                            <button className='website-button'>
                                Visit the BHI Main Website
                            </button>
                        </a>
                        <a href='https://bhioxygen.org/'
                        target="_blank" rel="noreferrer">
                            <button className='website-button'>
                                Visit the BHI Oxygen Website
                            </button>
                        </a>
                </div>
                <div className='social-media'>
                    <p> Subscribe, follow, and friend us to get the latest news <br/> on how BHI is improving healthcare infrastructure <br/>with partners around the world. </p>
                    <div className='sm-logos-div'>
                        <a href='https://www.linkedin.com/company/build-health-international/'>
                            <div className='sm-logos'>
                                <img className='sm-logo' src={linkedin_logo} alt='LinkedIn Logo'/>
                            </div>
                        </a>
                        <a href='https://www.facebook.com/BuildHealthInternational/'>
                            <div className='sm-logos'>
                                <img className='sm-logo' src={facebook_logo} alt='Facebook Logo'/>
                            </div>
                        </a>
                        <a href='https://x.com/BuildHealthIntl'>
                            <div className='sm-logos'>
                                <img className='sm-logo' src={x_logo} alt='X Logo'/>
                            </div>
                        </a>
                        <a href='https://www.instagram.com/buildhealthinternational/'>
                            <div className='sm-logos'>
                                <img className='sm-logo' src={instagram_logo} alt='Instagram Logo'/>
                            </div>
                        </a>
                        <a href='https://www.youtube.com/c/BuildHealthInternational'>
                            <div className='sm-logos'>
                                <img className='sm-logo' src={youtube_logo} alt='Youtube Logo'/>
                            </div>
                        </a>
                        <a href='https://buildhealthinternational.medium.com/'>
                            <div className='sm-logos'>
                                <img className='sm-logo' src={medium_logo} alt='Medium Logo'/>
                            </div>
                        </a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
