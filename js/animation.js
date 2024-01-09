// Exemple d'utilisation simple pour animer un élément HTML avec Anime.js
const element = document.querySelector('#description'); // Sélectionnez votre élément
var tl = anime.timeline({
    easing: 'easeInOutQuad',
    duration: 750 // Durée de l'animation en millisecondes
  });

tl.add({
    targets: element,
    translateY: 0, // Exemple de propriété à animer
});