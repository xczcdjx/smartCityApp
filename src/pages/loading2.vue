<template>
    <div class="container" :class="(ho>=6&&ho<=18)?'light':''">
        <div class="clock">
            <div class="hour">
                <div class="hr" ref="hr1"></div>
            </div>
            <div class="min">
                <div class="mn" ref="mn1"></div>
            </div>
            <div class="sec">
                <div class="sc" ref="sc1"></div>
            </div>
        </div>
    </div>
</template>

<script>
import {getCurrentInstance, onMounted, ref} from "vue";
import {useRouter} from 'vue-router'
import {getStorage,removeStorage} from "../utils/storage";
export default {
    name:'loading2',
    setup(){
        let {proxy}=getCurrentInstance()
        let $router=useRouter()
        const deg = 6;
        let hr,mn,sc
        onMounted(()=>{
            hr=proxy.$refs.hr1
            mn=proxy.$refs.mn1
            sc=proxy.$refs.sc1
        })
        const d=new Date()
        let ho=ref(d.getHours())
        /*let f=ref(false)
        if (d.getHours()>=6&&d.getHours()<=18){
            f.value=true
        }else {
            f.value=false
        }*/
// console.log(d.getHours())
        let timer2=setInterval(() => {
            let day = new Date();
            let hh = day.getHours() * 30;
            let mm = day.getMinutes() * deg;
            let ss = day.getSeconds() * deg;
            hr.style.transform = `rotateZ(${hh + (mm / 12)}deg)`;
            mn.style.transform = `rotateZ(${mm}deg)`;
            sc.style.transform = `rotateZ(${ss}deg)`;
        })
        setTimeout(()=>{
            clearInterval(timer2)
        },3000)
       /* setTimeout(()=>{
            clearInterval(timer2)
            if (getStorage('info')){
                $router.replace({
                    path:'/home'
                })
            }else {
                $router.replace({
                    path:'/login'
                })
            }
        },5000)*/
        return{
            ho
        }
    }
}

</script>

<style scoped>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.container{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #091921;
}

.container.light{
    background: #d1dae3;
}

.clock{
    width: 350px;
    height: 350px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #091921 url('../assets/clock.png');
    background-size: cover;
    border: 4px solid #091921;
    border-radius: 50%;
    box-shadow: 0 -15px 15px rgba(255,255,255,.05),
    inset 0 -15px 15px rgba(255,255,255,.05),
    0 15px 15px rgba(0,0,0,.3),
    inset 0 15px 15px rgba(0,0,0,.3);
}

.container.light .clock{
    background: #d1dae3 url('../assets/clock.png');
    background-size: cover;
    border: 4px solid #cad3dc;
    box-shadow: -8px -8px 15px rgba(255,255,255,.5),
    inset -9px -8px 15px rgba(255,255,255,.5),
    10px 10px 10px rgba(0,0,0,.1),
    inset 10px 10px 10px rgba(0,0,0,.1);
}

.clock::before{
    content:'';
    position: absolute;
    width: 15px;
    height: 15px;
    background: #fff;
    border-radius: 50%;
    z-index: 100000;
}

.container.light .clock::before{
    background: #008eff;
}

.hour,
.min,
.sec{
    position: absolute;
}

.hour, .hr{
    width: 160px;
    height: 160px;
}

.min, .mn{
    width: 190px;
    height: 190px;
}

.sec, .sc{
    width: 230px;
    height: 230px;
}

.hr,.mn,.sc{
    display: flex;
    justify-content: center;
    position: absolute;
    border-radius: 50%;
}

.hr::before{
    content: '';
    position: absolute;
    width: 8px;
    height: 80px;
    background: #ff105e;
    z-index: 10;
    border-radius: 6px 6px 0 0;
}

.mn::before{
    content: '';
    position: absolute;
    width: 4px;
    height: 90px;
    background: #fff;
    z-index: 11;
    border-radius: 6px 6px 0 0;
}

.container.light .mn::before{
    background: #091921;
}

.sc::before{
    content: '';
    position: absolute;
    width: 2px;
    height: 150px;
    background: #008eff;
    z-index: 12;
    border-radius: 6px 6px 0 0;
}

.toggle{
    position: absolute;
    top: 30px;
    right: 150px;
    width: 20px;
    height: 20px;
    font-size: 18px;
    border-radius: 50%;
    background: #d1dae3;
    color: #d1dae3;
    font-family: consolas;
    cursor: pointer;
    left: 25px;
    white-space: nowrap;
}

.toggleClass{
    position: absolute;
    top: 30px;
    right: 150px;
    width: 20px;
    height: 20px;
    font-size: 18px;
    border-radius: 50%;
    background: #d1dae3;
    color: #d1dae3;
    font-family: concolas;
    cursor: pointer;
    display: flex;
    align-items: center;
}

.toggleClass:before{
    position: absolute;
    left: 25px;
    content: "Light Mode";
    white-space: nowrap;
}

.container.light .toggleClass{
    background: #091921;
    color: #091921;
}

.container.light .toggleClass:before{
    content: "Dark Mode";
}

</style>