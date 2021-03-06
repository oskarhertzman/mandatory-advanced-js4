    // Checks potential vertical win.
  function vertical(board) {
    for (let row = 3; row < 6; row++) {
      for (let col = 0; col < 7; col++) {
        if (board[row][col]) {
          if (board[row][col] === board[row - 1][col] &&
              board[row][col] === board[row - 2][col] &&
              board[row][col] === board[row - 3][col]) {
            return board[row][col];
          }
        }
      }
    }
  }
    // Checks potential horizontal win.
  function horizontal(board) {
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 4; col++) {
        if (board[row][col]) {
          if (board[row][col] === board[row][col + 1] &&
              board[row][col] === board[row][col + 2] &&
              board[row][col] === board[row][col + 3]) {
            return board[row][col];
          }
        }
      }
    }
  }
    // Checks potential right diagonal win.
  function diagonalRight(board) {
    for (let row = 3; row < 6; row++) {
      for (let col = 0; col < 4; col++) {
        if (board[row][col]) {
          if (board[row][col] === board[row - 1][col + 1] &&
              board[row][col] === board[row - 2][col + 2] &&
              board[row][col] === board[row - 3][col + 3]) {
            return board[row][col];
          }
        }
      }
    }
  }
    // Checks potential left diagonal win.
  function diagonalLeft(board) {
    for (let row = 3; row < 6; row++) {
      for (let col = 3; col < 7; col++) {
        if (board[row][col]) {
          if (board[row][col] === board[row - 1][col - 1] &&
              board[row][col] === board[row - 2][col - 2] &&
              board[row][col] === board[row - 3][col - 3]) {
            return board[row][col];
          }
        }
      }
    }
  }
    // Checks potential draw. Returns draw when no 'null' cell are left.
  function draw(board) {
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 7; col++) {
        if (board[row][col] === null) {
          return null;
        }
      }
    }
    return 'draw';
  }
    // Returns whichever function that makes a match in the win condition.
  export function check(board) {
      return vertical(board)
      || diagonalRight(board)
      || diagonalLeft(board)
      || horizontal(board)
      || draw(board);
    }
