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
