import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const defaultConfig = {
  type: 'scalar',
  showTicks: true,
  topHeader: 'Top header',
  bottomHeader: 'Bottom header',
  leftHeader: 'Left header',
  rightHeader: 'Right header',
  showTicks: true,
  showColors: true,
  showVerticalAxis: true,
  showHorizontalAxis: true,
  minXValue: -5,
  minYValue: -5,
  maxXValue: 5,
  maxYValue: 5,
};

export default new Vuex.Store({
  state: {
    loading: false,
    config: {
      ...defaultConfig,
    },
    list: [],
  },
  mutations: {
    addListItem(state, description: string) {
      state.list.push({
        description,
        x: 600,
        y: 24 + (state.list.length * 24),
      });
    },
    removeItem(state, index) {
      state.list.splice(index, 1);
    },
    moveUpItem(state, index) {
      const swap = state.list[index];
      state.list[index] = state.list[index - 1];
      state.list[index - 1] = swap;
      // Wake up the array
      state.list = [
        ...state.list,
      ];
    },
    moveDownItem(state, index) {
      const swap = state.list[index];
      state.list[index] = state.list[index + 1];
      state.list[index + 1] = swap;
      // Wake up the array
      state.list = [
        ...state.list,
      ];
    },
    loadFromJson(state, data) {
      state.list = data.list;
      state.config = {
        ...defaultConfig, // Makes it more backwards-compatible
        ...data.config,
      };
    },
    loadFromCsv(state, data) {
      state.list = [];
      data.forEach((item, index) => {
        state.list.push({
          description: item,
          x: 550,
          y: 24 + (index * 24),
        });
      });
    },
    clearList(state) {
      state.list = [];
      state.config = {
        ...defaultConfig,
      };
    },
    loading(state, loading) {
      state.loading = loading;
    },
  },
  getters: {
    loading(state): boolean {
      return state.loading;
    },
    config(state): any {
      return state.config;
    },
    list(state): any[] {
      return state.list;
    },
  },
  actions: {

  },
});
