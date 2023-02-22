<template>
    <div class="contain">
        <h4>{{da.title}}</h4>
        <div class="a">
            <span>{{da.time}}</span>
            <span>{{da.src}}</span>
        </div>
        <van-image radius="10" :src="da.pic" fit="fill"/>
        <div class="b" v-html="da.content"></div>
    </div>
<!--    {{da}}-->

</template>

<script setup>
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import {computed} from "vue";

let route=useRoute()
let store=useStore()
let da=computed(() => store.state.search.astageD[route.query.inde])
</script>

<style scoped lang="less">
*{
    margin: 0;
    padding: 0;
}
.contain{
    width: 100%;
    margin: 15px 10px 120px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    h4{
        width: 90%;
        text-align: center;
        font-size: 35px;
    }
    >.a{
        margin: 5px 0;
        width: 80%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        font-size: 25px;
    }
    >.b{
        width: 90%;
        font-size: 30px;
        color: #464646;
    }
    .van-image{
        //border-radius: ;
        width: 95%;
        height: 400px;
    }
}
</style>