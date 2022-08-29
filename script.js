const playerFactory = (name, char) => {
  return { name, char };
};

const gameBoard = (() => {
  const rowCount = 3;
  const columnCount = 3;

  const board = new Array(rowCount * columnCount).fill(null);

  const reset = () => {
    for (let index = 0; index < board.length; index++) {
      board[index] = null;
    }
  };

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

  // The board main diagonal is composed of the elements a[rowIndex, columnIndex]
  // were rowIndex = columnIndex.
  const getDiagonal = () => {
    let output = [];
    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
      let columnIndex = rowIndex;
      output.push(board[columnIndex + columnCount * rowIndex]);
    }
    return output;
  };

  // The board inverse main diagonal is composed of the elements a[rowIndex, columnIndex]
  // were rowIndex + columnIndex = columnCount - 1.
  const getInverseDiagonal = () => {
    let output = [];
    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
      let columnIndex = columnCount - 1 - rowIndex;
      output.push(board[columnIndex + columnCount * rowIndex]);
    }
    return output;
  };

  const hasVictory = () => {
    const isWinningArray = (array) => {
      const allEqual = (array) => {
        return array.every((e, i, arr) => e == arr[0]);
      };
      return allEqual(array) && array[0] != null;
    };

    let arraysToCheck = [];

    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
      arraysToCheck.push(getRow(rowIndex));
    }

    for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
      arraysToCheck.push(getColumn(columnIndex));
    }

    arraysToCheck.push(getDiagonal());
    arraysToCheck.push(getInverseDiagonal());

    return arraysToCheck.some((array) => isWinningArray(array));
  };

  const isTie = () => {
    const isFull = () => {
      return board.every((e) => e != null);
    };
    return isFull() && !hasVictory();
  };

  const isOver = () => {
    return hasVictory() || isTie();
  };

  return {
    board,
    reset,
    addMove,
    isTie,
    isOver,
  };
})();

const guiController = (() => {
  const board = gameBoard.board;
  const container = document.getElementById("board");

  const setBoard = () => {
    // clear board
    container.innerText = "";

    // populate board
    for (let index = 0; index < board.length; index++) {
      const element = document.createElement("div");
      container.appendChild(element);
    }
  };

  const setInfo = () => {
    const infoContainer = document.getElementById("info");
    infoContainer.textContent = "";
    infoContainer.hidden = true;
  };

  const setUp = () => {
    setBoard();
    setInfo();
    render();
  };

  const drawBoard = () => {
    for (let index = 0; index < board.length; index++) {
      const char = board[index];
      const element = container.childNodes[index];
      element.textContent = char;
    }
  };

  const drawEndGameMessage = (currentPlayer) => {
    const infoContainer = document.getElementById("info");
    infoContainer.hidden = false;

    let message = gameBoard.isTie()
      ? "is a tie!"
      : `${currentPlayer.name} won.`;

    // game result
    const p = document.createElement("p");
    p.innerText = message;
    infoContainer.appendChild(p);

    // reset button
    const button = document.createElement("button");
    button.innerText = "play agin";
    infoContainer.appendChild(button);

    button.addEventListener("click", () => {
      gameController.init();
    });
  };

  const render = () => {
    drawBoard();
  };

  return {
    container,
    setUp,
    render,
    drawEndGameMessage,
  };
})();

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
      guiController.render();

      if (gameBoard.isOver()) {
        gameOver();
      } else {
        currentTurn++;
      }
    }
  };

  const gameOver = () => {
    guiController.drawEndGameMessage(getCurrentPlayer());
  };

  const init = () => {
    gameBoard.reset();
    guiController.setUp();
    setInputListener();
    setPlayers();
  };

  return { init, getCurrentPlayer };
})();

window.onload = () => {
  gameController.init();
};
