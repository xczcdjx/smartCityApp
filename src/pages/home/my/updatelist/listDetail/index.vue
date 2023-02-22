<template>
<div class="container">
    <van-divider dashed>店铺信息</van-divider>
    <div class="top" v-if="listDetail">
        <van-image :src="proxy.$a.baseURL+m.find(item=>item.id===listDetail.orderInfo.sellerId).imgUrl" radius="10" />
        <div class="d">
            <h4>{{m.find(item=>item.id===listDetail.orderInfo.sellerId).name}}</h4>
            <span>{{listDetail.sellerInfo.address.substring(0,25)}}...</span>
            <span>{{listDetail.sellerInfo.deliveryTime}} min</span>
            <span>{{listDetail.sellerInfo.distance/1000}} km</span>
        </div>
    </div>
    <van-divider dashed>订单信息</van-divider>
    <div class="middle" v-if="listDetail">
        <div class="l">
            <span>订单号:</span>
            <span>收货人:</span>
            <span>手机号:</span>
            <span>下单时间:</span>
            <span>付款时间:</span>
            <span>支付方式:</span>
            <span>数量:</span>
            <span>总价:</span>
        </div>
        <div class="r">
            <span>{{listDetail.orderInfo.orderNo}}</span>
            <span>{{listDetail.orderInfo.receiverName}}</span>
            <span>{{listDetail.orderInfo.receiverPhone}}</span>
            <span>{{listDetail.orderInfo.createTime}}</span>
            <span>{{listDetail.orderInfo.updateTime}}</span>
            <span>{{listDetail.orderInfo.paymentType}}</span>
            <span>1</span>
            <span>￥{{listDetail.orderInfo.amount}}</span>
        </div>
    </div>
    <div class="bottom" v-if="listDetail">
        <div class="a">
            <van-divider dashed>选购商品</van-divider>
            <van-swipe class="my_swipe" :show-indicators="false" :loop="true" :autoplay="5000" :width="200" >
                <van-swipe-item v-for="(l,i) in listDetail.orderInfo.orderItemList" :key="i">
                    <van-image :src="proxy.$a.baseURL+l.productImage" radius="10"/>
                    <span>{{l.productName}}</span>
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
<!--    {{listDetail}}-->
</div>
</template>

<script setup>
import {getCurrentInstance, onBeforeMount, ref,computed} from "vue";
import {useRouter,useRoute} from "vue-router";
import {useStore} from "vuex";

const {proxy}=getCurrentInstance()
const router=useRouter()
const route=useRoute()
const store=useStore()
const listDetail=ref()

const m=computed(()=>store.state.deliver.merchant)
onBeforeMount(async ()=>{
    let r=await proxy.$http.get(`/prod-api/api/takeout/order/${route.query.id}`)
    // console.log(r.data)
    listDetail.value=r.data
})
</script>

<style scoped lang="less">
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
.container{
    .van-divider{
        margin: 10px 0;
    }
    font-size: 23px;
    padding: 10px;
    .top{
        padding: 10px;
        display: grid;
        grid-template-columns: 200px 1fr;
        .van-image{
            width: 180px;
            height: 180px;
        }
        >.d{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            >span{
                color: #858686;
            }
        }
    }
    .middle{
        margin: 0 auto;
        width: 480px;
        border-radius: 15px;
        background: silver;
        padding: 20px;
        display: grid;
        grid-template-columns: 140px 300px;
        place-content: center;
        >.l{
            display: grid;
            grid-template-rows: repeat(8,1fr);
        }
        >.r{
            display: grid;
            grid-template-rows: repeat(8,1fr);
        }
    }
    .bottom{
        .a{
            width: 100%;
            height: 250px;
            .my_swipe {
                display: flex;
                justify-content: center;
                width: 100%;
                .van-swipe-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    height: 100%;
                    padding: 10px;
                    .van-image {
                        width: 100%;
                        height: 200px;
                        background-size: cover;
                        border-radius: 10px;
                    }
                }
            }
        }
    }
}
</style>