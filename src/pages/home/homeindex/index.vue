<template>
<!--    <van-nav-bar
        title="首页"
    />-->
    <div>
    <div class="contain">
        <Carousel :imglist="imglist" :show="1"/>

        <van-notice-bar class="topNotification" mode="closeable" scrollable>{{upgradeNotify}}</van-notice-bar>
        <div class="a">
            <van-search
                v-model="search"
                placeholder="搜索服务"
                show-action
                @search="onSearch"
                @cancel="onCancel"
            />
            <van-divider
                contentPosition="center"
                customStyle="color: blue; border-color: #1989fa; font-size: 18px;"
                hairline
            >
                热门服务
            </van-divider>
            <van-grid square>
                <van-grid-item v-for="(s,i) in all" :key="i" :icon="s.imgUrl" :text="s.title"
                               @click="items(i)"/>
            </van-grid>

            <van-divider
                contentPosition="center"
                customStyle="color: blue; border-color: #1989fa; font-size: 18px;"
                hairline
            >
                热点话题
            </van-divider>

            <div class="topic">

                <van-grid :border="false" :column-num="2">
                    <van-grid-item v-for="(t,i) in allist.slice(0,6)" @click="theme(i)">
                        <van-image radius="10"
                            :src="proxy.$a.baseURL+t.cover" fit="fill"
                        />
                        <span v-html="filter(t.content).substring(0, 25) +'...'"></span>
                    </van-grid-item>
                </van-grid>
            </div>


            <van-divider
                contentPosition="center"
                customStyle="color: blue; border-color: #1989fa; font-size: 18px;"
                hairline
            >
                热点新闻
            </van-divider>

            <van-tabs v-model:active="active" class="hotN">

                <van-tab v-for="(l,i) in hot_list" :key="i" :title="l.name">
                    <van-card
                        v-for="(a,i2) in allist2.slice(active*8,active*8+8)" :key="i2"
                        :title="a.title"
                        :thumb="proxy.$a.baseURL+a.cover"
                        @click="hotnews(i,i2)"
                    >
                        <template #desc>
                            <div class="like">
                                <span>{{filter(a.content).substring(0,25)}}...</span>
                                <div>
                                    <span>
                                <van-icon name="like-o"/>
                                {{ a.likeNum }}
                            </span>
                                    <span>
                                <van-icon name="chat-o"/>
                                        &nbsp;
                                <span v-text="a.commentNum?a.commentNum:0"/>
                            </span>
                                </div>
                            </div>
                        </template>
                    </van-card>

                </van-tab>

            </van-tabs>


        </div>
    </div>

    <van-overlay :show="show" @click="show = false">
        <div class="wrapper" @click.stop>
            <div class="block">
                <div v-for="(h,i) in all2" :key="i" @click="searchS(h.path)">
                    <van-image width="50" height="50" :src="h.imgUrl"></van-image>
                    <span>{{ h.title }} </span>
                </div>
                <van-button plain hairline type="danger" block @click="overclose">关闭</van-button>
            </div>
        </div>
    </van-overlay>
    </div>
</template>

<script>
import {getCurrentInstance, onMounted, reactive, ref, inject, onBeforeMount, computed, toRef} from "vue";
import {Dialog} from 'vant';
import {getStorage} from "../../../utils/storage";
import {useStore} from "vuex";
import {Toast} from "vant";
import {useRouter} from "vue-router";

