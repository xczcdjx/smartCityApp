<template>
    <div>


    <div class="contain">
        <figure class="sample" v-for="(a,i) in article" :key="i">
            <img :src="a.im" alt="sample1"/>
            <figcaption>
                <h2>{{a.t}}</h2>
                <p>{{a.d}}</p>
                <!-- 添加 icons,在引用库过后可以看到 -->
                <div class="icons" @click="showI($event)"><i class="ion-chatbubbles"></i><i class="ion-person-add"></i><i class="ion-heart"></i></div>
            </figcaption>
        </figure>

    </div>
    <div>
        <nav class="menu">
            <input checked="checked" class="menu-toggler" id="menu-toggler" type="checkbox">
            <label for="menu-toggler"></label>
            <ul>
                <li class="menu-item" v-for="(l,i) in explore" :key="i">
                    <van-icon :name="l.t" :color="l.c" size="0.8rem" @click="showT(i)"/>
                </li>
            </ul>
        </nav>
    </div>
    </div>
</template>

<script setup>
import s1 from '/images/1-1.jpg'
import s2 from '/images/1-3.jpg'
import s3 from '/images/1-4.jpg'
import {reactive} from "vue";
import {Toast} from "vant";
let explore=reactive([
    {c:'red',t:'fire-o'},
    {c:'orange',t:'coupon-o'},
    {c:'green',t:'gem-o'},
    {c:'yellow',t:'gift-o'},
    {c:'blue',t:'logistics'},
    {c:'purple',t:'calendar-o'},
])
let article=reactive([
    {t:'Thomas, Aquinas',d:'In anything, essence of beauty and kindness of the two are consistent, because they are based on the same form, so we celebrate the beauty is good.',im:s1},
    {t:'Heidegger',d:'Thinking is thinking in,...... It is in, because in the event of thinking by, belong to in. At the same time, it is in, because thinking belongs in, listen in.',im:s2},
    {t:'Cahill, Aquinas',d:'Scientists in the thought gives us to moral order in action give us to order art in of visible and can grasp the appearance of tactile and audible give us order.',im:s3},
])
let showT=(i)=>{
    Toast({
        message: '该功能暂未开放',
        icon: explore[i].t,
    });
}
let showI=(e)=>{
    if (e.target.localName=='i'){
        Toast('你没有权限!!!!')
    }
}
</script>

<style scoped>
/* 引用字体库和 icons 库 */
@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,500,900);
@import url(https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css);

/* sample 样式 */
.sample {
    font-family: 'Source Sans Pro', Arial, sans-serif;
    position: relative;
    overflow: hidden;
    margin: 10px;
    min-width: 230px;
    max-width: 320px;
    max-height: 230px;
    width: 100%;
    color: #ffffff;
    text-align: center;
    font-size: 16px;
}
.sample * {
    box-sizing: border-box;
    transition: all 0.35s ease;
}

/* 图片的样式 */
.sample img {
    opacity: 1;
    width: 100%;
}

/* figcaption */
.sample:after,
.sample:before,
.sample figcaption:after,
.sample figcaption:before {
    background: #0a0a0a;
    width: 25%;
    position: absolute;
    content: '';
    opacity: 0;
    transition: all 0.3s steps(4);
    z-index: 1;
    bottom: 100%;
    top: 0;
}

.sample:before {
    left: 0;
    transition-delay: 0;
}

.sample:after {
    left: 25%;
    transition-delay: 0.1s;
}

.sample figcaption:before {
    left: 50%;
    transition-delay: 0.2s;
    z-index: -1;
}

.sample figcaption:after {
    left: 75%;
    transition-delay: 0.3s;
    z-index: -1;
}

/* figcaption 部分样式 */
.sample figcaption {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
    padding: 30px;
}

/* 字体和 icons */
.sample h2,
.sample p,
.sample .icons {
    margin: 0;
    width: 100%;
    opacity: 0;
}

.sample h2 {
    font-weight: 900;
    text-transform: uppercase;
}

.sample p {
    font-weight: 300;
}

.sample .icons {
    position: absolute;
    bottom: 30px;
    left: 0;
    width: 100%;
}

/* 链接部分样式 */
.sample i {
    padding: 0px 10px;
    display: inline-block;
    font-size: 24px;
    color: #ffffff;
    text-align: center;
    opacity: 0.8;
    cursor: pointer;
}

/* 当鼠标放置时链接显示 */
.sample i:hover {
    opacity: 1;
}

