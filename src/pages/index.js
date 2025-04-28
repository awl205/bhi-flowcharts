import React from "react";
import './index.css';
import air_dryer_img from './assets/air dryer.jpg';
import booster_compressor_img from './assets/Rix Compressor.jpg';
import oxygen_generator_img from './assets/oxygen concentrator.JPG';
import history_icon from './assets/history_icon.png';
import tool_icon from './assets/tool_icon.png';
import send_icon from './assets/send_icon.png';

const Home = () => {
    return (
        <div>
            <div class="welcome-section">
                <h1>
                    Build Health International <br/>
                    <span style={{ color: 'var(--bhiorange)' }}>Troubleshooting</span>
                </h1>
                <div className='welcome-row'>
                    <div className='welcome-col'>
                        <img className='icon' src={tool_icon} alt='tool icon'/>
                        <h2> INTERACTIVE TROUBLESHOOTING</h2>
                        <p> Select the problems you're facing and follow the corresponding instructions to reach your solution.</p>
                    </div>
                    <div className='welcome-col'>
                        <img className='icon' src={history_icon} alt='history icon'/>
                        <h2> TROUBLESHOOTING HISTORY </h2>
                        <p> We keep track of your steps - download when you reach the end and save for your records.</p>
                    </div>
                    <div className='welcome-col'>
                        <img className='icon' src={send_icon} alt='send icon'/>
                        <h2> SEND REPORT TO BHI</h2>
                        <p> Help us continue to improve our troubleshooting process by sending us your history and feedback.</p>
                    </div>
                </div>
            </div>
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
