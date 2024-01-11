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