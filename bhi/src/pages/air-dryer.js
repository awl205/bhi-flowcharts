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
            { label: (<>Excess water in the line <br/>(in coalescing filters or bottom of air tank)</>), next: "excess_water" },
            { label: (<>High PDP <br/> (6{'\u00b0'} C or see manual for limit)</>), next: "heat_exchangers" },
            { label: (<>PDP sensor error </>), next: "sensor_power"},
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

        // ***** FLOWCHART 1/2 *****
        excess_water: {
            message: "Test the condensate drain. Is it working?",
            options: [
                {label: 'No', next: 'valve_light'},
                {label: 'Yes', next: 'heat_exchangers'}
            ],
        },
        heat_exchangers: {
            message: "Are the heat exchangers (radiators) dirty?",
            options: [
                {label: 'No', next: 'radiator_fan'},
                {label: 'Yes', next: 'clean_heat_exchangers'}
            ],
        },
        clean_heat_exchangers: {
            message: "Clean dust and debris off heat exchangers. \nHas the issue been resolved?",
            options: [
                {label: 'No', next: 'radiator_fan'},
                {label: 'Yes', next: 'end'}
            ],
        },
        radiator_fan: {
            message: "Is the radiator fan running?",
            options: [
                {label: 'No', next: 'voltage_fan'},
                {label: 'Yes', next: 'refrigerant_compressor'}
            ],
        },
        refrigerant_compressor: {
            message: "Is the refrigerant compressor running?",
            options: [
                {label: 'No', next: 'refrigerant_power'},
                {label: 'Yes', next: 'sensor_resistance'}
            ],
        },
        sensor_resistance: {
            message: "Check sensor resistance and continuity. Is it functioning as expected?",
            options: [
                {label: 'No', next: 'replace_sensor'},
                {label: 'Yes', next: 'hvac_specialist'}
            ],
        },
        replace_sensor: {
            message: "Replace sensor. \nHas the issue been resolved?",
            options: [
                {label: 'No', next: 'hvac_specialist'},
                {label: 'Yes', next: 'end'}
            ],
        },
        hvac_specialist: {
            message: "Hire an HVAC specialist to replace or recharge the refrigerant \nand repair any possible leaks. \nHas the issue been resolved?",
            options: [
                {label: 'No', next: 'replace_dryer'},
                {label: 'Yes', next: 'end'}
            ],
        },
        refrigerant_power: {
            message: "Is the refrigerant compressor getting power?",
            options: [
                {label: 'No', next: 'troubleshoot_upstream'},
                {label: 'Yes', next: 'replace_dryer'}
            ],
        },
        troubleshoot_upstream: {
            message: "Troubleshoot upstream electrical components. \nHas the issue been resolved?",
            options: [
                {label: 'No', next: 'exit'},
                {label: 'Yes', next: 'end'}
            ],
        },
        replace_dryer: {
            message: "Replace the dryer. \nHas the issue been resolved?",
            options: [
                {label: 'No', next: 'exit'},
                {label: 'Yes', next: 'end'}
            ],
        },
        voltage_fan: {
            message: "Is there voltage to the fan?",
            options: [
                {label: 'No', next: 'troubleshoot_power_problem'},
                {label: 'Yes', next: 'replace_radiator_fan'}
            ],
        },
        replace_radiator_fan: {
            message: "Replace the radiator fan. \nHas the issue been resolved?",
            options: [
                {label: 'No', next: 'exit'},
                {label: 'Yes', next: 'end'}
            ],
        },
        troubleshoot_power_problem: {
            message: "Troubleshoot power problem. \nHas the issue been resolved?",
            options: [
                {label: 'No', next: 'exit'},
                {label: 'Yes', next: 'end'}
            ],
        },

        valve_light: {
            message: "Is the light on the valve on?",
            options: [
                {label: 'No', next: 'wiring_continuity'},
                {label: 'Yes', next: 'replace_valve'}
            ]
        },
        replace_valve: {
            message: "Replace valve. \nHas the issue been resolved?",
            options: [
                {label: 'No', next: 'wiring_continuity'},
                {label: 'Yes', next: 'end'}
            ]
        },
        wiring_continuity: {
            message: "Check continuity of wiring. \nHas the issue been resolved?",
            options: [
                {label: 'No', next: 'replace_electrical_valve'},
                {label: 'Yes', next: 'end'}
            ]
        },
        replace_electrical_valve: {
            message: "Replace the electrical part of the valve. \nHas the issue been resolved?",
            options: [
                {label: 'No', next: 'exit'},
                {label: 'Yes', next: 'end'}
            ]
        },

        // ***** FLOWCHART 3 *****
        sensor_power: {
            message: "Is the sensor receiving power?",
            options: [
                {label: 'No', next: 'reconnect_sensor'},
                {label: 'Yes', next: 'replace_sensor3'}
            ]
        },
        reconnect_sensor: {
            message: "Reconnect the sensor. \nHas the issue been resolved?",
            options: [
                {label: 'No', next: 'replace_sensor3'},
                {label: 'Yes', next: 'end'}
            ]
        },
        replace_sensor3: {
            message: "Replace the sensor. \nHas the issue been resolved?",
            options: [
                {label: 'No', next: 'exit'},
                {label: 'Yes', next: 'end'}
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
          <h1 className="title">Air Dryer (Refrigerant) Troubleshooting</h1>
          <p className="update"> Last updated: Jan 2025 </p>
          <img className="diagram_img" src={diagram} alt="Oxygen generator diagram"/>
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
            <img className="air-dryer-flowchart-img" src={flowchart} alt="Full oxygen generator troubleshooting flowchart."/>
        </div>
    </div>
    );
  };

  export default App;
