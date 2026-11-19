import { createKeyboard } from "./keyboard.js";
import { generateClue, generateSplitWord } from "./clue.js";
import { players } from "./db.js";

const clueBtn = document.querySelector(".clue_btn");
const clueContainer = document.querySelector(".clue_container");
const backdrop = document.querySelector(".backdrop");
const backdropBtn = document.querySelector(".backdrop_btn");
const backdropWin = document.querySelector(".backdrop-win");
const backdropBtnWin = document.querySelector(".backdrop-win_btn");
const heartsNode = document.querySelectorAll(".heart_icon");
const letterContainer = document.querySelectorAll(".letter");

const hearts = Array.from(heartsNode);
const letters = Array.from(letterContainer);

export let isGameOn = true;

export const myPlayerObj = {
  clue: "",
  name: "",
};

export let splitWords = [];

const startGame = () => {
  isGameOn = true;
  createKeyboard();
  backdrop.classList.add("visually-hidden");
  backdropWin.classList.add("visually-hidden");
  hearts.forEach((item) => item.classList.remove("gray_heart"));
  splitWords = [];
  myPlayerObj.clue = "";
  myPlayerObj.name = "";
  clueContainer.textContent = "";
  letters.forEach((item) => (item.textContent = ""));
};
startGame();

export const generatePlayer = () => {
  const randomIndex = Math.floor(Math.random() * (30 - 0 + 1) + 0);
  const myPlayer = players[randomIndex];
  myPlayerObj.clue = myPlayer.clue;
  myPlayerObj.name = myPlayer.name;
  return myPlayerObj;
};

clueBtn.addEventListener("click", () => {
  if (clueContainer.textContent === "") {
    const player = generatePlayer();
    generateClue(player);
    splitWords = generateSplitWord(player);
    console.log(player);
  }
});

export const endGame = () => {
  isGameOn = false;
  backdrop.classList.remove("visually-hidden");
  backdropBtn.addEventListener("click", startGame);
};

export const winTheGame = () => {
  backdropWin.classList.remove("visually-hidden");
  backdropBtnWin.addEventListener("click", startGame);
};
