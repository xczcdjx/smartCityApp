<template>
    <div>
    <div class="contain">
        <carousel :imglist="imgA" :show="2"/>
        <van-search
            v-model="search"
            show-action
            label="武汉"
            left-icon="location-o"
            placeholder="搜索外卖"
            @search="onSearch"
        >
            <template #action>
                <div @click="onSearch" style="color: #ffc107">搜索</div>
            </template>
        </van-search>

        <van-grid :column-num="5" clickable>
            <van-grid-item v-for="(t,i) in thumb" :icon="proxy.$a.baseURL+
        t.imgUrl" :key="i" :text="t.themeName" @click="enterD(i)"></van-grid-item>
        </van-grid>

        <van-card
            v-for="(c,i) in merchant" :key="i"
            :desc="c.address"
            :title="c.name"
            :price="c.avgCost"
            :thumb="proxy.$a.baseURL+c.imgUrl"
            currency="￥"
        >
            <template #tags>
            <span style="">评分:{{ c.score }}&nbsp;&nbsp;&nbsp;
            <span><span style="color: #ffc107">月售:{{ c.saleNum3hour }}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;{{ c.saleNum3hour }}分钟/{{ c.distance / 1000 }}km</span><br>
            <span class="a">{{ c.introduction }}</span>
            </span>
            </template>
            <template #footer>
                <van-button size="mini" type="success" round @click="enterM(c.id)">选购</van-button>
            </template>


        </van-card>


    </div>
    <transition
        name="animate__animated animate__bounce"
        enter-active-class="animate__flipInX"
        leave-active-class="animate__flipOutY"
    >
        <van-overlay :show="show">
            <div class="wrapper" @click.self="show=false">
                <div class="block">
                    <van-card
                        v-show="flag"
                        v-for="(c,i) in merchant2" :key="i"
                        :desc="c.address"
                        :title="c.name"
                        :price="c.avgCost"
                        :thumb="proxy.$a.baseURL+c.imgUrl"
                        currency="￥"
                    >
                        <template #tags>
            <span style="">评分:{{ c.score }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span style="color: #ffc107">月售:{{ c.saleNum3hour }}</span><br>
            <span class="a">{{ c.introduction }}</span>
            </span>
                        </template>
                        <template #footer>
                            <van-button size="mini" type="danger" round @click="enterM(c.id)">确认选购</van-button>
                        </template>

                    </van-card>
                    <van-empty image="error" description="很遗憾,未找到商家" v-show="!flag"/>
                    <div class="btn">
                        <van-button type="warning" block @click="close">关闭</van-button>
                    </div>
                </div>
            </div>
        </van-overlay>
    </transition>
    </div>
</template>

<script setup>
import 'animate.css'
import {computed, getCurrentInstance, onBeforeMount, onMounted, ref, watchEffect} from "vue";
import {getStorage} from "../../../../../utils/storage";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {Toast} from "vant";

let imgA = ref([])
let thumb = ref([])
let id2, searchl
let flag = ref(true)
let show = ref(false)
let {proxy} = getCurrentInstance()
let store = useStore()
let merchant = computed(() => store.state.deliver.merchant)
let merchant2 = computed(() => {
    return store.state.deliver.merchant.filter(item => {
        return item.name.indexOf(search.value) != -1
    })
})



onBeforeMount(async () => {
    let r = await proxy.$http.get(proxy.$a.deliver_carousel)
    let r2 = await proxy.$http.get(proxy.$a.deliver_theme)
    if (r.code == 200) imgA.value = r.rows
    if (r2.code == 200) thumb.value = r2.data

})
onMounted(() => {
    /*if (!getStorage('merchant')) {
        store.dispatch('deliver/getMerchant')
        console.log('merchant已经得到')
    }*/
})
let search = ref('')
let router = useRouter()
let onSearch = () => {
    if (search.value.length==0){
        Toast('请输入内容!!!')
        show.value=true
        flag.value=false
    }else {
        setTimeout(() => {
            show.value = true
        }, 50)
    }
}
let close = () => {
    show.value = false
    setTimeout(()=>{
        search.value=''
    },500)
}

function enterM(i) {
    router.push({
        name: 'merchantD',
        query: {
            id: i
        }
    })
}

watchEffect(() => {
    id2 = merchant2.value.length
    searchl = search.value.length
    if (id2 == 0) {
        flag.value = false
    } else {
        flag.value = true
    }
})

function enterD(i) {
    switch (i) {
        case 0:
            router.push({
                name: 'deliverfoods'
            })
            break;
        case 1:
            router.push({
                name: ''
            })
            break;
        case 2:
            router.push({
                name: ''
            })
            break;
        case 3:
            router.push({
                name: ''
            })
            break;
        case 4:
            router.push({
                name: ''
            })
            break;
    }
}
</script>

<style scoped lang="less">
.contain {
    margin: 5px;

    .van-card {
        span {
            font-size: 20px;
            color: #ff105e;
        }

        .a {
            font-size: 22px;
            color: deepskyblue;
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
    border-radius: 20px;
    overflow: auto;
    width: 90%;
    height: 50%;
    background-color: #fff;
    position: relative;

    .van-card {
        margin: 10px;

        span {
            font-size: 20px;
            color: #ff105e;
        }

        .a {
            font-size: 22px;
            color: deepskyblue;
        }
    }

    .btn {
        position: sticky;
        width: 100%;
        bottom: 5%;
    }
}
</style>