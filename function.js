/* Fonctions nécessaires pour le jeu
Carré bleu = carré à retenir
Carré vert = bonne réponse
Carré rouge = mauvaise réponse
Le joueur choisit sa difficulté puis clique sur "commencer".
Il dispose de Xsec pour mémoriser puis de Ysec pour répondre.
A l'issue de ce délai, son score s'affiche, qu'il ait fini ou non */

import { changeInputResetTimer} from "./settings.js";
import { memoChamp } from "./memochamp.js";
import {scoringSystem} from "./score.js";

//window.localStorage.removeItem("userScore")

// on set-up le système de score dès le début s'il n'est pas déjà présent
if (!window.localStorage.getItem("userScore")) {
    const response = await fetch("scoreTemplate.json");
    const userScoreTemplate = await response.json();
    window.localStorage.setItem("userScore", JSON.stringify(userScoreTemplate))
    console.log("template initialisé!")
}

//1- On présente les difficultés
export async function presentationNiveau(section) {
    section.innerHTML=''
    section.innerHTML = `
    <div class="intro">
    <h2>Choisissez votre niveau de difficulté : </h2>
    <div class="choixDebut">
    <span class="facile">Facile</span>
    <span class="intermediaire">Intermédiaire</span>
    <span class="expert">Expert</span>
    </div>
    </div>
    `
    //on insère une promesse pour attendre le choix du joueur avant de changer l'interface
    return new Promise(resolve => {
    const intro = document.querySelector(".intro")
    if (intro) {
        intro.addEventListener("click", (event) => {
           if (event.target.classList.contains("facile")) {
            //mode "facile" choisi
            let n = 9;
            genererCarre(section, n) 
            resolve(n) //on confirme à JS que l'user a choisi
                
           }
           if (event.target.classList.contains("intermediaire")) {
            //mode "intermédiaire" choisi
            let n = 25
            genererCarre(section, n) 
            resolve(n)//on confirme à JS que l'user a choisi
       } 
       if (event.target.classList.contains("expert")) {
        //mode "expert" choisi
        let n = 100;
        genererCarre(section, n) 
        resolve(n) //on confirme à JS que l'user a choisi
    }
        } )
    }
})
}



//2 - On utilise une boucle pr générer les niveaux selon la difficulté choisie
async function genererCarre(section, n) {
   
    section.innerHTML = ''
    let div = document.createElement("div")
    if (n===9){div.classList.add("jeuFacile")}
    if (n===25) {div.classList.add("jeuIntermediaire")}
    if (n===100){div.classList.add("jeuExpert")}
    div.setAttribute("id", "carreJeu")
    section.appendChild(div);
    let i = 1;
    for (i=1 ; i<=n; i++) {
        let span = document.createElement("span")
        span.classList.add("carre")
        span.setAttribute("id", i)
        div.appendChild(span)
    }

}







// 3 - Quand la promesse (le choix du joueur) est réalisée, alors seulement on lance :
export async function commencerJeuOuAnnuler(section, difficulte) {

    //on récupère le timer. 5s par défaut, sinon celui choisi par l'user
    let timer = 5000;
    
    if(window.localStorage.getItem("timer")) {
    timer = parseInt(JSON.parse(window.localStorage.getItem("timer")))
    console.log(timer)
    //ICI, RECUP OBJET userScore et
}
// on présente le menu de jeu 'commencer' ou 'annuler'
    let div = document.createElement("div")
div.innerHTML = `<div id="jouerOuAnnuler"><p class="startGame">Commencer</p><p class="annulerNiveau">Annuler</p></div>`
section.appendChild(div);
let menu = document.getElementById("jouerOuAnnuler")
menu.addEventListener("click", async (event)=> {
    if(event.target.classList.contains("startGame")) {
        div.innerHTML = 
        `<div class="barreTempsMemo"><div id="progression"></div></div>
       <style> .barreTempsMemo {
    height: 3dvh;
    width: 50dvw;
    border: 1px solid black;
    margin: auto;
}

#progression {
    height: 3dvh;
    width: 50dvw;
    background-color: rgb(11, 11, 109);
    animation: tempsDiminue ${timer}s 2 linear;
}

@keyframes tempsDiminue {
    0% {width: 50dvw; background-color: rgb(11, 11, 109) }
    100% {width: 0dvw; background-color: rgb(214, 15, 15)}
}</style>
        `
        let nbSquare = await affichageDesCarresBleus(difficulte, timer)
        colorierCases(section, nbSquare, difficulte, timer)
        
    }
    if (event.target.classList.contains("annulerNiveau")) {
        section.innerHTML=''
        memoChamp(section);
    }
})
}

