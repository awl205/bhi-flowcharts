import React, { useState } from 'react';
import "./equip.css";
import oxygenflowchart from "./assets/Oxygen Generator Troubleshooting Flow Chart.png";
import buildPurityPDF from "./assets/Building Purity .pdf";
import lowInletPressurePDF from "./assets/Check for low inlet pressure .pdf";
import mufflerPhotosPDF from "./assets/Muffler Photos.pdf";
import PSACyclePressurePDF from "./assets/PSA Cycle Pressure Check.pdf";
import PSACyclePDF from "./assets/The PSA Cycle.pdf";
import TroubleshootUpstreamPowerPDF from "./assets/trouble shooting upstream power.pdf";
import valveCabinetLeaksPDF from "./assets/Valve Cabinet Leaks.pdf";
import zeoliteDegradationPDF from "./assets/Zeolite Degradation.pdf";

const flowChartLogic = {
  start: {
    message: "What issue are you facing?",
    options: [
      { label: "Oxygen Generator won't run", next: "generator_wont_run" },
      { label: "Low purity measured by onboard sensor", next: "low_purity" },
      { label: "Irregular valve noise", next: "irregular_valve_noise"},
      { label: "Low pressure in oxygen tank", next: "limit_oxygen_output"},
      { label: "Low inlet pressure", next: "low_inlet_pressure"}
    ],
  },
  end: {
    message: "Issue resolved!",
    options: [
      { label: "Return to menu", next: "start" },
    ],
  },
  exit: {
    message: "Sorry we were not able to resolve your issue. \nPlease contact __ for more information",
    options: [
        {label: "Return to menu", next: "start"},
    ]
},

  // ***** FLOWCHART #1: OXYGEN GENERATOR WON'T RUN *****
  generator_wont_run: {
    message: "Is the oxygen generator in standby mode?",
    options: [
        { label: "No", next: "display"},
        { label: "Yes", next: "wait_oxygen_tank"},
    ],
  },

  display: {
    message: "Is there a display?",
    options: [
        { label: "No", next: "receive_power"},
        { label: "Yes", next: "display_on"},
    ],
  },

  display_on: {
    message: "Is the display turning on?",
    options: [
        { label: "No", next: "receive_power"},
        { label: "Yes", next: "memory_cryptic_errors"},
    ],
  },
  memory_cryptic_errors: {
    message: "Are there any memory or cryptic error messages?",
    options: [
        { label: "No", next: "display_plc"},
        { label: "Yes", next: "contact_manufacturer"},
    ],
  },

  receive_power: {
    message: "Is the oxygen generator receiving power?",
    options: [
        { label: "No", next: "troubleshoot_upstream_power_supply"},
        { label: "Yes", next: "acdc_match"},
    ],
  },
  acdc_match: {
    message: "Does the AC/DC power supply output match the display input requirement?",
    options: [
        { label: "No", next: "verify_power"},
        { label: "Yes", next: "display_plc"},
    ],
  },
  display_plc: {
    message: "Is the display connected to the PLC or is it a combination display/PLC?",
    options: [
        { label: "No", next: "connect_display_plc"},
        { label: "Yes", next: "physical_switch"},
    ],
  },
  physical_switch: {
    message: "Is there a physical run program switch?",
    options: [
        { label: "No", next: "plc_receive_power"},
        { label: "Yes", next: "switch_set"},
    ],
  },
  switch_set: {
    message: "Is the switch set to run / execute?",
    options: [
        { label: "No", next: "set_switch_to_run"},
        { label: "Yes", next: "toggle_switch"},
    ],
  },
  set_switch_to_run: {
    message: "Set switch to run. \nHas the issue been resolved?",
    options: [
        { label: "No", next: "contact_manufacturer"}, // defined in flowchart #2
        { label: "Yes", next: "end"},
    ],
  },
  toggle_switch: {
    message: "Toggle the switch. \nHas the issue been resolved?",
    options: [
        { label: "No", next: "contact_manufacturer"},
        { label: "Yes", next: "end"},
    ],
  },

  connect_display_plc: {
    message: "Connect the display to the PLC.",
    options: [
        { label: "Done", next: "plc_receive_power"},
    ],
  },
  plc_receive_power: {
    message: "Is the PLC receiving power (are the lights flashing)?",
    options: [
        { label: "No", next: "troubleshoot_upstream_power_supply"},
        { label: "Yes", next: "replace_display"},
    ],
  },

  replace_display: {
    message: "Replace display. \nHas the issue been resolved?",
    options: [
        { label: "No", next: "contact_manufacturer"},
        { label: "Yes", next: "end"},
    ],
  },
  verify_power: {
    message: "Verify power incompatibility and replace power supply. \n Has the issue been resolved?",
    options: [
        { label: "No", next: "display_plc"},
        { label: "Yes", next: "end"},
    ],
  },

  troubleshoot_upstream_power_supply: {
    message: "Troubleshoot the upstream power supply.",
    options: [
        { label: "Return to menu", next: "start"},
    ],
    pdfLink: TroubleshootUpstreamPowerPDF,
  },

  wait_oxygen_tank: {
    message: "Wait until the oxygen tank pressure is below the setpoint. \n Has the issue been resolved?",
    options: [
        { label: "No", next: "display"},
        { label: "Yes", next: "end"},
    ],
  },

  // ***** FLOWCHART #2: LOW PURITY MEASURED BY ONBOARD SENSOR *****
  low_purity: {
    message: "Has the machine been restarted recently (in the last 30 minutes)?",
    options: [
        { label: "No", next: "handheld_analyzer"},
        { label: "Yes", next: "build_purity"},
    ],
  },
  handheld_analyzer: {
    message: "Check the purity with a calibrated handheld analyzer. \n Does the purity match the onboard sensor?",
    options: [
        { label: "No", next: "flow_rate_match"},
        { label: "Yes", next: "inlet_pressure_match_purity"},
    ],
  },
  inlet_pressure_match_purity: {
    message: "Does the inlet pressure match manufacturer specs?",
    options: [
        { label: "No", next: "troubleshoot_upstream_equip"}, // defined in flowchart #5
        { label: "Yes", next: "limit_oxygen_output_purity"},
    ],
    pdfLink: lowInletPressurePDF,
  },
  limit_oxygen_output_purity: {
    message: "Limit oxygen output (close supply valve to hospital). \n Does the purity improve?",
    options: [
        { label: "No", next: "troubleshoot_valve_noise"}, // defined in flowchart #4
        { label: "Yes", next: "distribution_pipeline_leaks"},
    ],
  },
  distribution_pipeline_leaks: {
    message: "Check for and resolve any leaks in the distribution pipeline. \n Has the issue been resolved?",
    options: [
        { label: "No", next: "contact_manufacturer"},
        { label: "Yes", next: "limit_oxygen_demand"}, // defined in flowchart #4
    ],
  },
  contact_manufacturer: {
    message: "Sorry, we were not able to resolve your issue. \n Please contact the manufacturer or check the manual for an error message.",
    options: [
        { label: "Return to menu", next: "start"},
    ],
  },

  flow_rate_match: {
    message: "Does the flow rate to sensor match manufacturer specs?",
    options: [
        { label: "No", next: "reset_flow"},
        { label: "Yes", next: "replace_sensor"},
    ],
  },
  reset_flow: {
    message: "Reset flow. \nHas the issue been resolved?",
    options: [
        { label: "No", next: "exit"},
        { label: "Yes", next: "end"},
    ],
  },
  replace_sensor: {
    message: "Onboard purity sensor needs ot be recalibrated or replaced. \n Has the issue been resolved?",
    options: [
        { label: "No", next: "exit"},
        { label: "Yes", next: "end"},
    ],
  },

  build_purity: {
    message: "Wait until the oxygen generator can cycle and build purity. \nCheck every hour to see if purity is increasing. \nHas the issue been resolved?",
    options: [
        { label: "No", next: "handheld_analyzer"},
        { label: "Yes", next: "end"},
    ],
    pdfLink: buildPurityPDF,
  },


  // ***** FLOWCHART #3: IRREGULAR VALVE NOISE *****
  irregular_valve_noise: {
    message: "Observe a full cycle in valve cabinet. \n Does each Sieve bed reach the expected maximum and minimum pressures?",
    options: [
        { label: "No", next: "valve_signal"},
        { label: "Yes", next: "valve_leaks"},
    ],
    pdfLink: PSACyclePressurePDF,
  },
  valve_leaks: {
    message: "Are there any leaks in valve cabinet?",
    options: [
        { label: "No", next: "backpressure_regulator"},
        { label: "Yes", next: "tighten_leaky_unions"},
    ],
    pdfLink: valveCabinetLeaksPDF,
  },
  backpressure_regulator: {
    message: "Is there a backpressure regulator?",
    options: [
        { label: "No", next: "dusting_oil"},
        { label: "Yes", next: "regulator_settings"},
    ],
  },
  regulator_settings: {
    message: "Is the backpressure regulator set to manufacturer recommendations? \n (Check during equalization)",
    options: [
        { label: "No", next: "dusting_oil"},
        { label: "Yes", next: "reset_regulator"},
    ],
  },
  reset_regulator: {
    message: "Reset the backpressure regulator. \n Has the issue been resolved?",
    options: [
        { label: "No", next: "dusting_oil"},
        { label: "Yes", next: "end"},
    ],
  },
  dusting_oil: {
    message: "Is there dusting or oil on the muffler?",
    options: [
        { label: "No", next: "zeolite_depressed"},
        { label: "Yes", next: "clean_replace_mufflers"},
    ],
    pdfLink: mufflerPhotosPDF,
  },
  clean_replace_mufflers: {
    message: "Clean or replace mufflers. \nHas the issue been resolved?",
    options: [
        { label: "No", next: "zeolite_degraded"},
        { label: "Yes", next: "end"},
    ],
  },
  zeolite_degraded: {
    message: "Zeolite is likely degraded and needs to be replaced. \nTroubleshoot upstream equipment.",
    options: [
        { label: "Okay", next: "exit"},
    ],
    pdfLink: zeoliteDegradationPDF,
  },
  zeolite_depressed: {
    message: "Has the zeolite been depressed?",
    options: [
        { label: "No", next: "exit"},
        { label: "Yes", next: "top_off_zeolite"},
    ],
  },
  top_off_zeolite: {
    message: "Top off zeolite. \nHas the issue been resolved?",
    options: [
        { label: "No", next: "exit"},
        { label: "Yes", next: "end"},
    ],
  },
  tighten_leaky_unions: {
    message: "Tighten leaky unions. \nHas the issue been resolved?",
    options: [
        { label: "No", next: "inspect_fitting_surface"},
        { label: "Yes", next: "end"},
    ],
  },
  inspect_fitting_surface: {
    message: "Inspect fitting seal surface. \nHas the issue been resolved?",
    options: [
        { label: "No", next: "exit"},
        { label: "Yes", next: "end"},
    ],
  },
  valve_signal: {
    message: "Is each valve receiving a signal?",
    options: [
        { label: "No", next: "loose_wires"},
        { label: "Yes", next: "inspect_rebuild"},
    ],
  },
  inspect_rebuild: {
    message: "Inspect and clean or rebuild valves. \nHas the issue been resolved?",
    options: [
        { label: "No", next: "loose_wires"},
        { label: "Yes", next: "end"},
    ],
  },
  loose_wires: {
    message: "Check for and re-terminate loose wires/tubing. \nHas the issue been resolved?",
    options: [
        { label: "No", next: "replace_plc"},
        { label: "Yes", next: "end"},
    ],
  },
  replace_plc: {
    message: "Replace PLC. \nHas the issue been resolved?",
    options: [
        { label: "No", next: "exit"},
        { label: "Yes", next: "end"},
    ],
  },

  // ***** FLOWCHART #4: LOW PRESSURE IN OXYGEN TANK *****
  limit_oxygen_output: {
    message: "Limit oxygen output (close supply valve to hospital). \nDoes the pressure increase?",
    options: [
        { label: "No", next: "inlet_pressure_match" },
        { label: "Yes", next: "piping_leaks" },

    ],
  },
  // for inlet_pressure_match branching
  inlet_pressure_match: {
    message: "Does the inlet pressure match manufacturer specs?",
    options: [
      { label: "No", next: "troubleshoot_inlet_pressure" },
      { label: "Yes", next: "troubleshoot_valve_noise" },
    ],
  },
  troubleshoot_inlet_pressure: {
    message: "Troubleshoot low inlet pressure.",
    options: [
      { label: "Here", next: "low_inlet_pressure" },
    ],
  },
  troubleshoot_valve_noise: {
    message: "Troubleshoot irregular valve noise.",
    options: [
      { label: "Here", next: "irregular_valve_noise" },
    ],
  },
  // for piping_leaks branching
  piping_leaks: {
    message: "Are there any leaks in the piping distribution system?",
    options: [
        { label: "No", next: "exceed_capacity" },
        { label: "Yes", next: "repair_leaks" },
    ],
  },
  repair_leaks: {
    message: "Repair leaks. \nHas the issue been resolved?",
    options: [
      { label: "No", next: "exceed_capacity"},
      { label: "Yes", next: "end" },
    ],
  },
  exceed_capacity: {
    message: "Does the hospital oxygen usage exceed oxygen generator capacity?",
    options: [
        { label: "No", next: "exit"},
        { label: "Yes", next: "limit_oxygen_demand" },
    ],
  },
  limit_oxygen_demand: {
    message: "Permanently limit oxygen demand on PSA Plant. \nProcure supplemental oxygen supply. \nHas the issue been resolved?",
    options: [
      { label: "No", next: "contact_manufacturer"},
      { label: "Yes", next: "end" },
    ],
  },

  // ***** FLOWCHART #5: LOW INLET PRESSURE *****
  low_inlet_pressure: {
    message: "Are any closed ball valves blocking airflow?",
    options: [
        {label: "No", next: "sufficient_pressure"},
        {label: "Yes", next: "open_ball_valves"},
    ],
  },
  open_ball_valves: {
    message: "Open the ball valves. Is there sufficient pressure?",
    options: [
        {label: "No", next: "sufficient_pressure"},
        {label: "Yes", next: "end"},
    ],
  },
  sufficient_pressure: {
    message: "Is there sufficient pressure in the air tank?",
    options: [
        {label: "No", next: "troubleshoot_upstream_equip"},
        {label: "Yes", next: "dial_pressure_settings"},
    ],
  },
  troubleshoot_upstream_equip: {
    message: "Troubleshoot upstream equipment.",
    options: [
        {label: "Return to menu", next: "start"},
    ],
  },
  dial_pressure_settings: {
    message: "Does the feed air regulator have dial pressure settings on it?",
    options: [
        {label: "No", next: "increase_output_pressure"},
        {label: "Yes", next: "compare_pressure"},
    ],
  },
  increase_output_pressure: {
    message: "Slowly increase output pressure by adjusting the pressure regulator.",
    options: [
        {label: "Done", next: "pressure_increased"},
    ],
  },
  compare_pressure: {
    message: "Compare the pressure on the dial to the maximum pressure of the sieve beds. \nAre they close to each other?",
    options: [
        {label: "No", next: "adjust_regulator"},
        {label: "Yes", next: "service_regulator"},
    ],
  },
  service_regulator: {
    message: "Service or replace the pressure regulator. \nHas the issue been resolved?",
    options: [
        {label: "No", next: "adjust_regulator"},
        {label: "Yes", next: "end"},
    ],
  },
  adjust_regulator: {
    message: "Adjust the feed air regulator pressure settings to manufacturer recommendations. \nHas the issue been resolved?",
    options: [
        {label: "No", next: "pressure_increased"},
        {label: "Yes", next: "end"},
    ],
  },
  pressure_increased: {
    message: "Has the pressure downstream of the regulator increased?",
    options: [
        {label: "Yes", next: "end"},
        {label: "No", next: "exit"},
    ],
  },
};