/* 当鼠标放置时标题显示效果 */
.sample:hover:after,
.sample.hover:after,
.sample:hover:before,
.sample.hover:before,
.sample:hover figcaption:after,
.sample.hover figcaption:after,
.sample:hover figcaption:before,
.sample.hover figcaption:before {
    bottom: 0;
    opacity: 0.8;
}

.sample:hover figcaption h2,
.sample.hover figcaption h2,
.sample:hover figcaption p,
.sample.hover figcaption p,
.sample:hover figcaption .icons,
.sample.hover figcaption .icons {
    transition-delay: 0.4s;
}

.sample:hover figcaption h2,
.sample.hover figcaption h2,
.sample:hover figcaption .icons,
.sample.hover figcaption .icons {
    opacity: 1;
}

.sample:hover figcaption p,
.sample.hover figcaption p{
    opacity: 0.7;
}


.contain {
    background: #212121;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: wrap;
    margin: 0;
    height: 100%;
}

.menu-toggler {
    position: absolute;
    display: block;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    width: 40px;
    height: 40px;
    z-index: 2;
    opacity: 0;
    cursor: pointer;
}

.menu-toggler:hover + label, .menu-toggler:hover + label:before, .menu-toggler:hover + label:after {
    background: white;
}

.menu-toggler:checked + label {
    background: transparent;
}

.menu-toggler:checked + label:before, .menu-toggler:checked + label:after {
    top: 0;
    width: 40px;
    transform-origin: 50% 50%;
}

.menu-toggler:checked + label:before {
    transform: rotate(45deg);
}

.menu-toggler:checked + label:after {
    transform: rotate(-45deg);
}

.menu-toggler:checked ~ ul .menu-item {
    opacity: 1;
}

.menu-toggler:checked ~ ul .menu-item:nth-child(1) {
    transform: rotate(0deg) translateX(-110px);
}

.menu-toggler:checked ~ ul .menu-item:nth-child(2) {
    transform: rotate(60deg) translateX(-110px);
}

.menu-toggler:checked ~ ul .menu-item:nth-child(3) {
    transform: rotate(120deg) translateX(-110px);
}

.menu-toggler:checked ~ ul .menu-item:nth-child(4) {
    transform: rotate(180deg) translateX(-110px);
}

.menu-toggler:checked ~ ul .menu-item:nth-child(5) {
    transform: rotate(240deg) translateX(-110px);
}

.menu-toggler:checked ~ ul .menu-item:nth-child(6) {
    transform: rotate(300deg) translateX(-110px);
}

.menu-toggler:checked ~ ul .menu-item a {
    pointer-events: auto;
}

.menu-toggler + label {
    width: 40px;
    height: 5px;
    display: block;
    z-index: 1;
    border-radius: 2.5px;
    background: rgba(255, 255, 255, 0.7);
    transition: transform 0.5s, top 0.5s;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
}

.menu-toggler + label:before, .menu-toggler + label:after {
    width: 40px;
    height: 5px;
    display: block;
    z-index: 1;
    border-radius: 2.5px;
    background: rgba(255, 255, 255, 0.7);
    transition: transform 0.5s, top 0.5s;
    content: "";
    position: absolute;
    left: 0;
}

.menu-toggler + label:before {
    top: 10px;
}

.menu-toggler + label:after {
    top: -10px;
}

.menu-item:nth-child(1) a {
    transform: rotate(0deg);
}

.menu-item:nth-child(2) a {
    transform: rotate(-60deg);
}

.menu-item:nth-child(3) a {
    transform: rotate(-120deg);
}

.menu-item:nth-child(4) a {
    transform: rotate(-180deg);
}

.menu-item:nth-child(5) a {
    transform: rotate(-240deg);
}

.menu-item:nth-child(6) a {
    transform: rotate(-300deg);
}

.menu-item {
    position: absolute;
    display: block;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    width: 80px;
    height: 80px;
    opacity: 0;
    transition: 0.5s;
}

.menu-item a {
    display: block;
    width: inherit;
    height: inherit;
    line-height: 80px;
    color: rgba(255, 255, 255, 0.7);
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    text-align: center;
    text-decoration: none;
    font-size: 40px;
    pointer-events: none;
    transition: 0.2s;
}

.menu-item a:hover {
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
    color: white;
    background: rgba(255, 255, 255, 0.3);
    font-size: 44.44px;
}
</style>