<template>
    <div>


    <van-tabs v-model:active="active">
        <van-tab title="九宫格" :replace="true" :to="{name:'grid'}">

        </van-tab>
        <van-tab title="抽奖" :replace="true" :to="{name:'raffle'}">

        </van-tab>
    </van-tabs>

    <router-view/>
    </div>
</template>

<script setup>
import {ref} from "vue";

let active=ref(0)
console.log(active.value)
</script>

<style scoped>

</style>