const oxygenDiagram = "https://i0.wp.com/bhioxygen.org/wp-content/uploads/2023/09/PSA-plant-components-1.png?w=808&ssl=1"

const App = () => {
  const [currentStep, setCurrentStep] = useState("start");
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState("false");

  const goToStep = (nextStep, selectedLabel) => {
    setHistory((prev) => [
        ...prev,
        {
            stepKey: currentStep,
            message: flowChartLogic[currentStep].message || "",
            selected: selectedLabel,
        },
    ]); // add current step to history
    setCurrentStep(nextStep);
  };

  const goBack = () => {
    if (history.length > 0) {
      const updatedHistory = history.slice(0, -1); // remove last history entry
      const previousStep = updatedHistory.length > 0 ? updatedHistory[updatedHistory.length - 1].stepKey : "start"; // last valid stepKey
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

  const step = flowChartLogic[currentStep];

  return (
    <div className="container">
        <h1 className="title">Oxygen Generator Troubleshooting</h1>
        <p className="update"> Last updated: Jan 2025 </p>
        <img className="oxygen_img" src={oxygenDiagram} alt="Oxygen generator diagram"/>
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
        </div>

        {history.length > 0 && currentStep !== "start" && (
            <div className="buttons-container">
                <button onClick={goBack} className="back-button">
                    Back
                </button>
            </div>
        )}

        <div className="history-toggle">
            <div className = "history-button-div">
                <button onClick={toggleHistory} className="history-button">
                    {showHistory ? "Hide History" : "View History"}
                </button>
            </div>

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

                <button onClick={downloadHistory} className = "bottom-buttons">
                    Download History
                </button>

                <button onClick={restartHistory} className="bottom-buttons">
                    Restart
                </button>
            </div>
        </div>

        <p className="flowchart-subtitle"> Complete Flowchart </p>
        <div className="flowchart">
            <img className="oxygen-generator-flowchart" src={oxygenflowchart} alt="Full oxygen generator troubleshooting flowchart."/>
        </div>
    </div>
  );
};

export default App;
