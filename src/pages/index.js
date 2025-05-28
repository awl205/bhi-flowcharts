import React from "react";
import './index.css';
import { useLanguage } from '../LanguageContext';
import air_dryer_img from './assets/air dryer.jpg';
import booster_compressor_img from './assets/Rix Compressor.jpg';
import oxygen_generator_img from './assets/oxygen concentrator.JPG';
import history_icon from './assets/history_icon.png';
import tool_icon from './assets/tool_icon.png';
import send_icon from './assets/send_icon.png';

const translations = {
    en: {
      title: "Build Health International",
      subtitle: "Troubleshooting",
      interactiveTitle: "INTERACTIVE TROUBLESHOOTING",
      interactiveText: "Select the problems you're facing and follow the corresponding instructions to reach your solution.",
      historyTitle: "TROUBLESHOOTING HISTORY",
      historyText: "We keep track of your steps - download when you reach the end and save for your records.",
      reportTitle: "SEND REPORT TO BHI",
      reportText: "Help us continue to improve our troubleshooting process by sending us your history and feedback.",
      oxygen: "Oxygen Generator",
      booster: "Booster Compressor",
      dryer: "Air Dryer",
    },
    fr: {
      title: "Build Health International",
      subtitle: "Dépannage",
      interactiveTitle: "DÉPANNAGE INTERACTIF",
      interactiveText: "Sélectionnez les problèmes que vous rencontrez et suivez les instructions correspondantes pour trouver votre solution.",
      historyTitle: "HISTORIQUE DE DÉPANNAGE",
      historyText: "Nous suivons vos étapes - téléchargez-les à la fin et conservez-les pour vos dossiers.",
      reportTitle: "ENVOYER UN RAPPORT À BHI",
      reportText: "Aidez-nous à améliorer notre processus de dépannage en nous envoyant votre historique et vos commentaires.",
      oxygen: "Générateur d'Oxygène",
      booster: "Compresseur de Surpression",
      dryer: "Sèche-Air",
    },
};

const Home = () => {
    const { language, setLanguage } = useLanguage();
    const t = translations[language];

    return (
        <div className="home-container">
            <div class="welcome-section">
                <h1>
                    {t.title} <br/>
                    <span style={{ color: 'var(--bhiorange)' }}>{t.subtitle}</span>
                </h1>
                <div className='welcome-row'>
                    <div className='welcome-col'>
                        <img className='icon' src={tool_icon} alt='tool icon'/>
                        <h2> {t.interactiveTitle} </h2>
                        <p> {t.interactiveText} </p>
                    </div>
                    <div className='welcome-col'>
                        <img className='icon' src={history_icon} alt='history icon'/>
                        <h2> {t.historyTitle} </h2>
                        <p> {t.historyText} </p>
                    </div>
                    <div className='welcome-col'>
                        <img className='icon' src={send_icon} alt='send icon'/>
                        <h2> {t.reportTitle} </h2>
                        <p> {t.reportText} </p>
                    </div>
                </div>
            </div>
            <div class="grid">
                <div class="box">
                    <a href= "/#/oxygen-generator">
                        <img className="home-img" src={oxygen_generator_img} alt="Oxygen Generator"/>
                        <div className="overlay">
                            <span className="overlay-text">{t.oxygen}</span>
                        </div>
                    </a>
                </div>

                <div class="box">
                    <a href= "/#/booster-compressor">
                        <img className="home-img" src={booster_compressor_img} alt="Booster Compressor"/>
                        <div className="overlay">
                            <span className="overlay-text">{t.booster}</span>
                        </div>
                    </a>
                </div>
                <div class="box">
                    <a href= "/#/air-dryer">
                        <img className="home-img" src={air_dryer_img} alt="Air Dryer"/>
                        <div className="overlay">
                            <span className="overlay-text">{t.dryer}</span>
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
