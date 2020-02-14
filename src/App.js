import React, { useState, useEffect } from "react";
import Row from './board/Row.js';
import './styles/reset.css';
import './styles/App.css';
require('typeface-montserrat');

function App() {

  const [player1, updatePlayer1] = useState(1);
  const [player2, updatePlayer2] = useState(2);
  const [currentPlayer, updateCurrentPlayer] = useState(null);
  const [board, updateBoard] = useState([]);
  const [gameOver, updateGameOver] = useState(false);
  const [message, updateMessage] = useState('');

  useEffect(() => {
 loadBoard();
  }, [])

  function loadBoard () {
    let field = [];
    for (let r = 0; r < 6; r++) {
      let row = [];
      for (let c = 0; c < 7; c++) {
        row.push(null)
      }
      field.push(row);
    }
    console.log(board)
    updateBoard(field);
    updateCurrentPlayer(player1);
    updateGameOver(false);
    updateMessage('');
  }

  function togglePlayer() {
    return (currentPlayer === player1) ? player2 : player1;
  }
  function play(col) {
      console.log(board)
      if (!gameOver) {
        for (let row = 5; row >= 0; row--) {
          if (!board[row][col]) {
            let newBoard = [...board];
            newBoard[row][col] = currentPlayer;
            updateBoard(newBoard);
            if (currentPlayer === 1) {
              updateMessage("Player 1's turn")
            }
            if (currentPlayer === 2) {
              updateMessage("Player 2's turn")
            }
            break;
          }
        }
          let result = check(board);
          if (result === player1) {
            updateBoard(board);
            updateGameOver(true);
            updateMessage('Player 1 (blue) wins!')
          } else if (result === player2) {
            updateBoard(board);
            updateGameOver(true);
            updateMessage('Player 2 (purple) wins!')
          } else if (result === 'draw') {
            updateBoard(board);
            updateGameOver(true);
            updateMessage("It's a draw!")
          } else {
            updateBoard(board);
            updateCurrentPlayer(togglePlayer())
          }
        } else {
          updateMessage('Game over. Start a new game to continue.')
        }
      }
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
  function check(board) {
    return vertical(board)
    || diagonalRight(board)
    || diagonalLeft(board)
    || horizontal(board)
    || draw(board);
  }

  return (
    <div className="App">
      <h1>Connect 4</h1>
      <table border="0" cellSpacing="0" cellPadding="0">
         <thead>
         </thead>
         <tbody>
           {board.map((row, i) => (<Row key={i} row={row} play={play} />))}
         </tbody>
       </table>
       <div className="button" onClick={() => {loadBoard()}}>New Game</div>
       <p className="message">{message}</p>
     </div>
  );
}

export default App;
