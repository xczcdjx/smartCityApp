<template>
    <div>

    <div class="top">
        <div>{{ th.name }}</div>
        <span><van-icon name="location" color="blue"></van-icon>{{ th.address }}</span>
    </div>
    <div class="middle">
        <van-swipe @change="onChange" class="my_swipe" :width="170" autoplay="1000" :show-indicators="false" :loop="false">
            <van-swipe-item v-for="(m,i) in mo" :key="i">
                <van-image :src="proxy.$a.baseURL+m.cover" radius="12"></van-image>
                <div>{{ m.name }}</div>
            </van-swipe-item>
        </van-swipe>
    </div>

    <div class="bot">
        <van-tabs v-model:active="active">
            <van-tab v-for="(t,i) in date2" :title='t.m+"月"+t.d+"日"' :key="i">

                <van-row class="a" @click="ticket" v-for="(d,i2) in time" :key="i2">
                    <van-col span="5" offset="1" class="ab">
                        <div>{{d.t1}}</div>
                        <div>{{d.t2}}散场</div>
                    </van-col>
                    <van-col span="5" offset="1" class="ac">
                        <div>英语</div>
                    </van-col>
                    <van-col span="5" offset="4" class="ad">
                        <div>
                            <span>{{d.p}}</span>
                            <van-button type="danger" size="mini" plain>购票</van-button>
                        </div>
                    </van-col>
                </van-row>
            </van-tab>
        </van-tabs>

    </div>
    </div>

</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex";
import {computed, getCurrentInstance, onMounted, reactive, ref,watchEffect} from "vue";

let route = useRoute()
let router = useRouter()
let store = useStore()
let {proxy} = getCurrentInstance()
let id = route.query.id
let mo = computed(() => store.state.movie.movielist)
let th = computed(() => store.state.movie.theater[id])

let active=ref(0)
let date2,date3
getdate()
function getdate() {
    let date=new Date()
    let mon=date.getMonth()+1
    let day=date.getDate()
    let h=date.getHours()
    let m=date.getMinutes()
    date2=reactive([
        {
            m:mon,
            d:day
        },{
            m:mon,
            d:day+1
        },{
            m:mon,
            d:day+2
        },{
            m:mon,
            d:day+3
        },{
            m:mon,
            d:day+4
        },{
            m:mon,
            d:day+5
        },
    ])
    /*if (m<10){
        m='0'+m
    }*/
    date3=reactive({
        h,m
    })
}

console.log(date3)


let ticket=()=>{
    console.log('djj')
}
let index = ref(0)
let du= ref('')
let time

let onChange = (i) => {
    index.value = i
    du = computed(() => {
        return mo.value[index.value].duration
    })

}
onMounted(()=>{
    getTime2()
})

watchEffect(()=>{
    let dd=du.value
    console.log('djijd')
    })
function getTime2() {
    // console.log(du.value)
    let m=Math.floor(du.value/60)
    let m2=du.value%60
    // console.log(m,m2,'aaa')
    time=reactive([
        {
            t1:(date3.h)+':'+(date3.m),
            t2:(date3.h+m)+':'+(date3.m+m2),
            p:29
        },
        {
            t1:(date3.h+1)+':'+(date3.m),
            t2:(date3.h+1+m)+':'+(date3.m+m2),
            p:33
        },{
            t1:(date3.h+3)+':'+(date3.m),
            t2:(date3.h+3+m)+':'+(date3.m+m2),
            p:48
        }
    ])
    console.log(time)

}

</script>

<style scoped lang="less">
.top {
    padding: 10px;
    margin: 0 20px;

    div {
        font-size: 35px;
    }

    > span {
        font-size: 28px;
    }
}

.middle {
    .my_swipe {

        .van-swipe-item {
            line-height: 50px;
            width: 100px;
            text-align: center;
            background-color: darkgray;

            .van-image {
                margin-top: 20px;
                width: 100px;
                height: 150px;
            }

            div {
                font-size: 28px;
            }
        }
    }
}
.bot{
    margin: 5px 10px;
    .a{
        margin: 15px 0;
       .ab{
           div{
               font-size: 20px;
               margin: 5px 0;
           }
           div:first-child{
               font-size: 35px;
           }
       }
        .ac{
            div{
                font-size: 33px;
            }
        }
        .ad{
            div{
                color: #ff105e;
                margin: 10px 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 33px;
            }
        }
    }
}

</style>