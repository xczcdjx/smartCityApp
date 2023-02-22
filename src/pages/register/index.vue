<template>
<!--    <van-nav-bar
        title="注册"
        left-arrow
        @click-left="onClickLeft"
        class="page-nav-bar"
    />
    <van-form>
        <van-field
            v-model="userName"
            left-icon="contact"
            label="用户名"
            placeholder="请输入用户名"
        />

        <van-field
            v-model="password"
            type="password"
            label="密码"
            placeholder="请输入密码"
            left-icon="eye-o"
        />
        <van-field
            v-model="nickName"
            label="昵称"
            placeholder="请输入昵称"
            left-icon="eye-o"
        />
        <van-cell icon="eye-o" title="性别" :value="sex==0?'男':'女'" @click="upsex" />
        <van-field
            v-model="idCard"
            label="id"
            type="idcard"
            placeholder="请输入ID"
            left-icon="eye-o"
        />
        <van-field
            v-model="email"
            type="email"
            label="邮箱"
            placeholder="请输入邮箱"
            left-icon="eye-o"
        />
        <van-field
            v-model="phonenumber"
            label="电话"
            type="number"
            placeholder="请输入电话"
            left-icon="eye-o"
        />
        <div style="text-align: center;margin: 20px">
            <van-button type="success" round size="small" native-type="submit" @click="register(form)">注册</van-button>
            <van-button type="info" round size="small" @click="reset"  style="margin-left: 20px"> 重置 </van-button>
        </div>
    </van-form>

    <transition
        name="animate__animated animate__bounce"
        enter-active-class="animate__backInUp"
        leave-active-class="animate__backOutDown"
    >
        <van-picker
            v-show="flag"
            show-toolbar
            title="选择"
            :columns="columns"
            @cancel="onCancel"
            @confirm="onConfirm"
        />
    </transition>-->
    <div class="contain">
    <div id="outer">
        <section>
            <form action="">
                <p>Register</p>
                <input type="text" placeholder="userName" v-model="userName">
                <input type="text" placeholder="nickName" v-model="nickName">
                <input type="password" placeholder="password" v-model="password">
                <input type="text" placeholder="phonenumber" v-model="phonenumber">
                <input type="text" placeholder="email" v-model="email">
                <input type="text" placeholder="idCard" v-model="idCard">
                <span @click="login">Existed account? login</span>
                <button type="button" @click="register(form)">Register</button>
<!--                <button type="button" @click="register2(form)">Register</button>-->
            </form>
        </section>
    </div>
<!--    <button @click="register(form)">btn</button>--></div>
</template>

<script>
import 'animate.css'
import {reactive, toRefs, ref, getCurrentInstance} from "vue";
import {useRouter} from "vue-router";
import {Toast} from "vant";

export default {
    name:'index',
    setup(){
        let form=reactive({
            // avatar:'',
            userName:'',
            nickName:'',
            password:'',
            phonenumber:'',
            sex:0,
            email:'',
            idCard:''
        })
        let router=useRouter()
        /*let onClickLeft=()=>{
            router.push({
                name:'login'
            })
        }*/
        /*let columns=ref([0,1])
        let flag=ref(false)
        let onConfirm=(v,i)=>{
            Toast('你已选择性别')
            form.sex=v
            flag.value=false
        }
        let onCancel=()=>{
            flag.value=false
        }
        let upsex=()=>{
            setTimeout(()=>{
                flag.value=true
            },500)
        }*/

        let {proxy}=getCurrentInstance()
        function register({userName,password,nickName,phonenumber,email,sex,idCard}) {
            proxy.$http.post(proxy.$a.user_register,{userName,password,nickName,phonenumber,email,sex,idCard})
                .then(r=>{
                    if (r.code==200){
                        Toast('注册成功')
                        setTimeout(()=>{
                            router.push({
                                name:'login'
                            },1000)
                        },)
                    }else {
                        Toast(r.msg)
                        reset();
                    }
                })
        }
        function register2({userName,password,phonenumber}) {
            if (userName.length==0||password.length==0||phonenumber.length==0){
                Toast('账号或密码或手机号不能为零')
            }else {
                Toast('恭喜你,你暂未获得权限注册')
                setTimeout(()=>{
                    form.userName='少年,放弃挣扎吧!!!'
                    setTimeout(()=>{
                        form.nickName='快放弃'
                        setTimeout(()=>{
                            Toast('别再试了,拜拜')
                            setTimeout(()=>{
                                router.replace('/login')
                            },500)
                        },500)
                    },500)
                },500)
            }
        }
        function reset() {
            // console.log(form.sex)
            // form.avatar=''
            form.userName=''
            form.password=''
            form.nickName=''
            form.phonenumber=''
            form.email=''
            form.sex=0
            form.idCard=''
        }
        let login=()=>{
            router.push({
                name:'login'
            })
        }
        return{
            ...toRefs(form),
            /*onClickLeft,columns,onConfirm,onCancel,upsex,flag,*/
            register,form,reset,login,register2
        }
    }
}
</script>

<style lang="less" scoped>
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
                color: #03a9f4;
                display: block;
                margin: 15px 0;
                cursor: pointer;
                font-size: 27px;
                &:hover{
                    color: #ffc107;
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
        width: 300px;
        height: 300px;
        top: 50%;
        left: 50%;
        transform: translate(-100%, -160%);
        background-color: #fa8bff;
        background-image: linear-gradient(45deg, #fa8bff 0%, #2bd2ff 52%, #2bff88 90%);

        border-radius: 50%;
        box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.2);
        animation: pulse 1.5s infinite;
    }

    &::after {
        position: absolute;
        content: '';
        z-index: 2;
        width: 450px;
        height: 450px;
        top: 50%;
        left: 50%;
        transform: translate(-20%, 20%);
        background-color: #ffe53b;
        background-image: linear-gradient(174deg, #ffe53b 0%, #ff2525 74%);
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