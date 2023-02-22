<template>
    <div>


    <div class="gameBoX" @click="addStep($event)">
        <div class="a1" id="item1"></div>
        <div class="a1" id="item2"></div>
        <div class="a1" id="item3"></div>
        <div class="a1" id="item4"></div>
        <div class="a1" id="item5"></div>
        <div class="a1" id="item6"></div>
        <div class="a1" id="item7"></div>
        <div class="a1" id="item8"></div>
        <div class="a1" id="item9"></div>
    </div>
    <div class="tips">
        <div class="next" v-if="!isWin">Next Player:{{next}}</div>
        <div class="next" v-else>Winner：{{winner}}</div>
        <div class="start"><strong>1.</strong><span class="startText start">go to game start</span></div>
        <div class="stepContent" ref="step" @click="backStep($event)" style="color: #ffc107">
        </div>
    </div>
    <div class="btn">
        <van-button type="danger" size="mini" @click="restart()">restart</van-button>
    </div>
    </div>
</template>

<script>
import {Toast} from "vant";

export default {
    data(){
        return {
        next:"X",//下一步
        winner:'',//获胜者
        index:1,//为点击过的元素设置索引值，确定它是第几个被点击的
        isWin:false,//判断是否获胜
    }},
    methods:{
        addStep(event){
            console.log('aaa')
            let dom = event.target;
            if(this.next=="O"&&!dom.hasAttribute('data-isClick')){
                dom.innerText = "O"
                dom.setAttribute('data-isClick',true)
                dom.setAttribute('data-index',this.index)
                this.next ="X";
                this.index++;
                var div = document.createElement('div')
                div.setAttribute('class','stepnum')
                div.innerHTML = `<strong>${this.index}.</strong><span class="stepClass">go to move #${this.index-1}</span>`;
                this.$refs.step.appendChild(div)
            }
            else if(this.next=="X"&&!dom.hasAttribute('data-isClick')){
                dom.innerText = "X";
                dom.setAttribute('data-isClick',true)
                dom.setAttribute('data-index',this.index);
                this.next = "O"
                this.index++;
                var div = document.createElement('div')
                div.setAttribute('class','stepnum')
                div.innerHTML = `<strong>${this.index}.</strong><span class="stepClass">go to move #${this.index-1}</span>`;
                this.$refs.step.appendChild(div)
            }
            else{
                //console.log("nothing to do...")
            }
            if(this.index>3){
                this.isWinner()
            }
        },
        backStep(e){
            console.log('ccc')
            this.isWin=false;
            let index = e.target.innerText.slice(-1);//获取当前元素的索引值
            let stepArr = document.querySelectorAll('.stepnum');//获取全部能返回的步骤
            let markArr = document.querySelectorAll('.a1');//获取游戏内所有方块，
            for(let i = index-1;i<stepArr.length;i++){
                this.$refs.step.removeChild(stepArr[i])
            }
            markArr.forEach((item)=>{
                if(item.hasAttribute('data-isClick')&&item.getAttribute('data-index')>=index){
                    item.removeAttribute('data-isClick')
                    item.removeAttribute('data-index')
                    item.innerHTML = "";
                    //console.log("清理")
                }
                else if(item.hasAttribute('data-isClick')&&!item.hasAttribute('data-index')){
                    item.removeAttribute('data-isClick')
                }
                else{
                    //console.log("不清理")
                }
            })
            this.index = index;//清理后还原点击索引值
            this.next = index%2==0?"O":"X";//还原下一个点击值
        },
        isWinner(){
            let markArr = document.querySelectorAll('.a1');//获取游戏内所有方块;
            let winflag = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];//获胜条件
            let temp = []//存放判断是否获胜的数组
            for(var i=0;i<winflag.length;i++){
                temp = [];
                //console.log(winflag[i])
                winflag[i].forEach(item=>{
                    if(markArr[item-1].innerText)
                    {
                        temp.push(markArr[item-1].innerText)
                    }
                    else{
                        temp.push(0)
                    }

                })
                //X获胜的判断条件
                let flag1 = temp.filter(item=>{
                    return item=="X"
                })
                //O获胜的判断条件
                let flag2 = temp.filter(item=>{
                    return item=="O"
                })
                if(flag1.length==3){
                    //console.log("X获胜")
                    this.isWin = true
                    this.winner = "X";
                    markArr.forEach(item=>{
                        item.setAttribute('data-isClick',true)
                    })
                    Toast('X获胜!!!')
                    /*setTimeout(()=>{
                        // temp.splice(0,temp.length)
                        this.clear()
                    },5000)*/
                }
                else if(flag2.length==3){
                    //console.log("O获胜")
                    this.isWin = true;
                    this.winner = "O"
                    markArr.forEach(item=>{
                        item.setAttribute('data-isClick',true)
                    })
                    Toast('O获胜!!!')
                    /*setTimeout(()=>{
                        // temp.splice(0,temp.length)
                        this.clear()
                    },5000)*/
                }
                else if(this.index==10){
                    this.isWin = true;
                    this.winner = "Draw"
                    Toast('平局!!!')
                    /*setTimeout(()=>{
                        // temp.splice(0,temp.length)
                        this.clear()
                    },5000)*/
                }
            }

        },
        clear(){
            this.index=1
            this.next='X'
            this.isWin=false;
            let stepArr = document.querySelectorAll('.stepnum');//获取全部能返回的步骤
            let markArr = document.querySelectorAll('.a1');//获取游戏内所有方块，
            for(let i = 0;i<stepArr.length;i++){
                this.$refs.step.removeChild(stepArr[i])
            }
            markArr.forEach((item)=>{
                if(item.hasAttribute('data-isClick')&&item.getAttribute('data-index')>=0){
                    item.removeAttribute('data-isClick')
                    item.removeAttribute('data-index')
                    item.innerHTML = "";
                    //console.log("清理")
                }
                else if(item.hasAttribute('data-isClick')&&!item.hasAttribute('data-index')){
                    item.removeAttribute('data-isClick')
                }
                else{
                    //console.log("不清理")
                }
            })
        }
        ,
        restart(){
            Toast('你已经重置!!!')
            this.clear()
        }
    },
    /*deactivated(to,from,next) {
        this.clear()
        // next()
    }*/
}
</script>

