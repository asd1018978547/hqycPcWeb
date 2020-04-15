//登陆信息
export const state = () => ({
    logined: false,
    loginedUser: {
        name: "",
        avatar: "",
        token: "",
        tokenExpirationTime: "",
        userSN: ""
    }
})
export const getters = {
    getLoginStatus() {
        mutations.LOGIN(state);
    }
};
export const mutations = {
    //登录
    LOGIN(state) {
        let user = JSON.parse(localStorage.getItem('user'));
        if (user == null) return;
        if (new Date().getTime() > new Date(user.tokenExpirationTime).getTime()) {
            localStorage.removeItem('user');
            mutations.LOGOUT(state);
            return;
        }
        state.logined = true;
        state.loginedUser.name = user.name;
        state.loginedUser.avatar = user.avatar;
        state.loginedUser.token = user.token;
        state.loginedUser.tokenExpirationTime = user.tokenExpirationTime;
        state.loginedUser.userSN = user.userSN;
        state.loginedUser.isMember = user.isMember;  //是否会员
        state.loginedUser.levelId = user.levelId;   //会员等级
        state.loginedUser.summary = user.summary;   //会员等级描述
        state.loginedUser.retailerAuthStatus = user.retailerAuthStatus; 
        localStorage.setItem('user', JSON.stringify(user))
    },
    //登出
    LOGOUT(state) {
        localStorage.removeItem('user');
        state.logined = false;
        state.loginedUser.name = "";
        state.loginedUser.avatar = "";
        state.loginedUser.token = "";
        state.loginedUser.tokenExpirationTime = "";
        state.loginedUser.userSN = "";
        state.loginedUser.isMember = false;  
        state.loginedUser.levelId = 0;   
        state.loginedUser.summary = '';   
        state.loginedUser.retailerAuthStatus = 0; 
    },
    changeUser(state,{key,val}){
        state.loginedUser[key] = val;
        localStorage.setItem('user',JSON.stringify(state.loginedUser));
    }
};
export const actions = {
    login({ commit }) {
        commit('LOGIN')
    },
    logout({ commit }) {
        commit('LOGOUT')
    }
};

// const login = {
//     state: state,
//     getters: getters,
//     actions: actions,
//     mutations: mutations
// }
// export default login;