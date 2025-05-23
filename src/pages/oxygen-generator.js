import React, { useRef, useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { flowchartTranslations } from '../OGTranslations';
import "./equip.css";
import flowchart from "./assets/Oxygen Generator Troubleshooting Flow Chart.png";
import buildPurityPDF from "./assets/Building Purity .pdf";
import lowInletPressurePDF from "./assets/Check for low inlet pressure .pdf";
import mufflerPhotosPDF from "./assets/Muffler Photos.pdf";
import PSACyclePressurePDF from "./assets/PSA Cycle Pressure Check.pdf";
// import PSACyclePDF from "./assets/The PSA Cycle.pdf";
import TroubleshootUpstreamPowerPDF from "./assets/trouble shooting upstream power.pdf";
import valveCabinetLeaksPDF from "./assets/Valve Cabinet Leaks.pdf";
import zeoliteDegradationPDF from "./assets/Zeolite Degradation.pdf";

const oxygenDiagram = "https://i0.wp.com/bhioxygen.org/wp-content/uploads/2023/09/PSA-plant-components-1.png?w=808&ssl=1"

const App = () => {
  const { language } = useLanguage();
  const t = flowchartTranslations[language];

  const flowChartLogic = {
    start: {
      message: t.start_message,
      options: t.start_options.map((label, index) => ({
        label, next: ["generator_wont_run", "low_purity", "irregular_valve_noise", "limit_oxygen_output", "low_inlet_pressure"][index],
      })),
      externalLink: {
        url: "https://bhioxygen.org/request-support/",
        label: t.other,
      },
    },
    end: {
      message: t.end_message,
      options: [
        { label: t.return_to_menu, next: "start" }
      ],
    },
    exit: {
      message: t.exit_message,
      options: [
        { label: t.return_to_menu, next: "start" }
      ]
  },

    // ***** FLOWCHART #1: OXYGEN GENERATOR WON'T RUN *****
    generator_wont_run: {
      message: t.generator_wont_run_message,
      options: [
          { label: t.no, next: "display"},
          { label: t.yes, next: "wait_oxygen_tank"},
      ],
    },

    display: {
      message: t.display_message,
      options: [
          { label: t.no, next: "receive_power"},
          { label: t.yes, next: "display_on"},
      ],
    },

    display_on: {
      message: t.display_on_message,
      options: [
          { label: t.no, next: "receive_power"},
          { label: t.yes, next: "memory_cryptic_errors"},
      ],
    },
    memory_cryptic_errors: {
      message: t.memory_cryptic_errors_message,
      options: [
          { label: t.no, next: "display_plc"},
          { label: t.yes, next: "contact_manufacturer"},
      ],
    },

    receive_power: {
      message: t.receive_power_message,
      options: [
          { label: t.no, next: "troubleshoot_upstream_power_supply"},
          { label: t.yes, next: "acdc_match"},
      ],
    },
    acdc_match: {
      message: t.acdc_match_message,
      options: [
          { label: t.no, next: "verify_power"},
          { label: t.yes, next: "display_plc"},
      ],
    },
    display_plc: {
      message: t.display_plc_message,
      options: [
          { label: t.no, next: "connect_display_plc"},
          { label: t.yes, next: "physical_switch"},
      ],
    },
    physical_switch: {
      message: t.physical_switch_message,
      options: [
          { label: t.no, next: "plc_receive_power"},
          { label: t.yes, next: "switch_set"},
      ],
    },
    switch_set: {
      message: t.switch_set_message,
      options: [
          { label: t.no, next: "set_switch_to_run"},
          { label: t.yes, next: "toggle_switch"},
      ],
    },
    set_switch_to_run: {
      message: t.set_switch_to_run_message,
      options: [
          { label: t.no, next: "contact_manufacturer"}, // defined in flowchart #2
          { label: t.yes, next: "end"},
      ],
    },
    toggle_switch: {
      message: t.toggle_switch_message,
      options: [
          { label: t.no, next: "contact_manufacturer"},
          { label: t.yes, next: "end"},
      ],
    },

    connect_display_plc: {
      message: t.connect_display_plc_message,
      options: [
          { label: t.done, next: "plc_receive_power"},
      ],
    },
    plc_receive_power: {
      message: t.plc_receive_power_message,
      options: [
          { label: t.no, next: "troubleshoot_upstream_power_supply"},
          { label: t.yes, next: "replace_display"},
      ],
    },

    replace_display: {
      message: t.replace_display_message,
      options: [
          { label: t.no, next: "contact_manufacturer"},
          { label: t.yes, next: "end"},
      ],
    },
    verify_power: {
      message: t.verify_power_message,
      options: [
          { label: t.no, next: "display_plc"},
          { label: t.yes, next: "end"},
      ],
    },

    troubleshoot_upstream_power_supply: {
      message: t.troubleshoot_upstream_power_supply_message,
      options: [
          { label: t.return_to_menu, next: "start"},
      ],
      pdfLink: TroubleshootUpstreamPowerPDF,
    },

    wait_oxygen_tank: {
      message: t.wait_oxygen_tank_message,
      options: [
          { label: t.no, next: "display"},
          { label: t.yes, next: "end"},
      ],
    },

    // ***** FLOWCHART #2: LOW PURITY MEASURED BY ONBOARD SENSOR *****
    low_purity: {
      message: t.low_purity_message,
      options: [
          { label: t.no, next: "handheld_analyzer"},
          { label: t.yes, next: "build_purity"},
      ],
    },
    handheld_analyzer: {
      message: t.handheld_analyzer_message,
      options: [
          { label: t.no, next: "flow_rate_match"},
          { label: t.yes, next: "inlet_pressure_match_purity"},
      ],
    },
    inlet_pressure_match_purity: {
      message: t.inlet_pressure_match_purity_message,
      options: [
          { label: t.no, next: "troubleshoot_upstream_equip"}, // defined in flowchart #5
          { label: t.yes, next: "limit_oxygen_output_purity"},
      ],
      pdfLink: lowInletPressurePDF,
    },
    limit_oxygen_output_purity: {
      message: t.limit_oxygen_output_purity_message,
      options: [
          { label: t.no, next: "troubleshoot_valve_noise"}, // defined in flowchart #4
          { label: t.yes, next: "distribution_pipeline_leaks"},
      ],
    },
    distribution_pipeline_leaks: {
      message: t.distribution_pipeline_leaks_message,
      options: [
          { label: t.no, next: "contact_manufacturer"},
          { label: t.yes, next: "limit_oxygen_demand"}, // defined in flowchart #4
      ],
    },
    contact_manufacturer: {
      message: t.contact_manufacturer_message,
      options: [
          { label: t.return_to_menu, next: "start"},
      ],
    },

    flow_rate_match: {
      message: t.flow_rate_match_message,
      options: [
          { label: t.no, next: "reset_flow"},
          { label: t.yes, next: "replace_sensor"},
      ],
    },
    reset_flow: {
      message: t.reset_flow_message,
      options: [
          { label: t.no, next: "exit"},
          { label: t.yes, next: "end"},
      ],
    },
    replace_sensor: {
      message: t.replace_sensor_message,
      options: [
          { label: t.no, next: "exit"},
          { label: t.yes, next: "end"},
      ],
    },

    build_purity: {
      message: t.build_purity_message,
      options: [
          { label: t.no, next: "handheld_analyzer"},
          { label: t.yes, next: "end"},
      ],
      pdfLink: buildPurityPDF,
    },


    // ***** FLOWCHART #3: IRREGULAR VALVE NOISE *****
    irregular_valve_noise: {
      message: t.irregular_valve_noise_message,
      options: [
          { label: t.no, next: "valve_signal"},
          { label: t.yes, next: "valve_leaks"},
      ],
      pdfLink: PSACyclePressurePDF,
    },
    valve_leaks: {
      message: t.valve_leaks_message,
      options: [
          { label: t.no, next: "backpressure_regulator"},
          { label: t.yes, next: "tighten_leaky_unions"},
      ],
      pdfLink: valveCabinetLeaksPDF,
    },
    backpressure_regulator: {
      message: t.backpressure_regulator_message,
      options: [
          { label: t.no, next: "dusting_oil"},
          { label: t.yes, next: "regulator_settings"},
      ],
    },
    regulator_settings: {
      message: t.regulator_settings_message,
      options: [
          { label: t.no, next: "dusting_oil"},
          { label: t.yes, next: "reset_regulator"},
      ],
    },
    reset_regulator: {
      message: t.reset_regulator_message,
      options: [
          { label: t.no, next: "dusting_oil"},
          { label: t.yes, next: "end"},
      ],
    },
    dusting_oil: {
      message: t.dusting_oil_message,
      options: [
          { label: t.no, next: "zeolite_depressed"},
          { label: t.yes, next: "clean_replace_mufflers"},
      ],
      pdfLink: mufflerPhotosPDF,
    },
    clean_replace_mufflers: {
      message: t.clean_replace_mufflers_message,
      options: [
          { label: t.no, next: "zeolite_degraded"},
          { label: t.yes, next: "end"},
      ],
    },
    zeolite_degraded: {
      message: t.zeolite_degraded_message,
      options: [
          { label: "Okay", next: "exit"},
      ],
      pdfLink: zeoliteDegradationPDF,
    },
    zeolite_depressed: {
      message: t.zeolite_depressed_message,
      options: [
          { label: t.no, next: "exit"},
          { label: t.yes, next: "top_off_zeolite"},
      ],
    },
    top_off_zeolite: {
      message: t.top_off_zeolite_message,
      options: [
          { label: t.no, next: "exit"},
          { label: t.yes, next: "end"},
      ],
    },
    tighten_leaky_unions: {
      message: t.tighten_leaky_unions_message,
      options: [
          { label: t.no, next: "inspect_fitting_surface"},
          { label: t.yes, next: "end"},
      ],
    },
    inspect_fitting_surface: {
      message: t.inspect_fitting_surface_message,
      options: [
          { label: t.no, next: "exit"},
          { label: t.yes, next: "end"},
      ],
    },
    valve_signal: {
      message: t.valve_signal_message,
      options: [
          { label: t.no, next: "loose_wires"},
          { label: t.yes, next: "inspect_rebuild"},
      ],
    },
    inspect_rebuild: {
      message: t.inspect_rebuild_message,
      options: [
          { label: t.no, next: "loose_wires"},
          { label: t.yes, next: "end"},
      ],
    },
    loose_wires: {
      message: t.loose_wires_message,
      options: [
          { label: t.no, next: "replace_plc"},
          { label: t.yes, next: "end"},
      ],
    },
    replace_plc: {
      message: t.replace_plc_message,
      options: [
          { label: t.no, next: "exit"},
          { label: t.yes, next: "end"},
      ],
    },

    // ***** FLOWCHART #4: LOW PRESSURE IN OXYGEN TANK *****
    limit_oxygen_output: {
      message: t.limit_oxygen_output_message,
      options: [
          { label: t.no, next: "inlet_pressure_match" },
          { label: t.yes, next: "piping_leaks" },

      ],
    },
    // for inlet_pressure_match branching
    inlet_pressure_match: {
      message: t.inlet_pressure_match_message,
      options: [
        { label: t.no, next: "troubleshoot_inlet_pressure" },
        { label: t.yes, next: "troubleshoot_valve_noise" },
      ],
    },
    troubleshoot_inlet_pressure: {
      message: t.troubleshoot_inlet_pressure_message,
      options: [
        { label: "Here", next: "low_inlet_pressure" },
      ],
    },
    troubleshoot_valve_noise: {
      message: t.troubleshoot_valve_noise_message,
      options: [
        { label: "Here", next: "irregular_valve_noise" },
      ],
    },
    // for piping_leaks branching
    piping_leaks: {
      message: t.piping_leaks_message,
      options: [
          { label: t.no, next: "exceed_capacity" },
          { label: t.yes, next: "repair_leaks" },
      ],
    },
    repair_leaks: {
      message: t.repair_leaks_message,
      options: [
        { label: t.no, next: "exceed_capacity"},
        { label: t.yes, next: "end" },
      ],
    },
    exceed_capacity: {
      message: t.exceed_capacity_message,
      options: [
          { label: t.no, next: "exit"},
          { label: t.yes, next: "limit_oxygen_demand" },
      ],
    },
    limit_oxygen_demand: {
      message: t.limit_oxygen_demand_message,
      options: [
        { label: t.no, next: "contact_manufacturer"},
        { label: t.yes, next: "end" },
      ],
    },

    // ***** FLOWCHART #5: LOW INLET PRESSURE *****
    low_inlet_pressure: {
      message: t.low_inlet_pressure_message,
      options: [
          {label: t.no, next: "sufficient_pressure"},
          {label: t.yes, next: "open_ball_valves"},
      ],
    },
    open_ball_valves: {
      message: t.open_ball_valves_message,
      options: [
          {label: t.no, next: "sufficient_pressure"},
          {label: t.yes, next: "end"},
      ],
    },
    sufficient_pressure: {
      message: t.sufficient_pressure_message,
      options: [
          {label: t.no, next: "troubleshoot_upstream_equip"},
          {label: t.yes, next: "dial_pressure_settings"},
      ],
    },
    troubleshoot_upstream_equip: {
      message: t.troubleshoot_upstream_equip_message,
      options: [
          {label: "Return to menu", next: "start"},
      ],
    },
    dial_pressure_settings: {
      message: t.dial_pressure_settings_message,
      options: [
          {label: t.no, next: "increase_output_pressure"},
          {label: t.yes, next: "compare_pressure"},
      ],
    },
    increase_output_pressure: {
      message: t.increase_output_pressure_message,
      options: [
          {label: "Done", next: "pressure_increased"},
      ],
    },
    compare_pressure: {
      message: t.compare_pressure_message,
      options: [
          {label: t.no, next: "adjust_regulator"},
          {label: t.yes, next: "service_regulator"},
      ],
    },
    service_regulator: {
      message: t.service_regulator_message,
      options: [
          {label: t.no, next: "adjust_regulator"},
          {label: t.yes, next: "end"},
      ],
    },
    adjust_regulator: {
      message: t.adjust_regulator_message,
      options: [
          {label: t.no, next: "pressure_increased"},
          {label: t.yes, next: "end"},
      ],
    },
    pressure_increased: {
      message: t.pressure_increased_message,
      options: [
          {label: t.yes, next: "end"},
          {label: t.no, next: "exit"},
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
      // change positions if upload new image
      const positions = {
        generator_wont_run: {x: 0},
        low_purity: {x: 0.2},
        irregular_valve_noise: {x: 0.43},
        limit_oxygen_output: {x: 0.65},
        low_inlet_pressure: {x: 1},
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
    const currentDate = new Date();
    const date = currentDate.toLocaleDateString('en-US', { // MM/DD/YYYY
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    const time = currentDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    const date_timestamp = `${date} ${time}`
    const textContent = history.map((entry, index) =>
        `Question ${index+1}: ${entry.message} \n Response selected: ${entry.selected}\n`).join("\n\n");
    const fileContent = `Troubleshooting Steps - Date: ${date_timestamp}\n\n${textContent}`
    const blob = new Blob([fileContent], {type: "text/plain"});
    const url= URL.createObjectURL(blob);
    const link = document.createElement("a");
    const fileName = `troubleshooting_steps_${date_timestamp}`
    link.href = url;
    link.download = fileName
    link.click();
    URL.revokeObjectURL(url);
  };

  const step = flowChartLogic[currentStep];

  return (
    <div className="container">
        <h1 className="title"> {t.og_title} </h1>
        <p className="update"> {t.og_update} </p>
        <img className="diagram_img" src={oxygenDiagram} alt="Oxygen generator diagram"/>
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
            <img className="oxygen-generator-flowchart-img" src={flowchart} alt="Full oxygen generator troubleshooting flowchart."/>
        </div>
    </div>
  );
};

export default App;
