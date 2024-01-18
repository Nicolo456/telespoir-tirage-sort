import {run_homeScreen, quit_homeScreen} from "./home_screen.js";
import {run_wheel} from "./wheel.js";
import { quit_result } from "./result.js";

export let state = "homeScreen";
run_homeScreen();

var bouton = document.querySelector("#btnStart");
var textResult = document.querySelector(".resultContainer #winner");

function changeState() {
    switch (state) {
        case "homeScreen":
            state = "wheel";
            quit_homeScreen();
            run_wheel();
            break;
        case "wheel":
            quit_result();
    }
}
// Ajout d'un gestionnaire d'événement au clic sur le bouton
bouton.addEventListener("click", function() {changeState();});
textResult.addEventListener("click", function() {changeState();});