

const firstHeart = document.querySelector(".heart_icon[data-id='1']");
const clueContainer = document.querySelector(".clue_container");

let points = 0;


export const renderPoints = () => {
  const pointsCounter = document.querySelector(".points");
  pointsCounter.textContent = `Points: ${points}`;
};

export const scorePoints = () => {
  if (
    !firstHeart.classList.contains("gray_heart") &&
    clueContainer.textContent === ""
  ) {
    points +=50;
  } else if (
    !firstHeart.classList.contains("gray_heart") &&
    clueContainer.textContent !== ""    
    
) {
    points +=10;
  }
  renderPoints();
};

export const resetPoints = ()=>{
    points = 0;
    renderPoints();
}