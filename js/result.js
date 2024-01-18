import { confetti_result } from "./confetti.js";

export function show_result(winnerName) {
    const nb_leafs = 60;
    const center = [window.innerWidth/2,window.innerHeight/2]
    let leaf;
    let size;

    document.querySelector('.resultContainer').style.display = 'flex';

    for (let i = 0; i < nb_leafs; i++) {
        leaf = document.createElement("img");
        leaf.src = 'images/tropical_leaf.png';

        // Obtenez la largeur et la hauteur de l'image
        var largeurImage = leaf.width;
        var hauteurImage = leaf.height;
        // Calculez le rapport entre la largeur et la hauteur
        var rapport =  hauteurImage/largeurImage;

        size = (Math.random()+Math.random()+1)*8;
        var angleLeaf = ((360*2/nb_leafs)*i-45)
        leaf.classList.add("leaf");
        leaf.style.top = `${center[1]*(1 - 0.9*(Math.random()+0.2)*Math.cos(angleLeaf))}px`;
        leaf.style.left = `${center[0] - (Math.random()+0.2)*600*Math.sin(angleLeaf)}px`; // Pour éloigner les feuilles
        leaf.style.transformOrigin = "center";
        leaf.style.transform = `translate(-${size/2}px,-${size*rapport/2}px) rotate(${angleLeaf}deg)`;
        leaf.style.zIndex = 200+Math.floor(Math.random()*4);
        leaf.style.opacity = 0;
        leaf.style.width = `0px`;
        leaf.style.height = `0px`;
        document.querySelector(".resultContainer #leafs").appendChild(leaf);

        anime({
            targets: leaf,
            opacity: [0,1],
            width: `${size}vw`,
            height: `${size*rapport}vw`,
            rotate: {value: `+=${(Math.random-0.5) *5}deg`, duration: 4000},
            duration: (Math.random()+Math.random()+2)*700, // durée de l'animation en millisecondes
            easing: 'easeOutQuad',
            delay: Math.random()*20 * i,
        });
    }
    confetti_result();

    let text = document.createElement("p");
    text.classList.add("resultText");
    text.innerHTML = `Le gagnant est ${winnerName}! <br> Bravo et merci!`;
    document.querySelector(".resultContainer #winner").appendChild(text);

    anime({
        targets: text,
        opacity: [0,1],
        translateY: [`-50px`,'0px'],
        duration: 1000, // durée de l'animation en millisecondes
        delay:1000,
        easing: 'easeOutQuad'
    })
}

export function quit_result() {
    var otherFinish = false;
    anime({
        targets: '.leaf',
        opacity: [1,0],
        width: '*=0.1',
        height: '*=0.1',
        rotate: {value: `+=${(Math.random-0.5) *5}deg`, duration: 4000},
        duration: (Math.random()+Math.random()+2)*700, // durée de l'animation en millisecondes
        easing: 'easeOutQuad',
        delay: anime.stagger(Math.random()*20),
        complete: function(anim) {
            document.querySelectorAll('.leaf').forEach(leaf => {leaf.remove()});
            if (otherFinish) {
                document.querySelector('.resultContainer').style.display = 'none';
                otherFinish = false; // Reset pour prochaine fois
            } else {
                otherFinish = true;
            }
        }
    });
    anime({
        targets: '.resultText',
        opacity: [1,0],
        translateY: [`0px`,'50px'],
        duration: 500, // durée de l'animation en millisecondes
        delay:500,
        easing: 'easeInQuad',
        complete: function(anim) {
            document.querySelector('.resultText').remove();
            if (otherFinish) {
                document.querySelector('.resultContainer').style.display = 'none';
                otherFinish = false; // Reset pour prochaine fois
                canSpin = true;
            } else {
                otherFinish = true;
            }
        }
    })
}