<template>
<div class="container" v-if="libraryD">
    <div class="top">
        <van-image radius="10" :src="proxy.$a.baseURL+libraryD.imgUrl" />
        <div>
            <h3>{{libraryD.name}}</h3>
            <p>{{libraryD.businessHours}}</p>
        </div>
    </div>
    <div class="middle">
        <van-divider dashed>简介
            <span style="font-size: 10px;margin-left: 25px">展开</span>
            <van-icon name="arrow-down" color="#1989fa" style="cursor: pointer" @click="fade=!fade"/>
        </van-divider>
        <div class="desc" v-html="libraryD.description" :class="fade?'fade':'noFade'"></div>
    </div>
<!--{{comment[0]}}-->
    <div class="bottom">
        <div class="t">
            <div>
                <h3>热评</h3>
                <span>3000+</span>
            </div>
            <van-button type="danger" size="small" @click="mycomment=true" round>写评论</van-button>
        </div>
        <div class="audience" v-for="(c,i) in comment" :key="c.id">
            <span>{{i+1}}.&nbsp;{{c.userName.substring(0,5)}}...</span>
            <div>
                <span>{{c.content?c.content:'。。。'}}</span>
                <span>
                    <span>{{c.createTime}}</span>
                    <span><van-icon name="like-o"/>&nbsp;{{c.content?c.content.length:0}}</span>
                </span>
            </div>
        </div>
    </div>
    <transition
        name="animate__animated animate__bounce"
        leave-active-class="animate__rotateOutUpLeft"
        enter-active-class="animate__rotateInDownRight"
    >
        <van-overlay :show="mycomment">
            <div class="wrapper" @click.self="mycomment=!mycomment">
                <div class="comment">
                    <div class="c0">
                        {{libraryD.name}}
                    </div>
                    <van-cell-group>
                        <van-field
                            v-model="putcomment"
                            rows="2"
                            autosize
                            label="评论"
                            type="textarea"
                            maxlength="200"
                            placeholder="请输入评论"
                            show-word-limit
                        />
                    </van-cell-group>
                    <van-button block type="primary" size="small" round class="mi2" @click="addComment(putcomment)">发表评论</van-button>
                </div>
            </div>
        </van-overlay>
    </transition>
</div>
</template>

<script setup>
import 'animate.css'
import {useRoute} from "vue-router";
import {computed, onBeforeMount, ref} from "vue";
import {useStore} from "vuex";
import {getCurrentInstance} from "vue";
import {Toast} from "vant";
const route=useRoute()
const store=useStore()
const {proxy} = getCurrentInstance()

const fade=ref(true)
const libraryD=ref()
const comment=ref()
onBeforeMount(async ()=>{
    let r=await proxy.$http.get(`/prod-api/api/digital-library/library/${route.query.id}`)
    if (r.code===200) libraryD.value=r.data
    getComment()
})

const mycomment=ref(false)
const putcomment=ref('')
// const libraryD=computed(()=>store.state.library.library.find(it=>it.id==route.query.id))
const addComment=(c)=>{
    if (!c.length) return  Toast('请输入评论')
    proxy.$http.post('/prod-api/api/digital-library/library-comment',{
        libraryId:route.query.id,
        content:c
    }).then(v=>{
        if (v.code===200) {
            Toast('评论添加成功')
            mycomment.value=false
            putcomment.value=''
            getComment()
        }
        else Toast(v.msg)
    })
}
async function getComment() {
    let r2=await proxy.$http.get(`/prod-api/api/digital-library/library-comment/list?libraryId=${route.query.id}&pageNum=1&pageSize=20`)
    if (r2.code===200) comment.value=r2.data
}
</script>

<style scoped lang="less">
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
.container{
    padding: 10px;
    .top{
        padding: 10px;
        display: grid;
        grid-template-columns: 300px 1fr;
        place-content: center;
        .van-image{
            width: 280px;
            height: 280px;
        }
        >div{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            >h3{
                font-size: 35px;
                margin-top: 20px;
            }
            >p{
                font-size: 22px;
                margin-bottom: 80px;
            }
        }
    }
    .middle{
        >.desc{
            margin-top: 10px;
            font-size: 25px;
            color: rgba(0, 0, 0, 0.71);
        }
        .fade {
            height: 150px;
            overflow: hidden;
        }
        .noFade {
            height: 100%;
            overflow: visible;
        }
    }
    .bottom{
        padding: 20px;
        font-size: 20px;
        .t{
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 28px;
            span{
                font-size: 25px;
            }
            >.van-button{
                height: 60px;
            }
            >div{
                display: flex;
                align-items: end;
                >span{
                    margin-left: 20px;
                    color: silver;
                }
            }
            margin-bottom: 15px;
        }
        .audience{
            display: grid;
            margin-top: 10px;
            grid-template-columns: 160px 1fr;
            place-content: center;
            border-bottom: 1px solid silver;
            >div{
                display: flex;
                flex-direction: column;
                >span:first-child{
                    height: 60px;
                    overflow: hidden;
                }
                >span:last-child{
                    display: flex;
                    justify-content: space-between;
                    font-size: 20px;
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

    /*.block {
        width: 150px;
        height: 150px;
        border-radius: 20px;
        background-color: #fff;
    }*/
    .comment{
        border-radius: 15px;
        background: white;
        padding: 10px;
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
}
</style>