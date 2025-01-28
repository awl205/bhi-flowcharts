import React, { useRef, useState } from 'react';
import "./equip.css";
import flowchart from "./assets/Oxygen Generator Troubleshooting Flow Chart.png";

  const oxygenFlowChart = "https://i0.wp.com/bhioxygen.org/wp-content/uploads/2023/09/PSA-plant-components-1.png?w=808&ssl=1"

  const App = () => {
    const flowChartLogic = {
        start: {
          message: "What issue are you facing?",
          options: [
            { label: (<>Shutdown due to high temperature <br/> (Rix 2V3B and Bailan) </>), next: "shutdown_high_temp" },
            { label: "Loud Metallic Knocking", next: "metallic_knocking" },
            { label: "Booster will not produce \nfinal discharge pressure", next: "no_final_discharge_pressure"},
            { label: "Low Interstage Pressures", next: "low_interstage_pressures"},
            { label: "High Interstage Pressures", next: "high_interstage_pressures"}
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
          message: "Sorry we were not able to resolve your issue. \nPlease contact __ for more information",
          options: [
              {label: "Return to menu", next: "start"},
          ]
        },


        // ***** FLOWCHART 1 *****
        shutdown_high_temp: {
            message: "Is the cooling fan inoperative or in reverse rotation?",
            options: [
                {label: 'No', next: 'sufficient_ventilation'},
                {label: 'Yes', next: 'reconnect_cooling_fan'},
            ],
        },
        reconnect_cooling_fan: {
            message: "Reconnect or replace cooling fan. \nHas the issue been resolved?",
            options: [
                {label: 'No', next: 'sufficient_ventilation'},
                {label: 'Yes', next: 'end'},
            ],
        },
        sufficient_ventilation: {
            message: "Is there sufficient ventilation around the compressor cooling fins?",
            options: [
                {label: 'No', next: 'clean_cooling_fan'},
                {label: 'Yes', next: 'interstage_pressures_expected'},
            ],
        },
        clean_cooling_fan: {
            message: "Clean the cooling fans and fins. Has the issue been resolved?",
            options: [
                {label: 'No', next: 'interstage_pressures_expected'},
                {label: 'Yes', next: 'end'},
            ],
        },
        interstage_pressures_expected: {
            message: "Are the interstage pressures as expected?",
            options: [
                {label: 'No', next: 'insufficient_piston_clearance'},
                {label: 'Yes', next: 'verify_temperature'},
            ],
        },
        insufficient_piston_clearance: {
            message: "Is there insufficient piston clearance?",
            options: [
                {label: 'No', next: 'exit'}, // fix this???
                {label: 'Yes', next: 'measure_piston_clearance'},
            ],
        },
        measure_piston_clearance: {
            message: "Measure and adjust piston clearance. \nHas the issue been resolved?",
            options: [
                {label: 'No', next: 'exit'}, // fix this???
                {label: 'Yes', next: 'end'},
            ],
        },
        verify_temperature: {
            message: "Verify the temperature with a high temperature sensor. \nDo the temperatures match?",
            options: [
                {label: 'No', next: 'replace_temp_sensor'},
                {label: 'Yes', next: 'check_temp_sensor'},
            ],
        },
        replace_temp_sensor: {
            message: "Replace the temperature sensor. \nHas the issue been resolved?",
            options: [
                {label: 'No', next: 'exit'},
                {label: 'Yes', next: 'end'},
            ],
        },
        check_temp_sensor: {
            message: "Check the temperature sensor connections. \nHas the issue been resolved?",
            options: [
                {label: 'No', next: 'replace_temp_sensor'},
                {label: 'Yes', next: 'end'},
            ],
        },

        // **** FLOWCHART 2 *****
        metallic_knocking: {
            message: "Identify which stage the knocking is coming from. \nIs the noise coming from the final stage?",
            options: [
                {label: 'No', next: 'measure_piston_clearance'},
                {label: 'Yes', next: 'final_stage_pressure'},
            ],
        },
        final_stage_pressure: {
            message: "Is the final stage pressure greater than or equal to the back pressure regulator threshold (Rix only)?",
            options: [
                {label: 'No', next: 'measure_piston_clearance'},
                {label: 'Yes', next: 'adjust_back_pressure_regulator'},
            ],
        },
        adjust_back_pressure_regulator: {
            message: "Adjust or replace the back pressure regulator. \nHas the issue been resolved?",
            options: [
                {label: 'No', next: 'exit'},
                {label: 'Yes', next: 'end'},
            ],
        },

        // **** FLOWCHART 3 *****
        no_final_discharge_pressure: {
            message: "Are there any leaks in the downstream piping or manifolds?",
            options: [
                {label: 'No', next: 'piston_rings_worn'},
                {label: 'Yes', next: 'repair_leak'},
            ],
        },
        repair_leak: {
            message: "Repair leak. Has the issue been resolved?",
            options: [
                {label: 'No', next: 'exit'},
                {label: 'Yes', next: 'end'},
            ],
        },
        piston_rings_worn: {
            message: "Are the piston rings in the final stage worn?",
            options: [
                {label: 'No', next: 'exit'}, // fix this???
                {label: 'Yes', next: 'replace_rings'},
            ],
        },
        replace_rings: {
            message: "Replace the rings. Has the issue been resolved?",
            options: [
                {label: 'No', next: 'exit'}, // fix this???
                {label: 'Yes', next: 'end'},
            ],
        },

        // **** FLOWCHART 4 ****
        low_interstage_pressures: {
            message: "Is the inlet (suction) pressure high enough?",
            options: [
                {label: 'No', next: 'sufficient_oxygen_supply'},
                {label: 'Yes', next: 'restricted_flow'},
            ],
        },
        restricted_flow: {
            message: "Is there restricted flow through the inlet filter or section piping?",
            options: [
                {label: 'No', next: 'leaking_piping'},
                {label: 'Yes', next: 'replace_filter'},
            ],
        },
        leaking_piping: {
            message: "Is there leaking through the piping?",
            options: [
                {label: 'No', next: 'valve_assembled'},
                {label: 'Yes', next: 'repair_leak_4'},
            ],
        },
        repair_leak_4: {
            message: "Repair leak. \nHas the issue been resolved?",
            options: [
                {label: 'No', next: 'valve_assembled'},
                {label: 'Yes', next: 'end'},
            ],
        },
        valve_assembled: {
            message: "Is the valve assembled correctly?",
            options: [
                {label: 'No', next: 'reassemble_valve'},
                {label: 'Yes', next: 'compression_rings_worn'},
            ],
        },
        compression_rings_worn: {
            message: "Are the compression rings worn?",
            options: [
                {label: 'No', next: 'excessive_head_clearance_4'},
                {label: 'Yes', next: 'replace_compression_rings'},
            ],
        },
        excessive_head_clearance_4: {
            message: "Is there excessive head clearance on the interstage cycle?",
            options: [
                {label: 'No', next: 'exit'},
                {label: 'Yes', next: 'realign_piston'},
            ],
        },
        realign_piston: {
            message: "Realign piston. \nHas the issue been resolved?",
            options: [
                {label: 'No', next: 'exit'},
                {label: 'Yes', next: 'end'},
            ],
        },
        replace_compression_rings: {
            message: "Replace compression rings and backing rings. \nHas the issue been resolved?",
            options: [
                {label: 'No', next: 'excessive_head_clearance_4'},
                {label: 'Yes', next: 'end'},
            ],
        },
        reassemble_valve: {
            message: "Reassemble the valve; replace valves and o-rings if necessary. \nHas the issue been resolved?",
            options: [
                {label: 'No', next: 'compression_rings_worn'},
                {label: 'Yes', next: 'end'},
            ],
        },
        replace_filter: {
            message: "Replace the filter or clear the blockages. \nHas the issue been resolved?",
            options: [
                {label: 'No', next: 'leaking_piping'},
                {label: 'Yes', next: 'end'},
            ],
        },
        sufficient_oxygen_supply: {
            message: "Is there sufficient oxygen supply in the O2 tank?",
            options: [
                {label: 'No', next: 'wait_o2_pressure_build'},
                {label: 'Yes', next: 'reset_inlet_switch'},
            ],
        },
        wait_o2_pressure_build: {
            message: "Wait for O2 pressure to build. \nHas the issue been resolved?",
            options: [
                {label: 'No', next: 'reset_inlet_switch'},
                {label: 'Yes', next: 'end'},
            ],
        },
        reset_inlet_switch: {
            message: "Reset inlet switch start/stop threshold. \nHas the issue been resolved?",
            options: [
                {label: 'No', next: 'exit'}, // fix this???
                {label: 'Yes', next: 'end'},
            ],
        },

        // **** FLOWCAHRT 5 ****
        high_interstage_pressures: {
            message: "Examine the valves in the following stage. Are they opening correctly?",
            options: [
                {label: 'No', next: 'replace_rebuild_valves'},
                {label: 'Yes', next: 'excessive_head_clearance'},
            ],
        },
        excessive_head_clearance: {
            message: "Is there excessive head clearance on the interstage cylinder?",
            options: [
                {label: 'No', next: 'pressure_gauge'},
                {label: 'Yes', next: 'adjust_headspace'},
            ],
        },
        pressure_gauge: {
            message: "Is the pressure gauge working?",
            options: [
                {label: 'No', next: 'replace_pressure_relief_valve'},
                {label: 'Yes', next: 'replace_gauge'},
            ],
        },
        replace_pressure_relief_valve: {
            message: "Replace pressure relief valve. \nHas the issue been resolved?",
            options: [
                {label: 'No', next: 'exit'},
                {label: 'Yes', next: 'end'},
            ],
        },
        replace_gauge: {
            message: "Replace the gauge. \nHas the issue been resolved?",
            options: [
                {label: 'No', next: 'replace_pressure_relief_valve'}, // fix this???
                {label: 'Yes', next: 'end'},
            ],
        },
        adjust_headspace: {
            message: "Adjust headspace. \nHas the issue been resolved?",
            options: [
                {label: 'No', next: 'pressure_gauge'},
                {label: 'Yes', next: 'end'},
            ],
        },
        replace_rebuild_valves: {
            message: "Replace or rebuild the valves. \nHas the issue been resolved?",
            options: [
                {label: 'No', next: 'exit'}, // fix this???
                {label: 'Yes', next: 'end'},
            ],
        },

      };

    const flowchartRef = useRef(null);
      const [currentStep, setCurrentStep] = useState("start");
      const [hasScrolled, setHasScrolled] = useState(false);
      const [history, setHistory] = useState([]);
      const [showHistory, setShowHistory] = useState("false");

      const scrollToSection = (section) => {
        if (!hasScrolled) {
          const positions = {
            shutdown_high_temp: {x: 0},
            metallic_knocking: {x: 0.2},
            no_final_discharge_pressure: {x: 0.43},
            low_interstage_pressures: {x: 0.65},
            high_interstage_pressures: {x: 1},
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
      };

      const goBack = () => {
        if(history.length > 0) {
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
          <h1 className="title">Booster Compressor Troubleshooting</h1>
          <p className="update"> Last updated: Jan 2025 </p>
          <img className="diagram_img" src={oxygenFlowChart} alt="Oxygen generator diagram"/>
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
            <img className="oxygen-generator-flowchart-img" src={flowchart} alt="Full oxygen generator troubleshooting flowchart."/>
        </div>
    </div>
    );
  };

  export default App;