export default {
    name: 'index',
    setup() {
        let {proxy} = getCurrentInstance();
        let imglist = ref([])
        let hot_list = ref([])
        let all=ref([])
        let store = useStore()
        onBeforeMount(async () => {
            let r = await proxy.$mock.get('/carousel')
            let r2 = await proxy.$http.get(proxy.$a.hot_list)
            let r3 = await proxy.$mock.get('/activities')
            if (r.code == 200) imglist.value = r.data
            if (r2.code == 200) hot_list.value = r2.data
            if (r3.code == 200) all.value = r3.data
            store.dispatch('news/getNews')
        })
        // let service=toRef(store.state.news.service)
        onMounted(() => {
            store.dispatch('deliver/getMerchant')
            store.dispatch('job/getJobs')
            store.dispatch('mock/getMenu')
            // console.log(getStorage('vuex').news)
            /*if (!getStorage('vuex').deliver) {
                store.dispatch('deliver/getMerchant')
                console.log('news已经添加')
            }
            if (!getStorage('vuex').job) {
                store.dispatch('job/getJobs')
                console.log('news已经添加')
            }if (!getStorage('vuex').mock) {
                store.dispatch('mock/getMenu')
                console.log('news已经添加')
            }*/
            /*if (!getStorage('service')) {
                store.dispatch('news/getService')
                console.log('service已经添加')
            } if (!getStorage('news')) {
                store.dispatch('news/getNews')
                console.log('news已经添加')
            }*/ /*if (!getStorage('merchant')) {
                store.dispatch('deliver/getMerchant')
                console.log('merchant已经得到')
            } if (!getStorage('job')) {
                store.dispatch('job/getJobs')
                console.log('job已经得到')
            } if (!getStorage('menu')) {
                store.dispatch('mock/getMenu')
                console.log('menu已经得到')
            }*/
        })


        // let all = computed(() => store.state.news.service)
        let allist = computed(() => store.state.news.news)

        let allist2 = computed(() => store.state.news.news.slice(6))
        // console.log(all)
        // console.log(allist)

        let all2 = computed(() => {
            return all.value.filter(item => {
                return item.title.indexOf(search.value) != -1
            })
        })
        let search = ref('')
        let show = ref(false)
        let onSearch = () => {
            show.value = true
        }
        let onCancel = () => {
            Toast('取消搜索')
        }

        let active=ref(0)



        let filter = (v) => {
            return v.replace(/<[^<>]+>/g, '')
        }

        let overclose = () => {
            show.value = false
            setTimeout(() => {
                search.value = ''
            }, 500)
        }

        const router=useRouter()
        function items(i) {
            switch (i) {
                case 0:
                    router.push({
                        name:'music'
                    })
                    break;
                case 1:
                    router.push({
                        name:'game'
                    })
                    break;
                case 2:
                    router.push({
                        name:'deliver'
                    })
                    break;
                case 3:
                    router.push({
                        name:'shortVideo'
                    })
                    break;
                case 4:
                    router.push({
                        name:'clock'
                    })
                    // window.location.href='/clocke.html'
                    break;
                case 5:
                    router.push({
                        name:'write'
                    })
                    break;
                case 6:
                    router.push({
                        name:'job'
                    })
                    break;
                case 7:
                    router.push({
                        name:'explore'
                    })
                    break;
                case 8:
                    router.push({
                        name:'book'
                    })
                    break;
                case 9:
                    router.push({
                        name:'life'
                    })
                    break;
                case 10:
                    router.push({
                        name:'recipes'
                    })
                    break;
                case 11:
                    router.push({
                        name:'stage'
                    })
                    break;

            }
        }


        function searchS(p) {
            // 未完成 结合路由meta实现 不需要
            router.push({
                name:p
            })
        }

        let theme=(i)=>{
            router.push({
                name:'hottheme',
                query:{
                    id:i
                }
            })
        }
        let hotnews=(f,b)=>{
            let id=(f*8+b)+6
            router.push({
                name:'hotnews',
                query:{
                    id
                }
            })
        }
        let onClickLeft=()=>{
            $router.back()
        }
        // const upgradeNotify=computed(()=>store.state.user.upgrade.notify)
        const upgradeNotify=ref('本项目由小丑在唱独角戏独家提供,transient 已经迭代多个版本,感谢广大用户的精心等待,相信我的服务将会越做越好')
        return {
            imglist, all, proxy, onSearch, onCancel,hotnews,
            search, active, hot_list, allist, filter, show, all2, overclose, items,searchS,theme,allist2,onClickLeft,upgradeNotify
        }
    }
}

// console.log(inject('carousel'))
</script>

<style scoped lang="less">
.contain {
    .van-notice-bar{
        margin-top: 10px;
        height: 50px;
    }
    .a {
        .topic {
            .van-grid-item{
                &:hover span{
                    color: skyblue;
                }
            }
            .van-image{
                height: 250px;
                width: 325px;
            }
            span{
                font-size: 15px;
                color: #464646;
            }
        }
    }
    .hotN{
        margin-bottom: 120px;
        .like{
            display: flex;
            flex-direction: column;
            height: 120px;
            justify-content: space-between;
            font-size: 20px;
            >div{
                padding: 0 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
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
    border-radius: 10px;
    width: 50%;
    height: 30%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    > div {
        padding: 10px;
        display: flex;
        align-items: center;
        cursor: pointer;
        &:hover span{
            color: #ffc107;
        }
        span {
            margin-left: 5px;
            font-size: 18px;
        }
    }
}
</style>