<template>
<!--    <van-nav-bar
        left-arrow
        @click-left="onClickLeft"
    />-->
    <div>
<div class="con">
    <div class="box" v-if="m.length!=0" @click="readbook($event)" :class="ani?'box_active':'box_pause'">
        <span style="--i:1"><img :src="m[0].sr" b="0"> </span>
        <span style="--i:2"><img :src="m[1].sr" b="1"> </span>
        <span style="--i:3"><img :src="m[2].sr" b="2"> </span>
        <span style="--i:4"><img :src="m[3].sr" b="3"> </span>
        <span style="--i:5"><img :src="m[4].sr" b="4"> </span>
        <span style="--i:6"><img :src="m[5].sr" b="5"> </span>
        <span style="--i:7"><img :src="m[6].sr" b="6"> </span>
        <span style="--i:8"><img :src="m[7].sr" b="7"> </span>
    </div>
</div>
    <transition
        name="animate__animated animate__bounce"
        enter-active-class="animate__rotateIn"
        leave-active-class="animate__rotateOut"
    >
    <van-overlay :show="show">
        <div class="wrapper" @click.self="close">
            <div class="block" >
                <div style="overflow: auto">
                    <div style="float:left; clear: both;" align="center">
                        <img img :src="m[b].sr"  alt="" hspace="8"><br /> <span class="a">{{m[b].t}}</span>
                    </div>
                    {{m[b].d}}
                </div>

            </div>
        </div>
    </van-overlay>
    </transition>
    </div>
</template>

<script setup>
import 'animate.css'
import {getCurrentInstance, onBeforeMount, onMounted, ref} from "vue";

let {proxy}=getCurrentInstance()
let m=ref([])
onBeforeMount(async ()=>{
    let r=await proxy.$mock.get('/book')
    if (r.code==200) m.value=r.data
})
let b=ref(0)
let show=ref(false)
let ani=ref(true)
// let ani
function readbook(e){
    b.value=e.target.getAttribute('b')
  /*  ani=e.target.parentNode.parentNode
    ani.style.animation=`paused`*/
    ani.value=false
    show.value=true
}
onMounted(()=>{
    console.log(proxy,'aaa')
    console.log(proxy.$refs)
})
let close=()=>{
    show.value=false
    ani.value=true
    // ani.style.animation=``
}
</script>

<style scoped lang="less">
.con{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    overflow: hidden;
}
.con{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #000;
}
.box{
    position: relative;
    width: 200px;
    height: 200px;
    transform-style: preserve-3d;
    animation: animate 8s ease-in-out infinite alternate;
    /*&:hover{
        animation-play-state: paused;
    }*/
}
.box_active{
    animation-play-state: running;
}
.box_pause{
    animation-play-state: paused;
}
@keyframes animate {
    0%{
        transform: perspective(1000px) rotateX(0deg) rotateY(0deg);
    }
    100%{
        transform: perspective(1000px) rotateX(360deg) rotateY(360deg);
    }
}
.box span{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform-origin: center;
    transform-style: preserve-3d;
    transform: rotateX(calc(var(--i)*45deg)) translateZ(300px);
}
.box span img{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    .block{
        padding: 5px;
        width: 420px;
        height: 620px;
        background-color: #fff;
        overflow: auto;
       >div{
           overflow: auto;
           font-size: 22px;
           img{
               width: 200px;
           }
           .a{
               display: block;
               width: 210px;
               overflow: auto;
               font-size: 20px;
               color: #ffc107;
           }
       }
    }
}

</style>