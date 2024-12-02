import {sleep} from "./script.js";
let state = document.querySelector('#state')

//Load the confetti preset
// loadConfettiPreset(tsParticles);

// tsParticles.load("tsparticles", {
//   preset: "confetti",
// });

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
  if (state.value == "homeScreen") {
    requestAnimationFrame(confetti_homeScreen);
  }
}

export function confetti_wheel(velocity) { //en ms
  confetti({
      particleCount: parseInt(velocity/2)*2,
      ticks: 1000, 
      zIndex: 0,
      angle: 10,
      spread: 50,
      startVelocity: (velocity+2)*5,
      origin: { x: 0.3, y:0.50 },
  });
}

// export function confetti_wheel(duration, time_sleep) { //en ms
//     sleep(time_sleep);

//     const animationEnd = Date.now() + duration;

//     const interval = setInterval(function() {
//     if (animationEnd - Date.now() <= 0) {
//         return clearInterval(interval);
//     }

//     confetti({
//         particleCount: (animationEnd - Date.now())/duration*20,
//         ticks: 1000, 
//         zIndex: 0,
//         angle: 10,
//         spread: 50,
//         startVelocity: 80,
//         origin: { x: 0.3, y:0.50 },
//     });
//     }, 100);
// }

export function confetti_result() {
    const duration = 10 * 1000,
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