import req from "../../utils/request";
import api from "../../utils/interface";
// import {getStorage,setStorage} from "../utils/storage";

const actions={
    async getService({commit}){
        let r=await req.get(api.all_service)
        if (r.code==200) commit('addService',r.rows)
    },
    async getNews({commit}){
        let r=await req.get(api.hot_news)
        if (r.code==200) commit('addNews',r.rows)
    }
}
const mutations={
    addService(s,i){
        // setStorage('service',i)
    },
    addNews(s,i){
        // setStorage('news',i)
        s.news=i
    },
}
const state={
    // service:getStorage('service'),
    news:/*getStorage('news'),*/[]
}
const getters={

}
export default {
    namespaced:true,
    actions,mutations,state,getters
}