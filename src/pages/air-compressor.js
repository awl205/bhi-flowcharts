import React, { useRef, useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { flowchartTranslations } from '../AirCompressorTranslations';
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
            label, next: ["wont_start", "high_temp", "low_pressure_point", "low_pressure_room", "oil", "water", "oil_inlet_valve", "wont_load", "trips_overload"][index],
        })),
        externalLink: {
        url: "https://bhioxygen.org/request-support/",
        label: "Other"
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

    // ***** FLOWCHART 1 ***** (4.1.3)
    wont_start: {
        message: t.wont_start_message,
        options: [
            {label: t.no, next: "fix_electrical_supply"},
            {label: t.yes, next: "indication_screen"},
        ],
    },
    indication_screen: {
        message: t.indication_screen_message,
        options: [
            {label: t.no, next: "checks"},
            {label: t.yes, next: "error_panel"},
        ],
    },
    checks: {
        message: t.checks_message,
        options: [
            {label: t.no, next: "error_panel"},
            {label: t.yes, next: "end"},
        ],
    },
    error_panel: {
        message: t.error_panel_message,
        options: [
            {label: t.no, next: "press_start"},
            {label: t.yes, next: "fix_errors"},
        ],
    },
    fix_errors: {
        message: t.fix_errors_message,
        options: [
            {label: t.no, next: "press_start"},
            {label: t.yes, next: "end"},
        ],
    },
    press_start: {
        message: t.press_start_message,
        options: [
            {label: t.nothing_option, next: "check_main_contactors"},
            {label: t.motor_tries_option, next: "check_backpressure"},
        ],
    },
    check_backpressure: {
        message: t.check_backpressure_message,
        options: [
            {label: t.no, next: "oil_flood"},
            {label: t.yes, next: "overhaul_min_valve"},
        ],
    },
    overhaul_min_valve: {
        message: t.overhaul_min_valve_message,
        options: [
            {label: t.no, next: "oil_flood"},
            {label: t.yes, next: "end"},
        ],
    },
    oil_flood: {
        message: t.oil_flood_message,
        options: [
            {label: t.no, next: "screw_stuck"},
            {label: t.yes, next: "overhaul_oil"},
        ],
    },
    overhaul_oil: {
        message: t.overhaul_oil_message, // fix this??
        options: [
            {label: t.no, next: "screw_stuck"},
            {label: t.yes, next: "end"},
        ],
    },
    screw_stuck: {
        message: t.screw_stuck_message,
        options: [
            {label: t.no, next: "check_motor_winding"},
            {label: t.yes, next: "overhaul_screw"},
        ],
    },
    check_motor_winding: {
        message: t.check_motor_winding_message,
        options: [
            {label: t.no, next: ""},
            {label: t.yes, next: "exit"},
        ],
    },
    motor_rewinding: {
        message: t.motor_rewinding_message,
        options: [
            {label: t.ok, next: "exit"},
        ],
    },
    check_main_contactors: {
        message: t.check_main_contactors_message,
        options: [
            {label: t.no, next: "fix_main_contactors"},
            {label: t.yes, next: "check_motor_turn"},
        ],
    },
    fix_main_contactors: {
        message: t.fix_main_contactors_message,
        options: [
            {label: t.no, next: "check_motor_turn"},
            {label: t.yes, next: "end"},
        ],
    },
    check_motor_turn: {
        message: t.check_motor_turn_message,
        options: [
            {label: t.motor_running_option, next: "fix_coupling"},
            {label: t.nothing_happens_option, next: "power_motor"},
        ],
    },
    power_motor: {
        message: t.power_motor_message,
        options: [
            {label: t.no, next: "exit"},
            {label: t.yes, next: "overhaul_screw"},
        ],
    },
    overhaul_screw: {
        message: t.overhaul_screw_message,
        options: [
            {label: t.no, next: "exit"},
            {label: t.yes, next: "end"},
        ],
    },
    fix_coupling: {
        message: t.fix_coupling_message,
        options: [
            {label: t.no, next: "exit"},
            {label: t.yes, next: "end"},
        ],
    },
    fix_electrical_supply: {
        message: t.fix_electrical_supply_message,
        options: [
            {label: t.no, next: "indication_screen"},
            {label: t.yes, next: "end"},
        ],
    },
    // ***** FLOWCHART 2 ***** (4.2.3)
    high_temp: {
        message: t.high_temp_message,
        options: [
            {label: t.no, next: "fill_oil"},
            {label: t.yes, next: "check_oil_cooler"},
        ],
    },
    fill_oil: {
        message: t.fill_oil_message,
        options: [
            {label: t.no, next: "check_oil_cooler"},
            {label: t.yes, next: "end"},
        ],
    },
    check_oil_cooler: {
        message: t.check_oil_cooler_message,
        options: [
            {label: t.no, next: "clean_oil_cooler"},
            {label: t.yes, next: "check_airflow"},
        ],
    },
    clean_oil_cooler: {
        message: t.clean_oil_cooler_message,
        options: [
            {label: t.no, next: "check_airflow"},
            {label: t.yes, next: "end"},
        ],
    },
    check_airflow: {
        message: t.check_airflow_message,
        options: [
            {label: t.no, next: "fix_problems"},
            {label: t.yes, next: "check_temp"},
        ],
    },
    fix_problems: {
        message: t.fix_problems_message,
        options: [
            {label: t.no, next: "check_temp"},
            {label: t.yes, next: "end"},
        ],
    },
    check_temp: {
        message: t.check_temp_message,
        options: [
            {label: "Cool", next: "check_thermostat"},
            {label: "Hot", next: "room_temp"},
        ],
    },
    check_thermostat: {
        message: t.check_thermostat_message,
        options: [
            {label: t.no, next: "room_temp"},
            {label: t.yes, next: "end"},
        ],
    },
    room_temp: {
        message: t.room_temp_message,
        options: [
            {label: "Hot", next: "lower_ambient_temp"},
            {label: "Normal", next: "inside_oil_cooler"},
        ],
    },
    lower_ambient_temp: {
        message: t.lower_ambient_temp_message,
        options: [
            {label: t.no, next: "inside_oil_cooler"},
            {label: t.yes, next: "end"},
        ],
    },
    inside_oil_cooler: {
        message: t.inside_oil_cooler_message,
        options: [
            {label: t.no, next: "clean_inside"}, // FIX THIS???
            {label: t.yes, next: "check_screw"},
        ],
    },
    clean_inside: {
        message: t.clean_inside_message, // FIX THIS??
        options: [
            {label: t.no, next: "check_screw"},
            {label: t.yes, next: "end"},
        ],
    },
    check_screw: {
        message: t.check_screw_message, // FIX THIS??
        options: [
            {label: t.no, next: "overhaul_screw"},
            {label: t.yes, next: "exit"},
        ],
    },
    // ***** FLOWCHART 3 ***** (4.3.2)
    low_pressure_point: {
        message: t.low_pressure_point_message,
        options: [
            {label: "Low", next: "low_pressure_room_3"},
            {label: "Good", next: "pressure_drop"},
        ],
    },
    low_pressure_room_3: {
        message: t.low_pressure_room_3_message,
        options: [
            {label: t.no, next: "exit"},
            {label: t.yes, next: "end"},
        ],
    },
    pressure_drop: {
        message: t.pressure_drop_message,
        options: [
            {label: t.no, next: "fix_replace"},
            {label: t.yes, next: "new_equip"},
        ],
    },
    fix_replace: {
        message: t.fix_replace_message,
        options: [
            {label: t.no, next: "new_equip"},
            {label: t.yes, next: "end"},
        ],
    },
    new_equip: {
        message: t.new_equip_message,
        options: [
            {label: t.no, next: "install_pressure_sensor"},
            {label: t.yes, next: "temporary_off"},
        ],
    },
    temporary_off: {
        message: t.temporary_off_message,
        options: [
            {label: t.no, next: "install_pressure_sensor"},
            {label: t.yes, next: "low_capacity"},
        ],
    },
    install_pressure_sensor: {
        message: t.install_pressure_sensor_message,
        options: [
            {label: t.no, next: "exit"},
            {label: t.yes, next: "fix_problem_increase"},
        ],
    },
    low_capacity: {
        message: t.low_capacity_message,
        options: [
            {label: t.ok, next: "fix_problem_increase"},
        ],
    },
    fix_problem_increase: {
        message: t.fix_problem_increase_message,
        options: [
            {label: t.no, next: "exit"},
            {label: t.yes, next: "end"},
        ],
    },

    //** FLOWCHART 4 ** (4.4.3)
    low_pressure_room: {
        message: t.low_pressure_room_message,
        options: [
            {label: t.high_good_option, next: "blockage"},
            {label: t.low_same_option, next: "single_mult_compressors"},
        ],
    },
    blockage: {
        message: t.blockage_message,
        options: [
            {label: t.no, next: "exit"},
            {label: t.yes, next: "end"},
        ],
    },
    single_mult_compressors: {
        message: t.single_mult_compressors_message,
        options: [
            {label: t.single_option, next:"single_compressor"},
            {label: t.multiple_option, next: "multiple_compressors"},
        ],
    },
    multiple_compressors: {
        message: t.multiple_compressors_message,
        options: [
            {label: t.yes, next:"capacity_demand_problem"},
            {label: t.no, next: "single_compressor"},
        ],
    },
    single_compressor: {
        message: t.single_compressor_message, // TODO
        options: [
            {label: t.no, next:"adjust_setpoints"},
            {label: t.yes, next: "compressor_loads"},
        ],
    },
    adjust_setpoints: {
        message: t.adjust_setpoints_message,
        options: [
            {label: t.no, next:"exit"},
            {label: t.yes, next: "end"},
        ],
    },
    compressor_loads: {
        message: t.compressor_loads_message,
        options: [
            {label: t.no, next:"compressor_loading_problem"},
            {label: t.yes, next: "capacity_demand_problem"},
        ],
    },
    compressor_loading_problem: {
        message: t.compressor_loading_problem_message,
        options: [
            {label: "Troubleshoot compressor loading", next:"wont_load"},
        ],
    },
    capacity_demand_problem: {
        message: t.capacity_demand_problem_message,
        options: [
            {label: t.no, next:"temporary_shut_off"},
            {label: t.yes, next: "capacity_problem"},
        ],
    },
    capacity_problem: {
        message: t.capacity_problem_message,
        options: [
            {label: t.return_to_menu, next:"exit"},
        ],
    },
    temporary_shut_off: {
        message: t.temporary_shut_off_message,
        options: [
            {label: t.no, next:"demand_problem"},
            {label: t.yes, next: "replace_inlet_oil"},
        ],
    },
    replace_inlet_oil: {
        message: t.replace_inlet_oil_message,
        options: [
            {label: t.no, next:"compressed_air_leaks"},
            {label: t.yes, next: "end"},
        ],
    },
    compressed_air_leaks: {
        message: t.compressed_air_leaks_message,
        options: [
            {label: t.no, next:"exit"},
            {label: t.yes, next:"end"},
        ],
    },
    demand_problem: {
        message: t.demand_problem_message,
        options: [
            {label: t.return_to_menu, next:"end"},
        ],
    },

    //** FLOWCHART 5 ** (4.5.3)
    oil: {
        message: t.oil_message,
        options: [
            {label: t.no, next: "oil_changed_recently"},
            {label: t.yes, next: "replace_separator_5 "},
        ],
    },
    replace_separator_5: {
        message: t.replace_separator_5_message,
        options: [
            {label: t.no, next: "oil_changed_recently"},
            {label: t.yes, next: "end"},
        ],
    },
    oil_changed_recently: {
        message: t.oil_changed_recently_message,
        options: [
            {label: t.no, next: "open_separator_vessel"},
            {label: t.yes, next: "same_oil"},
        ],
    },
    same_oil: {
        message: t.same_oil_message,
        options: [
            {label: t.no, next: "correct_oil"},
            {label: t.yes, next: "oil_overfilled"},
        ],
    },
    oil_overfilled: {
        message: t.oil_overfilled_message,
        options: [
            {label: t.no, next: "exit"}, // CHECK THIS
            {label: t.yes, next: "drain_some_oil"},
        ],
    },
    drain_some_oil: {
        message: t.drain_some_oil_message, // CHECK THIS
        options: [
            {label: t.no, next: "exit"},
            {label: t.yes, next: "end"},
        ],
    },
    correct_oil: {
        message: t.correct_oil_message,
        options: [
            {label: t.no, next: "drain_all_oil"},
            {label: t.yes, next: "old_oil_drained"},
        ],
    },
    drain_all_oil: {
        message: t.drain_all_oil_message,
        options: [
            {label: t.no, next: "exit"},
            {label: t.yes, next: "end"},
        ],
    },
    old_oil_drained: {
        message: t.old_oil_drained_message,
        options: [
            {label: t.no, next: "drain_all_oil"},
            {label: t.yes, next: "open_separator_vessel"},
        ],
    },
    open_separator_vessel: {
        message: t.open_separator_vessel_message,
        options: [
            {label: t.no, next: "replace_separator"},
            {label: t.yes, next: "check_scavenge_line"},
        ],
    },
    replace_separator: {
        message: t.replace_separator_message,
        options: [
            {label: t.no, next: "exit"},
            {label: t.yes, next: "end"},
        ],
    },
    check_scavenge_line: {
        message: t.check_scavenge_line_message,
        options: [
            {label: t.no, next: "fix_scavenge_line"},
            {label: t.yes, next: "check_min_pressure_valve"},
        ],
    },
    fix_scavenge_line: {
        message: t.fix_scavenge_line_message,
        options: [
            {label: t.no, next: "exit"},
            {label: t.yes, next: "end"},
        ],
    },
    check_min_pressure_valve: {
        message: t.check_min_pressure_valve_message,
        options: [
            {label: t.not_sure_option, next: "overhaul_min_pressure_valve"},
            {label: t.yes, next: "compressor_high_temp"},
        ],
    },
    overhaul_min_pressure_valve: {
        message: t.overhaul_min_pressure_valve_message,
        options: [
            {label: t.no, next: "exit"},
            {label: t.yes, next: "end"},
        ],
    },
    compressor_high_temp: {
        message: t.compressor_high_temp_message,
        options: [
            {label: t.no, next: "compressor_start_stop"},
            {label: t.yes, next: "lower_ambient_temp_5"},
        ],
    },
    lower_ambient_temp_5: {
        message: t.lower_ambient_temp_5_message,
        options: [
            {label: t.no, next: "exit"},
            {label: t.yes, next: "end"},
        ],
    },
    compressor_start_stop: {
        message: t.compressor_start_stop_message,
        options: [
            {label: t.no, next: "exit"},
            {label: t.yes, next: "correct_start_stop"},
        ],
    },
    correct_start_stop: {
        message: t.correct_start_stop_message,
        options: [
            {label: t.no, next: "exit"},
            {label: t.yes, next: "end"},
        ],
    },

    //** FLOWCHART 6 ** (4.6.3)
    water: {
        message: t.water_message,
        options: [
            {label: t.bad, next: "clean_replace_traps"},
            {label: t.good, next: "have_compressed_air_dryer"},
        ],
    },
    clean_replace_traps: {
        message: t.clean_replace_traps_message,
        options: [
            {label: t.no, next: "have_compressed_air_dryer"},
            {label: t.yes, next: "end"},
        ],
    },
    have_compressed_air_dryer: {
        message: t.have_compressed_air_dryer_message,
        options: [
            {label: t.no, next: "aftercooler_clean"},
            {label: t.yes, next: "air_dryer_type"},
        ],
    },
    air_dryer_type: {
        message: t.air_dryer_type_message,
        options: [
            {label: t.no, next: "solve_air_dryer_problems"},
            {label: t.yes, next: "exit"},
        ],
    },
    solve_air_dryer_problems: {
        message: t.solve_air_dryer_problems_message,
        options: [
            {label: t.no, next: "aftercooler_clean"},
            {label: t.yes, next: "end"},
        ],
    },
    aftercooler_clean: {
        message: t.aftercooler_clean_message,
        options: [
            {label: t.no, next: "clean_aftercooler"},
            {label: t.yes, next: "compressor_room_ok"},
        ],
    },
    clean_aftercooler: {
        message: t.clean_aftercooler_message,
        options: [
            {label: t.no, next: "compressor_room_ok"},
            {label: t.yes, next: "end"},
        ],
    },
    compressor_room_ok: {
        message: t.compressor_room_ok_message,
        options: [
            {label: t.no, next: "exit"},
            {label: t.yes, next: "cold_days"},
        ],
    },
    cold_days: {
        message: t.cold_days_message, // CHECK THIS
        options: [
            {label: t.no, next: "exit"},
            {label: t.yes, next: "end"},
        ],
    },

    //** FLOWCHART 7  (4.7.3)
    oil_inlet_valve: {
        message: t.oil_inlet_valve_message,
        options: [
            {label: t.no, next: "stop_compressor_right"},
            {label: t.yes, next: "inlet_valve_ok"},
        ],
    },
    stop_compressor_right: {
        message: t.stop_compressor_right_message,
        options: [
            {label: t.no, next: "inlet_valve_ok"},
            {label: t.yes, next: "end"},
        ],
    },
    inlet_valve_ok: {
        message: t.inlet_valve_ok_message,
        options: [
            {label: t.no, next: "overhaul_inlet_valve"},
            {label: t.yes, next: "check_valve_oil"},
        ],
    },
    overhaul_inlet_valve: {
        message: t.overhaul_inlet_valve_message,
        options: [
            {label: t.no, next: "check_valve_oil"},
            {label: t.yes, next: "end"},
        ],
    },
    check_valve_oil: {
        message: t.check_valve_oil_message,
        options: [
            {label: t.no, next: "overhaul_valves"},
            {label: t.yes, next: "oil_overfilled_7"},
        ],
    },
    overhaul_valves: {
        message: t.overhaul_valves_message,
        options: [
            {label: t.no, next: "oil_overfilled"},
            {label: t.yes, next: "end"},
        ],
    },
    oil_overfilled_7: {
        message: t.oil_overfilled_7_message,
        options: [
            {label: t.no, next: "compressor_run_unloaded"},
            {label: t.yes, next: "drain_some_oil_7"},
        ],
    },
    drain_some_oil_7: {
        message: t.drain_some_oil_7_message,
        options: [
            {label: t.no, next: "compressor_run_unloaded"},
            {label: t.yes, next: "end"},
        ],
    },
    compressor_run_unloaded: {
        message: t.compressor_run_unloaded_message,
        options: [
            {label: t.no, next: "check_fault"},
            {label: t.yes, next: "exit"},
        ],
    },
    check_fault: {
        message: t.check_fault_message, //CHECK THIS
        options: [
            {label: t.no, next: "exit"},
            {label: t.yes, next: "end"},
        ],
    },

    //** FLOWCHART 8 (4.8.3)
    wont_load: {
        message: t.wont_load_message,
        options: [
            {label: t.no, next: "adjust_setpoints_8"},
            {label: t.yes, next: "pressure_switch_ok"},
        ],
    },
    adjust_setpoints_8: {
        message: t.adjust_setpoints_8_message,
        options: [
            {label: t.no, next: "pressure_switch_ok"},
            {label: t.yes, next: "end"},
        ],
    },
    pressure_switch_ok: {
        message: t.pressure_switch_ok_message,
        options: [
            {label: t.no, next: "replace_pressure_switch"},
            {label: t.yes, next: "indicate_loaded"},
        ],
    },
    replace_pressure_switch: {
        message: t.replace_pressure_switch_message,
        options: [
            {label: t.no, next: "indicate_loaded"},
            {label: t.yes, next: "end"},
        ],
    },
    indicate_loaded: {
        message: t.indicate_loaded_message,
        options: [
            {label: t.no, next: "compressor_need_load"},
            {label: t.yes, next: "check_electrical_signal"},
        ],
    },
    compressor_need_load: {
        message: t.compressor_need_load_message,
        options: [
            {label: t.no, next: "check_electrical_signal"},
            {label: t.yes, next: "end"},
        ],
    },
    check_electrical_signal: {
        message: t.check_electrical_signal_message,
        options: [
            {label: t.no, next: "check_solenoid_valve"},
            {label: t.yes, next: "end"},
        ],
    },
    check_solenoid_valve: {
        message: t.check_solenoid_valve_message,
        options: [
            {label: t.no, next: "check_inlet_valve"},
            {label: t.yes, next: "end"},
        ],
    },
    check_inlet_valve: {
        message: t.check_inlet_valve_message,
        options: [
            {label: t.no, next: "exit"},
            {label: t.yes, next: "end"},
        ],
    },

    //** FLOWCHART 9 **
    trips_overload: {
        message: t.trips_overload_message,
        options: [
            {label: t.startup_option, next: "startup"},
            {label: t.running_option, next: "running"},
        ],
    },
    running: {
        message: t.running_message,
        options: [
            {label: t.low_option, next: "fix_electrical_supply_9"},
            {label: t.normal_option, next: "check_current"},
        ],
    },
    fix_electrical_supply_9: {
        message: t.fix_electrical_supply_9_message,
        options: [
            {label: t.no, next: "startup"},
            {label: t.yes, next: "end"},
        ],
    },
    check_current: {
        message: t.check_current_message,
        options: [
            {label: t.normal_option, next: "replace_overload_9"},
            {label: t.high_option, next: "screw_element_ok"},
        ],
    },
    replace_overload_9: {
        message: t.replace_overload_9_message,
        options: [
            {label: t.no, next: "startup"},
            {label: t.yes, next: "end"},
        ],
    },
    screw_element_ok: {
        message: t.screw_element_ok_message,
        options: [
            {label: t.no, next: "overhaul_screw_element"},
            {label: t.yes, next: "check_dp_separator"},
        ],
    },
    overhaul_screw_element: {
        message: t.overhaul_screw_element_message,
        options: [
            {label: "Return to menu", next: "exit"},
        ],
    },
    check_dp_separator: {
        message: t.check_dp_separator_message,
        options: [
            {label: t.normal_option, next: "check_unloading_setpoint"},
            {label: t.high_option, next: "replace_separator_filter"},
        ],
    },
    replace_separator_filter: {
        message: t.replace_separator_filter_message,
        options: [
            {label: t.no, next: "startup"},
            {label: t.yes, next: "end"},
        ],
    },
    check_unloading_setpoint: {
        message: t.check_unloading_setpoint_message,
        options: [
            {label: t.normal_option, next: "check_motor"},
            {label: t.high_option, next: "lower_unloading_setpoint"},
        ],
    },
    lower_unloading_setpoint: {
        message: t.lower_unloading_setpoint_message,
        options: [
            {label: t.no, next: "startup"},
            {label: t.yes, next: "end"},
        ],
    },
    check_motor: {
        message: t.check_motor_message,
        options: [
            {label: t.no, next: "exit"},
            {label: t.yes, next: "lower_unloading_setpoint"},
        ],
    },
    startup: {
        message: t.startup_message,
        options: [
            {label: t.low_option, next: "fix_electrical_supply_problems"},
            {label: t.normal_option, next: "screw_element_ok_startup"},
        ],
    },
    fix_electrical_supply_problems: {
        message: t.fix_electrical_supply_problems_message,
        options: [
            {label: t.no, next: "screw_element_ok_startup"},
            {label: t.yes, next: "end"},
        ],
    },
    screw_element_ok_startup: {
        message: t.screw_element_ok_startup_message,
        options: [
            {label: t.no, next: "overhaul_screw_element"},
            {label: t.yes, next: "screw_element_oil"},
        ],
    },
    screw_element_oil: {
        message: t.screw_element_oil_message,
        options: [
            {label: t.no, next: "replace_overload"},
            {label: t.yes, next: "overhaul_oil_stop_valve"},
        ],
    },
    overhaul_oil_stop_valve: {
        message: t.overhaul_oil_stop_valve_message,
        options: [
            {label: t.no, next: "replace_overload"},
            {label: t.yes, next: "end"},
        ],
    },
    replace_overload: {
        message: t.replace_overload_message,
        options: [
            {label: t.no, next: "exit"},
            {label: t.yes, next: "end"},
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
        <h1 className="title"> {t.title} </h1>
        <p className="update"> {t.update} </p>
        <img className="diagram_img" src={diagram} alt="Air compressor diagram"/>
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
            {showHistory ? t.show_history : t.view_history}
        </button>

        <button onClick={downloadHistory} className = "bottom-buttons">
            {t.download_history}
        </button>
        </div>
    </div>

    <p className="flowchart-subtitle"> {t.complete_flowchart} </p>
    <div className="flowchart" ref={flowchartRef}>
        <img className="air-compressor-flowchart-img" src={flowchart} alt="Full air compressor troubleshooting flowchart."/>
    </div>
</div>
);
};

export default App;
