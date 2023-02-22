<template>
    <div class="contain">
        <carousel :imglist="imgA" :show="0"/>
        <van-divider
            contentPosition="center"
            customStyle="color: blue; border-color: #1989fa; font-size: 18px;"
            hairline
        >
            生活缴费
        </van-divider>
        <van-grid>
            <van-grid-item v-for="(l,i) in lifeI" @click="enterLife(i)" :key="i" :icon="proxy.$a.baseURL+l.imgUrl"
                           :text="l.liveName"/>
        </van-grid>


    </div>
</template>

<script setup>
import {getCurrentInstance, onBeforeMount, ref} from "vue";
import {useRouter} from "vue-router";

let {proxy} = getCurrentInstance()
let imgA = ref([])
let lifeI = ref([])
onBeforeMount(async () => {
    let r = await proxy.$http.get(proxy.$a.life_carousel)
    let r2 = await proxy.$http.get(proxy.$a.life_item)
    if (r.code == 200) imgA.value = r.rows
    if (r2.code == 200) lifeI.value = r2.data
})
let router = useRouter()
let enterLife = (i) => {
    switch (i) {
        case 0:
            router.push({
                name: 'telecharge'
            })
            break;
        default:
            router.push({
                name: 'elecharge',
                query: {
                    id: i
                }
            })
    }
}
</script>

<style scoped lang="less">
.contain {
    margin: 5px;
}
</style>