<template>
<div class="con">
    <div class="a">
        <span>原密码:</span>
        <van-cell-group>
            <van-field v-model="f.oldPassword" placeholder="请输入原密码" />
        </van-cell-group>
    </div>
    <div class="a">
        <span>新密码:</span>
        <van-cell-group>
            <van-field v-model="f.newPassword" placeholder="请输入新密码" />
        </van-cell-group>
    </div>
    <div style="text-align: center">
        <van-button type="success" round size="small" native-type="submit" @click="btn(f)">修改</van-button>
    </div>
</div>
</template>

<script setup>
import {reactive} from "vue";
import {getCurrentInstance} from "vue";
import {useRouter} from "vue-router";
import {Toast} from "vant";
import {removeStorage} from "../../../../utils/storage";
let {proxy}=getCurrentInstance()
let router=useRouter()
let f=reactive({
    oldPassword:'',
    newPassword:''
})
let btn=(f)=>{
    if (f.newPassword==f.oldPassword){
        Toast('新旧密码相同,操作无意义')
        clear()
    }else {
        check(f)
    }
}
async function check({newPassword,oldPassword}) {
    let r=await proxy.$http.put(proxy.$a.user_password,{newPassword,oldPassword})
    // console.log(r)
    if (r.code==200){
        Toast('密码修改成功,2s后重新登录')
        removeStorage('info')
        setTimeout(()=>{
            router.replace('/login')
        },2000)
    }else {
        Toast(r.msg)
        clear()
    }
}
function check2({newPassword,oldPassword}){
    setTimeout(()=>{
        Toast('修改密码失败')
        setTimeout(()=>{
            Toast('你放心,你没有权限!!!')
            setTimeout(()=>{
                router.replace({
                    name:'my'
                })
            },800)
        },500)
    },500)
}
let clear=()=>{
    f.oldPassword=''
    f.newPassword=''
}

</script>

<style scoped lang="less">
.con{
    margin: 20px;
    .a{
        >span{
         font-size: 28px;
        }
        margin: 20px 0;
        display: flex;
        flex-direction: column;
    }
}
</style>