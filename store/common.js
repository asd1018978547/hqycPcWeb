//登陆信息
export const state = () => ({
  navList: []
})
export const getters = {
  getNavList: state => {
    return state.navList
  }
};
export const mutations = {
  //登录
  SETNAVLIST(state, arr) {
    state.navList = arr
  }
};
export const actions = {
  setNavList({
    commit
  }) {
    commit('SETNAVLIST')
  },
};
