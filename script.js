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
  let currentTurn = 0;
  const players = [];

  const setPlayers = () => {
    players.push(playerFactory("Player 1", "x"));
    players.push(playerFactory("Player 2", "o"));
  };

  const getCurrentPlayer = () => {
    let index = currentTurn % players.length;
    return players[index];
  };

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
    let index = event.target.dataset["index"];
    let char = getCurrentPlayer().char;
    gameBoard.addMove(index, char);
    guiController.render();
    currentTurn++;
  };

  const init = () => {
    guiController.setUp();
    setInputListener();
    setPlayers();
  };

  return { init };
})();

window.onload = () => {
  gameController.init();
};
