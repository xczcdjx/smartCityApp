<template>
    <div>

    <div class="detail">
        <h4>{{s.title}}</h4>
        <div>猫眼电影&nbsp;{{s.createTime}}</div>
        <van-image :src="proxy.$a.baseURL+s.cover" fit="fill"></van-image>
        <div v-html="s.content"></div>
    </div>
    <div class="detail2">
        <div>
            <span>{{s.likeNum}}&nbsp;赞&nbsp;<van-icon name="good-job-o" /></span>
            <van-button type="danger" round size="small" plain @click="s.likeNum++">点赞</van-button>
        </div>
    </div>
    </div>

</template>

<script setup>
import {computed, getCurrentInstance, ref} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";
let store=useStore()
let route=useRoute()
let {proxy}=getCurrentInstance()
let s=computed(()=>store.state.movie.starnews[route.query.id])
</script>

<style scoped lang="less">
.detail{
    h4{
        font-size: 45px;
        text-align: center;
    }
    padding: 5px;
    .van-image{
        width: 100%;
    }
    >div{
        margin: 5px 0 120px 0;
     font-size: 30px;
        color: #464646;
    }
}
.detail2{
    position: fixed;
    bottom: 10%;
    width: 100%;
    div{
        span{
            color: #726f6f;
            font-size: 30px;
        }
        display: flex;
        align-items: center;
        justify-content: space-around;
        background: rgba(255, 255, 255, 0.4);
        height: 100px;
        width: 100%;
    }
}
</style>