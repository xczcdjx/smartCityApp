<template>
    <div>

    <van-form>
        <van-field
            v-model="f.userName"
            label="用户名"
            placeholder="请输入用户名"
            disabled
        />
        <van-cell title="头像">
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <template #right-icon class="right">
                <van-uploader v-model="fileList" :after-read="afterRead" :max-size="2048 * 1024" @oversize="onOversize" :before-read="beforeRead"  multiple preview-size="40" :max-count="1" />
            </template>
        </van-cell>
        <van-field
            v-model="f.nickName"
            label="昵称"
            placeholder="请输入用户名"
        />
        <van-cell title="性别" :value="f.sex==0?'男':'女'" @click="upsex" />

        <van-field
            v-model="f.idCard"
            label="身份证"
            placeholder="请输入身份证"
        />
        <van-field
            v-model="f.email"
            label="邮箱"
            placeholder="请输入邮箱"
        />
        <van-field
            v-model="f.phonenumber"
            label="电话"
            placeholder="请输入联系电话"
        />
        <div style="text-align: center;margin: 20px">
            <van-button type="success" round size="small" native-type="submit" @click="btn(f)">修改</van-button>
            <van-button type="info" round size="small" @click="btn2(f)"  style="margin-left: 20px"> 重置 </van-button>
        </div>
    </van-form>
<!--    <transition
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
    <van-action-sheet
        v-model:show="flag"
        :actions="actions"
        cancel-text="取消"
        close-on-click-action
        @cancel="onCancel"
        @select="onSelect"
    />

    </div>


</template>

<script setup>
import 'animate.css'
import {getCurrentInstance, onBeforeMount, onMounted, reactive, ref, watch} from "vue";
import {Toast} from "vant";
import {useRouter} from "vue-router";
import {updateinfo} from "../../../../utils/update";
let info
let flag=ref(false)
let {proxy}=getCurrentInstance()
let $router=useRouter()
onBeforeMount(()=>{
    info=reactive(JSON.parse(localStorage.getItem('info')))
})
onMounted(()=>{
    Object.assign(f,info)
    // console.log(f.avatar)
})
let f=reactive({
    avatar:'',
    userName:'',
    nickName:'',
    sex:'',
    idCard:'',
    email:'',
    phonenumber:''
})

let btn=({nickName,sex,idCard,email,phonenumber,avatar})=>{
    if (phonenumber.length==0 || idCard.length==0){
        Toast('电话或身份证未填写')
        f.idCard=''
        f.phonenumber=''
    }else {
        // console.log(avatar)
        proxy.$http.put(proxy.$a.user_update,{nickName,sex,idCard,email,phonenumber,avatar}).then(r=>{
            console.log(r)
            if (r.code==200){
                Toast('修改成功')
                updateinfo(proxy.$http,proxy.$a.user_info)
                setTimeout(()=>{
                    $router.replace({
                        name:'my'
                    })
                },500)
            }else {
                Toast(r.msg)
            }
        })
    }
}
let btn2=()=>{
    f.phonenumber=''
    f.email=''
    f.sex=0
    f.idCard=''
    f.nickName=''
}
/*let columns=ref([0,1])
let onConfirm=(v,i)=>{
    Toast('你已修改性别')
    f.sex=v
    flag.value=false
}*/
let onCancel=()=>{
    flag.value=false
}
let upsex=()=>{
    flag.value=true
}


const actions = [
    { name: '性别选择' },
    { name: '男' },
    { name: '女' },
];
let onSelect=(e)=>{
    if (e.name=='男'){
        f.sex=0
    }else if (e.name=='女'){
        f.sex=1
    }
}

const afterRead = (file) => {
    console.log(file.file)

    const formData = new FormData();
    // 添加文件信息
    formData.append("file", file.file);
    proxy.$http.post('/prod-api/common/upload', formData).then(v=>{
        console.log(v)
        f.avatar=v.fileName
    },r =>{
        Toast('上传失败')
    })
    // 此时可以自行将文件上传至服务器
    // console.log(file.file.name)
    // f.avatar=file.file.name
};
const fileList = ref([
    // Uploader 根据文件后缀来判断是否为图片文件
    // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
    // { url: 'https://cloud-image', isImage: true },
]);
const beforeRead = (file) => {
    console.log(file.type)
    if (file.type !== 'image/jpeg'&&file.type!=="image/png") {
        Toast('请上传 jpg或png 格式图片');
        return false;
    }
    return true;
};
const onOversize = (file) => {
    console.log(file);
    Toast('文件大小不能超过 2mb');
};
</script>

<style scoped lang="less">
.content{
    padding: 16px 16px 160px;
}
.right{

}
</style>