<template>
    <div>
    <div class="contain">
        <van-index-bar :index-list="indexList" @click="choose($event)">
            <van-index-anchor index="1">头条</van-index-anchor>
            <van-cell ib="0" title="今日头条是一个通用信息平台，致力于连接人与信息，让优质丰富的信息得到高效精准的分发，促使信息创造价值 …"/>
            <van-index-anchor index="2">新闻</van-index-anchor>
            <van-cell title="新闻频道是面向全球，多语种，多终端的立体化新闻信息共享平台。以视听与互动为核心，24小时不间断提供最快捷，最权威，最全面，最丰富的新闻视听与互动服务，传播 …"/>
            <van-index-anchor index="3">国内</van-index-anchor>
            <van-cell ib="2" title="新闻中心国内频道，纵览国内时政、综述评论及图片的栏目，主要包括时政要闻、内地新闻、港澳台新闻、媒体聚焦、评论分析。 违法和不良信息 …"/>
            <van-index-anchor index="4">国际</van-index-anchor>
            <van-cell title="环球网王牌频道,专门显示国际时事、综述评论及图片的栏目,主要包括环球时报和环球网独家新闻、国际博览、新闻人物 …"/>
            <van-index-anchor index="5">政治</van-index-anchor>
            <van-cell
                title="政治（Politics）是指政府、政党等治理国家的行为。政治是以经济为基础的上层建筑，是经济的集中表现，是以国家权力为核心展开的各种社会活动和社会关系的总和。政治是牵动社会全体成员的利益并支配其行为的社会力量。政治学是专门以政治为研究对象的一门社会科学，研究政治行为的理论和 …"/>
            <van-index-anchor index="6">财经</van-index-anchor>
            <van-cell title="东方财富网财经频道提供权威、全面、专业、及时的财经资讯，将众多财经资讯、功能进行浓缩，内容饱满详实，展现形式丰富，是网友获取财经 …"/>
            <van-index-anchor index="7">体育</van-index-anchor>
            <van-cell title="体育提供最全面专业的体育赛事直播点播、图文资讯、评论报道，内容涵盖世界杯、国足、NBA、CBA、篮球、欧冠、亚冠、英超、意甲、法甲、欧洲国家联赛、欧洲杯、世 …"/>
            <van-index-anchor index="8">娱乐</van-index-anchor>
            <van-cell title="搜狐娱乐是搜狐视频旗下的娱乐资讯平台。我们有各类最新鲜最热辣的明星资讯、独家爆料、影视剧及周边、音乐演出和明星时尚，让您掌握第一手 …"/>
            <van-index-anchor index="9">军事</van-index-anchor>
            <van-cell title="新浪军事频道是一个专业的军事知识网站，覆盖国内军事新闻、国际军事新闻、军备动态、台海形势、我军新闻、军帖精选、新闻评述、军事视频 …"/>
            <van-index-anchor index="10">教育</van-index-anchor>
            <van-cell
                title="教育（Education）狭义上指专门组织的学校教育；广义上指影响人的身心发展的社会实践活动。拉丁语educare是西方“教育”一词的来源，意思是“引出”。教育者按照法律法规和行业规范，根据学校条件和职称，有目的有计划有组织地对受教育者的心智发展进行教化培育，以现有的经验、学识授人 …"/>
            <van-index-anchor index="11">科技</van-index-anchor>
            <van-cell
                title="社会上习惯于把科学和技术连在一起，统称为科学技术，简称科技。实际二者既有密切联系，又有重要区别。科学解决理论问题，技术解决实际问题。科学要解决的问题，是发现自然界中确凿的事实与现象之间的关系，并建立理论把事实与现象联系起来；技术的任务则是把科学的成果应用到实际问题 …"/>
            <van-index-anchor index="12">NBA</van-index-anchor>
            <van-cell
                title="新浪NBA，提供NBA中国赛、NBA常规赛、NBA总决赛、NBA季后赛等；nba十佳球、NBA快讯、NBA视频、NBA图片、NBA赛程、科比火箭等NBA球员球队的NBA数据以及 …"/>
            <van-index-anchor index="13">股票</van-index-anchor>
            <van-cell
                title="股票是一种有价证券，是股份公司在筹集资本时向出资人发行的股份凭证，代表着其持有者（即股东）对股份公司的所有权，购买股票也是购买企业生意的一部分，即可和企业共同成长发展。这种所有权为 …"/>
            <van-index-anchor index="14">星座</van-index-anchor>
            <van-cell
                title="十二星座 在西方占星学上，黄道12星座是宇宙方位的代名词，一个人出生时，各星体落入黄道上的位置，说明了一个人的先天性格及天赋。十二星座依次为白羊座（Aries） 、金牛座（Taurus）、双子座（Gemini）、巨蟹 …"/>
            <van-index-anchor index="15">女性</van-index-anchor>
            <van-cell
                title="在女性主义者的努力下，女性权利已获得基本上的保护和平等。 男女平等在《联合国宪章》序言中与基本人权、人格尊严与价值、大小各国平等被并列重申。 然而伊斯兰教教义则强调男女两性应当按实体的表现功能给予不同的权利和权力，以保护男女两性生理上赋予的生存尊严与精神尊严，例如 …"/>
            <van-index-anchor index="16">育儿</van-index-anchor>
            <van-cell
                title="育儿主要指的是对0～6岁年龄阶段的幼儿所实施的教育。一个孩子还是胎儿的时候，他就能感受到母亲或外界环境的种种影响，如悦耳或刺耳的声音，母亲安详或焦虑不安的情绪、动作和心跳。孩子出生以后，逐渐从一个娇弱无能、感觉混沌、无知无识的小婴儿，成长发展为能适应社会生活，掌握了 …"/>


        </van-index-bar>

    </div>
    <van-overlay :show="show">
        <div class="wrapper" @click.self="show=false">
            <div class="block">
                <van-cell-group>
                    <van-field
                        v-model="appkey"
                        type="password"
                        name="appkey"
                        label="appkey"
                        placeholder="输入正确的key"
                        :rules="[{ required: true, message: '请填写appkey' }]"
                    />
                    <van-button type="warning" size="small" block @click="submit">提交</van-button>
                </van-cell-group>
            </div>
        </div>
    </van-overlay>
    </div>
