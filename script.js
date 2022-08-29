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

  const render = () => {
    for (let index = 0; index < board.length; index++) {
      const char = board[index];
      const element = container.childNodes[index];
      element.textContent = char;
    }
  };

  return {
    setUp,
    render,
  };
})();

const gameController = (() => {
  const init = () => {
    guiController.setUp();
  };

  return { init };
})();

window.onload = () => {
  gameController.init();
};
