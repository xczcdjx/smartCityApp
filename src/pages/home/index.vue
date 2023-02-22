<template>
    <div>

    <van-nav-bar
        :title="route.meta.t"
        :left-arrow="!route.meta.is"
        @click-left="onClickLeft"
        :right-text="route.meta.isr?'退出登录':''"
        @click-right="onClickRight"
    />
<!--    class="page-nav-bar"-->
        <router-view></router-view>

    <van-tabbar v-model="active" route v-show="route.meta.show">
        <van-tabbar-item icon="home-o" :to="{name:'homeindex'}">首页</van-tabbar-item>
        <van-tabbar-item icon="search" :to="{name:'search'}">问答</van-tabbar-item>
        <van-tabbar-item icon="video-o" :to="{name:'movie'}">视频</van-tabbar-item>
        <van-tabbar-item icon="contact" :to="{name:'my'}">我的</van-tabbar-item>
    </van-tabbar>

        <van-overlay :show="upgradeShow">
            <div class="upgradeWrapper" @click.stop>
                <div class="upgradeBlock" >
                    <van-divider>{{upgradeTip.top}}</van-divider>
                    <p v-html="upgradeTip.msg"></p>
                </div>
            </div>
        </van-overlay>

    </div>

</template>

<script>
import {ref, onBeforeMount, computed} from "vue";
import {useRoute, useRouter} from "vue-router";
import {removeStorage} from "../../utils/storage";
import {useStore} from "vuex";
import {Dialog, Toast} from "vant";

export default {
    name: "index",
    setup(){
        let router=useRouter()
        let route=useRoute()
        const store=useStore()
        let active=ref(0)
        let onClickLeft=()=>{
            router.back()
        }
       /* onBeforeMount(()=>{
            store.dispatch('news/getService')
            store.dispatch('news/getNews')
            store.dispatch('deliver/getMerchant')
            store.dispatch('job/getJobs')
            store.dispatch('mock/getMenu')
        })*/
        let onClickRight=()=>{
            // console.log('dddd')
            Dialog.confirm({
                title: '确认退出当前账户吗?',
                message:
                    '退出后你将无法使用全站功能,当然你也可以选择重新登录获取资源!!!',
            })
                .then(() => {
                    Toast.loading({
                        message: '稍等...',
                        forbidClick: true,
                        loadingType: 'spinner',
                    });
                    removeStorage('s_appkey')
                    setTimeout(()=>{
                        /*router.replace({
                            name:'Answer'
                        })*/
                        window.location.reload()
                    },1000)
                })
                .catch(() => {
                    Toast('你已取消!!!')
                    // on cancel
                });
        }

        const upgradeShow=computed(()=>{
            let r=store.state.user.upgrade.run
            // console.log(r)
            /*if (r===1){
                return false
            }else {
                return true
            }*/
            return false
        })
        const upgradeTip=computed(()=>store.state.user.upgrade)

        return{
            active,
            onClickLeft,route,onClickRight,upgradeShow,upgradeTip
        }
    }
}
</script>

<style scoped>
/*.van-nav-bar{
    position: fixed;
}*/
</style>