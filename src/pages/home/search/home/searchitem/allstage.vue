<template>
<div class="container">
    <van-notice-bar left-icon="bulb-o"  color="#1989fa" background="#ecf9ff" :scrollable="false">
        <van-swipe
            vertical
            class="notice-swipe"
            :autoplay="3000"
            :show-indicators="false"
        >
            <van-swipe-item v-for="t in notice">{{t}}</van-swipe-item>
        </van-swipe>
    </van-notice-bar>

<!--    <div class="top" v-for="(s,i) in (count+1)*3" :key="i" @click="allstageD(i)">-->
    <div class="top" v-for="(s,i) in datas.slice(0,(count+1)*10)" :key="i" @click="allstageD(i)">
        <div>
            <h3>{{s.title}}</h3>
            <span>{{s.content.length/10}}&nbsp;万热度</span>
        </div>
        <van-image fit="fill" :src="s.pic" radius="10"/>
    </div>
    <div class="bot" v-show="foldS">
        <span @click="unfold">展开更多</span><van-icon name="arrow-down" />
    </div>
</div>
</template>

<script setup>
import {useRoute,useRouter} from "vue-router";
import {computed, reactive, watch, watchEffect,ref} from "vue";
import {useStore} from "vuex";


let route=useRoute()
let router=useRouter()
let title=computed(()=>{
    return route.query.t
})
let store=useStore()
let datas=computed(()=>{
    return store.state.search.astageD
})
/*watch(value,(n,o)=>{
    console.log(n,'jwojdo',o)
},{immediate:true})*/
let notice=reactive([
    '怪奇物语第四季volume2将在7.1号Netflix上映',
    '你最成功的一次装逼经历是什么?',
    '为何小学生如此喜欢《孤勇者》这首歌?'
])
let count=ref(0)
let foldS=ref(true)
const unfold=()=>{
    count.value+=1
    console.log(count)
    if (count.value==2){
        foldS.value=false
    }else {

    }
}
function allstageD(i) {
    router.push({
        name:'allstagedetail',
        query:{
            inde:i
        }
    })
}
</script>

<style scoped lang="less">
*{
    padding: 0;
    margin: 0;
}
.container{
    margin: 10px 0 150px 0;
    .van-notice-bar {
        line-height: 40px;
        height: 36px;
        font-size: 20px;
        .van-swipe{
            height: 35px;
        }
    }
    .top{
        background: rgba(255, 193, 7, 0.3);
        padding: 10px;
        width: 95%;
        display: flex;
        justify-content: space-between;
        margin: 15px 10px;
        >div{
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            h3{
                width: 500px;
                font-size: 28px;
                &:hover{
                    color: #07c160;
                }
            }
            span{
                font-size: 18px;
            }
        }
        .van-image{
            width: 150px;
            height: 150px;
        }
    }
    .bot{
        //background: #ffc107;
        display: flex;
        justify-content: center;
        align-items: center;
        >span{
            font-size: 22px;
            cursor: pointer;
            &:hover{
                color: #ff105e;
            }
        }
        .van-icon{
            font-size: 22px;
        }

    }
}

</style>