<template>
    <div>

    <div class="contain">
        <van-tabs animated shrink sticky @click-tab="getIndex" v-model:active="active"
                  title-active-color="orange" title-inactive-color="silver">
            <van-tab v-for="(n,i) in nav.slice(0,6)" :key="i" :title="n.n">
            </van-tab>
            <van-tab>
                <template #title>
                    <van-icon name="more-o" @click="loadAll"/>
                </template>
            </van-tab>
        </van-tabs>

        <router-view></router-view>

    </div>

    <transition
        name="animate__animated animate__bounce"
        enter-active-class="animate__zoomInUp"
        leave-active-class="animate__zoomOutUp"
    >
        <van-overlay :show="show">
            <div class="wrapper" @click.self="show=false">
                <div class="block">
                    <div class="aa">
                        <van-nav-bar title="全部板块">
                            <template #right>
                                <van-icon name="cross" size="18" @click="show=false"/>
                            </template>
                        </van-nav-bar>
                        <div class="bb">
                            <van-grid :column-num="4" clickable>
                                <van-grid-item v-for="(n,i2) in nav" :key="i2" :icon="n.i" :text="n.n"/>
                            </van-grid>
                        </div>
                    </div>
                </div>
            </div>
        </van-overlay>
    </transition>

    </div>

</template>

<script setup>
import 'animate.css'
import {useRouter} from "vue-router";
import {getCurrentInstance, onBeforeMount, provide, reactive, ref, watch, watchEffect} from "vue";
import {useStore} from "vuex";

let active = ref(1)
let {proxy} = getCurrentInstance()
let nav = reactive([
    {
        n: '全站', i: 'label-o'
    },
    {
        n: '吾辈问答', i: 'bulb-o'
    },
    {
        n: '头条', i: 'bulb-o'
    },
    {
        n: '新闻', i: 'video-o'
    },
    {
        n: '财经', i: 'award-o'
    },
    {
        n: '体育', i: 'logistics'
    },
    {
        n: '娱乐', i: 'desktop-o'
    },
    {
        n: '军事', i: 'cluster-o'
    },
    {
        n: '教育', i: 'points'
    },
    {
        n: '科技', i: 'hotel-o'
    },
    {
        n: 'NBA', i: 'medal-o'
    },
    {
        n: '星座', i: 'gem-o'
    }
])
let show = ref(false)
onBeforeMount(() => {
    getData()
})

async function getData() {

}

let loadAll = () => {
    show.value = true
    setTimeout(() => {
        active.value = 1
    }, 3000)
}
let store=useStore()
function getIndex(e) {
    active.value = e.name
    switch (active.value) {
        case 0:
            router.replace({
                name: 'alljudge',
                query: {
                    id: 0
                }
            })
            break;
        case 1:
            router.replace({
                name: 'Answer',
                query: {
                    id: 1
                }
            })
            break;
        case 2:
        case 3:
        case 4:
        case 5:
            store.commit('search/changeResult',nav[active.value].n)
            router.replace({
                name: 'subItems',
                query: {
                    search:nav[active.value].n,
                    id:active.value
                }
            })
            break;
            case 6:
                router.replace({
                    name: 'allIndex',
                    query: {
                        id:6
                    }
                })
    }
    // console.log(active.value)
}

let router = useRouter()
/*watch(active, (n, o) => {
    let id = provide('id', active.value)
}, {immediate: true})*/


</script>

<style scoped lang="less">
.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.block {
    //border-radius: 10px;
    width: 70%;
    height: 40%;
    background-color: #fff;
    color: silver;

    .aa {
        .bb {

        }
    }
}
</style>