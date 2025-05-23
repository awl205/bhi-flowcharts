import React, { useRef, useState } from 'react';
import "./equip.css";
import flowchart from "./assets/Booster Compressor Troubleshooting Diagram.png";
import { useLanguage } from '../LanguageContext';
import { flowchartTranslations } from '../BCTranslations';
import manufacturingContactInfo from "./assets/PSA Plant Manufacturer Contact Information.pdf";

  const oxygenFlowChart = "https://i0.wp.com/bhioxygen.org/wp-content/uploads/2023/09/PSA-plant-components-1.png?w=808&ssl=1"

  const App = () => {
    const { language } = useLanguage();
    const t = flowchartTranslations[language];

    const flowChartLogic = {
        start: {
          message: t.start_message,
          options: t.start_options.map((label, index) => ({
            label, next: ["shutdown_high_temp", "loud_knocking", "low_interstage_pressures", "off_before_final_stage", "high_interstage_pressures", "tripping_pressure", "squealing_noise"][index],
          })),
          externalLink: {
            url: "https://bhioxygen.org/request-support/",
            label: t.other
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
            ],
            pdfLink: manufacturingContactInfo,
        },


        // ***** FLOWCHART 1 *****
        shutdown_high_temp: {
            message: t.shutdown_high_temp_message,
            options: [
                {label: t.no, next: 'sufficient_ventilation'},
                {label: t.yes, next: 'reconnect_cooling_fan'},
            ],
        },
        reconnect_cooling_fan: {
            message: t.reconnect_cooling_fan_message,
            options: [
                {label: t.no, next: 'sufficient_ventilation'},
                {label: t.yes, next: 'end'},
            ],
        },
        sufficient_ventilation: {
            message: t.sufficient_ventilation_message,
            options: [
                {label: t.no, next: 'clean_cooling_fan'},
                {label: t.yes, next: 'interstage_pressures_expected'},
            ],
        },
        clean_cooling_fan: {
            message: t.clean_cooling_fan_message,
            options: [
                {label: t.no, next: 'interstage_pressures_expected'},
                {label: t.yes, next: 'end'},
            ],
        },
        interstage_pressures_expected: {
            message: t.interstage_pressures_expected_message,
            options: [
                {label: t.no, next: 'insufficient_piston_clearance'},
                {label: t.yes, next: 'verify_temperature'},
            ],
        },
        insufficient_piston_clearance: {
            message: t.insufficient_piston_clearance_message,
            options: [
                {label: t.no, next: 'exit'}, // fix this???
                {label: t.yes, next: 'measure_piston_clearance'},
            ],
        },
        measure_piston_clearance: {
            message: t.measure_piston_clearance_message,
            options: [
                {label: t.no, next: 'exit'}, // fix this???
                {label: t.yes, next: 'end'},
            ],
        },
        verify_temperature: {
            message: t.verify_temperature_message,
            options: [
                {label: t.no, next: 'replace_temp_sensor'},
                {label: t.yes, next: 'check_temp_sensor'},
            ],
        },
        replace_temp_sensor: {
            message: t.replace_temp_sensor_message,
            options: [
                {label: t.no, next: 'exit'},
                {label: t.yes, next: 'end'},
            ],
        },
        check_temp_sensor: {
            message: t.check_temp_sensor_message,
            options: [
                {label: t.no, next: 'replace_temp_sensor'},
                {label: t.yes, next: 'end'},
            ],
        },

        // **** FLOWCHART 2 *****
        loud_knocking: {
            message: t.loud_knocking_message,
            options: [
                {label: 'Cylinders', next: 'identify_stage'},
                {label: 'Rotating Assembly', next: 'crankshaft_issue'},
            ],
        },
        crankshaft_issue: {
            message: t.crankshaft_issue_message,
            options: [
                {label: t.return_to_menu, next: 'start'},
            ],
        },
        identify_stage: {
            message: t.identify_stage_message,
            options: [
                {label: t.no, next: 'measure_piston_clearance'},
                {label: t.yes, next: 'final_stage_pressure'},
            ],
        },
        final_stage_pressure: {
            message: t.final_stage_pressure_message,
            options: [
                {label: t.no, next: 'measure_piston_clearance'},
                {label: t.yes, next: 'adjust_back_pressure_regulator'},
            ],
        },
        adjust_back_pressure_regulator: {
            message: t.adjust_back_pressure_regulator_message,
            options: [
                {label: t.no, next: 'exit'},
                {label: t.yes, next: 'end'},
            ],
        },

        // **** FLOWCHART 3 ****
        low_interstage_pressures: {
            message: t.low_interstage_pressures_message,
            options: [
                {label: t.no, next: 'pressure_regulator_upstream'},
                {label: t.yes, next: 'restricted_flow'},
            ],
        },
        restricted_flow: {
            message: t.restricted_flow_message,
            options: [
                {label: t.no, next: 'leaking_piping'},
                {label: t.yes, next: 'replace_filter'},
            ],
        },
        leaking_piping: {
            message: t.leaking_piping_message,
            options: [
                {label: t.no, next: 'valve_assembled'},
                {label: t.yes, next: 'repair_leak_4'},
            ],
        },
        repair_leak_4: {
            message: t.repair_leak_4_message,
            options: [
                {label: t.no, next: 'valve_assembled'},
                {label: t.yes, next: 'end'},
            ],
        },
        valve_assembled: {
            message: t.valve_assembled_message,
            options: [
                {label: t.no, next: 'reassemble_valve'},
                {label: t.yes, next: 'compression_rings_worn'},
            ],
        },
        compression_rings_worn: {
            message: t.compression_rings_worn_message,
            options: [
                {label: t.no, next: 'excessive_head_clearance_4'},
                {label: t.yes, next: 'replace_compression_rings'},
            ],
        },
        excessive_head_clearance_4: {
            message: t.excessive_head_clearance_4_message,
            options: [
                {label: t.no, next: 'exit'},
                {label: t.yes, next: 'realign_piston'},
            ],
        },
        realign_piston: {
            message: t.realign_piston_message,
            options: [
                {label: t.no, next: 'exit'},
                {label: t.yes, next: 'end'},
            ],
        },
        replace_compression_rings: {
            message: t.replace_compression_rings_message,
            options: [
                {label: t.no, next: 'excessive_head_clearance_4'},
                {label: t.yes, next: 'end'},
            ],
        },
        reassemble_valve: {
            message: t.reassemble_valve_message,
            options: [
                {label: t.no, next: 'compression_rings_worn'},
                {label: t.yes, next: 'end'},
            ],
        },
        replace_filter: {
            message: t.replace_filter_message,
            options: [
                {label: t.no, next: 'leaking_piping'},
                {label: t.yes, next: 'end'},
            ],
        },
        pressure_regulator_upstream:{
            message: t.pressure_regulator_upstream_message,
            options: [
                {label: t.no, next: 'sufficient_oxygen_supply'},
                {label: t.yes, next: 'adjust_pressure_regulator'},
            ],
        },
        adjust_pressure_regulator:{
            message: t.adjust_pressure_regulator_message,
            options: [
                {label: t.no, next: 'sufficient_oxygen_supply'},
                {label: t.yes, next: 'end'},
            ],
        },
        sufficient_oxygen_supply: {
            message: t.sufficient_oxygen_supply_message,
            options: [
                {label: t.no, next: 'wait_o2_pressure_build'},
                {label: t.yes, next: 'reset_inlet_switch'},
            ],
        },
        wait_o2_pressure_build: {
            message: t.wait_o2_pressure_build_message,
            options: [
                {label: t.no, next: 'reset_inlet_switch'},
                {label: t.yes, next: 'end'},
            ],
        },
        reset_inlet_switch: {
            message: t.reset_inlet_switch_message,
            options: [
                {label: t.no, next: 'exit'}, // fix this???
                {label: t.yes, next: 'end'},
            ],
        },

         // **** FLOWCHART 4 *****
        off_before_final_stage: {
            message: t.off_before_final_stage_message,
            options: [
                {label: t.no, next: 'pressure_abnormally_low'},
                {label: t.yes, next: 'repair_leak'},
            ],
        },
        repair_leak: {
            message: t.repair_leak_message,
            options: [
                {label: t.no, next: 'exit'},
                {label: t.yes, next: 'end'},
            ],
        },
        pressure_abnormally_low: {
            message: t.pressure_abnormally_low_message,
            options: [
                {label: t.no, next: 'reset_outlet_switch'},
                {label: t.yes, next: 'low_interstage_pressures'},
            ],
        },
        reset_outlet_switch: {
            message: t.reset_outlet_switch_message,
            options: [
                {label: t.no, next: 'exit'},
                {label: t.yes, next: 'end'},
            ],
        },

        // **** FLOWCAHRT 5 ****
        high_interstage_pressures: {
            message: t.high_interstage_pressures_message,
            options: [
                {label: t.no, next: 'replace_rebuild_valves'},
                {label: t.yes, next: 'excessive_head_clearance'},
            ],
        },
        excessive_head_clearance: {
            message: t.excessive_head_clearance_message,
            options: [
                {label: t.no, next: 'pressure_gauge'},
                {label: t.yes, next: 'adjust_headspace'},
            ],
        },
        pressure_gauge: {
            message: t.pressure_gauge_message,
            options: [
                {label: t.no, next: 'replace_pressure_relief_valve'},
                {label: t.yes, next: 'replace_gauge'},
            ],
        },
        replace_pressure_relief_valve: {
            message: t.replace_pressure_relief_valve_message,
            options: [
                {label: t.no, next: 'exit'},
                {label: t.yes, next: 'end'},
            ],
        },
        replace_gauge: {
            message: t.replace_gauge_message,
            options: [
                {label: t.no, next: 'replace_pressure_relief_valve'}, // fix this???
                {label: t.yes, next: 'end'},
            ],
        },
        adjust_headspace: {
            message: t.adjust_headspace_message,
            options: [
                {label: t.no, next: 'pressure_gauge'},
                {label: t.yes, next: 'end'},
            ],
        },
        replace_rebuild_valves: {
            message: t.replace_rebuild_valves_message,
            options: [
                {label: t.no, next: 'exit'}, // fix this???
                {label: t.yes, next: 'end'},
            ],
        },

        // ***** FLOWCHART 6 *****
        tripping_pressure: {
            message: t.tripping_pressure_message,
            options: [
                {label: t.no, next: 'replace_cont'},
                {label: t.yes, next: 'replace_end'},
            ],
        },
        replace_end: {
            message: t.replace_end_message,
            options: [
                {label: t.no, next: 'exit'},
                {label: t.yes, next: 'end'},
            ],
        },
        replace_cont: {
            message: t.replace_cont_message,
            options: [
                {label: t.no, next: 'high_interstage_pressures'},
                {label: t.yes, next: 'sensor_functional'},
            ],
        },
        sensor_functional: {
            message: t.sensor_functional_message,
            options: [
                {label: t.no, next: 'replace_sensor'},
                {label: t.yes, next: 'back_pressure_functional'},
            ],
        },
        back_pressure_functional: {
            message: t.back_pressure_functional_message,
            options: [
                {label: t.no, next: 'replace_back_pressure'},
                {label: t.yes, next: 'exit'},
            ],
        },
        replace_back_pressure: {
            message: t.replace_back_pressure_message,
            options: [
                {label: t.no, next: 'exit'},
                {label: t.yes, next: 'end'},
            ],
        },
        replace_sensor: {
            message: t.replace_sensor_message,
            options: [
                {label: t.no, next: 'back_pressure_functional'},
                {label: t.yes, next: 'end'},
            ],
        },

        // ***** FLOWCHART 7 *****
        squealing_noise: {
            message: t.squealing_noise_message,
            options: [
                {label: t.no, next: 'exit'},
                {label: t.yes, next: 'end'},
            ],
        }

      };

      const flowchartRef = useRef(null);
      const [currentStep, setCurrentStep] = useState("start");
      const [hasScrolled, setHasScrolled] = useState(false);
      const [history, setHistory] = useState([]);
      const [showHistory, setShowHistory] = useState(false);

      const scrollToSection = (section) => {
        if (!hasScrolled) {
          const positions = {
            shutdown_high_temp: {x: 0},
            loud_knocking: {x: 0},
            low_interstage_pressures: {x: 0.27},
            off_before_final_stage: {x: 0.45},
            high_interstage_pressures: {x: 1},
            tripping_pressure: {x: 1},
            squealing_noise: {x: 1},
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
          <h1 className="title"> {t.title} </h1>
          <p className="update"> {t.update} </p>
          <img className="diagram_img" src={oxygenFlowChart} alt="Oxygen generator diagram"/>
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
            <img className="booster-compressor-flowchart-img" src={flowchart} alt="Full oxygen generator troubleshooting flowchart."/>
        </div>
    </div>
    );
  };

  export default App;
