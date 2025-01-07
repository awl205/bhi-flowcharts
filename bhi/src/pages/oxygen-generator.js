import React, { useState } from 'react';
import "./oxygen-generator.css"

const flowChartLogic = {
  start: {
    message: "What issue are you facing?",
    options: [
      { label: "Oxygen Generator won't run", next: "step1" },
      { label: "Low purity measured by onboard sensor", next: "step2" },
      { label: "Irregular valve noise", next: "step3"},
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
//   exit: {
//     message: "Sorry we weren't able to resolve your issue! Contact ___ for more information.",
//     options: [
//         {label: "Return to menu", next: "start"}
//     ]
//   },


  // ***** FLOWCHART #4: LOW PRESSURE IN OXYGEN TANK *****
  limit_oxygen_output: {
    message: "ACTION: Limit oxygen output (close supply valve to hospital). Does the pressure increase?",
    options: [
      { label: "Yes", next: "piping_leaks" },
      { label: "No", next: "inlet_pressure_match" },
    ],
  },
  // for inlet_pressure_match branching
  inlet_pressure_match: {
    message: "Does the inlet pressure match manufacturer specs?",
    options: [
      { label: "Yes", next: "troubleshoot_valve_noise" },
      { label: "No", next: "troubleshoot_inlet_pressure" },
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
      { label: "Here", next: "valve_noise" },
    ],
  },
  // for piping_leaks branching
  piping_leaks: {
    message: "Are there any leaks in the piping distribution system?",
    options: [
      { label: "Yes", next: "repair_leaks" },
      { label: "No", next: "exceed_capacity" },
    ],
  },
  repair_leaks: {
    message: "ACTION: Repair leaks. Is the issue resolved?",
    options: [
      { label: "Yes", next: "end" },
      { label: "No", next: "exceed_capacity"}
    ],
  },
  exceed_capacity: {
    message: "Does the hospital oxygen usage exceed oxygen generator capacity?",
    options: [
      { label: "Yes", next: "limit_oxygen_demand" },
    ],
  },
  limit_oxygen_demand: {
    message: "Action: Permanently limit oxygen demand on PSA Plant. Procure supplemental oxygen supply. Has the issue been resolved?",
    options: [
      { label: "Yes", next: "end" },
    ],
  },

  // ***** FLOWCHART #5: LOW INLET PRESSURE *****
  low_inlet_pressure: {
    message: "Are any closed ball valves blocking airflow?",
    options: [
        {label: "Yes", next: "open_ball_valves"},
        {label: "No", next: "sufficient_pressure"},
    ],
  },
  open_ball_valves: {
    message: "Open the ball valves. Is there sufficient pressure?",
    options: [
        {label: "Yes", next: "end"},
        {label: "No", next: "sufficient_pressure"},
    ],
  },
  sufficient_pressure: {
    message: "Is there sufficient pressure in the air tank?",
    options: [
        {label: "Yes", next: "dial_pressure_settings"},
        {label: "No", next: "troubleshoot_upstream_equip"},
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
        {label: "Yes", next: "compare_pressure"},
        {label: "No", next: "increase_output_pressure"},
    ],
  },
  increase_output_pressure: {
    message: "Slowly increase output pressure by adjusting the pressure regulator.",
    options: [
        {label: "Done", next: "pressure_increased"},
    ],
  },
  compare_pressure: {
    message: "Compare the pressure on the dial to the maximum pressure of the sieve beds. Are they close to each other?",
    options: [
        {label: "Yes", next: "service_regulator"},
        {label: "No", next: "adjust_regulator"},
    ],
  },
  service_regulator: {
    message: "Service or replace the pressure regulator. Is the issue resolved?",
    options: [
        {label: "Yes", next: "end"},
        {label: "No", next: "adjust_regulator"},
    ],
  },
  adjust_regulator: {
    message: "Adjust the feed air regulator pressure settings to manufacturer recommendations. Is the issue resolved?",
    options: [
        {label: "Yes", next: "end"},
        {label: "No", next: "pressure_increased"},
    ],
  },
  pressure_increased: {
    message: "Has the pressure downstream of the regulator increased?",
    options: [
        {label: "Yes", next: "end"},
    ],
  },
};


const App = () => {
  const [currentStep, setCurrentStep] = useState("start");
  const [history, setHistory] = useState([]);

  const goToStep = (nextStep) => {
    setHistory((prev) => [...prev, currentStep]); // add current step to history
    setCurrentStep(nextStep);
  };

  const goBack = () => {
    if (history.length > 0){
        const previousStep = history[history.length - 1]; // get last visited step
        setHistory((prev) => prev.slice(0, -1)) // remove last step from history
        setCurrentStep(previousStep); // go back to previous step
    }
  };

  const step = flowChartLogic[currentStep];

  return (
    <div className="container">
      <h1 className="title">Oxygen Generator Troubleshooting</h1>
      <p className="message">{step.message}</p>
      <div className="buttons-container">
        {step.options.map((option, index) => (
          <button
            key={index}
            onClick={() => goToStep(option.next)}
            className="button"
          >
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
    </div>
  );
};

export default App;
