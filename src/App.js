import React, { useState, useEffect, useReducer } from "react";
import {check} from './wincheck/Wincheck.js'
import Row from './board/Row.js';
import Reducer from './reducer/Reducer.js';
import './styles/reset.css';
import './styles/App.css';
require('typeface-montserrat');

function App({ initialValue }) {
  /*-----------------------------------------------------------------------------//
    The game states using react Hooks and Reducer.
  //-----------------------------------------------------------------------------*/
  const [state, dispatch] = useReducer(Reducer, {player: initialValue, prevState: null, });
  const [board, updateBoard] = useState([]);
  const [gameOver, updateGameOver] = useState(false);
  const [message, updateMessage] = useState('');
  /*-----------------------------------------------------------------------------//
    ComponentDidMount() equivalent.
  //-----------------------------------------------------------------------------*/
  useEffect(() => {
    loadBoard();
  }, [])
  /*-----------------------------------------------------------------------------//
    Updates the board array state with 6 subarrays items which themselves
    have 7 items. This simulates the boards 6x7 layout for the upcomping mapping.
  //-----------------------------------------------------------------------------*/
  function loadBoard () {
    let field = [];
    for (let r = 0; r < 6; r++) {
      let row = [];
      for (let c = 0; c < 7; c++) {
        row.push(null)
      }
      field.push(row);
    }
    updateBoard(field);
    updateGameOver(false);
    updateMessage("Player 1's turn")
    dispatch({type: '1'})
  }
  /*-----------------------------------------------------------------------------//
    Toggles the currentPlayer in order to implement turns.
  //-----------------------------------------------------------------------------*/
  function togglePlayer() {
    return (state.player === '1') ? dispatch({type: '2'}) : dispatch({type: '1'});
  }
  /*-----------------------------------------------------------------------------//
    Runs whenever a player makes a move. Tells who's turn it is, places the
    circles and decides which number (1 or 2) to fill the given array spot to.
    Also decides the winner/draw/gameover by using the check(board) function.
  //-----------------------------------------------------------------------------*/
  function play(col) {
      if (!gameOver) {
        for (let row = 5; row >= 0; row--) {
          if (!board[row][col]) {
            let newBoard = [...board];
            newBoard[row][col] = parseInt(state.player, 10);
            updateBoard(newBoard);
            if (state.player === '1') {
              updateMessage("Player 1's turn")
            }
            if (state.player === '2') {
              updateMessage("Player 2's turn")
            }
            if (col === undefined) {
              newBoard[row][col] = state.prevValue;
            }
            break;
          }
        }
          let checkResult = check(board);
          if (checkResult === 1) {
              updateBoard(board);
              updateGameOver(true);
              updateMessage('Player 1 (blue) wins!')
          } else if (checkResult === 2) {
              updateBoard(board);
              updateGameOver(true);
              updateMessage('Player 2 (purple) wins!')
          } else if (checkResult === 'draw') {
              updateBoard(board);
              updateGameOver(true);
              updateMessage("It's a draw!")
          } else {
              updateBoard(board);
              togglePlayer()
          }
        } else {
            updateMessage('Game over. Start a new game to continue.')
        }
      }
  /*-----------------------------------------------------------------------------//
    Game render. Uses Array.prototype.map on the board array to map the
    Row component ((maps the rows) View Row.js ) which itself maps the Cell component
    ((maps the columns) View Cell.js). The 2 level deep map structure enables the
    2-dimentional 6x7 board like rendering structure to the DOM.
  //-----------------------------------------------------------------------------*/
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
