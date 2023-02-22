<template>
    <div>

    <van-search
        v-model="search"
        placeholder="搜索内容"
        input-align="center"
        shape="round"
        @search="onSearch(search)"
    />


    <div v-show="isshow" id="showL">
        <div class="contain">
            <h1 data-spotlight="世界那么大,我想去看看">世界那么大,我想去看看</h1>
        </div>
    </div>
<!--    <teleport to="body">
        <div v-show="isshow" id="showL">
                    <h1>世界 那么 大，我想去看看</h1>
        </div>
    </teleport>-->

    <transition
        name="animate__animated animate__bounce"
        enter-active-class="animate__bounceInLeft"
        leave-active-class="animate__bounceOutRight"
        appear >
    <div v-show="isshow2" class="load">
        <van-loading text-color="#0094ff" >Loading...</van-loading>
    </div>
    </transition>

<!--    <div v-show="user.length!=0" class="card" v-for="u in user" :key="u.login">
        <a :href="u.html_url" target="_blank">
            <img :src="u.avatar_url" style='width: 100px'/>
        </a>
        <p class="card-text">{{u.login}}</p>
        </div>
        -->

        <van-card
            v-show="user.length!=0"
            v-for="u in user" :key="u.login"

            :title="u.login"
            :thumb="u.avatar_url"
        >
            <template #tags>
                <div class="like">
                            <span>
                               {{u.bio}}
                            </span>
                    <span>
                                <van-icon name="chat-o" />
                                {{ u.id }}
                            </span>
                </div>
            </template>

        </van-card>
    </div>

</template>

<script setup>
import 'animate.css'
import axios from "axios";
import {getCurrentInstance, onBeforeMount, ref} from "vue";
import {Toast} from "vant";

let {proxy}=getCurrentInstance()
let search=ref('')
let isshow=ref(true)
let isshow2=ref(false)
let user=ref([])
onBeforeMount(()=>{
    // getUser()
})
async function getUser() {
    let r=await axios.get(`https://api.github.com/search/users?q=${search.value}`)
    console.log(r)
    if (r.status==200) {
        if (r.data.items.length==0){
            Toast('找不到该用户!!!')
            search.value=''
            isshow.value=true
        }else {
            user.value=r.data.items
            search.value=''
        }
    }
}
async function onSearch(se) {
    if (se.length==0){
        Toast('搜索内容不能为空!!!')
    }else {
        isshow.value=false
        isshow2.value=true
        setTimeout(()=>{
            isshow2.value=false
            getUser()
        },1200)
    }
}
</script>

<style scoped lang="less">

.load{
    width: 90%;
    text-align: center;
    margin-top: 40px;
}
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
#showL{
    margin-top: 10px;
    .contain {
        background-color: #222;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 90vh;


        h1 {
            color: #333;
            font-family: Helvetica;
            //margin-top: 45%;
            margin: 0;
            padding: 0;
            font-size: 80px;
            letter-spacing: -0.3rem;
            position: relative;
        }

        h1::after {
            content: attr(data-spotlight);
            color: transparent;
            position: absolute;
            top: 0;
            left: 0;
            -webkit-clip-path: ellipse(100px 100px at 0% 50%);
            clip-path: ellipse(100px 100px at 0% 50%);
            animation: spotlight 5s infinite;
            background-image: url(https://images.unsplash.com/photo-1579547621869-0ddb5f237392?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80);
            background-size: 150%;
            background-position: center center;
            -webkit-background-clip: text;
            background-clip: text;
        }

        @keyframes spotlight {
            0% {
                -webkit-clip-path: ellipse(100px 100px at 0% 50%);
                clip-path: ellipse(100px 100px at 0% 50%);
            }

            50% {
                -webkit-clip-path: ellipse(100px 100px at 100% 50%);
                clip-path: ellipse(100px 100px at 100% 50%);
            }

            100% {
                -webkit-clip-path: ellipse(100px 100px at 0% 50%);
                clip-path: ellipse(100px 100px at 0% 50%);
            }
        }
    }
}
</style>