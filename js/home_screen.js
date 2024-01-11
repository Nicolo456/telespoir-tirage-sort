import {confetti_homeScreen} from "./confetti.js";

export function run_homeScreen() {
    confetti_homeScreen()
}

export function quit_homeScreen() {
    const continue_top = document.querySelector('.continue').getBoundingClientRect().top;
    // Utilisation d'Anime.js pour animer le positionnement
    anime({
    delay: 200,
    targets: ['h1', '#logo'],
    translateY: -500,
    duration: 2000, // durée de l'animation en millisecondes
    easing: 'easeInOutQuad', // fonction d'interpolation pour l'animation
    opacity: 0
    });
    anime({
        delay: 200,
        targets: '.continue',
        duration: 2000,
        top: continue_top-500,
        opacity: 0,
        easing: 'easeInOutQuad'
    });
}


// // Exemple d'utilisation simple pour animer un élément HTML avec Anime.js
// const element = document.querySelector('#description'); // Sélectionnez votre élément

// tl.add({
//     targets: element,
//     translateY: 0, // Exemple de propriété à animer
// });