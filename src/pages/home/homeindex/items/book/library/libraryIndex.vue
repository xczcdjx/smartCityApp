<template>
    <div class="contain">
        <div class="flee">
            <van-button type="warning" plain size="mini" :to="{name:'fleebook'}">游离图书</van-button>
        </div>
        <van-search
            v-model="search"
            placeholder="搜索图书"
            input-align="center"
            @search="onSearch"
        />
        <van-card
            v-for="(b,i) in books" :key="i"
            :title="b.name"
            :thumb="proxy.$a.baseURL+b.imgUrl"
            @click="enterLibrary(b.id)"
        >
            <template #desc>
                <div class="like">
                    <span>{{ b.address.substring(0, 25) }}...</span>
                    <div>
               <span>{{ b.businessHours.substring(0, 25) }}...</span>
                        <span><van-icon name="chat-o"/>&nbsp;
                                <span v-text="b.businessHours.length"/>
                            </span>
                    </div>
                </div>
            </template>
        </van-card>
    </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import {computed, getCurrentInstance, onBeforeMount, ref} from "vue";
import {useStore} from "vuex";
import {Toast} from "vant";

onBeforeMount(() => {
    store.dispatch('library/getLibrary')
})
const router = useRouter()
const {proxy} = getCurrentInstance()
const store = useStore()
const books = computed(() => store.state.library.library.filter(item=>item.name.indexOf(search.value)!=-1))

const search = ref('')

const onSearch = (val) => {
    console.log(val)
}
const enterLibrary=(i)=>{
    router.push({
        name:'libraryDetail',
        query:{
            id:i
        }
    })
}
</script>

<style scoped lang="less">
.contain{
    position: relative;
    .flee{
        position: absolute;
        right: 20px;
        top: 30px;
        z-index: 99;
    }
    .like{
        margin-top: 10px;
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
</style>