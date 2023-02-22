<template>
<!--    <van-nav-bar
        title="视频"
    />-->
    <div>

    <van-search
        v-model="value"
        show-action
        label="武汉"
        placeholder="搜索电影"
        @search="onSearch"
    >
        <template #action>
            <div @click="onClickButton">搜索</div>
        </template>
    </van-search>
    <div>
        <Carousel :imglist="movie_c" :show="2"/>
    </div>
    <van-notice-bar left-icon="volume-o" :scrollable="false" style="margin:5px 0">
        <van-swipe
            vertical
            class="notice-swipe"
            :autoplay="3000"
            :show-indicators="false"
        >
            <van-swipe-item>
                今天天气:{{w.weather}},气温:{{w.temperature}}°
            </van-swipe-item>
            <van-swipe-item>
                湿度{{w.humidity}},最大气温:{{w.minTemperature}}°,最低气温:{{w.maxTemperature}}°
            </van-swipe-item>
            <van-swipe-item>
                空气{{w.air}},污染程度:{{w.uv}}
            </van-swipe-item>
        </van-swipe>
    </van-notice-bar>

    <van-grid>
        <van-grid-item :icon="g.img" :text="g.t" v-for="(g,i) in imgg" @click="btnMovie(i)"/>
    </van-grid>

    <van-divider
        contentPosition="center"
        customStyle="color: blue; border-color: #1989fa; font-size: 18px;"
        hairline
    >
        正在热映
    </van-divider>

<!--    <van-grid :gutter="10" :border="false">
        <van-grid-item :icon="proxy.$a.baseURL+m.cover" :text="m.name" v-for="(m,i) in list.slice(currentPage,currentPage+3)" :key="i" @click="btn(i)"/>
    </van-grid>

    <van-pagination
        v-model="currentPage"
        :page-count="Math.floor((list.length/4))+1"
        :show-page-size="3"
        force-ellipses
    />-->

    <van-tabs v-model="active" animated  @click-tab="onClickTab">
        <van-tab v-for="(m,i) in list" :title="m.name" :key="i">
            <van-row class="movie">
                <van-col span="7" offset="1" class="a">
                    <van-image :src="proxy.$a.baseURL+m.cover" radius="5" fit="fill"></van-image>
                </van-col>
                <van-col span="14" offset="1" class="b">
                    <span>{{m.name}}</span>
                        <span class="two" v-html="(m.introduction).substring(0,180)"></span>
                        <div style="text-align: center;"><van-button type="danger" size="mini" @click="btn1(i)">购票</van-button></div>
                </van-col>
            </van-row>
        </van-tab>
    </van-tabs>

    <van-divider
        contentPosition="center"
        customStyle="color: blue; border-color: #1989fa; font-size: 18px;"
        hairline
    >
        即将上映
    </van-divider>
    <van-tabs v-model="active" animated  @click-tab="onClickTab" color="orange">
        <van-tab v-for="(m,i) in preview" :title="m.name" :key="i">
            <van-row class="movie">
                <van-col span="7" offset="1" class="a">
                    <van-image :src="proxy.$a.baseURL+m.cover" radius="5" fit="fill"></van-image>
                </van-col>
                <van-col span="14" offset="1" class="b">
                    <span>{{m.name}}</span>
                    <span class="two" v-html="(m.introduction).substring(0,180)"></span>
                    <div style="text-align: center;"><van-button type="warning" size="mini" @click="btn2(i)">想看</van-button></div>
                </van-col>
            </van-row>
        </van-tab>
    </van-tabs>

    <van-divider
        contentPosition="center"
        customStyle="color: blue; border-color: #1989fa; font-size: 18px;"
        hairline
    >
        周边影院
    </van-divider>

    <van-card
        v-for="(t,i) in theater" :key="i"
        :desc="t.address"
        :title="t.name"
        :thumb="film"
    >
        <template #tags>
            <div class="like" style="display: flex;justify-content: flex-start">
                            <span>
                                <span>评分:</span>&nbsp;&nbsp;&nbsp;
                                <span style="color: #ffd21e;font-size: 20px">{{t.score}}</span>&nbsp;&nbsp;分
                            </span>
            </div>
        </template>

    </van-card>





    </div>

