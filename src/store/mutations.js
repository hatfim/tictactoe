import { getInitialState } from './state';

export const SET_BASE_STATE = 'SET_BASE_STATE';
export const RESET_STATE = 'RESET_STATE';

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
};
