const end = Date.now() + 20 * 1000;
var is_homeScreen = true;

(function confetti_homeScreen() {
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


  if (is_homeScreen) {requestAnimationFrame(confetti_homeScreen);}

})();