<template>
<!--    <van-nav-bar
        title="登录"
        left-arrow
        @click-left="onClickLeft"
        class="page-nav-bar"
    />-->
<!--    <van-form>
        <van-field
            v-model="user.username"
            left-icon="contact"
            label="用户名"
            placeholder="请输入用户名"
        />

        <van-field
            v-model="user.password"
            type="password"
            label="密码"
            placeholder="请输入密码"
            left-icon="eye-o"
        />
        <div style="text-align: center;margin: 20px">
            <van-button type="primary" round size="small" native-type="submit" @click="login(user)">登录</van-button>
            <van-button type="info" round size="small" @click="clear"  style="margin-left: 20px"> 重置 </van-button>
        </div>
    </van-form>-->
<div class="contain">
    <div id="outer">
        <section>
            <form action="">
                <p>Sign in</p>
                <input type="text" placeholder="username" v-model="user.username">
                <input type="password" placeholder="password" v-model="user.password">
                <span @click="register">Create account?</span>
                <button type="button" @click="login(user)">Login</button>
            </form>
        </section>
    </div></div>
</template>

<script>
import {Toast} from 'vant'
import {onMounted, reactive} from "vue";
import {getCurrentInstance} from "vue";
import {useRouter} from "vue-router";
import {updateinfo} from "../../utils/update";
import {setToken} from "../../utils/token";
import {useStore} from "vuex";
import {getStorage} from "../../utils/storage";
// import {resetRouter} from "../../router";

export default {
    name:'login',
    setup(){
        let {proxy}=getCurrentInstance()
        let $router=useRouter()

        let user=reactive({
            username:'',
            password:''
        })
        let login=({username,password})=>{
            if(username.length==0 || password.length==0){
                Toast('账号或密码不能为空')
                clear()
            }else {
                // console.log(username,password)
                check(user)
            }
        }
        let clear=()=>{
            user.password=''
            user.username=''
        }
        let store=useStore()
        async function check({username,password}){
            let r=await proxy.$http.post(proxy.$a.user_login,{
                username,password
            })
            if (r.code==200){
                Toast('登录成功')
                setToken(r.token)
                updateinfo(proxy.$http,proxy.$a.user_info)
                store.dispatch('user/getInfo')
                setTimeout(()=>{
                    $router.replace({
                        path:'/home'
                    })
                },500)
            }else {
                Toast(r.msg)
                clear()
            }
        }
        let register=()=>{
            $router.push({
                name:'register'
            })
        }
        return{
            user,login,clear,register
        }
    },
    /*beforeRouteEnter(to,from,next){
        if (getStorage('info')){
            console.log(getStorage('info'))
            next()
        }
       else if (to.path=='/home' && getStorage('info')){
            console.log(to,from,'ddddd')
            next()
        }else if (from.name=='my'||from.name=='loading2'){
           // resetRouter()
            next()
        }
    }*/
}


</script>

<style scoped lang="less">
.contain{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-image: linear-gradient(94.3deg, rgba(25, 33, 64, 1) 10.9%, rgba(81, 84, 115, 1) 87.1%);
}
#outer{
    font-size: 30px;
        height: 100%;
        font-family: 'Poppins', sans-serif;
        overflow-x: hidden;
    section {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        //background-image: linear-gradient(94.3deg, rgba(25, 33, 64, 1) 10.9%, rgba(81, 84, 115, 1) 87.1%);
        overflow: hidden;
        form {
            position: relative;
            z-index: 3;
            width: 320px;
            background-color: rgba(255, 255, 255, .1);
            padding: 45px 30px;
            border-radius: 8px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, .1);
            border: 1px solid rgba(255, 255, 255, .2);
            border-right: 1px solid rgba(255, 255, 255, .1);
            border-bottom: 1px solid rgba(255, 255, 255, .2);
            backdrop-filter: blur(20px);
            p {
                color: #fff;
                display: block;
                text-align: center;
                margin: 0 0 30px 0;
            }
            span{
                color: #ffc107;
                display: block;
                margin: 15px 0;
                cursor: pointer;
                font-size: 27px;
                &:hover{
                    color: #03a9f4;
                }
                &:active{
                    color: #ff105e;
                }
            }
        }
        input {
            font-size: 25px;
            width: 100%;
            height: 50px;
            border-radius: 8px;
            background-color: transparent;
            border: 1px solid rgba(255, 255, 255, .5);
            margin-bottom: 15px;
            padding-left: 15px;
            color: #fff;
            outline: none;
            &::placeholder {
                color: #fff;
            }
        }
        button {
            width: 100%;
            height: 50px;
            border: 0;
            background-image: linear-gradient(to right,#02aab0 0%, #00cdac 51% ,#02aab0 100%);
            background-size: 200% auto;
            border-radius: 8px;
            color: #fff;
            outline: none;
            cursor: pointer;
            box-shadow: 0 20px 40px rgba(0,0,0,.1);
            transition: ease .4s;
            &:hover{
                background-position: right center;
                color: #fff;
                text-decoration: none;
            }
        }

    }

    &::before {
        position: absolute;
        content: '';
        z-index: 2;
        width: 450px;
        height: 450px;
        top: 50%;
        left: 50%;
        transform: translate(-100%, -80%);
        background-color: #ffe53b;
        background-image: linear-gradient(174deg, #ffe53b 0%, #ff2525 74%);
        border-radius: 50%;
        box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.2);
        animation: pulse 1.5s infinite;
    }

    &::after {
        position: absolute;
        content: '';
        z-index: 2;
        width: 300px;
        height: 300px;
        top: 50%;
        left: 50%;
        transform: translate(10%, 20%);
        background-color: #fa8bff;
        background-image: linear-gradient(45deg, #fa8bff 0%, #2bd2ff 52%, #2bff88 90%);
        border-radius: 50%;
        box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.2);
        animation: pulse 1.6s infinite;
    }

    @keyframes pulse {
        50% {
            box-shadow: 0 0 0 50px rgba(255, 255, 255, 0);
        }
        100% {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
        }
    }
}

</style>