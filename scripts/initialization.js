import {playOrCancel } from "./gameplay.js";

const main = document.querySelector("main"); //main section
let n; //difficulty number that sets the amount of squares total
main.addEventListener("click", async (e) => {
        if (e.target.classList.contains("facile")) {
            // easy mode, only 9 square total
            n = 9;
            playOrCancel(main, n); 
        } else if (e.target.classList.contains("intermediaire")) {
            // hardcore, 25 square total
            n = 25;
            playOrCancel(main, n);
        } else if (e.target.classList.contains("expert")) {
            //nightmare mode, 100 square total (impossible mode)
            n = 100;
            playOrCancel(main, n);
        }
})



// back to the main menu function
export function backToMainMenu(main) {
    main.innerHTML= `  <h2>Pick your poison</h2>
            <div class="choixDebut">
                <button class="facile">Easy</button>
                <button class="intermediaire">Hardcore</button>
                <button class="expert">Nightmare</button>
            </div>`
}



