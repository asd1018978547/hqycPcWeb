import $store from './loginStatus';
import {
  API
} from "~/_config/API.js";
export const state = () => ({
    boundData:[],
    directData:[],
    ybData: [],
})

export const getters = {
    len:state =>{
      let num = 0
      state.boundData.map(v => {
        num += v.Count
      })
      state.directData.map(v => {
        num += v.Count
      })
      state.ybData.map(v => {
        num += v.Count
      })
        return num
    }
}

export const mutations = {
    setBoundData(state,data){
        state.boundData = data;
    },
    setDirectData(state,data){
        state.directData = data;
    },
    setYbData(state, data) {
      state.ybData = data;
    }
}

export const actions = {
    GETCARLEN({commit}, token){
        getCarList(token,1, (res) => {
            commit('setBoundData',res.Data);
            getCarList(token,2, (res) => {
                commit('setDirectData',res.Data);
                getCarList(token,3, (res) => {
                    commit('setYbData', res.Data);
                },()=>{
                    commit('setYbData', []);
                })
            },()=>{
                commit('setDirectData',[]);
            })
        },()=>{
            commit('setBoundData',[]);
        });
    }
}

function getCarList(token,type, callback, fn) {
    API.cartList({
      token: token,
      expressType: type
    }).then(res => {
        if(res.ResponseId == 0) {
            callback(res);
        }else{
            if(fn && fn instanceof Function)fn();
        }
    })
}