<template>
<!--    <van-nav-bar
        title="问答"
    />-->
    <div>
    <van-row class="search">
        <van-col span="3" offset="1" class="a">
            <h4>问答</h4>
        </van-col>
        <van-col span="12" offset="1" class="b">
            <van-tabs v-model:active="active" shrink color="skyblue" @click-tab="onClickTab"  animated>
                <van-tab title="首页" :to="{name:'searchHome'}" replace></van-tab>
                <van-tab title="发现" :to="{name:'searchDiscover'}" replace></van-tab>
                <van-tab title="等你来答" :to="{name:'searchReply'}" replace></van-tab>
            </van-tabs>
        </van-col>
        <van-col class="c" span="5">
                <van-icon :name="ic?'chat-o':'chat'" badge="9" @click="tackle"/>
                <van-icon :name="ic?'fire-o':'fire'" color="skyblue" badge="33" @click="tackle"/>
        </van-col>
    </van-row>

<!--        <router-view></router-view>-->

        <router-view v-slot="{ Component }">
            <transition name="slide-fade" mode="out-in" :duration="{ enter: 500, leave: 300 }">
                <component :is="Component" />
            </transition>
        </router-view>
    </div>
</template>

<script setup>
import {useRoute,useRouter} from "vue-router";
import {useStore} from "vuex";
import {computed, getCurrentInstance, onBeforeMount, onMounted, reactive, ref} from "vue";
import {Toast} from "vant";

let router = useRouter()
let store = useStore()
let {proxy} = getCurrentInstance()
let ban=ref()
onBeforeMount(async ()=>{

})


let active=ref(0)
let search=ref('')
let onClickTab=(event)=>{
    // console.log(event)
    active.value=event.name
    // console.log(active.value)
}
let ic=ref(true)
let tackle=()=>{
    Toast('该功能暂未开放')
    ic.value=false
    setTimeout(()=>{
        ic.value=true
    },700)
}
</script>

<style lang="less" scoped>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.search{
    .a{
        margin:1% 5%;
        h4{
            font-size: 40px;
            line-height: 90px;
            color: deepskyblue;
            text-align: center;
        }
    }
    .c{
        display: flex;
        justify-content: space-around;
        align-items: center;
        line-height: 90px;
        .van-icon{
            font-size: 35px;
            cursor: pointer;
        }
    }
}
</style>