<template>
<div class="contain" v-if="qi">
    <h2>Question</h2>
    <p class="a">{{que}}</p>
    <h2>Answer</h2>
    <p class="b" v-for="(a,i) in answer[qi].a" v-if="isshow2">{{i+1}}：<span @click="details(i)">{{a}}</span></p>
    <transition
        name="animate__animated animate__bounce"
        enter-active-class="animate__bounceInLeft"
        leave-active-class="animate__bounceOutRight"
        appear >
        <div v-show="isshow" class="load">
            <van-loading color="#0094ff" >loading</van-loading>
        </div>
    </transition>
</div>
<!--    {{qi}}-->
<!--    <div>
    <Suspense>
        <template v-slot:default>

        </template>
        <template v-slot:fallback>
            <van-loading color="#0094ff" />
        </template>
    </Suspense></div>-->
</template>

<script setup>
import 'animate.css'
import {useRoute} from "vue-router";
import {getCurrentInstance, onBeforeMount, onMounted, ref} from "vue";
import {Toast} from "vant";

const route=useRoute()
const {proxy}=getCurrentInstance()
let qi=route.query.qi
let que=route.query.que

let answer=ref([])
onBeforeMount(async ()=>{
    let r=await proxy.$mock.get('/wbanswer')
    if (r.code==200) answer.value=r.data
})
onMounted(()=>{
    setTimeout(()=>{
        isshow.value=false
        setTimeout(()=>{
            isshow2.value=true
        },1000)
    },2000)
})
let isshow=ref(true)
let isshow2=ref(false)
let details=(i)=>{
    Toast('该功能暂未开放!!! '+i)
}
</script>

<style scoped lang="less">
.contain{
    margin: 10px 15px 120px 15px;
    text-align: center;
    overflow: hidden;
    border: #2bd2ff solid 1px;
    h2{
      font-size: 36px;
    }
    .a{
        font-size: 30px;
        color: #ffc107;
    }
    p{
        font-size: 20px;
    }
    .b{
        color: #07c160;
        >span{
            cursor: pointer;
            color: purple;
            &:hover{
                color: #ff105e;
                text-decoration: underline;
            }
        }
    }
}
</style>