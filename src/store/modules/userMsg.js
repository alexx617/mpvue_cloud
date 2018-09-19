import {
  SET_USER_MSG
} from '../mutation_types';
export default {
  state: {
    services: {}
  },
  mutations: {
    [SET_USER_MSG](state, data) {
      state.services[Object.keys(data)] = data[Object.keys(data)];
    }
  },
  actions: {
    SET_USER_MSG({
      commit
    }, data) {
      commit(SET_USER_MSG, data);
    }
  }
};
