import {run_homeScreen, quit_homeScreen} from "./page_home_screen.js";
import {show_wheel,change_wheel_name} from "./page_wheel.js";
import { quit_result } from "./page_result.js";
import {data_songs} from "data_songs";
import {pick_song} from "./music_handler.js";

let state = document.querySelector('#state')
state.value = "homeScreen";
run_homeScreen();

let bouton_start = document.querySelector("#btnStart");
let home_screen = document.querySelector(".homeScreen");

data_songs.forEach((song) => {
    song.path = `../public/sounds/${song.name}.mp3`;
})
export let songs_id = 0;

// Ajout d'un gestionnaire d'événement au clic sur le bouton
bouton_start.addEventListener("click", function() {
    quit_homeScreen_handler();
});

let bouton_relauch = document.querySelector(".resultContainer #winner #btnContinue");
bouton_relauch.addEventListener("click", function() {
    quit_result_handler()
});

document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        event.preventDefault(); // Empêche le scroll
        quit_result_handler();
        quit_homeScreen_handler();
    }
});

function quit_result_handler() {
    if (state.value == "result") {
        state.value = "transition";
        quit_result();
        change_wheel_name();
        setTimeout(() => {
            songs_id = pick_song(data_songs, songs_id, home_screen);
        }, 2000);
    }
}

function quit_homeScreen_handler() {
    if (state.value == "homeScreen") {
        state.value = "transition";
        quit_homeScreen();
        show_wheel();
        songs_id = pick_song(data_songs, songs_id, home_screen);
    }
}