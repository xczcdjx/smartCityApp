<template>
<div>
    <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        add-button-text="提交订单"
        @add="onSubmit"
        @select="onChange"
    />

</div>
</template>

<script setup>
import {getCurrentInstance, reactive, ref} from 'vue'
import {useRoute, useRouter} from "vue-router";
import {Toast} from "vant";

const route=useRoute()
let orderList=JSON.parse(route.query.order)

const chosenAddressId = ref(0);
const list = reactive( [
    {
        id: 0,
        name: '张三',
        tel: '13000000000',
        address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
        isDefault: true,
    },
    {
        id: 1,
        name: '李四',
        tel: '1310000000',
        address: '浙江省杭州市拱墅区莫干山路 50 号',
    },
])
const onSubmit=()=>{
    let r=[]
    orderList.map(item=>{
      r.push({productId:item.id,quantity:item.quantity})
    })
    let l=list[chosenAddressId.value]
    let orderlists={
        addressDetail:l.address,
        name:l.name,
        phone:l.tel,
        amount:route.query.amount/100,
        orderItemList:r,
        sellerId:orderList[0].sellerId
    }
    submitOrder(orderlists)
}
const onChange=()=>{
    Toast('已切换'+list[chosenAddressId.value].name)
}
const {proxy}=getCurrentInstance()
const router=useRouter()
async function submitOrder(l){
   let r=await proxy.$http.post('/prod-api/api/takeout/order/create',l)
   if (r.code===200){
       Toast('订单创建成功')
       // console.log(r)
       router.push({
           name:'payorder',
           query:{
               orderNo:r.orderNo
           }
       })
   }else {
       Toast(r.msg)
   }
}
</script>

<style scoped lang="less">

</style>