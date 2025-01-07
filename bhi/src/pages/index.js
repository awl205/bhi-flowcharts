import React from "react";
import './index.css';


const Home = () => {
    return (
        <div>
            <h1> Welcome to BHI's Troubleshooting Page</h1>
            <div class="grid">
                <div class="box">
                    <div>
                        <a href= "/oxygen-generator">
                            <img src="https://cdn.pixabay.com/photo/2012/04/23/15/20/one-38484_1280.png"/>
                        </a>
                    </div>
                </div>
                <div class="box">
                    <div>
                        <a href= "/2">
                            <img src={"https://cdn.pixabay.com/photo/2012/04/23/15/20/one-38484_1280.png"}/>
                        </a>
                    </div>
                </div>
                <div class="box">
                    <div>
                        <a href= "/3">
                            <img src={"https://cdn.pixabay.com/photo/2012/04/23/15/20/one-38484_1280.png"}/>
                        </a>
                    </div>
                </div>
                <div class="box">
                    <div>
                        <a href="/4">
                            <img src={"https://cdn.pixabay.com/photo/2012/04/23/15/20/one-38484_1280.png"}/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
