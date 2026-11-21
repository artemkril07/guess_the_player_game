
const clueContainer = document.querySelector(".clue_container");

export const makeClue = (player) => {
  clueContainer.style.display = "block";
  clueContainer.textContent = player.clue; 

};

export const makeSplitWord = (player) => {
  const splitWord = player.name.split("");
  return splitWord
};
