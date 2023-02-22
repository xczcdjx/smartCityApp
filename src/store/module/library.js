import req from "../../utils/request";
const actions={
    async getLibrary({commit}){
        let r=await req.get('/prod-api/api/digital-library/library/list')
        if (r.code===200) commit('addLibrary',r.rows)
    }
}
const mutations={
    addLibrary(s,i){
        s.library=i
    }
}
const state={
    library:[]
}
const getters={}
export default {
    namespaced:true,
    actions,mutations,state,getters
}
