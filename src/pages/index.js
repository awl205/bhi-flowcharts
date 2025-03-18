import React from "react";
import './index.css';
import air_dryer_img from './assets/air dryer.jpg';
import booster_compressor_img from './assets/Rix Compressor.jpg';
import oxygen_generator_img from './assets/oxygen concentrator.JPG';


const Home = () => {
    return (
        <div>
            <h1> Build Health International Troubleshooting Page</h1>
            <p className='welcome-message'>
            Welcome to BHI's Troubleshooting Page! Here, you can explore interactive troubleshooting guides
            for the Oxygen Generator, Booster Compressor, and Air Dryer. Be sure to download your history to keep
            track of the steps you’ve taken. Once your issue is resolved or if you are prompted to contact the manufacturer,
            please send a report to BHI. This will help us improve the troubleshooting process and better assist you in the future.
            </p>
            <div class="grid">
                <div class="box">
                    <a href= "/#/oxygen-generator">
                        <img className="home-img" src={oxygen_generator_img} alt="Oxygen Generator"/>
                        <div className="overlay">
                            <span className="overlay-text">Oxygen Generator</span>
                        </div>
                    </a>
                </div>
                <div class="box">
                    <a href= "/#/booster-compressor">
                        <img className="home-img" src={booster_compressor_img} alt="Booster Compressor"/>
                        <div className="overlay">
                            <span className="overlay-text">Booster Compressor</span>
                        </div>
                    </a>
                </div>
                <div class="box">
                    <a href= "/#/air-dryer">
                        <img className="home-img" src={air_dryer_img} alt="Air Dryer"/>
                        <div className="overlay">
                            <span className="overlay-text">Air Dryer</span>
                        </div>
                    </a>
                </div>
                {/* <div class="box">
                    <a href="/air-compressor">
                        <img className="home-img" src={"https://i0.wp.com/bhioxygen.org/wp-content/uploads/2023/09/Homepage-First-Photo-scaled-800x450.jpg"}/>
                        <div className="overlay">
                            <span className="overlay-text">4</span>
                        </div>
                    </a>
                </div> */}
            </div>
        </div>
    );
};

export default Home;
