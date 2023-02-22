<template>
    <div>

    <van-divider
        contentPosition="center"
        customStyle="color: blue; border-color: #1989fa; font-size: 18px;"
        hairline
    >
        天下美食,为快不破
    </van-divider>

    <van-tabs v-model:active="active" @click-tab="onClickTab">
        <van-tab title="菜谱搜索" :replace="true" :to="{name:'recipesSearch'}"></van-tab>
        <van-tab title="菜谱分类" :replace="true" :to="{name:'recipesClassify'}"></van-tab>
    </van-tabs>



    <router-view></router-view>
    </div>

</template>

<script setup>
import {ref} from "vue";
let search=ref()
let active=ref(0)
let onClickTab=(e)=>{
    active.value=e.name
    console.log(active.value)
}
let searchRec=()=>{
    console.log('dddd')
}
</script>

<style scoped>

</style>