</template>

<script>
import {onMounted, ref} from "vue";
import axios from "axios";
import {Toast} from "vant";
import {setStorage,getStorage} from "../../../../../utils/storage";
import {useStore} from "vuex";
import {useRouter} from "vue-router";


export default {
    name:'alljudge',
    setup(){
        let show = ref(false)
        let appkey = ref('')

        function submit() {
            if (appkey.value.length == 0) {
                Toast('输入不能为空!!!')
            } else {
                judge()
            }
        }
        const store=useStore()
        const router=useRouter()
        async function judge() {
            // console.log(title.value)
            let r = await axios.get(`https://api.jisuapi.com/news/get?channel=${title.value}&start=0&num=30&appkey=${appkey.value}`)
            // let r = await axios.get(`napi/news/get?channel=${title.value}&start=0&num=30&appkey=${appkey.value}`)
            // console.log(r.data.result.list)
            if (r.data.status == 0) {
                Toast('验证成功!!!')
                setStorage('s_appkey', appkey.value)
                store.commit('search/allstageD',r.data.result.list)
                show.value=false
                setTimeout(()=>{
                    Toast.loading({
                        message: '稍等...',
                        forbidClick: true,
                    });
                    setTimeout(()=>{
                        router.push({
                            name:'allstage',
                            query:{
                                t:title.value
                            }
                        })
                    },2000)
                },500)
            } else {
                Toast(r.data.msg)
                appkey.value = ''
            }
        }

        let indexList = ref(['头条', '新闻', '国内', '国际', '政治', '财经', '体育', '娱乐', '军事', '教育', '科技', 'NBA', '股票', '星座', '女性', '育儿'])
        let title=ref('头条')
        let choose=(e)=>{
            title.value=e.target.getAttribute('data-index')
            if (title.value){
                Toast(`你已经选择：${title.value}`)
                setTimeout(()=>{
                    Toast.loading({
                        message: '请稍后...',
                        forbidClick: true,
                    });
                    setTimeout(()=>{
                        if (getStorage('s_appkey')){
                            let s_appkey=getStorage('s_appkey')
                            getallS(s_appkey)
                        }else {
                            show.value=true
                        }
                        // console.log(title.value)
                    },1000)
                },500)
            }else {
                Toast('请点击右侧导航栏')
            }
        }
        async function getallS(key) {
            let r = await axios.get(`https://api.jisuapi.com/news/get?channel=${title.value}&start=0&num=30&appkey=${key}`)
            // let r = await axios.get(`napi/news/get?channel=${title.value}&start=0&num=30&appkey=${key}`)
            if (r.data.status==0){
                store.commit('search/allstageD',r.data.result.list)
                Toast.loading({
                    message: '再稍等...',
                    forbidClick: true,
                });
                setTimeout(()=>{
                    router.push({
                        name:'allstage'
                    })
                },1000)
            }
        }
        onMounted(()=>{
            if (!getStorage('s_appkey')){
                show.value=true
            }
        })
        return{
            show,choose,indexList,submit,appkey
        }
    },beforeRouteEnter(to,from,next){
        if (from.name=='allstage'){
            next()
        }
        if (getStorage('s_appkey')){
            next()
        }
        if (to.name=='alljudge'){
            next()
        }
        // if ()
    }
}


</script>

<style scoped lang="less">
.contain {
    margin-bottom: 80%;

    .van-index-bar {
        .van-cell {
            cursor: pointer;
            &:hover{
                color: skyblue;
            }
        }
    }
}

.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.block {
    border-radius: 15px;
    width: 420px;
    height: 200px;
    background-color: #fff;

    .van-cell-group {
        margin: 5px;

        .van-button {
            border-radius: 15px;
        }
    }
}
</style>