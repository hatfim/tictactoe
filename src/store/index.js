import actions from './actions';
import mutations from './mutations';
import state from './state';


function createStore(Vuex) {
  return new Vuex.Store({
    actions,
    mutations,
    state,
  });
}

export default createStore;
