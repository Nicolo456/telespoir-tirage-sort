export function fadeOut(fadeDuration = 2000, audio) {
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

export function fadeIn(fadeDuration = 3000, audio) {
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

export function pick_song(data_songs, songs_id, parent_element) {
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

export function get_time_drop(data_songs, songs_id) {
    return data_songs[(((songs_id - 1) % data_songs.length) + data_songs.length) % data_songs.length].time_drop;
}