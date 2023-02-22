import api from "../../utils/interface";
import req from "../../utils/request";
// import {getStorage,setStorage} from "../utils/storage";
const actions={
    async getMerchant({commit}){
       let r=await req.get(api.deliver_merchant)
        if (r.code==200) commit('addMerchant',r.rows)
    }
}
const mutations={
    addMerchant(s,i){
        // setStorage('merchant',i)
        s.merchant=i
    }
}
const state={
    // merchant:getStorage('merchant')
    merchant:[]
}
const getters={

}
export default {
    namespaced:true,
    actions,mutations,state,getters
}
