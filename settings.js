//settings opened and closed system

import { memoChamp } from "./memochamp.js";



let settingsIcon = document.querySelector(".settingsIcon");
let settings = document.querySelector(".settingsHidden")
settingsIcon.addEventListener("click", () => {
    let userScore = JSON.parse(window.localStorage.getItem("userScore"));
    affichageLatestScore(userScore)
    affichageBestScore(userScore)
    settings.classList.toggle("settingsOpened");
    settings.classList.toggle("settingsHidden");
    

})


//timer choisi (par défaut ou prédéfini)
let inputTimer = document.getElementById("timer")
let timerChoisi = document.querySelector(".timerChoisi")

if (window.localStorage.getItem("timer")) {
    timerChoisi.innerHTML = `Vous aurez ${parseInt(JSON.parse(window.localStorage.getItem("timer")))} secondes de temps.`
    
    inputTimer.setAttribute("value", JSON.parse(window.localStorage.getItem("timer")))

    
} else {
timerChoisi.innerHTML = `Vous aurez 5 secondes de temps.`

}

//slider timer

const section = document.querySelector(".jeu");
inputTimer.addEventListener("change", () => {

 let timer = inputTimer.value; 
    if (timer==='' || timer <= 0) {
        inputTimer.classList.add("timerInputError")
       timerChoisi.innerHTML = `Veuillez choisir une valeur correct supérieure à 0.`
    } else {
        inputTimer.classList.remove("timerInputError")
    timerChoisi.innerHTML = `Vous aurez ${timer} secondes de temps.`
    window.localStorage.setItem("timer", JSON.stringify(timer))} 

   

    window.localStorage.setItem("timer", JSON.stringify(timer)) 
   memoChamp(section)



})

// doublon du code ci-dessus pour gérer le timer final du jeu qui continue malgré le reset
export function changeInputResetTimer(timerId) {
let inputTimer = document.getElementById("timer")
const section = document.querySelector(".jeu");

inputTimer.addEventListener("change", () => {
    let timer = inputTimer.value; 
    if (timer==='' || timer <= 0) {
        inputTimer.classList.add("timerInputError")
       timerChoisi.innerHTML = `Veuillez choisir une valeur correct supérieure à 0.`
    } else {
        inputTimer.classList.remove("timerInputError")
    timerChoisi.innerHTML = `Vous aurez ${timer} secondes de temps.`
    window.localStorage.setItem("timer", JSON.stringify(timer))} 


  

clearTimeout(timerId)
memoChamp(section)



})}


//affichage des derniers scores

function affichageLatestScore(userScore) {
let afficherScore = document.querySelector(".affichageScore");
afficherScore.innerHTML = '';
let title = document.createElement("h3");
title.textContent = 'Derniers scores'
afficherScore.appendChild(title);
let i = 0;
for (i=0 ; i < 3 ; i++) {
let div = document.createElement("div");
div.innerHTML = 
       ` 
       Votre dernier score en mode ${userScore[i].nom} = ${userScore[i].lastScore}/${Math.round(userScore[i].difficulte/2)} en ${userScore[i].lastTemps} secondes <br> ` 
afficherScore.appendChild(div)

}}

//affichage des meilleurs scores

function affichageBestScore(userScore) {
let afficherHighScore = document.querySelector(".affichageHighScore");
afficherHighScore.innerHTML ='';
let title = document.createElement("h3");
title.textContent = 'Meilleurs scores'
afficherHighScore.appendChild(title);
let counter = 0;
for (counter=0 ; counter < 3 ; counter++) {
let div = document.createElement("div");
div.innerHTML = 
       `
       Votre meilleur score en mode ${userScore[counter].nom} = ${userScore[counter].bestScore}/${Math.round(userScore[counter].difficulte/2)} en ${userScore[counter].bestTemps} secondes <br>` 
afficherHighScore.appendChild(div)

}}





