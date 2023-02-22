<template>
    <div>
        <van-card
            v-for="(a,i) in starnews" :key="i"
            :desc="filter(a.content)"
            :title="a.title"
            :thumb="proxy.$a.baseURL+a.cover"
            @click="enterNews(i)"
        >
            <template #tags>
                <div class="like">
                            <span>
                                {{ a.createTime }}
                            </span>
                    <span>
                                <van-icon name="like-o" />
                                {{ a.likeNum }}
                            </span>
                </div>
            </template>

        </van-card>
    </div>
</template>

<script setup>
import 'animate.css'
import {computed, getCurrentInstance, ref} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
let store=useStore()
let router=useRouter()
let {proxy}=getCurrentInstance()

let starnews=computed(()=>store.state.movie.starnews)
let enterNews=(i)=>{
    router.push({
        name:'starDetail',
        query:{
            id:i
        }
    })

}
let filter=(v)=>{
    return v.replace(/<[^<>]+>/g,'')
}
</script>

<style scoped>

</style>