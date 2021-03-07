import { PLAYER_X } from './constants';

const generateGrid = () => {
  return Array.from(new Array(9), (x) => null);
};

export const getInitialState = () => ({
  grid: generateGrid(),
  winner: null,
  tie: false,
  turnCounter: 1,
  playerTurn: PLAYER_X,
  winningCells: null,
});

export default getInitialState;
