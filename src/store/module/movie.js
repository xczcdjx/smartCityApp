import req from "../../utils/request";
import api from "../../utils/interface";
import {getStorage,setStorage} from "../../utils/storage";
const actions={
    async getMovie({commit}){
        let r=await req.get(api.movie_list)
        if (r.code==200) commit('addMovie',r.rows)
    },
    async getPreview({commit}){
        let r=await req.get(api.movie_preview)
        if (r.code==200) commit('addPreview',r.rows)
    },
    async getTheater({commit}){
        let r=await req.get(api.movie_theater)
        if (r.code==200) commit('addTheater',r.rows)
    },
    async getStarnews({commit}){
        let r=await req.get(api.movie_news)
        if (r.code==200) commit('addStarnews',r.rows)
    }
}
const mutations={
    addMovie(m,i){
        // setStorage('movielist',i.slice(1))
        m.movielist=i.slice(1)
    },
    addPreview(m,i){
        i.reverse()
        // setStorage('moviepreview',i)
        m.preview=i
    },
    addTheater(m,i){
        // setStorage('movietheater',i)
        m.theater=i
    },
    addStarnews(m,i){
        // setStorage('starnews',i)
        m.starnews=i
    }
}
const state={
    movielist:/*getStorage('movielist')*/[],
    preview:/*getStorage('moviepreview')*/[],
    theater:/*getStorage('movietheater')*/[],
    starnews:/*getStorage('starnews')*/[],
}
const getters={

}
export default {
    namespaced:true,
    actions,mutations,state,getters
}