import React from "react";
import logo from '../pages/assets/BHI Logo_Full_Grey.png'
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
                {/* <div className='social-media'>
                    <p> Connect with us! </p>
                    <a href='https://www.linkedin.com/company/build-health-international/'>

                    </a>
                </div> */}

            </div>
        </footer>
    );
};

export default Footer;
