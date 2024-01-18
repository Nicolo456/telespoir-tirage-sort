import {run_homeScreen, quit_homeScreen} from "./home_screen.js";
import {run_wheel} from "./wheel.js";
import { quit_result } from "./result.js";

let state = document.querySelector('#state')
state.value = "homeScreen";
run_homeScreen();

let bouton_start = document.querySelector("#btnStart");

// Ajout d'un gestionnaire d'événement au clic sur le bouton
bouton_start.addEventListener("click", function() {
    if (state.value == "homeScreen") {
        state.value = "wheel";
        quit_homeScreen();
        run_wheel();
    }
});

let bouton_relauch = document.querySelector(".resultContainer #winner #btnContinue");
bouton_relauch.addEventListener("click", function() {
    if (state.value == "result") {
        quit_result();
        state.value = "wheel";
    }
});

var sleepSetTimeout_ctrl;
export function sleep(ms) {
    clearInterval(sleepSetTimeout_ctrl);
    return new Promise(resolve => sleepSetTimeout_ctrl = setTimeout(resolve, ms));
}