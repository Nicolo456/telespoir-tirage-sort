import {run_homeScreen, quit_homeScreen} from "./home_screen.js";
import {run_wheel,change_wheel_name} from "./wheel.js";
import { quit_result } from "./result.js";
import anime from '../../node_modules/animejs/lib/anime.es.js';

let state = document.querySelector('#state')
state.value = "homeScreen";
run_homeScreen();

let bouton_start = document.querySelector("#btnStart");
let home_screen = document.querySelector(".homeScreen");

const songs = [{path: "../sounds/MiiChannel.mp3", time_drop: 32.5},{path: "../sounds/9bis9.mp3", time_drop: 22.5}, {path: "../sounds/Danza Kuduro.mp3", time_drop: 39}, {path: "../sounds/GuajiraGuantanamera.mp3", time_drop: 38},  {path: "../sounds/resiste.mp3", time_drop: 23}, {path: "../sounds/Turn Down for What.mp3", time_drop: 20.5}, {path: "../sounds/thunder.mp3", time_drop: 30}] // time to start in seconds for knowing at what time to start the song
let songs_id = 0

// Ajout d'un gestionnaire d'événement au clic sur le bouton
bouton_start.addEventListener("click", function() {
    if (state.value == "homeScreen") {
        state.value = "wheel";
        quit_homeScreen();
        run_wheel();
    }
    songs_id = pick_song(songs, songs_id, home_screen);

});

let bouton_relauch = document.querySelector(".resultContainer #winner #btnContinue");
bouton_relauch.addEventListener("click", function() {
    if (state.value == "result") {
        quit_result();
        change_wheel_name();
        state.value = "wheel";
        songs_id = pick_song(songs, songs_id, home_screen);
    }
});

var sleepSetTimeout_ctrl;
export function sleep(ms) {
    clearInterval(sleepSetTimeout_ctrl);
    return new Promise(resolve => sleepSetTimeout_ctrl = setTimeout(resolve, ms));
}

function pick_song(songs, songs_id, parent_element) {
    // delete previous audio if any
    if (parent_element.querySelector("audio")) {
        parent_element.querySelector("audio").remove();
    }
    // create new audio element
    let audio = document.createElement("audio");
    audio.id = 'song';
    audio.preload = "auto";
    parent_element.appendChild(audio);
    audio.src = songs[songs_id].path;
    songs_id = (songs_id + 1) % songs.length;
    return songs_id;
}

export function get_time_drop() {
    return songs[(((songs_id - 1) % songs.length) + songs.length) % songs.length].time_drop;
}