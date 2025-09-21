//settings opened and closed system

import { backToMainMenu } from "./initialization.js";
const main = document.querySelector("main");
let settingsIcon = document.querySelector(".settingsIcon");
let settings = document.querySelector(".settingsHidden")
settingsIcon.addEventListener("click", () => {
    displayScores()
    settings.classList.toggle("settingsOpened");
    settings.classList.toggle("settingsHidden");
    

})

function displayScores() {
    let userScore=JSON.parse(window.localStorage.getItem("userScore"));
    const scoreCards = document.querySelectorAll(".score-card");
    for (let i = 0 ; i < scoreCards.length ; i++) {
        scoreCards[i].innerHTML = `
        <div>Best  ${userScore[i].best} out of ${Math.round(userScore[i].mode/2)} in ${userScore[i].bestTime} seconds</div>
        <div>Last ${userScore[i].last} out of ${Math.round(userScore[i].mode/2)} in ${userScore[i].previousTime} seconds</div>
        `;
    }
}


//displaying the set timer
let timerChoisi = document.querySelector(".timerChoisi");
let slider = document.getElementById("timer");
slider.value=JSON.parse(window.localStorage.getItem("timer")) !== null ? JSON.parse(window.localStorage.getItem("timer")) : "5";
timerChoisi.innerHTML = `You will have <span>${slider.value}</span> seconds.`;
// changing the timer
document.getElementById("timer").addEventListener("input", () => {
    let timerValue = document.getElementById("timer").value;
    timerChoisi.innerHTML = `You will have <span>${timerValue}</span> seconds.`;
    window.localStorage.setItem("timer", JSON.stringify(timerValue));//we store the chosen time to display it after a refresh
    backToMainMenu(main);
})
