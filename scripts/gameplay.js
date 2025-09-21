/* Functions required for the gameplay
    - Blue square = square to remember
    - Green square = correct answer
    - Red square = incorrect answer
Here's how it goes :
    1// The player chooses their difficulty level 
    2// They confirm by clicking on “Play” or they cancel
    3// They have X seconds to memorize the location of every blue square in the box
    4// Then X seconds to find them
At the end of this time, their score is displayed, whether they have finished or not. */

import { backToMainMenu } from "./initialization.js";


// We save in local storage the scoring system template if it is not already in place.
// It'll be used to display the different stats.
if (!window.localStorage.getItem("userScore")) {
    const response = await fetch("scoreTemplate.json");
    const userScoreTemplate = await response.json();
    window.localStorage.setItem("userScore", JSON.stringify(userScoreTemplate));
}

//After choosing the difficulty level, we display the nb of square and
// give the player the choice : start the game or cancel
export async function playOrCancel(main, n) {
    main.innerHTML = '';
    const box = document.createElement("div");
    box.setAttribute("id", "mainBox");
    main.appendChild(box);
    // filling the box with the amount of square equal to the chosen difficulty 
    for (let i=0 ; i<=n-1; i++) {
        let square = document.createElement("div");
        square.classList.add("carre");
        square.setAttribute("id", i);
        square.style.setProperty("width", `calc(100% / ${Math.sqrt(n)})`)
        box.appendChild(square);
    }
    //we get the timer
    let timer = document.getElementById("timer").value ??= 5;
    //we display in the DOM the "start or cancel" menu
    let playOrCancelMenu = document.createElement("div");
    playOrCancelMenu.id = "playOrCancelMenu";
    playOrCancelMenu.innerHTML= 
    `<button class="startGame">Play</button>
    <button class="annulerNiveau">Cancel</button>`;
    main.appendChild(playOrCancelMenu);
    let choice = document.getElementById("playOrCancelMenu");
    choice.addEventListener("click", async (event)=> {
        if(event.target.classList.contains("startGame")) {
            playOrCancelMenu.remove();
            main.insertAdjacentHTML("beforeend", `<div class="barreTempsMemo"><div id="progression"></div></div>`)
            document.getElementById("progression").style.setProperty("animation", `tempsDiminue ${timer}s linear 2`);
            let squaresToFind = await displayingBlueSquares(n, timer);
            clickingOnSquares(main, squaresToFind, n, timer, box);
        } else if (event.target.classList.contains("annulerNiveau")) {
            main.innerHTML='';
            backToMainMenu(main); // reset
        }
    })
}

//Function to display at random locations the blue squares
async function displayingBlueSquares(n, timer) {
    let allTheSquares = document.querySelectorAll(".carre");
    const blueSquaresId = []; // All the future blue squares, based on their id;
    let numberOfBlueSquares = n-Math.round(n/2); // number of blue squares = half the number of squares
    for (let i = 0 ; i <= numberOfBlueSquares ; i++) { // choosing the squares to be colored at random
        let blueSquare = Math.floor(Math.random() * n); // return a random id with n being the maximum number
        blueSquaresId[i] =+ !blueSquaresId.includes(blueSquare) ? blueSquare : i--; //avoid duplicate ids
    }
       
    // now we display the blue squares with a loop
    allTheSquares.forEach((sq) => {
        blueSquaresId.includes(parseInt(sq.id)) && sq.classList.add("carreBleu"); // this class changes the bg-color
     })    
    // we give the player the time to memorize them
    await new Promise(resolve => {
       setTimeout(resolve, timer*1000)}
    );
    // then we remove them
    allTheSquares.forEach((sq) => {
        sq.classList.remove("carreBleu")});

    return blueSquaresId; // we transfer the ids of the blue squares to another function
   
}


//4- le joueur doit retrouver les bonnes cases. Vert = +1, Rouge = -1 pt.
function clickingOnSquares(main, squaresToFind, n, timer, box) {
    let score = 0;
    box.addEventListener("click", (event) => {
        if (event.target.classList.contains("carre")) {
            if (squaresToFind.includes(parseInt(event.target.id)) && !event.target.classList.contains("carreVert")) {
                event.target.classList.add("carreVert"); //right answer => green square
                score++;
            } else if (!squaresToFind.includes(parseInt(event.target.id)) && !event.target.classList.contains("carreRouge")) {
                event.target.classList.add("carreRouge")  //wrong answer => red square
                score--;
            }
        }
    })
    //the timer
    const timerId = setTimeout(() => {
            displayingScore(score, main, n, timer, timerId)
        }, timer*1000);
}

//
function saveNewScore(userScore, score, n, timer) {
    const difficulty = [9, 25, 100];
    for (let i = 0 ; i < difficulty.length ; i++) {
        if (difficulty[i]===n) {
            let best = parseInt(userScore[i].best);
            let oldTimer = parseInt(userScore[i].bestTime);
            if (score > best || (score === best && timer < oldTimer)) {
                userScore[i].best=score;
                userScore[i].last=score;
                userScore[i].previousTime=timer;
                userScore[i].bestTime=timer;
            } else {
                userScore[i].last=score;
                userScore[i].previousTime=timer;
            }
        window.localStorage.setItem("userScore", JSON.stringify(userScore));
        }
    }
}

//5 - On affiche le score

async function displayingScore(score, main, n, timer, timerId) {
    clearTimeout(timerId);
    // we save the score
    if (window.localStorage.getItem("userScore")) {
        const userScore = JSON.parse(window.localStorage.getItem("userScore"));
        score = score < 0 ? 0 : score;
        main.innerHTML= `
            <div class="timeUp">
                <div>
                    <p>Time's up !</p>
                    <span class="new-record"></span>
                    <span class="displaying-score">Your score is = ${score}/${Math.round(n/2)}</span>
                </div>
                <div>
                    <button id="over" class="restart">Try again</button>
                    <button id="over" class="backToMenu">Main menu</button>
                </div>
            </div>`;
        saveNewScore(userScore, score, n, timer);
    }
    // then we display the menu : restart or back to main menu
    main.addEventListener("click", (event) => {
        if (event.target.classList.contains("restart")) {
            playOrCancel(main, n);
        } else if (event.target.classList.contains("backToMenu")) {
            backToMainMenu(main);
        }
    })
}

    
