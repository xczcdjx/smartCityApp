<template>
    <div>

    <h4>深圳市人才政策:</h4>
    <van-tree-select
        v-model:main-active-index="activeIndex"
        height="55vw"
        :items="items"
    >
        <template #content>
            <div v-if="activeIndex === 0" class="a">
                <p>
                    （一）认定标准：
                    1、诺贝尔奖获得者（物理、化学、生理或医学、经济学奖）。
                    2、国家最高科学技术奖获得者。
                    3、中国科学院院士、中国工程院院士。
                    4、美国、日本、德国、法国、英国、意大利、加拿大、瑞典、丹麦、挪威、芬兰、比利时、瑞士、奥地利、荷兰、澳大利亚、新西兰、俄罗斯、新加坡、韩国、西班牙、印度、乌克兰、以色列国家最高学术权威机构会员
                </p>
                <p>
                    （二）资助政策：
                    1、100万元/人工作经费。
                    2、可选择10年免租入住200平方米住房或600万元奖励补贴。全职工作满10年、贡献突出并取得本市户籍的，可选择无偿获赠所租住房或1000万元购房补贴。
                    3、全职院士每年工作经费补助12万元，生活津贴2千元/月，双聘院士每年业务经费补助5万元，生活津贴1千元/月。
                </p>
            </div>
            <div v-if="activeIndex === 1" class="a">
                1、新引进入户的全日制本科及以上学历的人员可获得一次性租房和生活补贴：本科1.5万元、硕士2.5万元、博士3万元。
                2、符合条件的大学生休学创业和毕业后自主创业的，创业场租补贴标准提高20－50%（具体标准详见《深圳市自主创业扶持补贴办法》），可获得最高50万元的资助。大学生就业见习和实习，可获得补贴最高2500元/人/月，最长不超过6个月。
                3、青年人才驿站：符合条件的来深求职大学毕业生，7天内可免费入住（需预约）
            </div>
        </template>
    </van-tree-select>
    </div>



</template>

<script setup>
import {ref} from "vue";
const activeIndex = ref(0);
const items = [
    {
        text: '杰出人才',
    },
    {
        text: '大学生',
    },
];
</script>

<style scoped lang="less">
h4{
    text-align: center;
    font-size: 30px;
    margin: 5px;
}
.a{
    font-size: 25px;
    color: #464646;
}
</style>