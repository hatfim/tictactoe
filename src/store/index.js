import mutations from './mutations';
import state from './state';


function createStore(Vuex) {
  return new Vuex.Store({
    mutations,
    state,
  });
}

export default createStore;
