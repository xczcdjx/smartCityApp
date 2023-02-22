<template>
<!--    <van-nav-bar
        title="我的"
    />-->
    <div class="contain">
    <div class="top" v-if="!info">
        <van-icon name="play-circle-o" size="180px"/>
        <div class="aa">
            <router-link to="/register">注册</router-link>
            <router-link to="/login">登录</router-link>
        </div>
    </div>
    <div class="bot" v-if="info">
    <div class="a">
        <van-image :src="info.avatar?proxy.$a.baseURL+'/prod-api'+info.avatar:wg" fit="fill" round></van-image>
<!--        {{proxy.$a.baseURL+'/prod-api'+info.avatar}}-->
        <span>账号:{{info.userName}}</span>
    </div>
    <van-cell-group>
        <van-cell title="个人信息" @click="updatei()" is-link icon="user-o"/>
        <van-cell title="订单列表" @click="updatel()" is-link icon="shopping-cart-o"/>
        <van-cell title="修改密码" @click="updatep()" is-link icon="setting-o"/>
        <van-cell title="意见反馈" @click="addc()" is-link icon="comment-o"/>
<!--        <van-cell title="查看意见" @click="addc()" is-link icon="coupon-o"/>-->
    </van-cell-group>
    <div style="text-align: center;margin: 20px 0">
        <van-button type="warning" round  @click="back">退出登录</van-button>
    </div></div>
    </div>
</template>

<script>
import {ref, computed, getCurrentInstance} from "vue";
import wg from '../../../assets/comment/wg.jpg'
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {getStorage, removeStorage} from "../../../utils/storage";
import {Dialog, Toast} from "vant";

export default {
    name: "index",
    setup(){
        let profile=ref(wg)
        let $router=useRouter()
        let store=useStore()
        let info=getStorage('info')
        // console.log(info)
        let {proxy}=getCurrentInstance()
        // let show=computed(()=>store.state.user.info)
        // console.log(show)
        let updatei=()=>{
            $router.push({
                name:'updateinfo'
            })
        }
        let updatel = () => {
            $router.push({
                name:'updatelist'
            })
        }
        let updatep=()=>{
            $router.push({
                name:'updatepassword'
            })
        }
        let addc=()=>{
            $router.push({
                name:'addcomment'
            })
        }
        let back=()=>{
            Dialog.confirm({
                title: '确认退出?',
                message:
                    '如果退出,你将无法使用众多功能,如果想使用下次还得登录,确认退出登录吗?',
            })
                .then(() => {
                    // on confirm
                    $router.replace('/login')
                    setTimeout(()=>{
                        removeStorage('info')
                        // window.location.reload()
                    },100)
                })
                .catch(() => {
                    // on cancel
                    Toast('已取消')
                });
        }
        return {
            profile,info,updatel,updatep,updatei,addc,back,proxy,wg
        }
    }
}
</script>

<style scoped lang="less">
.contain{
    overflow: hidden;
    .top{
        background-color: rgba(255,193,7,50%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .aa{
            a{
                color: white;
                font-size: 36px;
                margin: 0 30px;
            }
        }
    }
    .bot{
        .a{
            padding: 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 350px;
            width: 100%;
            .van-image{
                width: 150px;
                background-size: cover;
                height: 150px;
            }
        }
        span{
            color: darkgray;
            font-size: 25px;
        }
    }
}
</style>