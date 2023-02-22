<template>
    <div>

    <div class="top">
        <van-row justify="space-around">
            <van-col span="6" offset="1">
                <van-image
                    fit="fill"
                    radius="10"
                    :src="proxy.$a.baseURL+d.cover"
                />
            </van-col>
            <van-col span="12" class="b">
                <div>{{ d.name }}</div>
                <div>{{ d.language }}</div>
                <div>{{ d.playDate }}中国大陆上映/{{ d.duration }}分钟</div>
                <div>
                    <van-button type="danger" size="mini" @click="d.likeNum++">想看</van-button>
                    <van-button type="warning" size="mini" @click="d.favoriteNum++">看过</van-button>
                </div>
            </van-col>
        </van-row>
        <van-divider
            contentPosition="center"
            customStyle="color: blue; border-color: #1989fa; font-size: 18px;"
            hairline
        >
            影片评分
        </van-divider>

        <van-row justify="space-around" class="middle">
            <van-col span="4" offset="2" class="a">
                <div>{{ d.score }}</div>
                <div>787878人评</div>
            </van-col>
            <van-col offset="4" span="8" class="bbb">
                <div>{{ d.likeNum }} 人想看</div>
                <div>{{ d.favoriteNum }} 人看过</div>
            </van-col>
        </van-row>

        <van-divider
            contentPosition="center"
            customStyle="color: blue; border-color: #1989fa; font-size: 18px;"
            hairline
        >
            简介&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-size: 10px">展开</span>
            <van-icon name="arrow-down" color="#1989fa" style="cursor: pointer" @click="isshow=!isshow"/>
        </van-divider>
        <van-row justify="space-around" class="middle2">
            <van-col>
                <div v-html="d.introduction" :class="isshow===true?'show':'noshow'"></div>
            </van-col>
        </van-row>

        <div class="bottom">
            <div>
                <span>观众热评<span class="aa">45w</span></span>

                <transition
                    name="animate__animated animate__bounce"
                    enter-active-class="animate__rotateIn"
                    leave-active-class="animate__rotateOut"
                >
                    <van-button type="danger" round size="small" @click="writeC" v-show="isC">写评论</van-button>
                </transition>



            </div>
        </div>

        <van-row class="bot2" v-for="(c,i) in com" :key="i">
            <van-col span="3" offset="1" class="aa">
                <van-image
                    round
                    fit="fill"
                    :src="c.img"
                />
            </van-col>
            <van-col span="18" class="bb">
                <div class="ba">{{c.n}}</div>
                <div class="c">
                    <van-rate v-model="c.s" readonly
                              size="15"
                              color="#ffd21e"
                    />
                    <span style="color: #ffd21e;margin-left: 15px">{{c.s}}分</span>
                </div>
                <div class="cd">
                    <span>{{c.c}}</span>
                </div>
                <div class="d">
                    <span v-text="d.playDate"></span>
                    <span><van-icon name="like-o" />&nbsp;666</span>
                </div>
            </van-col>
        </van-row>


    </div>

        <div id="btn">
            <div>
                <van-button type="danger" size="small" round block @click="ticket">购票</van-button>
            </div>
        </div>

    <transition
        name="animate__animated animate__bounce"
        leave-active-class="animate__rotateOutUpRight"
        enter-active-class="animate__rotateInDownLeft"
    >
    <van-overlay :show="!isC">
        <div class="wrapper" @click.self="isC=!isC">
            <div class="comment">
                <div class="c0">
                    {{d.name}}
                </div>
                <van-row class="mi">
                    <van-col span="7" offset="1" class="c1">
                        <div>我的评分:</div>
                    </van-col>
                    <van-col span="14" offset="2">
                        <van-rate v-model="co.star" />
                    </van-col>
                </van-row>
                <van-cell-group>
                    <van-field
                        v-model="co.msg"
                        rows="2"
                        autosize
                        label="评论"
                        type="textarea"
                        maxlength="200"
                        placeholder="请输入评论"
                        show-word-limit
                    />
                </van-cell-group>
                <van-button block type="primary" size="small" round class="mi2" @click="addC(co)">发表评论</van-button>
            </div>
        </div>
    </van-overlay>
    </transition>

    </div>

</template>

