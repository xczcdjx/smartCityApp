<template>
    <div>

    <van-empty description="该功能暂未开放!!!"/>
    </div>

</template>

<script setup>
import {useRoute} from "vue-router";
import {computed, watch, watchEffect} from "vue";

let route=useRoute()
let id=computed(()=>{
    return route.query.id
})
</script>

<style scoped>

</style>