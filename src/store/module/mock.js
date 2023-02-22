import mock from "../../utils/mockRequest";
import {getStorage,setStorage} from "../../utils/storage";
const actions={
    async getMenu({commit}){
        let r=await mock.get('/menu')
        if (r.code==200) commit('addMenu',r.data)
    }
}
const mutations={
    addMenu(s,i){
        // setStorage('menu',i)
        s.menu=i
    }
}
const state={
    // menu:getStorage('menu')
    menu:[]
}
const getters={

}

export default {
    namespaced:true,
    actions,mutations,state,getters
}
