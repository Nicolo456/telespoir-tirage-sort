import {run_homeScreen, quit_homeScreen} from "./home_screen.js";
import {run_wheel,change_wheel_name} from "./wheel.js";
import { quit_result } from "./result.js";
import {data_songs} from "data_songs";

let state = document.querySelector('#state')
state.value = "homeScreen";
run_homeScreen();

let bouton_start = document.querySelector("#btnStart");
let home_screen = document.querySelector(".homeScreen");

data_songs.forEach((song) => {
    song.path = `../public/sounds/${song.name}.mp3`;
})
let songs_id = 0;

// Ajout d'un gestionnaire d'événement au clic sur le bouton
bouton_start.addEventListener("click", function() {
    if (state.value == "homeScreen") {
        state.value = "wheel";
        quit_homeScreen();
        run_wheel();
    }
    songs_id = pick_song(data_songs, songs_id, home_screen);

});

let bouton_relauch = document.querySelector(".resultContainer #winner #btnContinue");
bouton_relauch.addEventListener("click", function() {
    if (state.value == "result") {
        quit_result();
        change_wheel_name();
        state.value = "wheel";
        songs_id = pick_song(data_songs, songs_id, home_screen);
    }
});

var sleepSetTimeout_ctrl;
export function sleep(ms) {
    clearInterval(sleepSetTimeout_ctrl);
    return new Promise(resolve => sleepSetTimeout_ctrl = setTimeout(resolve, ms));
}

function pick_song(data_songs, songs_id, parent_element) {
    // delete previous audio if any
    if (parent_element.querySelector("audio")) {
        parent_element.querySelector("audio").remove();
    }
    // create new audio element
    let audio = document.createElement("audio");
    audio.id = 'song';
    audio.preload = "auto";
    parent_element.appendChild(audio);
    audio.src = data_songs[songs_id].path;
    songs_id = (songs_id + 1) % data_songs.length;
    return songs_id;
}

export function get_time_drop() {
    return data_songs[(((songs_id - 1) % data_songs.length) + data_songs.length) % data_songs.length].time_drop;
}