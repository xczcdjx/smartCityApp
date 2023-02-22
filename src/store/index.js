import {createStore} from "vuex";
import createPersistedState from 'vuex-persistedstate'
import user from './module/user'
import news from './module/news'
import movie from "./module/movie";
import deliver from "./module/deliver";
import search from "./module/search";
import job from "./module/job";
import library from "./module/library";
import mock from "./module/mock";
export default createStore({
    modules:{
        user,news,movie,deliver,search,job,mock,library
    },
    plugins: [createPersistedState({
        storage: window.sessionStorage,
        /*reducer(val) {
            return {
                // 只储存state中的assessmentData
                assessmentData: val.assessmentData
            }
        }*/
        paths: ["news",'job','deliver','mock','movie','search','library']
    })]
})
