<template>
<div class="container">
    <van-divider>选择支付方式</van-divider>
    <van-grid :column-num="3" clickable>
        <van-grid-item v-for="(l,i) in icon" :key="i" @click="onSelect(l.t)">
            <van-image :src="l.ic"/>
            <span>{{l.t}}</span>
        </van-grid-item>
    </van-grid>
    <div class="pay">
        <van-button type="primary" @click="pay" block plain>支付</van-button>
    </div>
</div>
</template>

<script setup>
import aipay from '/public/images/service/life/aipay.jpg'
import RC from '/public/images/service/life/R-C.jpg'
import weichat from '/public/images/service/life/wechat.jpg'
import {useRoute, useRouter} from "vue-router";
import {Toast} from "vant";
import {getCurrentInstance, ref} from "vue";

let icon=[
    {ic:aipay,t:'支付宝支付'},
    {ic:weichat,t:'微信支付'},
    {ic:RC,t:'银联支付'},
]

const route=useRoute()
const paymentType=ref('')
const onSelect=(n)=>{
    paymentType.value=n
    Toast(`你已选择${n}`)
}
const router=useRouter()
const {proxy}=getCurrentInstance()
const pay=()=>{
    if (!paymentType.value) return Toast('请选择一种支付方式')
    let payOrder={
        paymentType:paymentType.value,
        orderNo:route.query.orderNo
    }
    proxy.$http.post('/prod-api/api/takeout/pay',payOrder).then(v=>{
        if (v.code===200) {
            Toast('支付成功')
            router.replace({
                name:'updatelist'
            })
        }else {
            Toast(v.msg)
        }
    })
}
</script>

<style scoped lang="less">
.container{
    .van-grid{
        font-size: 28px;
        .van-image{
            width: 100px;
            height: 100px;
        }
    }
    .pay{
        text-align: center;
        width: 80%;
        left: 50%;
        transform: translateX(-50%);
        position: fixed;
        bottom: 10px;
    }
}
</style>