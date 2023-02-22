<!--<template>
    <div class="a">
        <span>我们会根据你的情况修正:</span>
    <textarea cols="40" rows="5" autofocus v-model="f.content">
    </textarea>
    <div style="text-align: center">
        <van-button type="success" round size="small" native-type="submit" @click="btn(f)">修改</van-button>
    </div>
    </div>
</template>-->
<template>
    <div class="container">
        <div class="con">
            <h3>描述你需要反馈的内容:</h3>
            <hr>
            <van-cell title="ui不美观?">
                <template #right-icon>
                    <van-checkbox v-model="form.c1"></van-checkbox>
                </template>
            </van-cell>
            <van-cell title="页面卡顿?">
                <template #right-icon>
                    <van-checkbox v-model="form.c2"></van-checkbox>
                </template>
            </van-cell>
            <van-cell title="无法登录?">
                <template #right-icon>
                    <van-checkbox v-model="form.c3"></van-checkbox>
                </template>
            </van-cell>
            <h4>其他</h4>
            <hr>
            <van-cell-group inset>
                <van-field
                    v-model="form.message"
                    rows="2"
                    autosize
                    label="自定义"
                    type="textarea"
                    maxlength="100"
                    placeholder="我们会根据你的意见改正"
                    show-word-limit
                />
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" @click="submit(form)">提交</van-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import {reactive} from "vue";
import {getCurrentInstance} from "vue";
import {useRouter} from "vue-router";
import {Toast} from "vant";
let {proxy}=getCurrentInstance()
let $router=useRouter()
let f=reactive({
    content:''
})
let form=reactive({
    c1:false,
    c2:false,
    c3:false,
    message:''
})
/*let btn=(f)=>{
    if (f.length==0){
        Toast('你没提供任何评论,操作毫无意义')
    }else {
        check(f)
    }
}*/
const submit=({c1,c2,c3,message})=>{
    if (c1||c2||c3||message.length!=0){
        if (c1) return  check('ui不美观')
        if (c2) return  check('页面卡顿')
        if (c3) return  check('无法登录')
        else return  check(message)
    }else {
        Toast('至少选择以上一项内容提交')
    }
}
async function check(content) {
    // console.log(content)
    let r=await proxy.$http.post(proxy.$a.user_comment,{content})
    // console.log(r)
    if (r.code===200){
        Toast('评论添加成功')
        setTimeout(()=>{
            $router.replace({
                name:'my'
            })
        },500)
    }else {
        Toast(r.msg)
    }
}
</script>

<style scoped lang="less">
/*.a{
    span{
        font-size: 40px;
    }
    margin: 20px 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    >textarea{
        margin: 20px 0;
        width: 90%;
        font-size: 30px;
    }
}*/
.container{
    padding: 10px;
    font-size: 30px;
}
</style>