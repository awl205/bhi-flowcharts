import React, { useRef, useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { flowchartTranslations } from '../AirDryerTranslations';
import "./equip.css";
import flowchart from "./assets/Air Dryer (Refrigerant) Troubleshooting diagram .png";
import manufacturingContactInfo from "./assets/PSA Plant Manufacturer Contact Information.pdf";

const diagram = "https://i0.wp.com/bhioxygen.org/wp-content/uploads/2023/09/PSA-plant-components-1.png?w=808&ssl=1"

const App = () => {
    const { language } = useLanguage();
    const t = flowchartTranslations[language];

const flowChartLogic = {
    start: {
        message: t.start_message,
        options: t.start_options.map((label, index) => ({
            label, next: ["excess_water", "heat_exchangers", "sensor_power"][index],
        })),
        externalLink: {
        url: "https://bhioxygen.org/request-support/",
        label: t.other
        },
    },
    end: {
        message: t.end_message,
        options: [
        { label: t.return_to_menu, next: "start" },
        ],
    },
    exit: {
        message: t.exit_message,
        options: [
            {label: t.return_to_menu, next: "start"},
        ],
    pdfLink: manufacturingContactInfo,
    },

    // ***** FLOWCHART 1/2 *****
    excess_water: {
        message: t.excess_water_message,
        options: [
            {label: t.no, next: 'valve_light'},
            {label: t.yes, next: 'heat_exchangers'}
        ],
    },
    heat_exchangers: {
        message: t.heat_exchangers_message,
        options: [
            {label: t.no, next: 'radiator_fan'},
            {label: t.yes, next: 'clean_heat_exchangers'}
        ],
    },
    clean_heat_exchangers: {
        message: t.clean_heat_exchangers_message,
        options: [
            {label: t.no, next: 'radiator_fan'},
            {label: t.yes, next: 'end'}
        ],
    },
    radiator_fan: {
        message: t.radiator_fan_message,
        options: [
            {label: t.no, next: 'voltage_fan'},
            {label: t.yes, next: 'refrigerant_compressor'}
        ],
    },
    refrigerant_compressor: {
        message: t.refrigerant_compressor_message,
        options: [
            {label: t.no, next: 'refrigerant_power'},
            {label: t.yes, next: 'sensor_resistance'}
        ],
    },
    sensor_resistance: {
        message: t.sensor_resistance_message,
        options: [
            {label: t.no, next: 'replace_sensor'},
            {label: t.yes, next: 'hvac_specialist'}
        ],
    },
    replace_sensor: {
        message: t.replace_sensor_message,
        options: [
            {label: t.no, next: 'hvac_specialist'},
            {label: t.yes, next: 'end'}
        ],
    },
    hvac_specialist: {
        message: t.hvac_specialist_message,
        options: [
            {label: t.no, next: 'replace_dryer'},
            {label: t.yes, next: 'end'}
        ],
    },
    refrigerant_power: {
        message: t.refrigerant_power_message,
        options: [
            {label: t.no, next: 'troubleshoot_upstream'},
            {label: t.yes, next: 'replace_dryer'}
        ],
    },
    troubleshoot_upstream: {
        message: t.troubleshoot_upstream_message,
        options: [
            {label: t.no, next: 'exit'},
            {label: t.yes, next: 'end'}
        ],
    },
    replace_dryer: {
        message: t.replace_dryer_message,
        options: [
            {label: t.no, next: 'exit'},
            {label: t.yes, next: 'end'}
        ],
    },
    voltage_fan: {
        message: t.voltage_fan_message,
        options: [
            {label: t.no, next: 'troubleshoot_power_problem'},
            {label: t.yes, next: 'replace_radiator_fan'}
        ],
    },
    replace_radiator_fan: {
        message: t.replace_radiator_fan_message,
        options: [
            {label: t.no, next: 'exit'},
            {label: t.yes, next: 'end'}
        ],
    },
    troubleshoot_power_problem: {
        message: t.troubleshoot_power_problem_message,
        options: [
            {label: t.no, next: 'exit'},
            {label: t.yes, next: 'end'}
        ],
    },

    valve_light: {
        message: t.valve_light_message,
        options: [
            {label: t.no, next: 'wiring_continuity'},
            {label: t.yes, next: 'replace_valve'}
        ]
    },
    replace_valve: {
        message: t.replace_valve_message,
        options: [
            {label: t.no, next: 'wiring_continuity'},
            {label: t.yes, next: 'end'}
        ]
    },
    wiring_continuity: {
        message: t.wiring_continuity_message,
        options: [
            {label: t.no, next: 'replace_electrical_valve'},
            {label: t.yes, next: 'end'}
        ]
    },
    replace_electrical_valve: {
        message: t.replace_electrical_valve_message,
        options: [
            {label: t.no, next: 'exit'},
            {label: t.yes, next: 'end'}
        ]
    },

    // ***** FLOWCHART 3 *****
    sensor_power: {
        message: t.sensor_power_message,
        options: [
            {label: t.no, next: 'reconnect_sensor'},
            {label: t.yes, next: 'replace_sensor3'}
        ]
    },
    reconnect_sensor: {
        message: t.reconnect_sensor_message,
        options: [
            {label: t.no, next: 'replace_sensor3'},
            {label: t.yes, next: 'end'}
        ]
    },
    replace_sensor3: {
        message: t.replace_sensor3_message,
        options: [
            {label: t.no, next: 'exit'},
            {label: t.yes, next: 'end'}
        ]
    },
};

const flowchartRef = useRef(null);
const [currentStep, setCurrentStep] = useState("start");
const [hasScrolled, setHasScrolled] = useState(false);
const [history, setHistory] = useState([]);
const [showHistory, setShowHistory] = useState(false);

const scrollToSection = (section) => {
    if (!hasScrolled) {
        const positions = {
            excess_water: {x: 0},
            heat_exchangers: {x: 0},
            sensor_power: {x: 1},
        };

        if (flowchartRef.current){
            const {x: percentX} = positions[section] || {x:0};
            const scrollableElt = flowchartRef.current
            scrollableElt.scrollTo({
                left: percentX * scrollableElt.scrollWidth,
                behavior: "smooth",
            });
            setHasScrolled(true);
        }
    }
};

const goToStep = (nextStep, selectedLabel) => {
    if (nextStep === 'start') {
        restartHistory();
    } else {
        setHistory((prev) => [
            ...prev,
            {
                stepKey: currentStep,
                message: flowChartLogic[currentStep].message || "",
                selected: selectedLabel,
            },
        ]); // add current step to history
        setCurrentStep(nextStep);
        scrollToSection(nextStep);
    }
};
const step = flowChartLogic[currentStep];

const goBack = () => {
    if(history.length === 1){
        restartHistory();
    } else if(history.length > 0) {
        const previousStep = history[history.length-1].stepKey;
        const updatedHistory = history.slice(0, -1); // remove last history entry
        setHistory(updatedHistory);
        setCurrentStep(previousStep);
    }
};

const toggleHistory = () => {
    setShowHistory((prev) => !prev);
};

const restartHistory = () => {
    setCurrentStep("start")
    setHistory([]);
    setHasScrolled(false);
};

const downloadHistory = () => {
    const textContent = history.map((entry, index) =>
        `Question ${index+1}: ${entry.message} \n Response selected: ${entry.selected}\n`).join("\n\n");
    const blob = new Blob([textContent], {type: "text/plain"});
    const url= URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "troubleshooting_steps.txt"
    link.click();
    URL.revokeObjectURL(url);
};

return (
    <div className="container">
        <h1 className="title"> {t.title} </h1>
        <p className="update"> {t.update} </p>
        <img className="diagram_img" src={diagram} alt="Air dryer diagram"/>
        <p className="interactive-subtitle"> {t.interactive_troubleshooting} </p>

        <p className="message">
            {step.message.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                    {line}
                    <br/ >
                </React.Fragment>
            ))}

        {step.pdfLink && (
            <div className = "additional-info">
                <button className = "info-button"
                    onClick = {() => window.open(step.pdfLink, "_blank")}
                > {t.additional_information}
                </button>
            </div>
        )}
        </p>

        <div className="buttons-container">
            {step.options.map((option, index) => (
            <button
                key={index}
                onClick={() => goToStep(option.next, option.label)}
                className="button">
                {option.label}
            </button>
            ))}
            {step.externalLink && (
            <a href={step.externalLink.url}
            target="_blank"
            rel="noreferrer"
            className="button">
            {step.externalLink.label}
            </a>
            )}
        </div>

        {history.length > 0 && currentStep !== "start" && (
        <div className="buttons-container">
        <button onClick={goBack} className="back-button">
            {t.back}
        </button>
        <button onClick={restartHistory} className="back-button">
            {t.restart}
        </button>
        </div>
    )}

    <div className="history-toggle">

        {showHistory && (
        <div className="history">
        <h2> {t.navigation_history} </h2>
        <ol>
            {history.map((entry, index) => (
            <li key={index}>
            <strong> {t.question}:  </strong>{" "}
            {entry.message.split("\n").map((line, idx) => (
            <React.Fragment key={idx}>
                {line}
                <br />
            </React.Fragment>
            ))}
            <ul>
                <li>
                    <strong>{t.response}:</strong> {entry.selected}
                </li>
            </ul>
            </li>
            ))}
        </ol>
        </div>
        )}

        <div className = "history-button-div">
        <a href ='https://bhioxygen.org/request-support/' target="_blank" rel="noreferrer"
            className="bottom-buttons">
            {t.send_report}
        </a>

        <button onClick={toggleHistory} className="history-button">
            {showHistory ? t.hide_history : t.view_history}
        </button>

        <button onClick={downloadHistory} className = "bottom-buttons">
            {t.download_history}
        </button>
        </div>
    </div>

    <p className="flowchart-subtitle"> {t.complete_flowchart} </p>
    <div className="flowchart" ref={flowchartRef}>
        <img className="air-dryer-flowchart-img" src={flowchart} alt="Full air dryer troubleshooting flowchart"/>
    </div>
</div>
);
};

export default App;
