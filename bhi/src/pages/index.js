import React from "react";
import './index.css';


const Home = () => {
    return (
        <div>
            <h1> Welcome to BHI's Troubleshooting Page</h1>
            <div class="grid">
                <div class="box">
                    <a href= "/oxygen-generator">
                        <img className="home-img" src="https://i0.wp.com/bhioxygen.org/wp-content/uploads/2023/09/Homepage-First-Photo-scaled-800x450.jpg"/>
                        <div className="overlay">
                            <span className="overlay-text">Oxygen Generator</span>
                        </div>
                    </a>
                </div>
                <div class="box">
                    <a href= "/2">
                        <img className="home-img" src={"https://i0.wp.com/bhioxygen.org/wp-content/uploads/2023/09/Homepage-First-Photo-scaled-800x450.jpg"}/>
                        <div className="overlay">
                            <span className="overlay-text">2</span>
                        </div>
                    </a>
                </div>
                <div class="box">
                    <a href= "/3">
                        <img className="home-img" src={"https://i0.wp.com/bhioxygen.org/wp-content/uploads/2023/09/Homepage-First-Photo-scaled-800x450.jpg"}/>
                        <div className="overlay">
                            <span className="overlay-text">3</span>
                        </div>
                    </a>
                </div>
                <div class="box">
                    <a href="/4">
                        <img className="home-img" src={"https://i0.wp.com/bhioxygen.org/wp-content/uploads/2023/09/Homepage-First-Photo-scaled-800x450.jpg"}/>
                        <div className="overlay">
                            <span className="overlay-text">4</span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Home;
