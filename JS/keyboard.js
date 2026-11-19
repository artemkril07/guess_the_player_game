import { splitWords, endGame, isGameOn, winTheGame } from "./main.js";

const keyArrays = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["e", "z", "x", "c", "v", "b", "n", "m"],
];

const keyboardSection = document.querySelector(".section_keyboard");
const letterContainer = document.querySelectorAll(".letter");
const letters = Array.from(letterContainer);
const clueContainer = document.querySelector(".clue_container");

let index_id = 1;

export const createKeyboard = () => {
  keyboardSection.innerHTML = keyArrays
    .map(
      (rows) =>
        `<div class="keyboard_rows"> ${rows
          .map(
            (letter) =>
              `<div class="keyboard_letters " data-value="${letter.toUpperCase()}">${letter.toUpperCase()}</div>`,
          )
          .join("")} </div>`,
    )
    .join("");
};

document.addEventListener("keydown", (e) => {
  if (isGameOn && clueContainer.textContent !== "") {
    const upperLetter = e.key.toUpperCase();

    if (upperLetter.length <= 1) {
      const keyboard = document.querySelector(
        `.keyboard_letters[data-value='${upperLetter}']`,
      );
      splitWords.forEach((item, index) => {
        if (item === upperLetter) {
          letters[index].textContent = upperLetter;
        }
      });
      if (splitWords.some((elem) => elem === upperLetter)) {
        keyboard.classList.add("right_letters");
        if (letters.every((item) => item.textContent !== "")) {
          winTheGame();
          index_id = 1;
        }
      } else {
        const heart = document.querySelector(
          `.heart_icon[data-id="${index_id}"]`,
        );
        keyboard.classList.add("wrong_letters");
        heart.classList.add("gray_heart");
        index_id++;
        if (index_id === 5) {
          endGame();
          index_id = 1;
        }
      }
    }
  }
});

keyboardSection.addEventListener("click", (e) => {
  if (e.target.closest(".keyboard_letters") !== null) {
    if (isGameOn && clueContainer.textContent !== "") {
      const div = e.target.closest(".keyboard_letters");
      const letter = div.dataset.value;
      const keyboard = document.querySelector(
        `.keyboard_letters[data-value='${letter}']`,
      );

      splitWords.forEach((item, index) => {
        if (item === letter) {
          letters[index].textContent = letter;
        }
      });

      if (splitWords.some((elem) => elem === letter)) {
        keyboard.classList.add("right_letters");
        if (letters.every((item) => item.textContent !== "")) {
          winTheGame();
          index_id = 1;
        }
      } else {
        const heart = document.querySelector(
          `.heart_icon[data-id="${index_id}"]`,
        );
        keyboard.classList.add("wrong_letters");
        heart.classList.add("gray_heart");
        index_id++;
        if (index_id === 5) {
          endGame();
          index_id = 1;
        }
      }
    }
  }
});
