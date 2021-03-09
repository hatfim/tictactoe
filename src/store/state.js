import { PLAYER_X } from './constants';

const generateGrid = (size) => {
  const col = Math.pow(size, 2);
  return Array.from(new Array(col), (x) => null);
};

export const gameState = {
  winner: null,
  tie: false,
  turnCounter: 1,
  playerTurn: PLAYER_X,
  winningCells: null,
}

export const getInitialState = () => ({
  gameActive: false,
  boardSize: 3,
  grid: [],
  winningState: [],
  ...gameState
});

export default getInitialState;
