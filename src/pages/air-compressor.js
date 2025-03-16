import React, { useRef, useState } from 'react';
import "./equip.css";
import flowchart from "./assets/Air Dryer (Refrigerant) Troubleshooting diagram .png";
import manufacturerContactInfo from "./assets/PSA Plant Manufacturer Contact Information.pdf";

const diagram = "https://i0.wp.com/bhioxygen.org/wp-content/uploads/2023/09/PSA-plant-components-1.png?w=808&ssl=1"

const App = () => {
const flowChartLogic = {
    start: {
        message: "What issue are you facing?",
        options: [
        { label: "Compressor won't start", next: "wont_start" },
        { label: "High compressor temperature", next: "high_temp" },
        { label: "Low pressure at point of use", next: "low_pressure_point"},
        { label: "Low pressure in compressor room", next: "low_pressure_room"},
        { label: "Oil in compressed air", next: "oil"},
        { label: "Water in compressed air", next: "water"},
        { label: "Oil comes out of inlet valve", next: "oil_inlet_valve"},
        { label: "Compressor won't load", next: "wont_load"},
        { label: "Compressor trips on overload/overcurrent", next: "trips_overload"},
        ],
        externalLink: {
        url: "https://bhioxygen.org/request-support/",
        label: "Other"
        },
    },
    end: {
        message: "Issue resolved!",
        options: [
        { label: "Return to menu", next: "start" },
        ],
    },
    exit: {
        message: "Sorry, we were not able to resolve your issue. \nPlease contact the manufacturer for more information.",
        options: [
            {label: "Return to menu", next: "start"},
        ],
    pdfLink: manufacturerContactInfo,
    },

    // ***** FLOWCHART 1 ***** (4.1.3)
    wont_start: {
        message: "Is power present on all 3 phases?",
        options: [
            {label: "No", next: "fix_electrical_supply"},
            {label: "Yes", next: "indication_screen"},
        ],
    },
    indication_screen: {
        message: "Is there any indication on the screen/panel?",
        options: [
            {label: "No", next: "checks"},
            {label: "Yes", next: "error_panel"},
        ],
    },
    checks: {
        message: "Check the main power fuses, low voltage fuses, electrical connections, and light bulbs. \n Fix any problems. Has the issue been resolved?",
        options: [
            {label: "No", next: "error_panel"},
            {label: "Yes", next: "end"},
        ],
    },
    error_panel: {
        message: "Is there any error indicated on the panel?",
        options: [
            {label: "No", next: "press_start"},
            {label: "Yes", next: "fix_errors"},
        ],
    },
    fix_errors: {
        message: "Fix the errors. \nHas the issue been resolved?",
        options: [
            {label: "No", next: "press_start"},
            {label: "Yes", next: "end"},
        ],
    },
    press_start: {
        message: "When you press start, what happens?",
        options: [
            {label: "Nothing", next: "check_main_contactors"},
            {label: "Motor tries to start but fails", next: "check_backpressure"},
        ],
    },
    check_backpressure: {
        message: "Is the backpressure in the compressor?",
        options: [
            {label: "No", next: "oil_flood"},
            {label: "Yes", next: "overhaul_min_valve"},
        ],
    },
    overhaul_min_valve: {
        message: "Overhaul the minimum pressure valve. \nHas the issue been resolved?",
        options: [
            {label: "No", next: "oil_flood"},
            {label: "Yes", next: "end"},
        ],
    },
    oil_flood: {
        message: "Has the element been flooded with oil?",
        options: [
            {label: "No", next: "screw_stuck"},
            {label: "Yes", next: "overhaul_oil"},
        ],
    },
    overhaul_oil: {
        message: "Overhaul oil stop valve and check valve. \nHas the issue been resolved?", // fix this??
        options: [
            {label: "No", next: "screw_stuck"},
            {label: "Yes", next: "end"},
        ],
    },
    screw_stuck: {
        message: "Is the screw element stuck?",
        options: [
            {label: "No", next: "check_motor_winding"},
            {label: "Yes", next: "overhaul_screw"},
        ],
    },
    check_motor_winding: {
        message: "Is the motor winding isolation ok?",
        options: [
            {label: "No", next: ""},
            {label: "Yes", next: "exit"},
        ],
    },
    motor_rewinding: {
        message: "Motor need re-winding. Consult manufacturer.",
        options: [
            {label: "Ok", next: "exit"},
        ],
    },
    check_main_contactors: {
        message: "Check main contactors. Are they ok?",
        options: [
            {label: "No", next: "fix_main_contactors"},
            {label: "Yes", next: "check_motor_turn"},
        ],
    },
    fix_main_contactors: {
        message: "Fix main contactors. \nHas the issue been resolved?",
        options: [
            {label: "No", next: "check_motor_turn"},
            {label: "Yes", next: "end"},
        ],
    },
    check_motor_turn: {
        message: "Check to see - is the motor really turning?",
        options: [
            {label: "Motor running", next: "fix_coupling"},
            {label: "Nothing happens", next: "power_motor"},
        ],
    },
    power_motor: {
        message: "Power goes to motor but motor is not turning. \nIs the screw element stuck?",
        options: [
            {label: "No", next: "exit"},
            {label: "Yes", next: "overhaul_screw"},
        ],
    },
    overhaul_screw: {
        message: "Overhaul the screw element or consult manufacturer. \nHas the issue been resolved?",
        options: [
            {label: "No", next: "exit"},
            {label: "Yes", next: "end"},
        ],
    },
    fix_coupling: {
        message: "Coupling or belt is broken. Fix it. \nHas the issue been resolved?",
        options: [
            {label: "No", next: "exit"},
            {label: "Yes", next: "end"},
        ],
    },
    fix_electrical_supply: {
        message: "Fix electrical supply. \nHas the issue been resolved?",
        options: [
            {label: "No", next: "indication_screen"},
            {label: "Yes", next: "end"},
        ],
    },
    // ***** FLOWCHART 2 ***** (4.2.3)
    high_temp: {
        message: "Is the oil level ok?",
        options: [
            {label: "No", next: "fill_oil"},
            {label: "Yes", next: "check_oil_cooler"},
        ],
    },
    fill_oil: {
        message: "Fill up oil. \nHas the issue been resolved?",
        options: [
            {label: "No", next: "check_oil_cooler"},
            {label: "Yes", next: "end"},
        ],
    },
    check_oil_cooler: {
        message: "Is the oil cooler clean?",
        options: [
            {label: "No", next: "clean_oil_cooler"},
            {label: "Yes", next: "check_airflow"},
        ],
    },
    clean_oil_cooler: {
        message: "Clean the oil cooler. \nHas the issue been resolved?",
        options: [
            {label: "No", next: "check_airflow"},
            {label: "Yes", next: "end"},
        ],
    },
    check_airflow: {
        message: "Check airflow. Is the fan running? Are there no obstructions?",
        options: [
            {label: "No", next: "fix_problems"},
            {label: "Yes", next: "check_temp"},
        ],
    },
    fix_problems: {
        message: "Fix problems. \nHas the issue been resolved?",
        options: [
            {label: "No", next: "check_temp"},
            {label: "Yes", next: "end"},
        ],
    },
    check_temp: {
        message: "What is the temperature of the cooler?",
        options: [
            {label: "Cool", next: "check_thermostat"},
            {label: "Hot", next: "room_temp"},
        ],
    },
    check_thermostat: {
        message: "Check the thermostatic value. \nHas the issue been resolved?",
        options: [
            {label: "No", next: "room_temp"},
            {label: "Yes", next: "end"},
        ],
    },
    room_temp: {
        message: "What is the temperature of the compressor room",
        options: [
            {label: "Hot", next: "lower_ambient_temp"},
            {label: "Normal", next: "inside_oil_cooler"},
        ],
    },
    lower_ambient_temp: {
        message: "Try to lower ambient temperature. \nHas the issue been resolved?",
        options: [
            {label: "No", next: "inside_oil_cooler"},
            {label: "Yes", next: "end"},
        ],
    },
    inside_oil_cooler: {
        message: "Is the inside of the oil cooler clean?",
        options: [
            {label: "No", next: "clean_inside"}, // FIX THIS???
            {label: "Yes", next: "check_screw"},
        ],
    },
    clean_inside: {
        message: "Clean the inside of the oil cooler. \nHas the issue been resolved?", // FIX THIS??
        options: [
            {label: "No", next: "check_screw"},
            {label: "Yes", next: "end"},
        ],
    },
    check_screw: {
        message: "Is the screw element ok?", // FIX THIS??
        options: [
            {label: "No", next: "overhaul_screw"},
            {label: "Yes", next: "exit"},
        ],
    },
    // ***** FLOWCHART 3 ***** (4.3.2)
    low_pressure_point: {
        message: "How is the pressure in the compressor room?",
        options: [
            {label: "Low", next: "low_pressure_room"},
            {label: "Good", next: "pressure_drop"},
        ],
    },
    low_pressure_room: {
        message: "Fix the low pressure in the compressor room. \nHas the issue been resolved?",
        options: [
            {label: "No", next: "exit"},
            {label: "Yes", next: "end"},
        ],
    },
    pressure_drop: {
        message: "There is a pressure drop problem. Check all filters, valves, etc. between compressor and point of use. \nAre they all working?",
        options: [
            {label: "No", next: "fix_replace"},
            {label: "Yes", next: "new_equip"},
        ],
    },
    fix_replace: {
        message: "Fix the problems and replace the filters. \nHas the issue been resolved?",
        options: [
            {label: "No", next: "new_equip"},
            {label: "Yes", next: "end"},
        ],
    },
    new_equip: {
        message: "Has any new equipment been installed?",
        options: [
            {label: "No", next: "install_pressure_sensor"},
            {label: "Yes", next: "temporary_off"},
        ],
    },
    temporary_off: {
        message: "Temporarily shut off new equipment. \nHas the issue been resolved?",
        options: [
            {label: "No", next: "install_pressure_sensor"},
            {label: "Yes", next: "low_capacity"},
        ],
    },
    install_pressure_sensor: {
        message: "Install a pressure sensor at various points in the system. \nHas the point of pressure drop been located?",
        options: [
            {label: "No", next: "exit"},
            {label: "Yes", next: "fix_problem_increase"},
        ],
    },
    low_capacity: {
        message: "Current system layout has too low capacity for the higher air use. \nCompressors might be big enough but pipes, filters, and valves are too small.",
        options: [
            {label: "Ok", next: "fix_problem_increase"},
        ],
    },
    fix_problem_increase: {
        message: "Fix the problem: increase pipe size, install larger filter, etc. \nHas the issue been resolved?",
        options: [
            {label: "No", next: "exit"},
            {label: "Yes", next: "end"},
        ],
    },

    //** FLOWCHART 4 ** (4.4.3)
    low_pressure_room: {
        message: "Check the pressure on compressor(s). Is it high or low?",
        options: [
            {label: "High (good)", next: "blockage"},
            {label: "Low (same)", next: "single_mult_compressors"},
        ],
    },
    blockage: {
        message: "You have a blockage (pressure drop). \nCheck all filters, dryers, etc between compressor and air receiver. \nHas the issue been resolved?",
        options: [
            {label: "No", next: "exit"},
            {label: "Yes", next: "end"},
        ],
    },
    single_mult_compressors: {
        message: "Are there single or multiple compressors?",
        options: [
            {label: "Single", next:"single_compressor"},
            {label: "Multiple", next: "multiple_compressors"},
        ],
    },
    multiple_compressors: {
        message: "Are all compressors running loaded?",
        options: [
            {label: "Yes", next:"capacity_demand_problem"},
            {label: "No", next: "single_compressor"},
        ],
    },
    single_compressor: {
        message: "Are the setpoints correct (load/unload, start/stop)?", // TODO
        options: [
            {label: "No", next:"adjust_setpoints"},
            {label: "Yes", next: "compressor_loads"},
        ],
    },
    adjust_setpoints: {
        message: "Adjust setpoints! \nHas the issue been resolved?",
        options: [
            {label: "No", next:"exit"},
            {label: "Yes", next: "end"},
        ],
    },
    compressor_loads: {
        message: "Does the compressor load and unload at correct pressures (according to setpoints)?",
        options: [
            {label: "No", next:"compressor_loading_problem"},
            {label: "Yes", next: "capacity_demand_problem"},
        ],
    },
    compressor_loading_problem: {
        message: "You have a compressor loading problem.",
        options: [
            {label: "Troubleshoot compressor loading", next:""}, // TODO: FLOWCHART 8
        ],
    },
    capacity_demand_problem: {
        message: "There is a capacity OR demand problem. Has any new equipment been installed?",
        options: [
            {label: "No", next:""},
            {label: "Yes", next: ""},
        ],
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
        <h1 className="title">Air Compressor Troubleshooting</h1>
        <p className="update"> Last updated: Jan 2025 </p>
        <img className="diagram_img" src={diagram} alt="Air compressor diagram"/>
        <p className="interactive-subtitle"> Interactive Troubleshooting </p>

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
                > Additional Information
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
            Back
        </button>
        <button onClick={restartHistory} className="back-button">
            Restart
        </button>
        </div>
    )}

    <div className="history-toggle">

        {showHistory && (
        <div className="history">
        <h2> Navigation History </h2>
        <ol>
            {history.map((entry, index) => (
            <li key={index}>
            <strong> Question:  </strong>{" "}
            {entry.message.split("\n").map((line, idx) => (
            <React.Fragment key={idx}>
                {line}
                <br />
            </React.Fragment>
            ))}
            <ul>
                <li>
                    <strong>Response:</strong> {entry.selected}
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
            Send Report to BHI
        </a>

        <button onClick={toggleHistory} className="history-button">
            {showHistory ? "Hide History" : "View History"}
        </button>

        <button onClick={downloadHistory} className = "bottom-buttons">
            Download History
        </button>
        </div>
    </div>

    <p className="flowchart-subtitle"> Complete Flowchart </p>
    <div className="flowchart" ref={flowchartRef}>
        <img className="air-compressor-flowchart-img" src={flowchart} alt="Full air compressor troubleshooting flowchart."/>
    </div>
</div>
);
};

export default App;
