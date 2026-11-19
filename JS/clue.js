
const clueContainer = document.querySelector(".clue_container");

export const generateClue = (player) => {
  clueContainer.textContent = player.clue;
  console.log(player.clue);
  
};

export const generateSplitWord = (player) => {
  const splitWord = player.name.split("");
  return splitWord
};
