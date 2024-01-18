import {state} from "./script.js"; // c'est un link et non pas une copie de la variable

export function confetti_homeScreen() {
    confetti({
    particleCount: 2,
    angle: 50,
    spread: 55,
    startVelocity: 40,
    origin: { x: 0, y:0.7 },
  });

  confetti({
    particleCount: 2,
    angle: 130,
    spread: 55,
    startVelocity: 40,
    origin: { x: 1, y:0.7  },
  });
  if (state == "homeScreen") {
    requestAnimationFrame(confetti_homeScreen);
  }
}

export function confetti_wheel(wheelSpeed) {
    if (wheelSpeed > 0) {
        confetti({
            particleCount: Math.floor(wheelSpeed*0.1),
            angle: 70,
            spread: 20,
            startVelocity: wheelSpeed*3,
            origin: { x: 0.2, y:0.60 },
        });
        confetti({
            particleCount: Math.floor(wheelSpeed*0.5),
            angle: 50,
            spread: 40,
            startVelocity: wheelSpeed*6,
            origin: { x: 0.3, y:0.40 },
        });
        confetti({
            particleCount: Math.floor(wheelSpeed*0.1),
            angle: 0,
            spread: 20,
            startVelocity: wheelSpeed*3,
            origin: { x: 0.6, y:0.10 },
        });
        confetti({
            particleCount: Math.floor(wheelSpeed*0.7),
            angle: -20,
            spread: 20,
            startVelocity: wheelSpeed*10,
            origin: { x: 0.6, y:0.25 },
        });
    }
}

export function confetti_result() {
    const duration = 15 * 1000,
    animationEnd = Date.now() + duration,
    defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
        return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    // since particles fall down, start a bit higher than random
    confetti(
        Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
    );
    confetti(
        Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
    );
    }, 250);
}