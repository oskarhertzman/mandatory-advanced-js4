const Reducer = (state, action) => {
switch (action.type) {
  case '1':
    return {
      player: '1',
      prevPlayer: state.player,
    };
  case '2':
    return {
      player: '2',
      prevPlayer: state.player,
    };
  case "undo":
    return {
      player: state.prevPlayer,
      prevPlayer: null,
    };
  default:
    return state;
  }
}
export default Reducer;
