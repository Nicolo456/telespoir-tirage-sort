import {run_homeScreen, quit_homeScreen} from "./home_screen.js";
import {run_wheel} from "./wheel.js";
import { quit_result } from "./result.js";

export let state = "homeScreen";
run_homeScreen();

let bouton_start = document.querySelector("#btnStart");

// Ajout d'un gestionnaire d'événement au clic sur le bouton
bouton_start.addEventListener("click", function() {
    state = "wheel";
    quit_homeScreen();
    run_wheel();});

let bouton_relauch = document.querySelector(".resultContainer .winner #btnContinue");
bouton_relauch.addEventListener("click", function() {quit_result();});