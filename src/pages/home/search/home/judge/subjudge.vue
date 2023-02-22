<template>
    <div>

    <van-overlay :show="show">
        <div class="wrapper" @click.self="show=false">
            <div class="block" />
        </div>
    </van-overlay>
    </div>

</template>

<script setup>
import {ref} from "vue";

let show=ref(true)
</script>

<style scoped>
.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.block {
    width: 120px;
    height: 120px;
    background-color: #fff;
}
</style>