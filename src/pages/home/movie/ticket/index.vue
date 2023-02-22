<template>
    <div>

   <div class="top">
       <van-row justify="space-around">
           <van-col span="6" offset="1">
               <van-image
                   fit="fill"
                   radius="10"
                   :src="proxy.$a.baseURL+d.cover"
               />
           </van-col>
           <van-col span="12" class="b">
               <div>{{ d.name }}</div>
               <div>{{ d.language }}</div>
               <div>{{ d.playDate }}中国大陆上映/{{ d.duration }}分钟</div>
               <div>
                   <span>评分&nbsp;&nbsp;<span style="color: #ffc107">{{d.score}}</span></span>
                   <van-rate :size="13" v-model="d.score" readonly color="#ffc107"></van-rate>
               </div>
           </van-col>
       </van-row>
   </div>

    <div class="bot">
        <van-tabs v-model:active="active">
            <van-tab v-for="(t,i) in date2" :title='t.m+"月"+t.d+"日"' :key="i">
                <div class="a" v-for="(t2,i2) in th.slice(i,i+6)" :key="i2" @click="enterT(i2)">
                    <div>
                        <span>{{ t2.name }}</span>
                        <span>30元<span>/起</span></span>
                    </div>
                    <div>
                        {{t2.address}}
                    </div>
                    <div>
                        评分:<span>{{t2.score}}</span>
                    </div>
                </div>
            </van-tab>
        </van-tabs>

    </div>

    </div>

</template>

<script setup>
import {useRoute,useRouter} from "vue-router";
import {useStore} from "vuex";
import {computed, getCurrentInstance, onMounted, reactive, ref} from "vue";

let route = useRoute()
let router = useRouter()
let store = useStore()
let {proxy} = getCurrentInstance()
let id = route.query.id
let d = computed(() => store.state.movie.movielist[id])
let th = computed(() => store.state.movie.theater)
let active=ref(0)
let date2
getdate()
function getdate() {
    let date=new Date()
    let mon=date.getMonth()+1
    let day=date.getDate()
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
}

let enterT=(i2)=>{
    router.push({
        name:'enterT',
        query:{
            id:i2
        }
    })
}
</script>

<style scoped lang="less">
.top {
    margin-top: 5px;
    padding: 5px;
    height: 20%;

    .van-image {
        background-size: cover;
        height: 250px;
        width: 100%;
    }

    .b {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        div:first-child {
            font-size: 38px;
            color: black;
        }

        div {
            font-size: 20px;
            color: darkgray;
        }

        div:last-child {
            display: flex;
            justify-content: space-around;
            align-items: center;
        }
    }

}
.bot{
    margin: 5px 10px;
    .a{
        margin: 15px 0;
        border-bottom: rgba(70, 70, 70, 0.3) 1px solid;
        div{
            font-size: 25px;
            color: #464646;
        }
        div:first-child{
            font-size: 35px;
            display: flex;
            justify-content: space-between;
            >span:last-child{
                >span{
                    color: #464646;
                    font-size: 25px;
                }
                color: #ff105e;
             margin-right: 40px;
            }
        }
        div:last-child{
            >span{
                margin-left: 8px;
                color: #ffc107;
            }
        }
    }
}
</style>