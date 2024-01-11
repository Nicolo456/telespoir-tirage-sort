const audio = document.getElementById('crabRave');
function playMusic() {
  audio.play();
}
function pauseMusic() {
  audio.pause();
}

// Mise en place du JS
var state = "homeScreen";
run_hs();

// Récupération du bouton par son ID
var bouton = document.querySelector("#start");

// Ajout d'un gestionnaire d'événement au clic sur le bouton
bouton.addEventListener("click", function() {
    switch (state) {
        case "homeScreen":
            state = "wheel";
            run_wheel();
        case "wheel":
            state = "result";
    }
});