</template>

<script setup>
import {getCurrentInstance, onBeforeMount, onMounted, ref, reactive, computed} from "vue";
import {Toast} from "vant";
import car from '../../../assets/inspectCar.png'
import moviep from '../../../assets/movie.png'
import Outpatient from '../../../assets/Outpatient.png'
import weather from '../../../assets/weather.png'
import film from '../../../assets/movie.jpg'
import {useStore} from "vuex";
import {useRouter,useRoute} from "vue-router";
import {getStorage} from "../../../utils/storage";

let {proxy}=getCurrentInstance()
let w=ref([])
let movie_c=ref([])
let store=useStore()
let router=useRouter()
onBeforeMount(()=>{
    getdatas()
    /*if (!getStorage('movielist')){
        store.dispatch('movie/getMovie')
    }else if (!getStorage('moviepreview')){
        store.dispatch('movie/getPreview')
    }else if (!getStorage('movietheater')){
        store.dispatch('movie/getTheater')
    }else if (!getStorage('starnews')){
        store.dispatch('movie/getStarnews')
    }*/
    store.dispatch('movie/getMovie')
    store.dispatch('movie/getPreview')
    store.dispatch('movie/getTheater')
    store.dispatch('movie/getStarnews')
})
let list=computed(()=>store.state.movie.movielist)
let theater=computed(()=>store.state.movie.theater)
let preview=computed(()=>store.state.movie.preview)
let showlist=(list)=>{

}
onMounted(()=>{

})
async function getdatas() {
    let r1=await proxy.$http.get(proxy.$a.weather)
    let r2=await proxy.$http.get(proxy.$a.movie_carousel)
    if (r1.code==200) w.value = r1.data
    if (r2.code==200) movie_c.value = r2.rows
}

const value = ref('');
const onSearch = (val) => Toast(val);
const onClickButton = () => Toast('暂无法搜索');

let imgg=reactive([
    {
        img:car,
        t:'推荐'
    },{
        img:moviep,
        t:'预告'
    },{
        img:Outpatient,
        t:'影评'
    },{
        img:weather,
        t:'星闻'
    }
])
let btnMovie=(i)=>{
    switch (i) {
        case 0:
            router.push({
                name:'recommend'
            })
            break;
        case 1:
            router.push({
                name:'predict'
            })
            break;
        case 2:
            /*router.push({
                name:''
            })*/
            Toast('该功能暂未开放')
            break;
        case 3:
            router.push({
                name:'starNews'
            })
            break;
    }
}
/*let btn=(i)=>{
    console.log(i)
}
let currentPage=ref(1)
*/
let active=ref(0)

let onClickTab=(event)=>{
    // console.log(event)
    active.value=event.name
    // console.log(active.value)
}
// let route=useRoute()
let btn1=(i)=>{
    router.push({
        name:'movieDetail',
        query:{
            id:i
        }
    })
    console.log(i)
}
let btn2=(i)=>{
    router.push({
        name:'movieAddress',
        query:{
            id:i
        }
    })
    console.log(i)
}

</script>

<style scoped lang="less">
.notice-swipe {
    height: 40px;
    line-height: 40px;
}
.van-grid-item{
    cursor: pointer;
}
.movie{
    margin-top: 5px;
    //padding: 5px;
    height: 180px;
    .a{
        .van-image{
            background-size: cover;
            height: 180px;
            width: 100%;
        }
    }
    .b{
        height: 180px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        >span:first-child{
            display: block;
            font-weight: 700;
            text-align: center;
            font-size: 25px;
        }
        .two{
            display: block;
            font-size: 15px;
            overflow: auto;
            height: 70px;
        }
    }
}
</style>