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
        message: "There is a capacity OR demand problem. \nHas any new equipment been installed?",
        options: [
            {label: "No", next:"temporary_shut_off"},
            {label: "Yes", next: "capacity_problem"},
        ],
    },
    capacity_problem: {
        message: "There is a capacity problem.",
        options: [
            {label: "Return to menu", next:"exit"},
        ],
    },
    temporary_shut_off: {
        message: "Temporarily shut off any new equipment. \nHas the issue been resolved?",
        options: [
            {label: "No", next:"demand_problem"},
            {label: "Yes", next: "replace_inlet_oil"},
        ],
    },
    replace_inlet_oil: {
        message: "Replace inlet oil, oil, and oil filter. \nHas the issue been resolved?",
        options: [
            {label: "No", next:"compressed_air_leaks"},
            {label: "Yes", next: "end"},
        ],
    },
    compressed_air_leaks: {
        message: "Fix all compressed air leaks. \nHas the issue been resolved?",
        options: [
            {label: "No", next:"exit"},
            {label: "Yes", next:"end"},
        ],
    },
    demand_problem: {
        message: "There is a demand problem.",
        options: [
            {label: "Return to menu", next:"end"},
        ],
    },

    //** FLOWCHART 5 ** (4.5.3)
    oil: {
        message: "Was the separator last changed more than 6,000 hours ago?",
        options: [
            {label: "No", next: "oil_changed_recently"},
            {label: "Yes", next: "replace_separator "},
        ],
    },
    replace_separator: {
        message: "Replace the separator and change the oil. \nHas the issue been resolved?",
        options: [
            {label: "No", next: "oil_changed_recently"},
            {label: "Yes", next: "end"},
        ],
    },
    oil_changed_recently: {
        message: "Was te oil recently changed or topped out?",
        options: [
            {label: "No", next: "open_separator_vessel"},
            {label: "Yes", next: "same_oil"},
        ],
    },
    same_oil: {
        message: "Was the same type of oil used?",
        options: [
            {label: "No", next: "correct_oil"},
            {label: "Yes", next: "oil_overfilled"},
        ],
    },
    oil_overfilled: {
        message: "Was the oil over-filled?",
        options: [
            {label: "No", next: "exit"}, // CHECK THIS
            {label: "Yes", next: "drain_some_oil"},
        ],
    },
    drain_some_oil: {
        message: "Drain some oil and wait a few days. \nHas the issue been resolved?", // CHECK THIS
        options: [
            {label: "No", next: "exit"},
            {label: "Yes", next: "end"},
        ],
    },
    correct_oil: {
        message: "Was the correct oil type used?",
        options: [
            {label: "No", next: "drain_all_oil"},
            {label: "Yes", next: "old_oil_drained"},
        ],
    },
    drain_all_oil: {
        message: "Drain all of the oil and flush with correct new oil. \nHas the issue been resolved?",
        options: [
            {label: "No", next: "exit"},
            {label: "Yes", next: "end"},
        ],
    },
    old_oil_drained: {
        message: "Was old oil drained thoroughly and machine flushed",
        options: [
            {label: "No", next: "drain_all_oil"},
            {label: "Yes", next: "open_separator_vessel"},
        ],
    },
    open_separator_vessel: {
        message: "Check the separator. Is it ok?",
        options: [
            {label: "No", next: "replace_separator"},
            {label: "Yes", next: "check_scavenge_line"},
        ],
    },
    replace_separator: {
        message: "Replace the separator, oil, and oil filter. \nHas the issue been resolved?",
        options: [
            {label: "No", next: "exit"},
            {label: "Yes", next: "end"},
        ],
    },
    check_scavenge_line: {
        message: "Check the scavenge line and pipe. Are they ok?",
        options: [
            {label: "No", next: "fix_scavenge_line"},
            {label: "Yes", next: "check_min_pressure_valve"},
        ],
    },
    fix_scavenge_line: {
        message: "Fix problems with the scavenge line and pipe. \nHas the issue been resolved?",
        options: [
            {label: "No", next: "exit"},
            {label: "Yes", next: "end"},
        ],
    },
    check_min_pressure_valve: {
        message: "Check the minimum pressure valve. Is it ok?",
        options: [
            {label: "No/Not sure", next: "overhaul_min_pressure_valve"},
            {label: "Yes", next: "compressor_high_temp"},
        ],
    },
    overhaul_min_pressure_valve: {
        message: "Overhaul the minimum pressure valve. \nHas the issue been resolved?",
        options: [
            {label: "No", next: "exit"},
            {label: "Yes", next: "end"},
        ],
    },
    compressor_high_temp: {
        message: "Is the compressor running at high temperatures?",
        options: [
            {label: "No", next: "compressor_start_stop"},
            {label: "Yes", next: "lower_ambient_temp"},
        ],
    },
    lower_ambient_temp: {
        message: "Try to lower ambient temperature. Install ducting. \nHas the issue been resolved?",
        options: [
            {label: "No", next: "exit"},
            {label: "Yes", next: "end"},
        ],
    },
    compressor_start_stop: {
        message: "Is the compressor starting and stopping according to instructions?",
        options: [
            {label: "No", next: "exit"},
            {label: "Yes", next: "correct_start_stop"},
        ],
    },
    correct_start_stop: {
        message: "Use the correct procedures for starting and starting the compressor. \nHas the issue been resolved?",
        options: [
            {label: "No", next: "exit"},
            {label: "Yes", next: "end"},
        ],
    },

    //** FLOWCHART 6 ** (4.6.3)
    water: {
        message: "Check all condensate traps. How are they?",
        options: [
            {label: "Bad", next: "clean_replace_traps"},
            {label: "Good", next: "have_compressed_air_dryer"},
        ],
    },
    clean_replace_traps: {
        message: "Clean/replace bad condensate traps. \nHas the issue been resolved",
        options: [
            {label: "No", next: "have_compressed_air_dryer"},
            {label: "Yes", next: "end"},
        ],
    },
    have_compressed_air_dryer: {
        message: "Do you have a compressed air dryer?",
        options: [
            {label: "No", next: "aftercooler_clean"},
            {label: "Yes", next: "air_dryer_type"},
        ],
    },
    air_dryer_type: {
        message: "Check correct function and dewpoint. \nIs it ok?",
        options: [
            {label: "No", next: "solve_air_dryer_problems"},
            {label: "Yes", next: "exit"},
        ],
    },
    solve_air_dryer_problems: {
        message: "Solve problems with the air dryer. \nHas the issue been resolved?",
        options: [
            {label: "No", next: "aftercooler_clean"},
            {label: "Yes", next: "end"},
        ],
    },
    aftercooler_clean: {
        message: "Is the aftercooler clean?",
        options: [
            {label: "No", next: "clean_aftercooler"},
            {label: "Yes", next: "compressor_room_ok"},
        ],
    },
    clean_aftercooler: {
        message: "Clean the aftercooler. \nHas the issue been resolved?",
        options: [
            {label: "No", next: "compressor_room_ok"},
            {label: "Yes", next: "end"},
        ],
    },
    compressor_room_ok: {
        message: "Seems like everything is ok in the compressor room. \nDoes your compressed air piping run outdoors?",
        options: [
            {label: "No", next: "exit"},
            {label: "Yes", next: "cold_days"},
        ],
    },
    cold_days: {
        message: "On cold days, water condensate can form in pipes. \nHas the issue been resolved?", // CHECK THIS
        options: [
            {label: "No", next: "exit"},
            {label: "Yes", next: "end"},
        ],
    },

    //** FLOWCHART 7  (4.7.3)
    oil_inlet_valve: {
        message: "Is the stopping procedure correct?",
        options: [
            {label: "No", next: "stop_compressor_right"},
            {label: "Yes", next: "inlet_valve_ok"},
        ],
    },
    stop_compressor_right: {
        message: "Stop the compressor in the right way. \nHas the issue been resolved?",
        options: [
            {label: "No", next: "inlet_valve_ok"},
            {label: "Yes", next: "end"},
        ],
    },
    inlet_valve_ok: {
        message: "Is the inlet valve ok?",
        options: [
            {label: "No", next: "overhaul_inlet_valve"},
            {label: "Yes", next: "check_valve_oil"},
        ],
    },
    overhaul_inlet_valve: {
        message: "Overhaul the inlet valve. \nHas the issue been resolved?",
        options: [
            {label: "No", next: "check_valve_oil"},
            {label: "Yes", next: "end"},
        ],
    },
    check_valve_oil: {
        message: "Check valve and oil stop valve. Are they ok?",
        options: [
            {label: "No", next: "overhaul_valves"},
            {label: "Yes", next: "oil_overfilled"},
        ],
    },
    overhaul_valves: {
        message: "Overhaul valves. \nHas the issue been resolved?",
        options: [
            {label: "No", next: "oil_overfilled"},
            {label: "Yes", next: "end"},
        ],
    },
    oil_overfilled: {
        message: "Is the oil overfilled?",
        options: [
            {label: "No", next: "compressor_run_unloaded"},
            {label: "Yes", next: "drain_some_oil_7"},
        ],
    },
    drain_some_oil_7: {
        message: "Drain some oil. \nHas the issue been resolved?",
        options: [
            {label: "No", next: "compressor_run_unloaded"},
            {label: "Yes", next: "end"},
        ],
    },
    compressor_run_unloaded: {
        message: "Is the compressor run unloaded before stopping?",
        options: [
            {label: "No", next: "check_fault"},
            {label: "Yes", next: "exit"},
        ],
    },
    check_fault: {
        message: "Check for fault in controlled/electronics. \nHas the issue been resolved?", //CHECK THIS
        options: [
            {label: "No", next: "exit"},
            {label: "Yes", next: "end"},
        ],
    },

    //** FLOWCHART 8 (4.8.3)
    wont_load: {
        message: "Are the setpoints set correctly?",
        options: [
            {label: "No", next: "adjust_setpoints"},
            {label: "Yes", next: "pressure_switch_ok"},
        ],
    },
    adjust_setpoints: {
        message: "Adjust the setpoints. \nHas the issue been resolved?",
        options: [
            {label: "No", next: "pressure_switch_ok"},
            {label: "Yes", next: "end"},
        ],
    },
    pressure_switch_ok: {
        message: "Is the pressure switch/sensor ok?",
        options: [
            {label: "No", next: "replace_pressure_switch"},
            {label: "Yes", next: "indicate_loaded"},
        ],
    },
    replace_pressure_switch: {
        message: "Replace the pressure switch/sensor. \nHas the issue been resolved?",
        options: [
            {label: "No", next: "indicate_loaded"},
            {label: "Yes", next: "end"},
        ],
    },
    indicate_loaded: {
        message: "Is there a 'loaded' indication on the display?",
        options: [
            {label: "No", next: "compressor_need_load"},
            {label: "Yes", next: "check_electrical_signal"},
        ],
    },
    compressor_need_load: {
        message: "Compressor doesn't 'think' it needs to load. Check controller, pressure switch, and/or electrical system. \nHas the issue been resolved?",
        options: [
            {label: "No", next: "check_electrical_signal"},
            {label: "Yes", next: "end"},
        ],
    },
    check_electrical_signal: {
        message: "Check electrical signal to loading solenoid; fix problems. \nHas the issue been resolved?",
        options: [
            {label: "No", next: "check_solenoid_valve"},
            {label: "Yes", next: "end"},
        ],
    },
    check_solenoid_valve: {
        message: "Check the solenoid valve; fix problems. \nHas the issue been resolved?",
        options: [
            {label: "No", next: "check_inlet_valve"},
            {label: "Yes", next: "end"},
        ],
    },
    check_inlet_valve: {
        message: "Check the inlet valve; fix problems. \nHas the issue been resolved?",
        options: [
            {label: "No", next: "exit"},
            {label: "Yes", next: "end"},
        ],
    },

    //** FLOWCHART 9 **
    trips_overload: {
        message: "Does overload happening during startup or running?",
        options: [
            {label: "Startup", next: "startup"},
            {label: "Running", next: "running"},
        ],
    },
    running: {
        message: "Check voltage on all phases during running. Is it low or normal?",
        options: [
            {label: "Low", next: "fix_electrical_supply"},
            {label: "Normal", next: "check_current"},
        ],
    },
    fix_electrical_supply: {
        message: "Fix problems with electrical supply. \nHas the issue been resolved?",
        options: [
            {label: "No", next: "startup"},
            {label: "Yes", next: "end"},
        ],
    },
    check_current: {
        message: "Check current during running. Is it normal or high?",
        options: [
            {label: "Normal", next: "replace_overload"},
            {label: "High ", next: "screw_element_ok"},
        ],
    },
    replace_overload: {
        message: "Replace overload relay/thermal block. \nHas the issue been resolved?",
        options: [
            {label: "No", next: "startup"},
            {label: "Yes", next: "end"},
        ],
    },
    screw_element_ok: {
        message: "Is the screw element ok?",
        options: [
            {label: "No", next: "overhaul_screw_element"},
            {label: "Yes", next: "check_dp_separator"},
        ],
    },
    overhaul_screw_element: {
        message: "Overhaul screw element (consult manufacturer).",
        options: [
            {label: "Return to menu", next: "exit"},
        ],
    },
    check_dp_separator: {
        message: "Check dP separator. \nIs it normal or high?",
        options: [
            {label: "Normal", next: "check_unloading_setpoint"},
            {label: "Yes", next: "replace_separator_filter"},
        ],
    },
    replace_separator_filter: {
        message: "Replace separator filter. \nHas the issue been resolved?",
        options: [
            {label: "No", next: "startup"},
            {label: "Yes", next: "end"},
        ],
    },
    check_unloading_setpoint: {
        message: "Check the unloading set point. \nIs it normal or high?",
        options: [
            {label: "Normal", next: "check_motor"},
            {label: "Too high", next: "lower_unloading_setpoint"},
        ],
    },
    lower_unloading_setpoint: {
        message: "Lower the unloading (max pressure) setpoint. \nHas the issue been resolved?",
        options: [
            {label: "No", next: "startup"},
            {label: "Yes", next: "end"},
        ],
    },
    check_motor: {
        message: "Check the motor. \nIs it ok?",
        options: [
            {label: "No", next: "exit"},
            {label: "Yes", next: "lower_unloading_setpoint"},
        ],
    },
    startup: {
        message: "Check the voltage on all phases during startup. \nIs it low or normal?",
        options: [
            {label: "Low", next: "fix_electrical_supply_problems"},
            {label: "Normal", next: "screw_element_ok_startup"},
        ],
    },
    fix_electrical_supply_problems: {
        message: "Fix problems with electrical supply. \nHas the issue been resolved?",
        options: [
            {label: "No", next: "screw_element_ok_startup"},
            {label: "Yes", next: "end"},
        ],
    },
    screw_element_ok_startup: {
        message: "Is the screw element ok?",
        options: [
            {label: "No", next: "overhaul_screw_element"},
            {label: "Yes", next: "screw_element_oil"},
        ],
    },
    screw_element_oil: {
        message: "Is the screw element flooded with oil?",
        options: [
            {label: "No", next: "replace_overload"},
            {label: "Yes", next: "overhaul_oil_stop_valve"},
        ],
    },
    overhaul_oil_stop_valve: {
        message: "Overhaul oil stop valve and check valve. \nHas the issue been resolved?",
        options: [
            {label: "No", next: "replace_overload"},
            {label: "Yes", next: "end"},
        ],
    },
    replace_overload: {
        message: "Replace overload relay/thermal block. \nHas the issue been resolved?",
        options: [
            {label: "No", next: "exit"},
            {label: "Yes", next: "end"},
        ],
    },

    // : {
    //     message: "",
    //     options: [
    //         {label: "No", next: ""},
    //         {label: "Yes", next: ""},
    //     ],
    // },

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
