import { data_participants } from "data_participants";
import { show_result } from "./result.js";
import { get_time_drop, sleep } from "./script.js";
import anime from 'animejs';
import { removeBehavior } from "settings";

let state = document.querySelector('#state')
let current_participants = get_participants(data_participants)

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
    let spin_speed =  0;
    let current_angle = 0;
    let predec_angle = 0;

    spinBtn.onclick = function() {
        console.log("essaye de tourner la roue")
        if (canSpin) {
            canSpin = false; // result le remet opérationnel
            const duration = 20000; // durée de l'animation en millisecondes
            spinValue += Math.ceil(6500 + ((Math.random()) * 1080));

            // On joue la musique
            let audio = document.querySelector("#song");
            audio.currentTime = get_time_drop() - duration/1000;
            audio.volume = 0;
            audio.play();
            fadeIn(4000, audio);

            anime({
            translateZ: 0,
            targets: "#wheel",
            rotate: `${spinValue}deg`,
            duration: duration, // durée de l'animation en millisecondes
            easing: 'cubicBezier(0.250, -0.135, 0.395, 1.085)',
            complete: function(anim) {
                winner = get_winner(spinValue, nb_slots);
                current_participants = handle_remove_participants(current_participants, winner);
                canSpin = true;
                state.value = "result";
                console.log(winner);
                show_result(winner);
                sleep(6000).then(() => {
                    fadeOut(2000, audio)
                });
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



    make_wheel_slot(current_participants,rapport_utilisation_angle, nb_slots);

    var basicTimeline = anime.timeline();

    // Mise en place initiale
    basicTimeline.add({
        duration: 0,
        targets: ".wheelContainer",
        top: `${(heightViewport*rapport_utilisation_angle - wheelContainer_height/2)}px`,
        left: `${(widthViewport- wheelContainer_width)/2}px`,
        rotate: '0deg',
        spinValue: 0,
        endDelay: 1000,
    }).add({ // Animation d'arrivé
        begin: function(anim) {
            wheelContainer.style.display = "flex";
        },
        targets: ".wheelContainer",
        translateY: [`${heightViewport}px`,'0'],
        duration: 2000, // durée de l'animation en millisecondes
        easing: 'easeOutElastic(0.5, 1)',
        complete: function(anim) {
            canSpin = true;
        }
     });
}

function fadeOut(fadeDuration = 2000, audio) {
    const interval = 50; // Interval in milliseconds
    const step = (audio.volume / (fadeDuration / interval)); // Calculate step size

    const fadeAudio = setInterval(() => {
        if (audio.volume > 0) {
            audio.volume = Math.max(0, audio.volume - step); // Decrease volume
        } else {
            clearInterval(fadeAudio); // Stop interval when volume is zero
        }
    }, interval);
}

function fadeIn(fadeDuration = 3000, audio) {
    const interval = 50; // Interval in milliseconds
    const step = ((1-audio.volume) / (fadeDuration / interval)); // Calculate step size

    const fadeAudio = setInterval(() => {
        if (audio.volume < 1) {
            audio.volume = Math.min(1, audio.volume + step); // Increase volume
        } else {
            clearInterval(fadeAudio); // Stop interval when volume is zero
        }
    }, interval);
}

function get_current_abs_angle(element) {
    // Get the current transform value
    const transform = window.getComputedStyle(element).transform;

    if (transform !== 'none') {
        const values = transform.match(/matrix\(([^)]+)\)/)[1].split(', ');
        const a = parseFloat(values[0]);
        const b = parseFloat(values[1]);

        // Calculate the current rotation angle in degrees
        const angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
        return Math.abs(angle)
    } else {
        return 0;
    }   
}
function get_angle_speed(current_angle, previous_angle) {
    const angle_speed = Math.abs(current_angle - previous_angle);
    return angle_speed;
}

function get_winner(value, nb_slots) {
    const angle_per_slot = (360 / nb_slots);
    const i_winner = 32+Math.floor(((-value+45+angle_per_slot/2) % 360) / angle_per_slot); // Ca tourne à l'envers (trigo), de base décalé dans le sens trigo de 45+angle_per_slot/2
    const winner_span = document.querySelector(".wheelContainer #wheel .slot:nth-child(" + (i_winner + 1) + ") span");
    return winner_span.innerText;
}

function make_wheel_slot(current_participants, rapport_utilisation_angle, nb_slots) {
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
        text.innerHTML = current_participants[Math.floor(Math.random() * current_participants.length)];
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

function get_participants(data_participants) {
    let res = []
    data_participants.forEach(data_participant => {
        for (let i = 0; i < data_participant.times; i++) {
            res.push(data_participant.name);
        }
    });
    return res;
}

function handle_remove_participants(current_participants, winner) {
    if (removeBehavior == "no-remove") {
        console.log("[INFO]: removeBehavior is set to no-remove, the winner can win multiple times")
        return current_participants;
    } else if (removeBehavior == "remove-all") {
        current_participants = remove_participants(current_participants, winner, true) // Permet de retirer le vainqueur pour pas qu'il gagne plusieurs fois, si remove_participants est True alors on enlève tous ces tickets.
        console.log("[INFO]: removeBehavior is set to remove-all, the winner can win only once, all his tickets are removed")
        return current_participants;
    } else if (removeBehavior == "remove-one") {
        current_participants = remove_participants(current_participants, winner, false) // Permet de retirer le vainqueur pour pas qu'il gagne plusieurs fois, si remove_participants est True alors on enlève tous ces tickets.
        console.log("[INFO]: removeBehavior is set to remove-one, the winner can win for each ticket he buyed")
        return current_participants;
    } else {
        console.log("[WARNING]: removeBehavior is not set, the winner can win multiple times. Please set it to 'no-remove', 'remove-all' or 'remove-one'")
        return current_participants;
    }
}

function remove_participants(current_participants, participant2remove, remove_duplicate=true) {
    if (remove_duplicate) {
        return current_participants.filter(participant => participant !== participant2remove);
    } else {
        const index = current_participants.indexOf(participant2remove);
        if (index > -1) {
            current_participants.splice(index, 1);
        }
        return current_participants;
    }
}

export function change_wheel_name() {
    let texts = document.querySelectorAll(".wheelContainer #wheel .slot span");
    for (let i = 0; i < texts.length; i++) {
        texts[i].innerHTML = current_participants[Math.floor(Math.random() * current_participants.length)];
    }
}