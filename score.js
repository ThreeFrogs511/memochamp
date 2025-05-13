
export function scoringSystem(section, userScore, score, difficulte, timer) {
  // mode facile  
if (difficulte===9) {
            if (parseInt(userScore[0].bestScore) < score && parseInt(userScore[0].bestTemps) >=  timer 
            || parseInt(userScore[0].bestScore)===0) {
                userScore[0].bestScore = score;
                userScore[0].lastScore = score;
                userScore[0].lastTemps = timer;
                userScore[0].bestTemps = timer;
                console.log("record battu ou pas de best score")
                console.log(userScore[0])
                window.localStorage.setItem("userScore", JSON.stringify(userScore))
                section.innerHTML =  `
    <div class="timeUp">Temps écoulé ! Nouveau record facile ! Votre score est de ${score}/${Math.round(difficulte/2)}
    <div id="over" class="restart">Recommencer</div>
    <div id="over" class="backToMenu">Menu principal</div>
    </div>`
               
            } else {
                userScore[0].lastScore = score
                userScore[0].lastTemps = timer
               console.log("RAS")
               window.localStorage.setItem("userScore", JSON.stringify(userScore))
               section.innerHTML =  `
    <div class="timeUp">Temps écoulé ! Votre score est de ${score}/${Math.round(difficulte/2)}
    <div id="over" class="restart">Recommencer</div>
    <div id="over" class="backToMenu">Menu principal</div>
    </div>`
            }}
        
//mode intermédiaire        
if (difficulte===25) {
             if (parseInt(userScore[1].bestScore) < score && parseInt(userScore[1].bestTemps) >= timer 
             || parseInt(userScore[1].bestScore) === 0) {
        userScore[1].bestScore = score;
        userScore[1].lastScore = score;
        userScore[1].lastTemps = timer;
        userScore[1].bestTemps = timer;
        console.log("record battu ou pas de best score");
        window.localStorage.setItem("userScore", JSON.stringify(userScore));
         section.innerHTML =  `
    <div class="timeUp">Temps écoulé ! Nouveau record intermédiaire ! Votre score est de ${score}/${Math.round(difficulte/2)}
    <div id="over" class="restart">Recommencer</div>
    <div id="over" class="backToMenu">Menu principal</div>
    </div>`
    } else {
        userScore[1].lastScore = score;
        userScore[1].lastTemps = timer;
        console.log("RAS");
        window.localStorage.setItem("userScore", JSON.stringify(userScore));
        section.innerHTML =  `
    <div class="timeUp">Temps écoulé ! Votre score est de ${score}/${Math.round(difficulte/2)}
    <div id="over" class="restart">Recommencer</div>
    <div id="over" class="backToMenu">Menu principal</div>
    </div>`
    }}

//mode difficile
if (difficulte===100) {
             if (parseInt(userScore[2].bestScore) < score && parseInt(userScore[2].bestTemps) >=  timer 
             || parseInt(userScore[2].bestScore) === 0) {
        userScore[2].bestScore = score;
        userScore[2].lastScore = score;
        userScore[2].lastTemps = timer;
        userScore[2].bestTemps = timer;
        console.log("record battu ou pas de best score");
        console.log(userScore[2]);
        window.localStorage.setItem("userScore", JSON.stringify(userScore));
         section.innerHTML =  `
    <div class="timeUp">Temps écoulé ! Nouveau record difficile ! Votre score est de ${score}/${Math.round(difficulte/2)}
    <div id="over" class="restart">Recommencer</div>
    <div id="over" class="backToMenu">Menu principal</div>
    </div>`
    } else {
        userScore[2].lastScore = score;
        userScore[2].lastTemps = timer;
        console.log("RAS");
        window.localStorage.setItem("userScore", JSON.stringify(userScore));
         section.innerHTML =  `
    <div class="timeUp">Temps écoulé ! Votre score est de ${score}/${Math.round(difficulte/2)}
    <div id="over" class="restart">Recommencer</div>
    <div id="over" class="backToMenu">Menu principal</div>
    </div>`
    }

        }}