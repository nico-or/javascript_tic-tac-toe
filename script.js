const gameBoard = (() => {
  const board = [null, null, null, null, null, null, null, null, null];

  const addMove = (index, char) => {
    board[index] = char;
  };

  return {
    board,
    addMove,
  };
})();

const guiController = (() => {
  const board = gameBoard.board;
  const container = document.getElementById("board");

  const setUp = () => {
    for (let index = 0; index < board.length; index++) {
      const element = document.createElement("div");
      container.appendChild(element);
    }
  };

  return {
    setUp,
  };
})();

window.onload = () => {
  guiController.setUp();
};
