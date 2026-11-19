import { splitWords, endGame, isGameOn, winTheGame } from "./main.js";

const keyArrays = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["e", "z", "x", "c", "v", "b", "n", "m"],
];

const keyboardSection = document.querySelector(".section_keyboard");
const letterContainer = document.querySelectorAll(".letter");
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
  if (isGameOn) {
    const letters = Array.from(letterContainer);
    const upperLetter = e.key.toUpperCase();
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
});

keyboardSection.addEventListener("click", (e) => {
  if (e.target.closest(".keyboard_letters") !== null) {
    const div = e.target.closest(".keyboard_letters");
  }
});
