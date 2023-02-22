<template>
    <div>
    <div class="contain">
        <van-search
            v-model="search"
            placeholder="找工作"
            @search="check(search)"
            input-align="center"
        />

        <carousel :imglist="jobC" :show="1"/>
        <div class="top">
            <span>&nbsp;Clock<span>&nbsp;招聘</span></span>
            <span>机不可失&nbsp;&nbsp;</span>
        </div>
        <van-grid :column-num="5" clickable :border="false">
            <van-grid-item v-for="(v,i) in service" :key="i" :icon="v.ic" :text="v.t" @click="jobS(i)"/>
        </van-grid>

        <van-tabs v-model:active="active">
            <van-tab title="全部">
                <div class="content" v-for="(j,i) in jobs" :key="i">
                    <div class="a">
                        <span>{{j.name}}</span>
                        <span>{{j.address}}</span>
                    </div>
                    <div class="b">
                        <div class="b1">
                            <span>{{j.salary}}元</span>
                            <div>
                                <van-image fit="fill" round :src="wd"/>
                                <span>
                                    <span>{{j.contacts}}</span>
                                    <span>{{j.companyName}}</span>
                                </span>
                            </div>
                        </div>
                        <div class="b2">
                            <van-button size="mini" type="danger">申请</van-button>
                        </div>
                    </div>
                </div>
            </van-tab>
            <van-tab v-for="(j,i) in jobs" :title="j.professionName">
                <div class="content">
                    <div class="a">
                        <span>{{jobs[i].name}}</span>
                        <span>{{jobs[i].address}}</span>
                    </div>
                    <div class="b">
                        <div class="b1">
                            <span>{{jobs[i].salary}}元</span>
                            <div>
                                <van-image fit="fill" round :src="wd"/>
                                <span>
                                    <span>{{jobs[i].contacts}}</span>
                                    <span>{{jobs[i].companyName}}</span>
                                </span>
                            </div>
                        </div>
                        <div class="b2">
                            <van-button size="mini" type="danger">申请</van-button>
                        </div>
                    </div>
                </div>
            </van-tab>
        </van-tabs>

    </div>

    <transition
        name="animate__animated animate__bounce"
        enter-active-class="animate__zoomInDown"
        leave-active-class="animate__rollOut"
    >
    <van-overlay :show="show">
        <div class="wrapper" @click.self="onClickLeft">
            <div class="block">
                <van-nav-bar
                    title="搜索结果"
                    left-arrow
                    @click-left="onClickLeft"
                />
                <div class="content2" v-for="(j,i) in jobA" v-show="!find" :key="i">
                    <div class="a">
                        <span>{{j.name}}</span>
                        <span>{{j.address}}</span>
                    </div>
                    <div class="b">
                        <div class="b1">
                            <span>{{j.salary}}元</span>
                            <div>
                                <van-image fit="fill" round :src="wd"/>
                                <span>
                                    <span>{{j.contacts}}</span>
                                    <span>{{j.companyName}}</span>
                                </span>
                            </div>
                        </div>
                        <div class="b2">
                            <van-button size="mini" type="danger">申请</van-button>
                        </div>
                    </div>
                </div>
                <van-empty image="search" description="很遗憾,未找到!!!!!" v-show="find" image-size="100"/>
            </div>
        </div>
    </van-overlay>
    </transition>
    </div>
</template>

<script setup>
import 'animate.css'
import wd from '../../../../../assets/comment/wd.jpg'
import {computed, getCurrentInstance, onBeforeMount, reactive, ref, watch} from "vue";
import {useStore} from "vuex";
import {Toast} from "vant";
let {proxy}=getCurrentInstance()
let jobC=ref([])
onBeforeMount(async ()=>{
    let r=await proxy.$mock.get('/job')
    if (r.code==200) jobC.value=r.data
})
let search=ref('')
let service=reactive([
    {t:'附近',ic:'location-o'},
    {t:'急招',ic:'guide-o'},
    {t:'会员中心',ic:'manager-o'},
    {t:'互联网',ic:'newspaper-o'},
    {t:'全部',ic:'apps-o'},
])
let active=ref(0)
let store=useStore()
let jobs=computed(()=>store.state.job.jobs)
let jobA=computed(()=>{
    return jobs.value.filter(item=>{
        return item.name.indexOf(search.value)!=-1
    })
})
/*watch(jobA,(o,n)=>{
    if (n.length==0)find.value=true
    else find.value=false
})*/
let onClickLeft=()=>{
    show.value=false
    setTimeout(()=>{
        find.value=false
        search.value=''
    },500)
}
let show=ref(false)
let find=ref(false)
let check=(s)=>{
    if (s.length==0){
        Toast('请输入搜索内容!!!')
    }else {
        show.value=true
        if (jobA.value.length==0){
            find.value=true
        }else {
            find.value=false
        }
    }
}
let jobS=(i)=>{
    Toast('别点了,该功能暂未实现'+i)
}
</script>

<style lang="less" scoped>
.contain{
    font-size: 20px;
    padding: 5px;
    .top{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 35px;
        font-weight: 600;
        color: white;
        height: 45px;
        background: linear-gradient(to right, #f6d365 0%, #fda085 100%);
        >span:last-child{
            font-size: 20px;
        }
    }
    .content{
        margin: 5px auto;
        width: 95%;
        height: 40%;
        background: rgba(231, 226, 219, 0.5);
        padding: 10px;
        //padding: 0 20px;
        .a{
            display: flex;
            align-items: center;
            justify-content: space-between;
            >span:first-child{
                font-size: 35px;
                font-weight: 510;
                opacity: 0.7;
            }
            >span:last-child{
                font-size: 25px;
                color: #f36666;
            }
        }
        .b{
            display: flex;
            justify-content: space-between;
            .b1{
                >span{
                    font-size: 30px;
                    color: red;
                }
                >div{
                    display: flex;
                    align-items: center;
                    .van-image{
                        height: 50px;
                        width: 50px;
                        //border-radius: 50px;
                    }
                    >span{
                        font-size: 20px;
                        margin-left: 8px;
                        display: flex;
                        flex-direction: column;
                    }
                }
            }
            .b2{
                display: flex;
                align-items: center;
            }
        }
    }
}
.content2{
    margin: 5px auto;
    width: 95%;
    height: 28%;
    background: rgba(219, 231, 228, 0.5);
    padding: 10px;
    //padding: 0 20px;
    .a{
        display: flex;
        align-items: center;
        justify-content: space-between;
        >span:first-child{
            font-size: 35px;
            font-weight: 510;
            opacity: 0.7;
        }
        >span:last-child{
            font-size: 28px;
            color: #ffc107;
        }
    }
    .b{
        display: flex;
        justify-content: space-between;
        .b1{
            >span{
                font-size: 30px;
                color: red;
            }
            >div{
                display: flex;
                align-items: center;
                .van-image{
                    height: 50px;
                    width: 50px;
                    //border-radius: 50px;
                }
                >span{
                    font-size: 25px;
                    margin-left: 8px;
                    display: flex;
                    flex-direction: column;
                }
            }
        }
        .b2{
            display: flex;
            align-items: center;
        }
    }
}
.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.block {
    overflow: auto;
    width: 90%;
    height: 40%;
    background-color: #fff;

}
</style>