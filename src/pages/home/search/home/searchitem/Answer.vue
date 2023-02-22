<template>
    <!--    <van-search
            v-model="search"
            placeholder="搜索问题"
            input-align="center"
            shape="round"
        />-->
    <div class="contain">
        <h3>问答网迄今现存问题19w+，其中未被关闭的问题在今天刚刚突破20w</h3>
        <h3 class="a">作为对这一事件的一个纪念，这里统计了问答关注人数最多的20个问题供参考</h3>
        <div class="qq">
            <div v-for="(qq,i) in question" :key="qq.id">{{ qq.id + 1 }}：<span @click="enterD(i,qq.q)">{{ qq.q }}</span></div>
        </div>
    </div>

</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import {computed, watch, watchEffect, ref, onBeforeMount, getCurrentInstance} from "vue";

let search = ref('')
const {proxy} = getCurrentInstance()
const router=useRouter()
let route = useRoute()
let id = computed(() => {
    return route.query.id
})
let question = ref([])
onBeforeMount(async () => {
    let r = await proxy.$mock.get('/wbquestion')
    if (r.code == 200) question.value = r.data
})
let enterD=(i,q)=>{
    router.push({
        name:'wbanswer',
        query:{
            qi:i,
            que:q
        }
    })
}
</script>

<style scoped lang="less">
* {
    padding: 0;
    margin: 0;
}

.contain {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px 10px 120px 10px;

    h3 {
        width: 95%;
        font-size: 25px;

        &:first-child {
        }
    }

    .a {
        opacity: 0.5;
        font-size: 20px;
    }

    .qq {
        width: 95%;
        font-size: 20px;

        > div {
            margin: 10px 0;
            /*display: flex;
            align-items: center;*/
            > span {
                font-size: 20px;
                color: black;
                cursor: pointer;
                text-decoration: underline;

                &:hover {
                    color: #ff105e;
                }
            }
        }

        > div:first-child {
            font-size: 26px;
            color: #ff105e;
        }

        > div:nth-child(2) {
            font-size: 24px;
            color: green;
        }

        > div:nth-child(3) {
            font-size: 22px;
            color: #2bd2ff;
        }
    }
}
</style>