<script setup>
import 'animate.css'
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import {computed, getCurrentInstance, reactive, ref} from "vue";
import jxc from '../../../../assets/comment/jxc.jpg'
import td from '../../../../assets/comment/td.jpg'
import wd from '../../../../assets/comment/wd.jpg'
import xrk from '../../../../assets/comment/xrk.jpg'
import wg from '../../../../assets/comment/wg.jpg'
import {Toast} from "vant";
import {getStorage} from "../../../../utils/storage";
import router from "../../../../router";
let i_name=getStorage('info')

let route = useRoute()
let store = useStore()
let {proxy} = getCurrentInstance()
let id = route.query.id
let d = computed(() => store.state.movie.movielist[id])
let isshow = ref(false)

let com=reactive([
    {
        n:'豌豆射手',
        s:3,
        c:'演技还行,但不好看,我不喜欢',
        img:wd
    },
    {
        n:'向日葵',
        s:5,
        c:'特效优秀,演技优秀,很喜欢',
        img:xrk
    },
    {
        n:'土豆地雷',
        s:4,
        c:'一般般吧',
        img:td
    },
    {
        n:'卷心菜投手',
        s:5,
        c:'超级好看',
        img:jxc
    }
])
com.reverse()

let isC=ref(true)
let writeC=()=>{
    isC.value=false
}
let co=reactive({
    msg:'',
    star:0
})
function addC({msg,star}){
    if (msg.length==0||star==0){
        Toast('无效的评论,请重新填写')
        clear()
    }else {
        Toast('评论添加成功')
        com.unshift({
            n:i_name.userName,
            s:co.star,
            c:co.msg,
            img:wg
        })
        setTimeout(()=>{
            isC.value=!isC.value
            clear()
        },500)
    }
}
function clear() {
    co.msg=''
    co.star=0
}
let ticket=()=>{
    console.log(id)
    router.push({
        name:'ticket',
        query:{
            id
        }
    })
}
</script>

<style lang="less" scoped>
.top {
    margin-top: 5px;
    padding: 5px;
    height: 20%;

    .van-image {
        background-size: cover;
        height: 250px;
        width: 100%;
    }

    .b {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        div:first-child {
            font-size: 38px;
            color: black;
        }

        div {
            font-size: 20px;
            color: darkgray;
        }

        div:last-child {
            display: flex;
            justify-content: space-around;
        }
    }

}

.middle {
    div {
        font-size: 20px;
        color: darkgray;
    }

    .a {
        div:first-child {
            font-size: 38px;
            color: #ffc107;
        }
    }
    .bbb{
        div:last-child{
            margin-top: 19px;
        }
    }
}

.middle2 {
    div {
        font-size: 28px;
    }

    .noshow {
        height: 120px;
        overflow: hidden;
    }

    .show {
        height: 100%;
        overflow: visible;
    }
}

.bottom {
    margin-top: 10px;
    div {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        >span{
            margin: 10px;
        font-size: 30px;
        font-weight: 1000;
            .aa{
                margin-left: 5px;
                color: darkgray;
                font-size: 20px;
            }
    }
    }
}

.bot2 {
    border-bottom: rgba(169, 169, 169, 0.4) solid 1px;
    margin-top: 10px;
    .aa{
        margin-top: 10px;
        .van-image {
            width: 80px;
            height: 80px;
            background-size: cover;
        }
    }

    .bb{
        .ba{
            font-size: 30px;
        }
        .c{
            span{
                font-size: 25px;
                color: darkgray;
            }
        }
        .cd{
            overflow: auto;
            height: 28px;
            span{
                display: block;
                font-size: 25px;
                color: darkgray;
            }
        }
        .d{
            display: flex;
            justify-content: space-between;
            span{
                font-size: 20px;
                color: darkgray;
            }
        }
    }
}
#btn{
    position: fixed;
    bottom: 10%;
    left: 50%;
    width: 100%;
    transform: translate(-50%,-50%);
    div{
        background: white;
        padding: 10px;

    }
}

.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

/*.block {
    width: 150px;
    height: 150px;
    border-radius: 20px;
    background-color: #fff;
}*/
.comment{
    border-radius: 15px;
    background: white;
    padding: 5px;
    .c0{
        font-size: 40px;
        text-align: center;
        font-weight: 800;
        margin: 20px 0;
    }
    .c1{
        font-size: 30px;
    }
    .mi{
        display: flex;
        align-items: center;
        margin: 5px 0;
    }
    .mi2{
        margin: 5px 0;
    }
}
</style>