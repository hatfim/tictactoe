import { SET_BASE_STATE, RESET_GAME } from './mutations';

export default (() => {
  function gameInit({ state, commit }) {
    const col = Math.pow(state.boardSize, 2);
    const payload = Array.from(new Array(col), (x) => null);

    commit(SET_BASE_STATE, {name: 'grid', payload})
    commit(SET_BASE_STATE, {name: 'gameActive', payload: true})
  }

  function gameReset({ commit, dispatch }) {
    commit(RESET_GAME);
    dispatch('gameInit');
  }

  return {
    gameInit,
    gameReset,
  };
})();
