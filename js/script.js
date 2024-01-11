import {run_homeScreen, quit_homeScreen} from "./home_screen.js";
import {run_wheel} from "./wheel.js";

export let state = "homeScreen";
run_homeScreen();

var bouton = document.querySelector("#start");
// Ajout d'un gestionnaire d'événement au clic sur le bouton
bouton.addEventListener("click", function() {
    switch (state) {
        case "homeScreen":
            state = "wheel";
            quit_homeScreen();
            run_wheel();
        case "wheel":
            state = "result";
    }
});
