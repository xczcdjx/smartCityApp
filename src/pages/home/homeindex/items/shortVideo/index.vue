<template>
    <div>


    <van-divider
        contentPosition="center"
        customStyle="color: blue; border-color: #1989fa; font-size: 18px;"
        hairline
    >
        shortVideo
    </van-divider>



    <van-pull-refresh v-model="loading" @refresh="onRefresh"
                      class="flash"
                      success-text="刷新成功"
    >
        <van-tabs v-model="activeName" @click-tab="tabclick">
            <van-tab title="喜剧">
                <div class="vid">
                <van-card
                    v-show="datas.length!=0"
                    v-for="(d,i) in datas" :key="i"
                    :desc="d.title"
                    :title="d.userName"
                    :thumb="d.coverUrl"
                    @click="enterVideo(i)"
                >
                    <template #tags>
                        <div class="like">
                            <span>
                                <van-icon name="chat-o" />
                                {{ d.id }}
                            </span>
                        </div>
                    </template>

                </van-card>
                </div>
            </van-tab>
            <van-tab title="校园">
                <div class="vid">
                <van-card
                    v-show="datas.length!=0"
                    v-for="(d,i) in datas" :key="i"
                    :desc="d.title"
                    :title="d.userName"
                    :thumb="d.coverUrl"
                    @click="enterVideo(i)"
                >
                    <template #tags>
                        <div class="like">
                            <span>
                                <van-icon name="chat-o" />
                                {{ d.id }}
                            </span>
                        </div>
                    </template>

                </van-card>
                </div>
            </van-tab>
            <van-tab title="生活">
                <div class="vid">
                <van-card
                    v-show="datas.length!=0"
                    v-for="(d,i) in datas" :key="i"
                    :desc="d.title"
                    :title="d.userName"
                    :thumb="d.coverUrl"
                    @click="enterVideo(i)"
                >
                    <template #tags>
                        <div class="like">
                            <span>
                                <van-icon name="chat-o" />
                                {{ d.id }}
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
        leave-active-class="animate__fadeOutUpBig"
        enter-active-class="animate__fadeInUpBig"
    >
    <van-overlay :show="see">
        <div class="wrapper" @click.self="see=!see">
            <div class="block" >
                <video :src="datas[index].playUrl" autoplay controls v-if="see"></video>
<!--                <van-image :src="datas[index].coverUrl" fit="fill"/>-->
                <div>
<!--                    <van-image fit="fill" round :src="datas[index].coverUrl"></van-image>-->
                    <div>
                        <span>{{datas[index].userName}}</span>
                        <span>{{datas[index].title}}</span>
                    </div>
                </div>
            </div>
        </div>
    </van-overlay>
    </transition>
    </div>
</template>

<script>
import 'animate.css'
import {getCurrentInstance, onMounted, ref} from 'vue';
import {Toast} from 'vant';
import axios from "axios";
// import au from '../../../../../assets/video/au.mp4'

export default {
    setup() {
        const count = ref(0);
        const loading = ref(false);
        let activeName = ref(0)
        let index=ref(0)
        let datas=ref([])
        let see=ref(false)
        let type=ref(0)
        const onRefresh = () => {
            setTimeout(() => {
                console.log(type.value)
                getDatas()
                Toast('刷新成功');
                loading.value = false;
                count.value++;
            }, 1000);
        };
        async function getDatas() {
            let r=await axios.get(`https://api.apiopen.top/api/getShortVideo?page=${type.value}&size=10`)
            if (r.data.code==200) {
                datas.value=r.data.result.list
                console.log(r.data.result.list)
            }
        }

        onMounted(()=>{
            getDatas()
        })

       let tabclick=(event)=>{
           type.value=event.name
           getDatas()
       }

       let enterVideo=(i)=>{
           index.value=i
           see.value=!see.value
       }
        return {
            count,
            loading,
            onRefresh,
            activeName,
            datas,tabclick,see,enterVideo,index
        };
    },
};

</script>

<style scoped lang="less">
.vid{
    margin-bottom: 120px;
    .van-card{
        margin-top: 5px;
    }
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
    .van-image{
        //border-radius: 15px;
        margin: 10px 0;
        width: 90%;
        height: 350px;
    }
    video{
        //border-radius: 15px;
        margin: 10px 0;
        width: 90%;
        height: 350px;
    }
}
</style>