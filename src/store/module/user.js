import req from "../../utils/request";
import api from "../../utils/interface";
import axios from "axios";
const actions={
    async getUpgrade({commit}) {
        try {
            let r = await axios.get('https://limitation.work/verify/upgrade')
            // console.log(r.data)
            if (r.data.code === 200) commit('putUpgrade', r.data.data)
        } catch (e) {
            console.log(e)
        }
    },
    async getInfo({commit}){
        let r=await req.get(api.user_info)
        if (r.code==200) commit('addInfo',r.user)
    }
}
const mutations={
    addInfo(m,i){
        m.info=i
    },
    putUpgrade(m,i){
        m.upgrade=i
    },
}
const state={
    info:[],
    upgrade:{
        run:0,
        top:'网络错误',
        msg:'请打开手机网络后重试'
    },
}
const getters={

}
export default {
    namespaced:true,
    actions,mutations,state,getters
}