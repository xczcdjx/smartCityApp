<template>
    <van-swipe :autoplay="3000" @change="onChange"  v-show="show===0?true:false" class="carousel1">
        <van-swipe-item v-for="(image, index) in imglist.slice(1)" :key="index">
            <van-image :src="proxy.$a.baseURL+image.advImg" style="background-size: cover"/>
        </van-swipe-item>
    </van-swipe>

    <van-swipe :autoplay="3000" @change="onChange"  v-show="show===1?true:false" @click="carouselBth(i)" class="carousel2">
        <van-swipe-item v-for="(image, index) in imglist" :key="index">
            <van-image :src="image.imgUrl" style="background-size: cover"/>
        </van-swipe-item>
    </van-swipe>
        <van-swipe  vertical :autoplay="3000" class="carousel3" v-show="show===2?true:false">
            <van-swipe-item v-for="(image, index) in imglist" :key="index">
                <van-image :src="proxy.$a.baseURL+image.advImg" fit="fill"/>
            </van-swipe-item>
        </van-swipe>

</template>

<script>
import {getCurrentInstance} from "vue";
import {provide} from "vue";
import {Toast} from "vant";

export default {
    name: 'index',
    props: ['imglist','show'],
    setup() {
        let {proxy} = getCurrentInstance()
        let onChange = (index) => {
            // provide('carouselI',index)
        }
        const carouselBth=(i)=>{
            console.log(i)
            Toast('别点了,只是给你看的')
        }
        return {
            onChange, proxy,carouselBth
        }
    }
}

</script>

<style scoped lang="less">
.carousel3{
    height: 250px;
    background-size: cover;
}
.carousel2{
    height: 300px;
    background-size: cover;
}
.carousel1{
    height: 300px;
}
.van-swipe{
    .van-image{
        width: 100%;
    }
}
</style>