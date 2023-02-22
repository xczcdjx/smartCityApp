<template>
    <div>
    <van-divider
        contentPosition="center"
        customStyle="color: blue; border-color: #1989fa; font-size: 18px;"
        hairline
    >
        手机缴费
    </van-divider>

    <van-cell-group>
        <van-field
        left-icon="phone-o"
        v-model="phone"
        placeholder="输入电话号码:"
        type="number"
        />
    </van-cell-group>
    <hr>

    <van-grid :column-num="3" clickable>
        <van-grid-item v-for="(n,i) in mon" :key="i" @click="charge(i)">
            <div class="a">
                <div>{{n.o}}</div>
                <span>￥{{n.n.toFixed(2)}}</span>
            </div>
        </van-grid-item>
        <van-grid-item @click="charge2">
            <div class="b">
            <div>6.6元话费</div>
            <span>人人可领</span>
            </div>
        </van-grid-item>
    </van-grid>

    <van-notice-bar scrollable :text="notice" mode="closeable" />

    <van-divider
        contentPosition="center"
        customStyle="color: blue; border-color: #1989fa; font-size: 18px;"
        hairline
    >
        缴费记录
    </van-divider>

    <van-card
        v-for="(a,i2) in chargecord.slice((currentPage-1)*3,(currentPage-1)*3+3)" :key="i2"
        :desc="a.rechargeTime+' '+a.title"
        :title="a.paymentType"
        :thumb="wg"
    >
        <template #tags>
            <div class="like">
                            <span>
                                {{ (Math.ceil(a.paymentAmount/10))*10}}&nbsp;元
                            </span>
            </div>
        </template>

    </van-card>


    <div class="pagin">
        <van-pagination
            v-model="currentPage"
            :total-items="128"
            :page-count="Math.ceil(chargecord.length/3)"
            :show-page-size="3"
            force-ellipses
        />

    </div>

    <van-action-sheet v-model:show="show" title="话费充值">
        <div class="content">
            <div class="pay">
                <div class="a">￥{{mon[index].n.toFixed(2)}}</div>
                <van-cell title="Item" value="手机充值"/>
                <van-grid :column-num="3" clickable>
                    <van-grid-item v-for="(a,i) in imga" :key="i" :icon="a.img" :text="a.t" @click="selectType(i)"/>
                </van-grid>
                <div class="b">
                    <van-button type="primary" size="small" block @click="againCharge">确认充值</van-button>
                </div>
            </div>
        </div>
    </van-action-sheet>


    <van-action-sheet v-model:show="show2" title="输入密码">
        <div class="content2">
        <van-password-input
            :value="value"
            :length="7"
            info="密码为 7 位数字"
            :error-info="errorInfo"
            :focused="showKeyboard"
            @focus="showKeyboard = true"
        />
        <van-number-keyboard
            v-model="value"
            :show="showKeyboard"
            @blur="showKeyboard = false"
        />
    </div>
    </van-action-sheet>

    </div>
</template>

<script setup>
import { PasswordInput, NumberKeyboard } from 'vant';
import wg from '../../../../../../assets/comment/wg.jpg'
import aipay from '/images/service/life/aipay.jpg'
import r_c from '/images/service/life/R-C.jpg'
import wechat from '/images/service/life/wechat.jpg'
import {reactive, ref, watchEffect, watch, getCurrentInstance, onBeforeMount} from "vue";
import {Toast} from "vant";
let show=ref(false)
let show2=ref(false)
let index=ref(0)
let index2=ref(0)
let phone=ref('')
let currentPage=ref(1)
let {proxy}=getCurrentInstance()
let imga=reactive([{
    img:aipay,
    t:'支付宝'
},{
    img:wechat,
    t:'微信'
},{
    img:r_c,
    t:'银联'
},

])
let mon=reactive([
    {
        o:50,
        n:49.90
    },
    {
        o:100,
        n:99.50
    },
    {
        o:200,
        n:199.00
    },
    {
        o:300,
        n:298.00
    },
    {
        o:500,
        n:495.00
    },
])
let notice='今日中国联通六折优惠,快来充值'
function charge(i) {
    index.value=i
    if (phone.value.length==0){
        Toast.fail('请填写号码')
    }else {
        Toast.loading({
            message: '加载中...',
            forbidClick: true,
        });
        setTimeout(()=>{
            show.value=true
        },1000)

    }
}
let charge2=()=>{
    Toast('你无法领取')
    setTimeout(()=>{
        Toast('哈哈哈')
        setTimeout(()=>{
            Toast('你就是无法领取')
        },800)
    },2000)
}
function againCharge() {
    Toast.loading({
        message: '加载中*2...',
        forbidClick: true,
    });
    setTimeout(()=>{
        show2.value=true
    },1000)
}
let selectType=(i)=>{
    index2.value=i
    Toast('你选择了'+imga[index2.value].t+'方式充值')
}
async function chargeTele() {
    let rechargeAmount=mon[index.value].n
    let paymentType=imga[index2.value].t+'支付'
    let type=1
    let phonenumber=phone.value
    let r=await proxy.$http.post(proxy.$a.life_tele_pay,{rechargeAmount,paymentType,type,phonenumber})
    console.log(r)
    if (r.code==200){
        clear()
        Toast('充值成功')
    }else {
        clear()
        Toast(r.msg)
    }
}
function clear() {
    value.value=''
    show.value=false
    show2.value=false
    phone.value=''
}
const value = ref('');
const errorInfo = ref('');
const showKeyboard = ref(true);

watch(value, (newVal) => {
    if (newVal.length === 7 && newVal !== '1314520') {
        errorInfo.value = '密码错误';
        setTimeout(()=>{
            Toast('请重新输入')
            value.value=''
        },800)
    }if (newVal==='1314520'){
        chargeTele()
    }
});
let chargecord=ref([])
onBeforeMount(async ()=>{
    let r=await proxy.$http.get(`/prod-api/api/living/phone/record/list?pageNum=1&pageSize=66`)
    if (r.code==200) chargecord.value=r.rows
})
</script>

<style scoped lang="less">
.like {
    display: flex;
    justify-content: flex-end;
span{
    color: #ffc107;
    font-size: 30px;
}
}
.van-notice-bar{
    height: 35px;
    font-size: 20px;
}
    .a{
        display: flex;
        flex-direction: column;
        align-items: center;
        >div{
            font-size: 36px;
            color: #03a9f4;
        }
        >span{
            font-size: 25px;
            color: #464646;
        }
    }
.b{
    display: flex;
    flex-direction: column;
    align-items: center;
    >div{
        font-size: 36px;
        color: #f40343;
    }
    >span{
        font-size: 25px;
        color: #f36666;
    }
}
.content {
    padding: 16px 16px 320px;
    .pay{
        .a{
            font-size: 40px;
            text-align: center;
            line-height: 60px;
        }
        .b{
            margin-top: 20px;
        }
    }
}
.content2 {
    padding: 16px 16px 490px;
}
.pagin{
    width: 100%;
    position: fixed;
    bottom: 10%;
}
</style>