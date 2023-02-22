<script setup>
import {onBeforeMount, onMounted} from "vue";
import {getStorage} from "./utils/storage";
import {useStore} from "vuex";
const store=useStore()
/*onBeforeMount(() => {

    if (!getStorage('service')) {
        store.dispatch('news/getService')
        console.log('service已经添加')
    } if (!getStorage('news')) {
        store.dispatch('news/getNews')
        console.log('news已经添加')
    } if (!getStorage('merchant')) {
        store.dispatch('deliver/getMerchant')
        console.log('merchant已经得到')
    } if (!getStorage('job')) {
        store.dispatch('job/getJobs')
        console.log('job已经得到')
    } if (!getStorage('menu')) {
        store.dispatch('mock/getMenu')
        console.log('menu已经得到')
    }
})*/
onMounted(()=>{
    store.dispatch('user/getUpgrade')
})
</script>

<template>

<!--    <router-view v-slot="{ Component }">
        <transition name="scale" mode="out-in">
            <component :is="Component" />
        </transition>
    </router-view>-->
    <router-view></router-view>

</template>

<style lang="less">
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.5s;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
    opacity: 0.3;
}

.slide-fade-enter-to, .slide-fade-leave-from {
    opacity: 1;
}

.scale-enter-active,
.scale-leave-active {
    transition: all 0.5s ease;
}


.scale-enter-from,
.scale-leave-to {
    opacity: 0;
    transform: scale(0.9);
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>


