<template>
    <div>
        <van-image :src="proxy.$a.baseURL+details.cover" fit="fill"/>
        <span v-html="details.content"></span>
    </div>
</template>

<script setup>
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import {computed, getCurrentInstance} from "vue";

let route=useRoute()
let store=useStore()
let {proxy}=getCurrentInstance()
// console.log(route.query.id)
let details=computed(()=>{
    return store.state.news.news[route.query.id]
})
</script>

<style lang="less" scoped>
div{
    margin-bottom: 15%;
    .van-image{
        margin: 5px;
        height: 30%;
    }
    height: 100%;
    width: 100%;
    overflow: hidden;
    span{
        font-size: 18px;
    }
}
</style>