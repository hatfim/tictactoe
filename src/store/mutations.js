import { getInitialState, gameState } from './state';

export const SET_BASE_STATE = 'SET_BASE_STATE';
export const RESET_STATE = 'RESET_STATE';
export const RESET_GAME = 'RESET_GAME';

export default {
  [SET_BASE_STATE](state, { name, payload }) {
    state[name] = payload;
  },

  [RESET_STATE](state) {
    const initialState = getInitialState();
    Object.keys(initialState).forEach((key) => {
      state[key] = initialState[key];
    });
  },
  [RESET_GAME](state) {
    const initialState = getInitialState();
    Object.keys(gameState).forEach((key) => {
      state[key] = initialState[key];
    });
  },

};
