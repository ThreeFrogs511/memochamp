import { presentationNiveau, commencerJeuOuAnnuler } from "./function.js";

//La fonction principale qui démarre tout le processus
export async function memoChamp(section) {
    let difficulte = await presentationNiveau(section); // difficulte = n càd le nb de carré
    commencerJeuOuAnnuler(section, difficulte)
    }