<template>
    <div>

    <div class="a">
        <carousel :show="1" :imglist="imgArr"/>
    </div>
    <div class="b">
        <figure>
            <figcaption>
                <h4>{{ detail[cP - 1] }}</h4>
            </figcaption>
            <p>{{ details[cP - 1] }}</p>
        </figure>
    </div>

    <div class="p">
        <div>
            <van-pagination v-model="cP" :total-items="24" :items-per-page="detail.length"
                            :show-page-size="3"
                            force-ellipses
            />
        </div>
    </div>
    </div>

</template>

<script setup>
import {getCurrentInstance, onBeforeMount, reactive, ref} from "vue";

let {proxy} = getCurrentInstance()
let imgArr = ref([])
onBeforeMount(async () => {
    let r = await proxy.$mock.get('/stage')
    if (r.code == 200) imgArr.value = r.data
})
let cP = ref(0)
console.log(cP)
let detail = reactive([
    '驿站简介', '房间配置', '周边配套', '特色服务', '联系方式'
])
let details = reactive([
    `南头古城站位于南山区南头古城景区，科技园旁的大体量品牌公寓；
    旁边是中山公园，超大城市绿地配套，古城内有约2万㎡商业文化产业社区综合体，
    生活便利。内设有餐吧、书桌等设备。房间标配100M电信宽带，每间房标配洗衣机，
    未入住青年提供生活娱乐便利。 附近公交站南山公安分局/南头/荔香公园，
    20分钟内可以到科技园，高新园 地铁：距离桃园地铁站1.7公里 驾车：沿着深南大道10分钟可到科技园，高新园；半小时到福田CBD`,
    `向酒店购买长租床位，进行标准化建设，配置空调、洗手间、热水器、无线网络等基础设施，配备活动室、阅览室等公共活动空间`,
    `每个驿站周边均有配套的基础设施`,
    `供免费住宿、就业指导、城市融入三大服务。驿站以安全舒适的住宿环境，提供长达7天的免费入住，打造“一个温暖的落脚点”。
    通过多种形式的就业指导，帮助毕业生快速、精准就业，打造来深求职就业，成长发展综合服务平台`,
    `深圳市南山区南头古城街道中山南街34号“泊寓南头古城店”
     0755—86665843（办理入住时间：9：00-21：00）
`
])
</script>

<style scoped lang="less">
.b {
    //margin-bottom: 20%;
    h4 {
        font-size: 30px;
        text-align: center;
        margin: 5px;
    }
    p{
        color: #464646;
        font-size: 25px;
        margin-bottom: 40%;
    }
}
.p{
    position: fixed;
    bottom: 10%;
    width: 100%;
    div{
        text-align: center;
    }
}
</style>