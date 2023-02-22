<template>
    <div class="contain">
        <div class="header">
            <img :src="proxy.$a.baseURL+res.imgUrl">
            <div class="a">
                <span>{{res.name}}</span>
                <span><van-icon name="clock-o" />配送约{{res.deliveryTime}}分钟
</span>
                <span>
                    公告:{{res.introduction}}
                </span>
                <img :src="proxy.$a.baseURL+res.imgUrl">
            </div>
        </div>
        <div class="slider">
           <div class="b">
               <h4>菜单</h4>
               <div v-for="l in list" @click="getList(l.id,l.sellerId)" :key="l.id" :class="showid==l.id?'showid':''">{{l.name}}</div>
           </div>
        </div>
        <div class="main" v-if="listDetail">
            <div class="c" v-for="(ll,i) in listDetail" :key="ll.id">
                <div class="ca">
                    <img :src="proxy.$a.baseURL+ll.imgUrl">
                </div>
                <div class="cb">
                    <span>{{ll.name}}</span>
                    <span>门店销售第{{i+1}}名</span>
                    <span>月售 {{ll.saleQuantity}}</span>
                    <span>￥{{ll.price}}</span>
                </div>
                <van-button type="primary" size="mini" @click="gotrolley(ll,1)">加入购物车</van-button>
            </div>
        </div>
        <div class="footer">
            <div class="d">
                <van-icon name="shopping-cart-o" size="40"/>&nbsp;
                <span :class="status?'sactive':''" @click="openShop">{{status?'选择商品':'未选择商品'}}</span>
            </div>
            <div>
                已选择 {{trolley.length}} 件商品
            </div>
        </div>
    </div>
    <van-popup
        v-model:show="shop"
        round
        closeable
        position="bottom"
        :style="{ height: '30%' }"
    >
        <div class="trolley">
            <h4>购物车</h4>
            <p v-for="(t,i) in trolley">
                <span>{{i+1}}. {{t.name}}</span>
                <span>
                    <van-button plain type="primary" size="mini" @click="shopDelete(i)">删除</van-button>&nbsp;
                    <van-button class="aa" plain size="mini" @click="addMenu(i,1)">+</van-button>
                    <span class="ab">{{t.quantity}}</span>
                  <van-button class="aa" plain size="mini" @click="addMenu(i,-1)">-</van-button>
                </span>
            </p>
            <van-submit-bar :price="totalPrice" button-text="提交" @submit="shopSubmit" />
        </div>
    </van-popup>

</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import {computed, getCurrentInstance, onBeforeMount, reactive, ref, watch, watchEffect} from "vue";
import {useStore} from "vuex";
import {Toast} from "vant";

let route=useRoute()
let store=useStore()
const {proxy}=getCurrentInstance()
let id=route.query.id
/*let s=route.query.search
let sl=route.query.searchl*/
/*let res=computed(()=>{
    if (sl==0){
        return store.state.deliver.merchant[id]
    }else if (sl!=0){
        return store.state.deliver.merchant.filter(it=>{
            return it.name.indexOf(s)!=-1
        })[id]
    }
})*/
const res=computed(()=>store.state.deliver.merchant.find(it=>it.id==id))
const list=ref()
onBeforeMount(async ()=>{
    let r=await proxy.$http.get(`/prod-api/api/takeout/category/list?sellerId=${id}`)
    list.value=r.data
})
let showid=ref(0)
const listDetail=ref()
const getList=(c,s)=>{
    showid.value=c
    proxy.$http.get(`/prod-api/api/takeout/product/list?sellerId=${s}&categoryId=${c}`).then(v=>{
        listDetail.value=v.data
    })
}
const status=ref(false)
let trolley=reactive([])
const gotrolley=(ll,i)=>{
    status.value=true
    let n=trolley.map(item=>{
        return item.name
    })
    if (n.includes(ll.name)) return Toast('不可重复添加')
    trolley.push(Object.assign(ll,{quantity:i}))
}
const shop=ref(false)
const openShop=()=>{
    if (!status.value) return  Toast('你尚未选择商品')
    shop.value=true
}
const shopDelete=(i)=>{
    Toast('已删除'+trolley[i].name)
    trolley.splice(i,1)
    if (!trolley.length) shop.value=false
}
const addMenu=(i,n)=>{
    if (trolley[i].quantity===1&&n===-1) return Toast('该商品不可再减了')
    trolley[i].quantity+=n
}
const totalPrice=computed(()=>{
    let p=0
    for (let i = 0; i < trolley.length; i++) {
        // console.log(trolley[i].price,trolley[i].quantity)
        p += trolley[i].price * trolley[i].quantity*100
    }
    return p;
})
const router=useRouter()
const shopSubmit=()=>{
    // console.log(trolley)
    let order=[]
    trolley.map(item=>{
        const o=(({sellerId,id,quantity})=>({sellerId,id,quantity}))(item)
        order.push(o)
    })
    router.push({
        name:'deliverAddress',
        query:{
            order:JSON.stringify(order),
            amount:totalPrice.value
        }
    })
}
/*watch(trolley,(o,n)=>{
    console.log(o,n)
})*/
</script>

