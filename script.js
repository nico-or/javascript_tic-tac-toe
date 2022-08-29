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
    container,
    setUp,
    render,
  };
})();

const playerFactory = (name, char) => {
  return { name, char };
};

const gameController = (() => {
  const setInputListener = () => {
    const container = guiController.container;
    const cells = container.children;

    for (let index = 0; index < cells.length; index++) {
      const cell = cells[index];
      cell.setAttribute("data-index", index);
    }

    container.addEventListener("click", (event) => {
      inputHandler(event);
    });
  };

  const inputHandler = (event) => {
    console.log(event.target.dataset["index"]);
  };

  const init = () => {
    guiController.setUp();
    setInputListener();
  };

  return { init };
})();

window.onload = () => {
  gameController.init();
};
