let points = 0;

const getPoints = () => {
  return points;
};

export const renderPoints = () => {
  const pointsCounter = document.querySelector(".points");
  if (!pointsCounter) return;
  pointsCounter.textContent = `Очки: ${points}`;
};

export const scorePoints = (activeHearts, clue) => {
  let operator = clue?.textContent !== "" ? 2 : 3;
  countPoints(operator, activeHearts);
  renderPoints();
};

export const resetPoints = () => {
  points = 0;
  renderPoints();
};

const countPoints = (operator, activeHearts) => {
  const heartsLeft = activeHearts.filter(
    (item) => !item.classList.contains("gray_heart"),
  );
  points += operator * heartsLeft.length;
};