<style scoped>
*{
    font-size: 20px;
}
.gameBoX{
    display: flex;
    width: 300px;
    height: 300px;
    flex-wrap: wrap;
    margin:auto;
    margin-top: 30px;
}
.a1{
    box-sizing: border-box;
    border: 1px solid gray;
    width: 33%;
    height: 100px;
    display: flex;
    align-items: center;
    font-size: 60px;
    justify-content: center;
    font-weight: bold;
    cursor: pointer;
}

#item1{
    border-right: 0px;
    border-bottom: 0px;
}
#item2{
    border-bottom: 0;
}
#item3{
    border-left:0;
    border-bottom: 0;
}
#item4{
    border-right: 0;
}
#item6{
    border-left: 0;
}
#item7{
    border-top: 0;
    border-right: 0;
}
#item8{
    border-top: 0;
}
#item9{
    border-left: 0;
    border-top: 0;
}
.tips{
    width: 300px;
    margin: 0 auto;
    margin-top: 30px;
}
.next{
    font-size: 20px;
    font-weight: bold;
}
.stepContent{
    display: flex;
    flex-direction: column;
}
.stepClass,.startText{
    border:1px solid #e1dfdf;
    margin-top: 5px;
    border-radius: 7px;
    z-index: 10;
    padding:1px 10px;
    box-shadow:1px 2px 3px 0px #e1dfdf;
    display: inline-block;
    cursor: pointer;
}
.start{
    cursor: default;
}
.btn{
    position: fixed;left: 75%;
    top: 17%;
}
</style>