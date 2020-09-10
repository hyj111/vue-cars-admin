import Vue from "vue";
import Vuex from "vuex";
import  {setToken,setUsername} from "@/utils/app"
import config from "./config"
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    toKen:'',
    username:''
  },
  mutations: {
    setToken(state,value){
      setToken(value)
      state.toKen = value
    },
    setUsername(state,value){
      setUsername(value)
      state.username = value
    }
  },
  actions: {},
  modules: {
    config
  }
});
