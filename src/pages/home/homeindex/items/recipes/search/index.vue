<template>
    <div>

    <van-popover v-model:show="showPopover" :show-arrow="false" placement="bottom">
        <van-cell-group inset class="cell" >
            <van-cell v-show="menus.length" v-for="(m,i) in menus" @click="menuD(m.id)" clickable :title="m.id-9" :key="i" :value="m.name.substring(0,5)+'...'" />
        </van-cell-group>

        <van-empty description="很遗憾,未找到" class="cell2" v-show="!menus.length"/>
        <template #reference>
            <div class="search">
                <van-search
                    input-align="center"
                    v-model="search"
                    placeholder="搜索菜谱"
                    @search="searchRec"
                    shape="round"
                />
            </div>
        </template>
    </van-popover>
<div class="copy">
    <span>菜品由:小丑在唱独角戏独家提供</span>

</div>
</div>

</template>

<script setup>
import {computed, getCurrentInstance, onBeforeMount, onMounted, ref} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
let search=ref('')
const store=useStore()

let menu=computed(()=>store.state.mock.menu)
let menus=computed(()=>{
    return menu.value.filter(it=>{
        return  it.name.indexOf(search.value)!=-1
    })
})
const {proxy}=getCurrentInstance()

const showPopover = ref(false);

let searchRec=()=>{

}
const router=useRouter()
function menuD(i) {
    router.push({
        name:'searchD',
        query:{
            reI:i
        }
    })
}
</script>

<style lang="less" scoped>
.search{
    position: fixed;
    width: 100%;
    top: 28%;
}
.cell{
    position: fixed;
    width: 90%;
    top:37%;
    overflow: auto;
    height: 45%;
}
.cell2{
    position: fixed;
    width: 90%;
    top:35%;
    overflow: auto;
    height: 60%;
    left: 5%;
}
.copy{
    text-align: center;
    width: 100%;
    color: #464646;
    font-size: 28px;
    position: fixed;
    bottom: 13%;
}
</style>