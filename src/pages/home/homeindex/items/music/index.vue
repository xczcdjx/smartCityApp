<template>
    <div>

    <van-divider
        contentPosition="center"
        customStyle="color: blue; border-color: #1989fa; font-size: 18px;"
        hairline
    >
        Music
    </van-divider>

    <van-notify v-model:show="show" type="success">
        <span>音乐已刷新</span>
    </van-notify>


    <van-pull-refresh v-model="loading" @refresh="onRefresh"
                      class="flash"
                      success-text="刷新成功"
    >
        <van-tabs @click-tab="tabclick" v-model:active="val">
            <van-tab title="热歌榜">
                <div class="mus">
                <van-card
                    v-show="comment.length!=0"
                    v-for="(c,i) in comment" :key="i"
                    :desc="c.content"
                    :title="c.nickname"
                    :thumb="c.avatarurl"
                    @click="musicC(c)"
                >
                    <template #tags>
                        <div class="like"  style="display: flex;justify-content: flex-end">
                            <span>
                                <van-icon name="chat-o" />
<!--                                {{ c.content.length}}-->
                            </span>
                        </div>
                    </template>

                </van-card>
                </div>
            </van-tab>
            <van-tab title="新歌榜">
                <div class="mus">
                <van-card
                    v-show="comment.length!=0"
                    v-for="(c,i) in comment" :key="i"
                    :desc="c.content"
                    :title="c.nickname"
                    :thumb="c.avatarurl"
                >
                    <template #tags>
                        <div class="like"  style="display: flex;justify-content: flex-end">
                            <span>
                                <van-icon name="chat-o" />
<!--                                {{ c.content.length}}-->
                            </span>
                        </div>
                    </template>

                </van-card>
                </div>
            </van-tab>
            <van-tab title="飙升榜">
                <div class="mus">
                <van-card
                    v-show="comment.length!=0"
                    v-for="(c,i) in comment" :key="i"
                    :desc="c.content"
                    :title="c.nickname"
                    :thumb="c.avatarurl"
                >
                    <template #tags>
                        <div class="like"  style="display: flex;justify-content: flex-end">
                            <span>
                                <van-icon name="chat-o" />
<!--                                {{ c.content.length}}-->
                            </span>
                        </div>
                    </template>

                </van-card>
                </div>
            </van-tab>
            <van-tab title="抖音榜">
                <div class="mus">
                <van-card
                    v-show="comment.length!=0"
                    v-for="(c,i) in comment" :key="i"
                    :desc="c.content"
                    :title="c.nickname"
                    :thumb="c.avatarurl"
                >
                    <template #tags>
                        <div class="like"  style="display: flex;justify-content: flex-end">
                            <span>
                                <van-icon name="chat-o" />
<!--                                {{ c.content.length}}-->
                            </span>
                        </div>
                    </template>

                </van-card>
                </div>
            </van-tab>
            <van-tab title="电音榜">
                <div class="mus">
                <van-card
                    v-show="comment.length!=0"
                    v-for="(c,i) in comment" :key="i"
                    :desc="c.content"
                    :title="c.nickname"
                    :thumb="c.avatarurl"
                >
                    <template #tags>
                        <div class="like"  style="display: flex;justify-content: flex-end">
                            <span>
                                <van-icon name="chat-o" />
