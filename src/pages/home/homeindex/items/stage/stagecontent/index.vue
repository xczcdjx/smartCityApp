<template>
    <div>

    <div class="c">
        <div>
            申请条件:
        </div>
        <div>（一）应届毕业生，或毕业不满1年</div>
        <div>（二）在深圳市内无固定住所；</div>
        <div>（三）身体健康，无重大疾病或传染病</div>
        <div>（四）无获准接受“青年驿站”服务的历史记录；</div>
        <div>（五）遵守“青年驿站”入住公约</div>
    </div>
    <div class="d">
        <h4>服务内容:</h4>
        <van-collapse v-model="activeName" accordion>
            <van-collapse-item v-for="(s1,i) in ss" :key="i" :title="s1.t" :name="i">
                {{ s1.c }}
            </van-collapse-item>
        </van-collapse>
    </div>
    <div class="d">
        <h4>入住申请:</h4>
        <van-collapse v-model="activeName2">
            <van-collapse-item v-for="(s2,i) in st" :key="i" :title="s2.t" :name="i">
                {{ s2.c }}
            </van-collapse-item>
        </van-collapse>
    </div>

    <van-divider
        contentPosition="center"
        customStyle="color: blue; border-color: #1989fa; font-size: 18px;"
        hairline
    >
        驿站地址:
    </van-divider>
        <van-card
            v-for="(c,i) in addr" :key="i"
            :desc="c.a"
            :title="c.t"
            :thumb="c.img"
        >
            <template #tags>
                <div class="like"  style="display: flex;justify-content: flex-end">
                                <span>
                                    <van-icon name="chat-o" />
                                    {{ c.t.length}}
                                </span>
                </div>
            </template>

        </van-card>
    </div>

</template>

<script setup>
import img1 from '/images/service/stage/1.jpeg'
import img2 from '/images/service/stage/2.jpeg'
import img3 from '/images/service/stage/3.jpeg'
import img4 from '/images/service/stage/4.jpeg'
import img5 from '/images/service/stage/5.jpeg'
import img6 from '/images/service/stage/6.jpeg'
import {reactive, ref} from "vue";

let activeName = ref(1)
let activeName2 = ref(['1'])
let ss = reactive(
    [
        {
            t: '短期住宿',
            c: `符合条件的申请者，可以通过简便申请程序享受为期7天的免费住宿。
    免费服务及设施包含水电、热水淋浴、床上用品、无线上网、夏季空调等，实现“拎包入住”`
        }, {
        t: '就业帮助',
        c: `与人力资源部门密切合作，不仅向入住的大学毕业生提供招聘信息服务，
    还邀请人力资源顾问、招聘专员等为入住毕业生提供专业的就业指导`
    }, {
        t: '入职体检',
        c: `为有需要的入住者提供入职体检服务，进一步减轻就业大学生和社会企业的经济负担`
    }, {
        t: '城市融入',
        c: `为入住者提供城市地图、报刊图书、励志美文等资料，建立QQ群、微信公众账号、驿站公告栏、
    专门活动室，开展城市参观活动、文化体育活动和志愿服务体验等，帮助入住者了解深圳、融入城市`
    }
    ])
let st = reactive(
    [
        {
            t: '网上申请',
            c: `登陆青年驿站官网，选择入住站点，填写相关信息，上传相关证件的电子版（身份证、毕业证、学位证等），
    申请成功后的3-15日内根据网站提供的查询码查询审核结果。`
        }, {
        t: '资格审核',
        c: `由团区委在后台完成条件审核。审核结果在网站公布，由申请人根据申请时所生成的查询码查询结果。分配原则：根据所申请的入住时间先后对符合条件的申请人安排入住，
    如在同一时间段内，符合条件的申请人数超过所能提供的床位数，则根据递交申请表的时间先后给予安排`
    }, {
        t: '办理入住',
        c: `通过审核后，申请人凭入住申请表、确认短信等证明，在申请入住时间当天办理入住。因故无法按时报到的，需提前告知。无故逾时未报到的，取消入住资格。`
    }, {
        t: '城市融入',
        c: `为入住者提供城市地图、报刊图书、励志美文等资料，建立QQ群、微信公众账号、驿站公告栏、
    专门活动室，开展城市参观活动、文化体育活动和志愿服务体验等，帮助入住者了解深圳、融入城市`
    }
    ])
let addr = reactive(
    [
        {
            t: '青年驿站（福田八卦岭）',
            a: '深圳市福田区八卦岭三路45号“建设者之家”3楼',
            img: img1
        }, {
        t: '青年驿站（福田石厦）',
        a: '深圳市福田区石厦东村321号圣宝宾馆5楼',
        img: img2
    }, {
        t: '青年驿站（罗湖东门北）',
        a: '深圳市罗湖区东门北路1032号丰顺酒店10楼',
        img: img3
    }, {
        t: '青年驿站（宝安中心区）',
        a: '深圳市宝安区宝源路财富港小区C座104室',
        img: img4
    },{
        t: '青年驿站（龙岗布吉）',
        a: '深圳市龙岗区布吉吉华路77号布吉宾馆4楼',
        img: img5
    },{
        t: '青年驿站（龙华民治）',
        a: '深圳市龙华新区民治大道与民康路交汇处民泰商务宾馆11楼 ',
        img: img6
    },

    ])
</script>

<style scoped lang="less">
.c {
    margin: 5px 0;

    div:first-child {
        font-size: 36px;
        color: black;
    }

    div {
        font-size: 28px;
        color: #464646;
    }
}

.d {
    h4 {
        font-size: 36px;
    }
}
</style>