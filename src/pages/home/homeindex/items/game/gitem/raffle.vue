<template>
   <div class="con">
       <ul>
           <li
               v-for="item in arr"
               v-bind:key="item.id"
               v-bind:class="itemActiveClass(item)"
           >
               <span>{{ item.label }}</span>
           </li>
           <li v-on:click="luckdraw">
               <button v-bind:disabled="disabled">抽奖</button>
           </li>
       </ul>
   </div>
</template>

<script>
import {Toast} from "vant";

const PRIZE = [
    {
        id: '001',
        label: '辣条'
    },
    {
        id: '002',
        label: '谢谢顾客'
    },
    {
        id: '003',
        label: '耳机'
    },
    {
        id: '004',
        label: '再接再励'
    },
    {
        id: '005',
        label: '手环'
    },
    {
        id: '006',
        label: '就差一点'
    },
    {
        id: '007',
        label: '帽子'
    },
    {
        id: '008',
        label: '下次再来'
    }
]
export default {
    name: 'Game',
    data () {
        return {
            disabled: false, // 是否禁用按钮
            select: null, // 存放当前选中的奖品
            arr: [] // 存放奖品列表
        }
    },
    created () {
        this.getData()
    },
    methods: {
        getPrize () { // 获取奖品
            // Promise.resolve 会返回一个Promise并把传入的值传入then里
            // Promise.reject 会返回一个Promise并把传入的值传入catch里
            return Promise.resolve(PRIZE)
        },
        getData () { // 获取数据
            this.getPrize()
                .then(res => {
                    this.arr = res
                })
        },
        alert (val) { // 弹框
            let dom = document.createElement('div')
            dom.style.cssText = `
          position: absolute;
          top: 10%;
          left: 50%;
          transform: translate(-50%);
          padding: 15px;
          border-radius: 10px;
          background-color: #ccc;
        `
            dom.innerText = val
            document.body.appendChild(dom)
            setTimeout(() => {
                document.body.removeChild(dom)
            }, 1000)
        },
        luckdraw () { // 抽奖
            this.disabled = true
            this.animation(function (result) {
                this.disabled = false
                if (parseInt(result.id)%2==0){
                    Toast(`${result.label}`)
                }else {
                    Toast(`恭喜你抽中了${result.label}`)
                }
            })
        },
        generateIndex () { // 生成索引
            return Math.round(Math.random() * this.arr.length)
        },
        generateCount (min, max) { // 生成min~max范围的圈数
            return Math.floor(Math.random() * (max - min + 1) + min)
        },
        generateArr (rndCount, rndIndex) { // 生成动画所需数组
            let arr = []
            for (let i = 0; i < rndCount; i++) { // 这个循环控制转旋转几圈
                arr = arr.concat(this.arr)
            }
            for (let i = 0; i <= rndIndex; i++) { // 这个循环为了平滑转到抽中奖品
                arr.push(arr[i])
            }
            return arr
        },
        animation (cb) { // 开始动画
            let rndIndex = this.generateIndex() // 生成随机索引
            let rndCount = this.generateCount(2, 5) // 生成随机旋转圈数
            let arr = this.generateArr(rndCount, rndIndex)
            let len = arr.length - 1
            arr.forEach((item, index) => { // 遍历数组依次把item设置成this.select并且通过time来延迟每次循环
                let time = (len + index) * index
                setTimeout(() => {
                    this.select = item
                    index === len && cb.call(this, item) // 完成最后一次动画调用回调函数通知它
                }, time)
            })
        },
        itemActiveClass (item) { // 当前选中的类名
            return {
                active: this.select === item
            }
        }
    }
}
</script>

<style scoped>
*{
    font-size: 35px;
}
div{
    display: flex;
    justify-content: center;
    /*align-items: center;*/
}
ul {
    position: relative;
    list-style: none;
    width: 500px;
    height: 500px;
    margin: 15px 0 0 0;
    padding: 0;
    border: 1px solid #000;
    box-sizing: border-box;
}

li {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    box-sizing: border-box;
    width: 33.333333333333336%;
    height: 33.333333333333336%;
    border: 1px solid #000;
}
li.active {
    background-color: orange;
}
li:nth-child(1) {
    top: 0;
    left: 0;
}
li:nth-child(2) {
    top: 0;
    left: 33.333333333333336%;
}
li:nth-child(3) {
    top: 0;
    left: 66.66666666666667%;
}
li:nth-child(4) {
    top: 33.333333333333336%;
    left: 66.66666666666667%;
}
li:nth-child(5) {
    top: 66.66666666666667%;
    left: 66.66666666666667%;
}
li:nth-child(6) {
    top: 66.66666666666667%;
    left: 33.333333333333336%;
}
li:nth-child(7) {
    top: 66.66666666666667%;
    left: 0;
}
li:nth-child(8) {
    top: 33.333333333333336%;
    left: 0;
}
li:nth-child(9) {
    top: 33.333333333333336%;
    left: 33.333333333333336%;
}

button {
    width: 100%;
    height: 100%;
    padding: 0;
    border: none;
    background-color: inherit;
    outline: none;
    cursor: pointer;
}
</style>