<template>
<div class="contain">
    <van-image :src="top" radius="10" fit="fill"></van-image>
    <div class="a">
        <h4>{{content.t}}</h4>
        <span>{{content.c}}</span>
    </div>
    <div class="b">
        <van-grid :column-num="3">
            <van-grid-item text="服务内容" icon="smile-o" :to="{name:'stagecontent'}" :icon-color="i==0?'blue':''" replace @click="i=0"/>
            <van-grid-item text="驿站详情" icon="more-o" :to="{name:'stagedetail'}"  :icon-color="i==1?'blue':''"  @click="i=1" replace/>
            <van-grid-item text="人才政策" icon="phone-circle-o" :to="{name:'stagecultivate'}"  :icon-color="i==2?'blue':''"  @click="i=2" replace/>
        </van-grid>
    </div>

    <router-view></router-view>

</div>
</template>

<script setup>
import top from '../../../../../assets/service/11.jpeg'
import {reactive, ref} from "vue";
let content=reactive({
    t:'深圳青年驿站',
    c:`“青年驿站”是深圳共青团为来深求职的应届毕业生免费提供短期住宿和就业指导的公益项目
    ，旨在解决毕业生求职难、住宿难的燃眉之急，打造“来深青年之家”`
})
let i=ref(0)
</script>

<style scoped lang="less">
.contain{
    /*display: flex;
    flex-direction: column;
    align-items: center;*/
    margin: 10px;
    .van-image{
        //border-radius: 10px;
        padding: 10px;
        width: 700px;
        height: 250px;
    }
    div{
        //margin:5px 0;
    }
    .a{
        h4{
            font-size: 36px;
        }
        span{
            font-size: 20px;
            color: #464646;
        }
    }
    .b{
        .van-grid-item{
            cursor: pointer;
        }
    }
}
</style>