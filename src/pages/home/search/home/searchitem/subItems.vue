<template>
<!--    <div>

    <van-pull-refresh v-model="loading" @refresh="onRefresh">
        <div class="container">
&lt;!&ndash;            {{re}}&ndash;&gt;
            <div v-for="(sa,i) in re" :key="i" v-if="re">
                <h4 @click="enterD(sa.weburl)">{{sa.title}}</h4>
                <div class="a">
                    <van-image :src="icon" fit="fill" round/>
                    &nbsp;<span>{{sa.src}}</span></div>
                <div class="b" v-html="sa.content">
                </div>
                <div class="c"><span>{{sa.content.length}} 赞同</span>
                    <van-icon name="more-o" @click="showShare=true"/>
                </div>
            </div>

        </div>
    </van-pull-refresh>


    <van-share-sheet
        v-model:show="showShare"
        title="立即分享给好友"
        :options="options"
        @select="onSelect"
    />


    <van-overlay :show="show">
        <div class="wrapper" @click.stop>
            <div class="block">
                <van-form @submit="onSubmit(f)">
                    <van-cell-group inset>
                        <van-field
                            v-model="f.username"
                            name="用户id"
                            label="用户id"
                            placeholder="用户id"
                        />
                        <van-field
                            v-model="f.password"
                            type="password"
                            name="密钥"
                            label="密钥"
                            placeholder="密钥"
                        />
                    </van-cell-group>
                    <div style="margin: 16px;">
                        <van-button round block type="primary" native-type="submit">
                            提交
                        </van-button>
                    </div>
                </van-form>

            </div>
        </div>
    </van-overlay>
    </div>-->
<van-empty description="该功能暂在修复中,下个版本上线"/>
</template>

