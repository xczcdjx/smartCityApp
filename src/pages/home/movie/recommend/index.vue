<template>
    <div>

    <van-card
        v-for="(a,i) in rec" :key="i"
        :desc="a.language+'/'+a.duration+'分钟'"
        :title="a.name"
        :thumb="proxy.$a.baseURL+a.cover"

    >
        <template #tags>
            <div class="like">
                <span style="display: flex;align-items: center">
                    <span>评分:</span>&nbsp;
                    <van-rate
                    v-model="a.score"
                    :size="15"
                    color="#ffd21e"
                    void-icon="star"
                    void-color="#eee"
                    readonly
                /></span>
                <span>
                    <van-button size="mini" type="danger"
                                @click="enterRec(i)"
                    >购票</van-button>
                </span>
            </div>
        </template>

    </van-card>
    </div>

</template>

<script setup>
import {computed, getCurrentInstance, ref} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

let store = useStore()
let router = useRouter()
let {proxy} = getCurrentInstance()

let rec = computed(() => store.state.movie.movielist)

let enterRec = (i) => {
    console.log(i)
}
</script>

<style scoped>

</style>