<style scoped lang="less">
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
.contain{
    padding: 5px;
    display: grid;
    width: 100%;
    grid-template-areas: 'header header'
                        'slider main'
                        'footer footer'
;
    .header{
        grid-area: header;
        position: relative;
        .a{
            padding: 5px 10px;
            background: #fff;
            width: 80%;
            height: 150px;
            border-radius: 10px;
            border: #999999 1px solid;
            position: absolute;
            left: 50%;
            top: 35%;
            transform: translate(-50%);
            display: flex;
            font-size: 20px;
            flex-direction: column;
            justify-content: space-around;
            >span:first-child{
                font-size: 30px;
                font-weight: 600;
            }
            >img{
                position: absolute;
                top:-30%;
                right: 5%;
                width: 120px;
                height: 120px;
                border-radius: 10px;
            }
        }
        >img{
            width: 100%;
            height: 180px;
            background-size: cover;
            opacity: 0.5;
            //filter:blur(20px);
        }
    }
    .slider{
        font-size: 35px;
        text-align: center;
        margin-top: 10px;
        padding: 5px 15px;
        grid-area: slider;
        height: 100%;
        width:180px;
        border: deepskyblue solid 1px;
        .b{
            h4{
                font-weight: 600;
                margin-top: 15px;
                color: orangered;
            }
            >div{
                margin-top: 15px;
                border-bottom: 1px solid silver;
                &:hover{
                    color: #ffc107;
                    cursor:pointer;
                    background: skyblue;
                }
            }
            .showid{
                background: skyblue;
                color: red;
            }
        }
    }
    .main{
        grid-area: main;
        margin-top: 15px;
        >.c{
            border-bottom: 1px solid silver;
            padding: 0 5px;
            margin-top: 15px;
            display: grid;
            grid-template-columns: 160px 1fr 120px;
            place-content: center;
            .ca{
                img{
                    border-radius: 10px;
                    width: 150px;
                    height: 150px;
                }
            }
            .cb{
                width: 220px;
                display: grid;
                font-size: 20px;
                grid-template-rows: repeat(4,1fr);
                >span{
                    &:first-child{
                        font-size: 22px;
                        font-weight: 600;
                    }
                    &:nth-child(2){
                        color: #ffc107;
                    }
                    &:last-child{
                        color: #ff105e;
                        font-size: 28px;
                        font-weight: 600;
                    }
                }
            }
            .van-button{
                margin-top: 50px;
            }
        }
    }
    .footer{
        font-size: 28px;
        background: #fff;
        position: fixed;
        width: 100%;
        bottom: 0;
        padding: 0 10px;
        margin-top: 15px;
        grid-area: footer;
        height: 100px;
        border: #ffc107 1px solid;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .d{
            display: flex;
            align-items: center;
            .sactive{
                color: #ffc107;
            }
            >span{
                cursor: pointer;
                &:hover{
                    color: #ff105e;
                }
            }
        }
    }
    margin-bottom: 120px;
}
.trolley{
    font-size: 30px;
    text-align: center;
    width: 100%;
    padding: 20px;
    >h4{
        font-size: 30px;
    }
    >p{
        padding: 5px 15px;
        margin: 15px 15px;
        border-bottom: 1px solid silver;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        >span{
            display: flex;
            align-items: center;
        }
        .aa{
            width: 40px;
        }
        .ab{
            margin:0 10px;
        }
    }
}
</style>