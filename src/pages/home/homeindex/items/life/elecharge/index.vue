<template>
    <div>
    <van-divider
        contentPosition="center"
        customStyle="color: blue; border-color: #1989fa; font-size: 18px;"
        hairline
    >
        {{items[id]}}
    </van-divider>

    <van-empty description="等待后期开放!!!"/>
    </div>
</template>

<script setup>
import {useRoute} from "vue-router";
let items=['水费','电费','燃气费']
let route=useRoute()
let id=route.query.id-1
</script>

<style scoped>

</style>