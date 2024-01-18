import {confetti_wheel} from "./confetti.js";
import { participants } from "../data.js";
import { show_result } from "./result.js";

// EXPLANATION

// On fait toujours une roue avec 32 emplacements
// Pour chaque emplacement on prend un participant au hasard dans la liste des participants
// Lorsque ca s'arrète on selectionne le participant et on l'affiche

export function run_wheel() {
    let wheelContainer = document.querySelector(".wheelContainer");
    let wheel = document.querySelector(".wheelContainer #wheel");
    let spinBtn = document.querySelector(".wheelContainer #spinBtn");
    let spinValue = 0;
    let canSpin = false;
    let winner;
    const nb_slots = 32;
    let rotation_pos = {'pred':0, 'actual':0};

    spinBtn.onclick = function() {
        console.log("essaye de tourner la roue")
        if (canSpin) {
            canSpin = false; // result le remet opérationnel
            spinValue += Math.ceil(1000 + ((Math.random()-0.2) * 720));

            anime({
            targets: "#wheel",
            rotate: `${spinValue}deg`,

            duration: 10000, // durée de l'animation en millisecondes
            easing: 'cubicBezier(0.250, -0.135, 0.395, 1.085)',
            update: function(anim) {
                // Obtenir la matrice de transformation
                var style = window.getComputedStyle(wheel);
                var transformMatrix = style.getPropertyValue('transform');

                // Extraire la rotation de la matrice
                var values = transformMatrix.split('(')[1].split(')')[0].split(',');
                var rotation = Math.round(Math.atan2(values[1], values[0]) * (180/Math.PI));

                rotation_pos.pred = rotation_pos.actual;
                rotation_pos.actual = rotation;
                confetti_wheel(rotation_pos.actual - rotation_pos.pred);
            },
            complete: function(anim) {
                winner = get_winner(spinValue, nb_slots);
                canSpin = true;
                console.log(winner);
                show_result(winner);
            }
            });
        }
    }

    // Mise en place du wheelContainer
    const rapport_utilisation_angle = 0.92;
    const heightViewport = window.innerHeight;
    const widthViewport = window.innerWidth;
    const wheelContainer_height = 0.80 * widthViewport;
    const wheelContainer_width = 0.80 * widthViewport;

    make_wheel_slot(participants,rapport_utilisation_angle, nb_slots);

    var basicTimeline = anime.timeline();

    // Mise en place initiale
    basicTimeline.add({
        duration: 0,
        targets: ".wheelContainer",
        top: `${(heightViewport*rapport_utilisation_angle - wheelContainer_height/2)}px`,
        left: `${(widthViewport- wheelContainer_width)/2}px`,
        rotate: '0deg',
        spinValue: 0,
        complete: function(anim) {
            wheelContainer.style.display = "flex";
        }
    }).add({ // Animation d'arrivé
        delay: 1000,
        targets: ".wheelContainer",
        translateY: [`${heightViewport}px`,'0'],
        duration: 2000, // durée de l'animation en millisecondes
        easing: 'easeOutElastic(0.5, 1)',
        complete: function(anim) {
            canSpin = true;
        }
     });
}

function get_winner(value, nb_slots) {
    const angle_per_slot = (360 / nb_slots);
    const i_winner = 32+Math.floor(((-value+45+angle_per_slot/2) % 360) / angle_per_slot); // Ca tourne à l'envers (trigo), de base décalé dans le sens trigo de 45+angle_per_slot/2
    const winner_span = document.querySelector(".wheelContainer #wheel .slot:nth-child(" + (i_winner + 1) + ") span");
    return winner_span.innerText;
}

function make_wheel_slot(participant, rapport_utilisation_angle, nb_slots) {
    const slot_angle = calc_angle(nb_slots) * 180 / Math.PI; // slot angle in degree
    const colors = ['#db7093', '#20b2aa', '#d63e92', '#daa520' , '#dd340f',' #ff7f50' , '#3cb351' , '#4169e1']
    //colors = ['#349218','#62b62d','#273071','#d0cfcd','#7f93b6','#a5a4a0','#ffffff']
    //colors = ["#F55251", "#F58C51", "#F46D50","#F551AF","#F5A851","#517FF5","#616775"]

    // Construct the slots
    let wheel = document.querySelector(".wheelContainer #wheel");
    let slot;
    let text;
    for (let i = 0; i < nb_slots; i++) {
        slot = document.createElement("div");
        slot.classList.add("slot");
        slot.style.transform = `rotate(${slot_angle * i}deg)`;
        slot.style.clipPath = `polygon(0 0, ${calc_clip_path(nb_slots, rapport_utilisation_angle)}% 0, 100% 100%, 0 ${calc_clip_path(nb_slots, rapport_utilisation_angle)}%)`;
        const clr = colors[i % colors.length];
        slot.style.background = `${clr}`;

        text = document.createElement("span");
        text.innerHTML = participant[Math.floor(Math.random() * participant.length)]; // A modifier pour aléatoire
        slot.appendChild(text);

        // ajout dans le DOM
        wheel.appendChild(slot);
    }
}

function calc_clip_path(nb_slots, rapport_utilisation_angle){
    
    return (1 - Math.tan(Math.PI/4 - calc_angle(nb_slots)*rapport_utilisation_angle/2)) * 100;
}

function calc_angle(nb_slots) {
    return 2* Math.PI/nb_slots;
}