<template>
<div class="container">
    <van-card
        v-if="orderList"
        v-for="(o,i) in orderList"
        :key="i"
        num="1"
        :price="(o.orderInfo.amount).toFixed(2)"
        :thumb="proxy.$a.baseURL+m.find(item=>item.id===o.orderInfo.sellerId).imgUrl"
    >
        <template #title>
            <div class="title">
                <span>{{m.find(item=>item.id===o.orderInfo.sellerId).name}}</span>
                <van-tag plain :type="o.orderInfo.status==='待评价'?'success':'danger'">{{o.orderInfo.status}}</van-tag>
            </div>
        </template>
        <template #desc>
            <div class="desc">
                <span>{{`下单时间: ${o.orderInfo.createTime||'未支付'}`}}</span><br>
                <span>{{`支付时间: ${o.orderInfo.updateTime||'未支付'}`}}</span>
            </div>
        </template>
        <template #tags>
        </template>

        <template #footer>
            <van-button size="mini" type="primary" @click="orderDetail(o.orderInfo.orderNo)">订单详情</van-button>
            <van-button size="mini" type="warning" @click="recall(o.orderInfo.orderNo)" :disabled="o.orderInfo.status==='退款'?true:false">退款订单</van-button>
        </template>
    </van-card>
    <van-empty v-else description="暂无订单,请前往外卖模块选购订单"/>
</div>
    <transition
        name="animate__animated animate__bounce"
        enter-active-class="animate__flipInY"
        leave-active-class="animate__flipOutX"
    >
    <van-overlay :show="recallShow">
        <div class="wrapper" @click.self="recallShow=false">
            <div class="block" >
                <h5>退款理由</h5>
               <textarea v-model="reason" cols="20" rows="6"></textarea><br/>
                <van-button type="warning" size="mini" @click="submit">提交</van-button>
            </div>
        </div>
    </van-overlay>
    </transition>
</template>

<script setup>
import 'animate.css'
import {computed, getCurrentInstance, onBeforeMount, ref} from "vue";
import {useStore} from "vuex";
import {Toast} from "vant";
import {useRouter} from "vue-router";

const {proxy}=getCurrentInstance()
const orderList=ref()
onBeforeMount(async ()=>{
    let r=await proxy.$http.get('/prod-api/api/takeout/order/list')
    orderList.value=r.rows
    // console.log(r.rows)
})
const store=useStore()
const m=computed(()=>store.state.deliver.merchant)
let recallShow=ref(false)
let reason=ref('')
let orderId=''
const recall=(o)=>{
    recallShow.value=true
    orderId=o
}
const router=useRouter()
const submit=()=>{
    if (!reason.value) return Toast('请提意见')
    proxy.$http.post('/prod-api/api/takeout/order/refound',{
        orderNo:orderId,
        reason:reason.value
    }).then(v=>{
        if (v.code===200) {
            Toast('退款成功')
            router.replace({
                name:'my'
            })
        }else {
            Toast(v.msg)
        }
    })
}
const orderDetail=(no)=>{
    router.push({
        name:'listDetail',
        query:{
            id:no
        }
    })
}
</script>

<style scoped lang="less">
.container{
    .title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 30px;
        font-weight: 600;
    }
    .desc{
        margin-top: 10px;
        font-size: 20px;
    }
}
.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    .block {
        border-radius: 15px;
        width: 520px;
        height: 520px;
        background-color: #fff;
        text-align: center;
        font-size: 35px;
        .van-button{
            margin-top: 20px;
        }
    }
}

</style>