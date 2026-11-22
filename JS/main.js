import { createKeyboard } from "./keyboard.js";
import { makeClue, makeSplitWord } from "./clue.js";
import { renderPoints, resetPoints } from "./points.js";
import { players } from "./db.js";

const clueBtn = document.querySelector(".clue_btn");
const clueContainer = document.querySelector(".clue_container");
const backdrop = document.querySelector(".backdrop");
const backdropBtn = document.querySelector(".backdrop_btn");
const nextSection = document.querySelector(".next_wrapper");
const nextBtnWin = document.querySelector(".next_btn");
const heartsNode = document.querySelectorAll(".heart_icon");
const letterContainer = document.querySelectorAll(".letter");

const helpButton = document.querySelector(".help_button");
const modalRulesButton = document.querySelector(".modal_rules_btn");

const hearts = Array.from(heartsNode);
const letters = Array.from(letterContainer);

export let isGameOn = true;

export let myPlayerObj = {
  clue: "",
  name: "",
};

export let splitWords = [];

export const generateRandomPlayerObj = () => {
  const randomIndex = Math.floor(Math.random() * (50 - 0) + 0);
  const myPlayer = players[randomIndex];
  myPlayerObj.clue = myPlayer.clue;
  myPlayerObj.name = myPlayer.name;
  return myPlayerObj;
};

const startGame = () => {
  isGameOn = true;
  createKeyboard();
  renderPoints();
  myPlayerObj = generateRandomPlayerObj();
  backdrop.classList.add("visually-hidden");
  nextSection.classList.add("visually-hidden");
  hearts.forEach((item) => item.classList.remove("gray_heart"));
  splitWords = makeSplitWord(myPlayerObj);
  clueContainer.textContent = "";
  clueContainer.style.display = "none";
  letters.forEach((item) => (item.textContent = ""));
};
startGame();

clueBtn.addEventListener("click", () => {
  if (clueContainer.textContent === "") {
    makeClue(myPlayerObj);
  }
});

export const endGame = () => {
  isGameOn = false;
  resetPoints();
  backdrop.classList.remove("visually-hidden");
  backdropBtn.addEventListener("click", startGame);
};

export const winTheRound = () => {
  nextSection.classList.remove("visually-hidden");
  nextBtnWin.addEventListener("click", startGame);
};

const toggleRules = () => {
  const modalRules = document.querySelector(".backdrop-rules");
  modalRules.classList.toggle("visually-hidden");
};
helpButton.addEventListener("click", toggleRules);
modalRulesButton.addEventListener("click", toggleRules);
