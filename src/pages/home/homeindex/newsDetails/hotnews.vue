<template>
    <div>
        <van-image :src="proxy.$a.baseURL+d.cover" fit="fill"/>
        <span v-html="d.content"></span>
    </div>
</template>

<script setup>
import {useRoute} from "vue-router";
import {computed, getCurrentInstance} from "vue";
import {useStore} from "vuex";
const {proxy}=getCurrentInstance()
const route=useRoute()
const store=useStore()
let d=computed(()=>store.state.news.news[route.query.id])
</script>

<style scoped lang="less">
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
    margin-bottom: 50px;
}
}
</style>