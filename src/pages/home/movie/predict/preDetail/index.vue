<template>
<div class="top">
        <van-image :src="proxy.$a.baseURL+pre.cover"></van-image>
    <div class="a">
        <h4>{{ pre.name }}</h4>
        <span v-html="pre.introduction"></span>
    </div>
</div>
</template>

<script setup>
import {useRoute} from "vue-router";
import {computed, getCurrentInstance} from "vue";
import {useStore} from "vuex";
let route=useRoute();
let {proxy}=getCurrentInstance()
let id=route.query.id
let s=route.query.s
let s2=route.query.s2
let store=useStore()
let pre=computed(()=>{
    if (s2==0){
        return store.state.movie.movielist[id]
    }else if (s2!=0){
       return store.state.movie.movielist.filter(it=>{
            return it.name.indexOf(s)!=-1
        })[id]
    }
})
// console.log(pre.value)
</script>

<style scoped lang="less">
.top{
    .a{
        padding: 5px;
        h4{
            font-size: 36px;
            text-align: center;
        }
        span{
            color: darkgray;
            font-size: 28px;
        }
    }
}
</style>