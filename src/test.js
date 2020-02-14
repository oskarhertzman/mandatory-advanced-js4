play(c) {
  if (!gameOver) {
    // Place piece on board
    for (let r = 5; r >= 0; r--) {
      if (!board[r][c]) {
        let newBoard = [...board];
        newBoard[r][c] = currentPlayer;
        updateBoard(newBoard);
        board[r][c] = currentPlayer;
       console.log(this.state.currentPlayer)
        break;
      }
