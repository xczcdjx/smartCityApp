<template>
    <div class="contain">
        <ul class="nav">
            <li class="fli" v-for="(c,i) in classify" :key="i" @mouseenter="mouseIn(i)" :class="{cur:currentIndex==i}">
                {{c.name}}
                <ul>
                    <li  :style="{display:currentIndex===i?'block':'none'}">
                        <van-grid :border="false" :column-num="3">
                            <van-grid-item v-for="(c2,i2) in c.list" :key="i2">
                                <van-button type="success" @click="enter(i,i2)" size="mini">{{c2.name}}</van-button>
                            </van-grid-item>
                        </van-grid>
                    </li>
                </ul>
            </li>
        </ul>
    </div>

<!--    {{classify}}-->
</template>

<script>
import {getCurrentInstance, onBeforeMount, ref, markRaw, onMounted} from 'vue';
import 'animate.css'
import {Toast} from "vant";
export default {
    setup() {
        let classify=ref([])
        let {proxy}=getCurrentInstance()
        markRaw(classify.value)
        onBeforeMount(async ()=>{
            let r=await proxy.$mock.get('/recipes')
            if (r.code==200) classify.value=r.data
        })
        let btn=()=>{
            classify.value=[]
        }
        // console.log(classify)
        onMounted(()=>{

        })

        function mouseIn(i) {
            let t = null;
                if(t!=null){
                    clearInterval(t)
                }
                t = setTimeout(()=>{
                    currentIndex.value=i
                    t=null
                },50)
        }

        let currentIndex=ref(0)
        let enter=(f,b)=>{
            console.log(f,b)
            Toast('该功能暂未开放!!!')
        }
        return {
            mouseIn,
            classify,enter,
            btn,currentIndex
        };
    },
};

</script>

<style scoped lang="less">
.contain{
    position: relative;
    ul{
        list-style: none;
    }
    .nav{
        margin: 5px 0;
        position: absolute;
        line-height: 30px;
        top: 10%;
        left: 5%;
        width: 90%;
        .fli{
            font-size: 40px;
            line-height: 80px;
            //position: relative;
            >ul{
                position: absolute;
                top:0%;
                left: 30%;
                //background-color: wheat;
                width: 70%;
                li{

                }
            }

        }
        .cur{
            background-color: #ffc107;
            width: 30%;
        }
    }
}
</style>