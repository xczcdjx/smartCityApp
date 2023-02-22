import api from "../../utils/interface";
import req from "../../utils/request";
// import {getStorage,setStorage} from "../utils/storage";
const actions={
    async getJobs({commit}){
        let r=await req.get(api.job_list)
        if (r.code==200){
            let s
           s=r.rows.filter((item)=>{
                return item.professionName!=null
            })
            commit('addJob',s)
        }
    }
}
const mutations={
    addJob(s,i){
        // setStorage('job',i)
        s.jobs=i
    }
}
const state={
    // jobs:getStorage('job')
    jobs:[]
}
const getters={
    Fjobs(s,i){

    }
}
export default {
    namespaced:true,
    actions,mutations,state,getters
}
