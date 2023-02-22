<template>
<div class="con">
<van-image :src="proxy.$a.baseURL+menus.imgUrl" :radius="10" fit="fill"/>
<div class="a">{{menus.name}}</div>
   <div>
       做法 :&nbsp;<van-tag type="warning" size="large">{{menus.ingredients}}</van-tag>
   </div>
</div>
<!--{{menus}}-->
</template>

<script setup>

import {computed, getCurrentInstance} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";

const {proxy}=getCurrentInstance()
const store=useStore()
const route=useRoute()
let id=route.query.reI
// console.log(id)
let menus=computed(()=>{
    return store.state.mock.menu.find(item=>{
        // console.log(item)
        /*if (item.id==route.query.id){
            return true
        }*/
        return item.id==id
    })
})
</script>

<style scoped lang="less">
*{
    font-size: 29px;
}
.con{
    margin: 20px 0 0 0;
    padding: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .van-image{
        height: 250px;
        width: 350px;
    }
    .a{
        margin: 10px 0;
        font-weight: 510;
    }
}
</style>