const gameBoard = (() => {
  const rowCount = 3;
  const columnCount = 3;

  const board = new Array(rowCount * columnCount).fill(null);

  const addMove = (index, char) => {
    if (board[index] != null) {
      return false;
    } else {
      board[index] = char;
      return true;
    }
  };

  // Given a matrix A of size rowCount-by-columnCount, represented as
  // an vector of size (rowCount * columnCount).
  // The a[rowIndex, columnIndex] element is placed in the position (columnIndex + columnCount * rowIndex).
  const getRow = (rowIndex) => {
    let output = [];
    for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
      output.push(board[columnIndex + columnCount * rowIndex]);
    }
    return output;
  };

  const getColumn = (columnIndex) => {
    let output = [];
    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
      output.push(board[columnIndex + columnCount * rowIndex]);
    }
    return output;
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
    let isValid = gameBoard.addMove(index, char);

    if (isValid) {
      currentTurn++;
      guiController.render();
    }
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
