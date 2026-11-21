import { splitWords, endGame, isGameOn, winTheGame } from "./main.js";
import { scorePoints } from "./points.js";

const keyArrays = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["e", "z", "x", "c", "v", "b", "n", "m"],
];

const keyboardSection = document.querySelector(".section_keyboard");
const letterContainer = document.querySelectorAll(".letter");
const letters = Array.from(letterContainer);

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

const fillTheLetters = (array, letter) => {
  array.forEach((item, index) => {
    if (item === letter) {
      letters[index].textContent = letter;
    }
  });
};

const clickLetter = (array, letter, keyboard) => {
  if (array.some((elem) => elem === letter)) {
    keyboard.classList.add("right_letters");
    if (letters.every((item) => item.textContent !== "")) {
      scorePoints()
      winTheGame();
      index_id = 1;
    }
  } else {
    const heart = document.querySelector(`.heart_icon[data-id="${index_id}"]`);
    if (keyboard !== null) {
      keyboard.classList.add("wrong_letters");
      heart.classList.add("gray_heart");
      index_id++;
      if (index_id === 6) {
        endGame();
        index_id = 1;
      }
    } else {
      alert("Включіть англійську розкладку");
    }
  }
};

document.addEventListener("keydown", (e) => {
  if (isGameOn) {
    const upperLetter = e.key.toUpperCase();

    if (upperLetter.length <= 1) {
      const keyboard = document.querySelector(
        `.keyboard_letters[data-value='${upperLetter}']`,
      );
      fillTheLetters(splitWords, upperLetter);
      clickLetter(splitWords, upperLetter, keyboard);
    }
  }
});

keyboardSection.addEventListener("click", (e) => {
  if (e.target.closest(".keyboard_letters") !== null) {
    if (isGameOn) {
      const div = e.target.closest(".keyboard_letters");
      const letter = div.dataset.value;
      const keyboard = document.querySelector(
        `.keyboard_letters[data-value='${letter}']`,
      );
      fillTheLetters(splitWords, letter);
      clickLetter(splitWords, letter, keyboard);
    }
  }
});
