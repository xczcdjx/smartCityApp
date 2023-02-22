import mock from "../../utils/mockRequest";
import axios from "axios";
import {getStorage, setStorage} from "../../utils/storage";

const actions = {
    /*async getSearch(s, {u1, u2, se}) {
        if (se == undefined) se = s.state.result
        console.log('sss', se)
        // let r=await req.get(`https://www.hongtu.fun/api/getNews?clientId=15623012761&key=VhaZs16539870015813ghph&channel=${i}`)
        // if (r.code==200) s.commit('addSearch')
        /!*console.log(s)
        console.log(i)*!/
        /!*let r=await axios.get(`https://www.hongtu.fun/api/searchNews?clientId=${u1}&key=${u2}&keyword=${se}`)
        console.log(r.data.result)
        if (r.data.status){
            // setStorage('searchUser',)
            s.commit('loginEnter',r.data.result.list)
        }else {
            setTimeout(()=>{

            },2000)
        }
        console.log(u1,u2,se)*!/

        // mock数据模拟
        let r = await mock.get('/search')
        s.commit('loginEnter', r.data)
        // console.log(r)
    },*/
    async totalNews(s, {u1, u2}) {
        let allDatas=[]
        let r1 = await axios.get(`https://www.hongtu.fun/api/searchNews?clientId=${u1}&key=${u2}&keyword=头条`)
        let r2 = await axios.get(`https://www.hongtu.fun/api/searchNews?clientId=${u1}&key=${u2}&keyword=新闻`)
        let r3 = await axios.get(`https://www.hongtu.fun/api/searchNews?clientId=${u1}&key=${u2}&keyword=财经`)
        let r4 = await axios.get(`https://www.hongtu.fun/api/searchNews?clientId=${u1}&key=${u2}&keyword=体育`)
        let r5 = await axios.get(`https://www.hongtu.fun/api/searchNews?clientId=${u1}&key=${u2}&keyword=娱乐`)
        /*let r6 = await axios.get(`https://www.hongtu.fun/api/searchNews?clientId=${u1}&key=${u2}&keyword=军事`)
        let r7 = await axios.get(`https://www.hongtu.fun/api/searchNews?clientId=${u1}&key=${u2}&keyword=教育`)
        let r8 = await axios.get(`https://www.hongtu.fun/api/searchNews?clientId=${u1}&key=${u2}&keyword=科技`)
        let r9 = await axios.get(`https://www.hongtu.fun/api/searchNews?clientId=${u1}&key=${u2}&keyword=NBA`)
        let r10 = await axios.get(`https://www.hongtu.fun/api/searchNews?clientId=${u1}&key=${u2}&keyword=星座`)*/
        if (r1.data.status) {allDatas.push(r1.data.result) }
        if (r2.data.status) {allDatas.push(r2.data.result) }
        if (r3.data.status) {allDatas.push(r3.data.result) }
        if (r4.data.status) {allDatas.push(r4.data.result) }
        if (r5.data.status) {allDatas.push(r5.data.result) }
        /*if (r6.data.status) {allDatas.push(r6.data.result) }
        if (r7.data.status) {allDatas.push(r7.data.result) }
        if (r8.data.status) {allDatas.push(r8.data.result) }
        if (r9.data.status) {allDatas.push(r9.data.result) }
        if (r10.data.status) {allDatas.push(r10.data.result)}*/
        s.commit('addDatas',allDatas)
    }
}
const mutations = {
    addSearch(s, i) {
// setStorage('',i)
    },
    changeResult(s, i) {
        // console.log(i)
        setStorage('search_v',i)
        // s.result = i
    },
    loginEnter(s, i) {
        s.datas = i
    },
    addDatas(s,i){
        setStorage('alldatas',i)
        // s.alldata=i
    },
    allstageD(s,i){
        s.astageD=i
    }
}
const state = {
// search:getStorage()
    result: getStorage('search_v')||'头条',
    datas: [],
    alldata:getStorage('alldatas'),
    astageD:[]
}
const getters = {}
export default {
    namespaced: true,
    actions, mutations, state, getters
}
