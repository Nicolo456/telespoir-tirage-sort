import {confetti_homeScreen} from "./confetti.js";

export function run_homeScreen() {
    confetti_homeScreen()
}

export function quit_homeScreen() {
    anime({
        delay: 200,
        targets: ".homeScreen",
        translateY: -700,
        duration: 1000, // durée de l'animation en millisecondes
        easing: 'easeInQuad', // fonction d'interpolation pour l'animation
        opacity: 0,
        complete: function(anim) {
            document.querySelector('.homeScreen').style.display = 'none';
        }
    })

}