//4 Début du jeu  - les carrés bleus s'affichent
async function affichageDesCarresBleus(difficulte, timer) {

       

        let i = 0;
        let carreId = document.querySelectorAll("#carreJeu span")
        const idCarresBleus = []; // liste des id des carrés bleus
        //Boucle pour sortir des carrés bleus au hasard
        for (i = 0 ; i <= difficulte-Math.round(difficulte/2) ; i++) {
            let squareBlue = ''
            squareBlue = Math.floor(Math.random() * difficulte)
            if (!idCarresBleus.includes(squareBlue) && squareBlue !== 0) {
                idCarresBleus[i] =+ squareBlue;
        } else {
            i--;
        }
        } // on stocke les carrés bleus 
       
        // Tableau qui stocke les id des carré bleus
carreId.forEach((carre) => {
    if (idCarresBleus.includes(parseInt(carre.id))) {
        carre.classList.add("carreBleu")

    } 
    //on attends Xms puis on enlève le bleu - C'est au joueur de les retrouver
    
    })
    
   await new Promise(resolve => {
        setTimeout(resolve, timer*1000)});

    carreId.forEach((carre) => {
        carre.classList.remove("carreBleu")});

return idCarresBleus;
   
}


//4- le joueur doit retrouver les bonnes cases. Vert = +1, Rouge = -1 pt.
 function colorierCases(section, nbSquare, difficulte, timer) {
    let score = 0;
    let nbClick = 0
    let cube = document.getElementById("carreJeu")
cube.addEventListener("click", (event) => {
    if (event.target.classList.contains("carre")) {
        let cible = event.target;
        nbClick++;
        let idClique = cible.getAttribute("id")
        if (nbSquare.includes(parseInt(idClique))) {
        cible.classList.add("carreVert"); 
        score++;
    } else {
         cible.classList.add("carreRouge") 
         score--;}
        }
       
    })
    //délai pour répondre 
   
  const timerId = setTimeout(() => {
        afficherScore(score, section, difficulte, timer)
       }, timer*1000);
       changeInputResetTimer(timerId)
       
    
}


//5 - On affiche le score

async function afficherScore(score, section, difficulte, timer) {
    
    saveScore(section, score, difficulte, timer)
    let timeUp = document.querySelector(".timeUp");
    if (timeUp) {
        timeUp.addEventListener("click", (event) => {
            if (event.target.classList.contains("restart")) {
                // pour recommencer, il faut regénérer le même carré puis le menu "commencer/annuler"
                genererCarre(section, difficulte) // le carré pré-choisi
                commencerJeuOuAnnuler(section, difficulte) // le choix "commencer/annuler"
        } 
        if (event.target.classList.contains("backToMenu")) {
            memoChamp(section);
        }
        })
    }
}


//on calcule, compare et affiche les scores et potentiels records battus
function saveScore(section, score, difficulte, timer) {
      if (window.localStorage.getItem("userScore")) {
        const allScore = window.localStorage.getItem("userScore");
        const userScore = JSON.parse(allScore);
        section.innerHTML = '';
        scoringSystem(section, userScore, score, difficulte, timer)
        
        }
      }
    