<!--                                {{ c.content.length}}-->
                            </span>
                        </div>
                    </template>

                </van-card>
                </div>
            </van-tab>
        </van-tabs>
    </van-pull-refresh>

    <transition
        name="animate__animated animate__bounce"
        leave-active-class="animate__fadeOutRight"
        enter-active-class="animate__fadeInLeft"
    >
        <van-overlay :show="see">
            <div class="wrapper" @click.self="see=!see">
                <div class="block" >
                    <!--                <van-image :src="datas[index].coverUrl" fit="fill"/>-->
                    <div>
                        <!--                    <van-image fit="fill" round :src="datas[index].coverUrl"></van-image>-->
                        <div>
                            <span>{{}}</span>
                            <span>{{}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </van-overlay>
    </transition>



    <teleport to="body">
        <div id="musicC" v-show="music.length===0?false:true">
            <div class="music">
                <van-image :src="music.picurl" radius="10"></van-image>
                <div class="a">{{music.artistsname}}</div>
                <div class="b">
                    <span :class="flag?'linear':'nolinear'">{{music.name}}</span>
                    <span><van-icon :name="icon[0]" @click="changeF"/></span>
                </div>
            </div>
        </div>
    </teleport>
<!--    <audio :src="music.url" controls></audio>-->
    <audio :src="music.url" controls ref="audio" style="display: none"></audio>

    </div>
</template>

<script>
import 'animate.css'
import {getCurrentInstance, onMounted, reactive, ref} from 'vue';
import axios from "axios";

export default {
    setup() {
        let audio
        let {proxy}=getCurrentInstance()
        const count = ref(0);
        let flag=ref(false)
        let icon=reactive(['play-circle-o','pause-circle'])
        const loading = ref(false);
        let activeName = ref(0)
        let music=ref([])
        let comment=ref([])
        let type=ref(0)
        let arr=['热歌榜','新歌榜','飙升榜','抖音榜','电音榜']
        const show = ref(false);

        const showNotify = () => {
                show.value = true;
                setTimeout(() => {
                    show.value = false;
                }, 2000);
        }

        const onRefresh = () => {
            setTimeout(() => {
                console.log(type.value)
                comment.value.splice(0)
                getComment()
                if (audio.paused){
                    getMusic()
                    showNotify()
                }
                loading.value = false;
                count.value++;
            }, 1000);
        };

        async function getMusic() {
            let r=await axios.get(`https://api.uomg.com/api/rand.music?sort=${arr[type.value]}&format=json`)
            if (r.status==200) music.value=r.data.data
        }

        async function getComment() {
            let r=await axios.get(`https://api.uomg.com/api/comments.163?format=json`)
            let r2=await axios.get(`https://api.uomg.com/api/comments.163?format=json`)
            let r3=await axios.get(`https://api.uomg.com/api/comments.163?format=json`)
            let r4=await axios.get(`https://api.uomg.com/api/comments.163?format=json`)
            let r5=await axios.get(`https://api.uomg.com/api/comments.163?format=json`)
            if (r.status==200) comment.value.push(r.data.data)
            if (r2.status==200) comment.value.push(r2.data.data)
            if (r3.status==200) comment.value.push(r3.data.data)
            if (r4.status==200) comment.value.push(r4.data.data)
            if (r5.status==200) comment.value.push(r5.data.data)
        }

        onMounted(()=>{
            getComment()
            getMusic()
            audio=proxy.$refs.audio
        })


        let tabclick=(event)=>{
            type.value=event.name
            comment.value.splice(0)
            getComment()
        }
        let changeF=()=>{
            flag.value=!flag.value
            icon.reverse()
            if (flag.value) audio.play()
            else audio.pause()
        }

        let see=ref(false)
        let val=ref(0)
        // let dat=reactive({})

        let musicC=(c)=>{
            see.value=false
            // console.log(c)
            // console.log(val.value)
            // dat=c
            // console.log(dat)
        }
        return {
            count,val,
            loading,
            onRefresh,
            activeName,
            tabclick,show,comment,music,changeF,icon,flag,see,musicC
        };
    },
};

</script>

<style scoped lang="less">
.mus{
    margin-bottom: 35%;
}
.flash{
    height: 100%;
}
.wrapper {
    //border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.block {
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    height: 500px;
    background-color: #fff;
    >div{
        width: 90%;
        padding: 5px;
        display: flex;
        //align-items: center;
        >div{
            margin-left: 5px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            >span:first-child{
                font-size: 25px;
            }
            >span:last-child{
                font-size: 18px;
            }
        }
        /*.van-image{
            width: 160px;
            height: 160px;
            border-radius: 50%;
        }*/
    }
}
#musicC{
    position: fixed;
    bottom: 10%;
    width: 100%;
    background-color: wheat;
    padding: 10px;
    .music{
        display: flex;
        justify-content: space-around;
        .van-image{
            width: 120px;
            height: 120px;
        }
        .a{
            height: 120px;
            overflow: hidden;
            text-align: center;
            font-size: 22px;
            writing-mode: vertical-lr;
        }
        .b{
            font-size: 30px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
        }
    }
}
.nolinear{

}
.linear{
    background-image: linear-gradient(135deg,red,skyblue,green,yellow);
    -webkit-background-clip:text;
    color: transparent;
    background-size:200% 100%;
    animation:masked-animation 1.5s infinite linear alternate;
}
@keyframes masked-animation {
    from{
        background-position: 0 0;
    }
    to{
        background-position: -100% -100%;
    }
}
</style>