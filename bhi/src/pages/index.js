import React from "react";
import './index.css';
import air_dryer_img from './assets/air dryer.jpg';
import booster_compressor_img from './assets/Rix Compressor.jpg';
import oxygen_generator_img from './assets/oxygen concentrator.JPG';


const Home = () => {
    return (
        <div>
            <h1> Welcome to BHI's Troubleshooting Page</h1>
            <div class="grid">
                <div class="box">
                    <a href= "/oxygen-generator">
                        <img className="home-img" src={oxygen_generator_img}/>
                        <div className="overlay">
                            <span className="overlay-text">Oxygen Generator</span>
                        </div>
                    </a>
                </div>
                <div class="box">
                    <a href= "/booster-compressor">
                        <img className="home-img" src={booster_compressor_img}/>
                        <div className="overlay">
                            <span className="overlay-text">Booster Compressor</span>
                        </div>
                    </a>
                </div>
                <div class="box">
                    <a href= "/air-dryer">
                        <img className="home-img" src={air_dryer_img}/>
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
