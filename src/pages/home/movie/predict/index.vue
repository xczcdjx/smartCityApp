<template>
    <div>

    <van-search
        v-model="search"
        placeholder="搜索电影"
        input-align="center"
        @search="onSearch"
    />
    <div class="top">
        <van-icon name="location-o" />
        我在:{{school}}
    </div>

    <van-grid :gutter="10" :column-num="3" class="bot" v-show="flag">
        <van-grid-item  v-for="(v,i) in list" :key="i" @click="predict(i)">
            <van-image :src="proxy.$a.baseURL+v.cover" />
            <span>{{v.name}}</span>
        </van-grid-item>
    </van-grid>

    <van-empty image="error" description="未找到电影" v-show="!flag"/>
    </div>

</template>

<script setup>
import {computed, getCurrentInstance, nextTick, onMounted, ref, watch, watchEffect} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
let store=useStore()
let router=useRouter()
let {proxy}=getCurrentInstance()
let school=ref('武汉');
let list=computed(()=>{
    return store.state.movie.movielist.filter((it,i2)=>{
        return it.name.indexOf(search.value)!=-1
    })
})
let flag=ref(true)
onMounted(()=>{
    watchEffect(()=>{
        let len=list.value.length
        s2=search.value.length
        if (len==0){
            flag.value=false
        }
        if (s2==0){
            search.value=''
        }
    })
})
let s2
let search=ref('')
let onSearch=()=>{
    // console.log(search.value)
    setTimeout(()=>{
        search.value=''
        flag.value=true
    },5000)
}
let predict=(i)=>{
    // console.log(i,search.value)
    router.push({
        name:'preDetail',
        query:{
            id:i,
            s:search.value,
            s2
        }
    })
}
</script>

<style scoped lang="less">
.top{
    margin:5px 0 10px 20px;
    font-size: 25px;
    .van-icon{
        color:deepskyblue;
        font-size: 25px;
    }
}
.bot{
    span{
        font-size: 20px;
        margin: 5px 0;
    }
    .van-image{
        height: 200px;
        background-size: auto;
        width: 150px;
    }
}
</style>