<script setup>
/*import {useRoute, useRouter} from "vue-router";
import {computed, onBeforeMount, reactive, ref, watch, watchEffect} from "vue";
import {useStore} from "vuex";
import {Toast} from "vant";
import axios from "axios";
import {setStorage, getStorage} from "../../../../../utils/storage";
import icon from '/images/search/360.jpg'
let router=useRouter()
let route = useRoute()
let store = useStore()
// let search = computed(() => store.state.search.result)
let search = computed(() => route.query.search)
let d = computed(() => route.query.search)
let id=computed(()=>route.query.id-2)
// console.log(id.value)
onBeforeMount(() => {
    readUser()
    arr.value=getRandomNum(0,newsdatas.value.num,5)
    // console.log(arr.value)
})
let show = ref(true)
let f = reactive({
    username: '',
    password: ''
})

// 读取用户属性
function readUser() {
    // console.log(getStorage('searchUser'))
    if (getStorage('searchUser')) {
        show.value = false
        // checkUser({f})
        const mm_dd=getStorage('date')

        if (mm_dd.mm!=(date.getMonth()+1)&&mm_dd.dd!=date.getDate()){
            store.dispatch('search/totalNews',{u1,u2})
            console.log('时间不同,再次刷新数据!!!')
        }else {
            console.log('date equivalent')
        }
        const user = getStorage('searchUser')
        let u1 = user.clientId
        let u2 = user.key
        // console.log(search.value)

        if (!getStorage('alldatas')){
            store.dispatch('search/totalNews',{u1,u2})
            console.log('datas已经得到!!!')
        }
        watchEffect(() => {
            let se = search.value
            // store.dispatch('search/getSearch', {u1, u2, se})
        })
    } else {
        show.value = true
        Toast({
            message: '请输入获取的密钥信息来解锁',
            position: 'top'
        })
    }
}

// 提交验证表单
const onSubmit = ({username, password}) => {
    if (username.length == 0 || password.length == 0) {
        Toast('用户id或密钥不都为空')
    } else {
        Toast.loading({
            message: '请稍等...',
            forbidClick: true,
        });
        /!*if (f.username==15623012761&&f.password==VhaZs16539870015813ghph){
            Toast.fail('');
        }*!/
        checkUser(f)

        // store.dispatch('search/getSearch',)
    }
}
const date=new Date()
// console.log(date.getMonth()+1,date.getDate())
async function checkUser({username, password}) {
    let r = await axios.get(`https://www.hongtu.fun/api/searchNews?clientId=${username}&key=${password}&keyword=${search}`)
    if (r.data.status) {
        setStorage('searchUser', {clientId: f.username, key: f.password})
        // const date=new Date()
        setStorage('date',{mm:date.getMonth()+1,dd:date.getDate()})
        Toast('验证成功!!!')
        show.value=false
        // store.commit('search/loginEnter', r.data)
    } else {
        setTimeout(() => {
            Toast(r.data.data)
        }, 2000)
    }
}

// store.dispatch('search/getSearch',search)

// 分享模块
let showShare = ref(false);
const options = [
    [
        {name: '微信', icon: 'wechat'},
        {name: '朋友圈', icon: 'wechat-moments'},
        {name: '微博', icon: 'weibo'},
        {name: 'QQ', icon: 'qq'},
    ],
    [
        {name: '复制链接', icon: 'link'},
        {name: '分享海报', icon: 'poster'},
        {name: '二维码', icon: 'qrcode'},
        {name: '小程序码', icon: 'weapp-qrcode'},
    ],
];
const onSelect = (option) => {
    Toast.loading({
        message: '请稍等...',
        forbidClick: true,
    });
    showShare.value = false;
    setTimeout(() => {
        Toast(option.name + '分享失败');
    }, 2000)
};

// 进入热点详情
function enterD(url) {
   /!*let routeUrl= router.resolve({
        path:'/login'
    })*!/
    window.open(url,'_blank')
     // window.location.href=url
}


function getRandomNum(min, max, count) {
    let arr = []
    for (let i = 0; i < count; i++) {
        let num = Math.floor(Math.random() * (max - min + 1) + min)
        if (arr.indexOf(num) == -1) {
            arr.push(num)
        } else {
            i--
        }
    }
    return arr
}


// 下拉刷新
let arr=ref([])
const count = ref(0);
const loading = ref(false);
const onRefresh = () => {
    setTimeout(() => {
        Toast('刷新成功');
        loading.value = false;
       arr.value=getRandomNum(0,13,5)
        // console.log(arr.value)
        count.value++;
    }, 1000);
};

// 数据渲染
let newsdatas=computed(()=>{
    return store.state.search.alldata.find(item=>{
        return item.keyword==search.value
    })
})
/!*let re=reactive(
    [
        newsdatas.value.list
    ]
)*!/

let re=computed(()=>{
    return [
        newsdatas.value.list[arr.value[0]],
        newsdatas.value.list[arr.value[1]],
        newsdatas.value.list[arr.value[2]],
        newsdatas.value.list[arr.value[3]],
        newsdatas.value.list[arr.value[4]],
    ]
})*/
/*watch(arr,(n,o)=>{
    Toast.loading({
        message:'加载中!!!'
    })
})*/
/*let rre=ref(true)
watch(arr,(n,o)=>{
   /!* setTimeout(()=>{
        rre.value=true
    },500)*!/
    console.log(n,o)
})*/

</script>

<style scoped lang="less">
* {
    padding: 0;
    margin: 0;
}

.container {
    margin: 0 0 100px 0;
    > div {
        background: rgba(52, 255, 231, 0.2);
        padding: 10px;
        width: 95%;
        height: 200px;
        margin: 15px 10px;
        cursor: pointer;
        //height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        h4 {
            width: 600px;
            font-size: 25px;
        }

        span {
            font-size: 20px;
        }

        .b {
            font-size: 20px;
            color: #ff105e;
            height: 52px;
            overflow: hidden;
        }

        .a {
            display: flex;
            align-items: center;

            .van-image {
                height: 30px;
                width: 30px;
            }
        }

        .c {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .van-icon {
                font-size: 25px;

                &:active {
                    color: #ff105e;
                }

                &:hover {
                    color: deepskyblue;
                }
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

.block {
    padding: 50px;
    border-radius: 10px;
    width: 400px;
    height: 220px;
    background-color: #fff;

    .van-form {
        width: 100%;
    }
}
</style>