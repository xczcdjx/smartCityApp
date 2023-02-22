<template>
    <div id="write">
        <header>
            <div id="logo">write</div>
            <ul>
                <li :class="{active:curIndex==i}" v-for="(n,i) in nav" :key="i" @click="change(i)">{{n.a}}</li>
            </ul>
        </header>
        <section>
            <img src="/images/service/scroll/stars.png" alt="" class="stars">
            <img src="/images/service/scroll/moon.png" alt="" class="moon">
            <div class="desc"> {{nav[curIndex].a}} </div>
            <a  class="btn" @click="start">explore</a>
            <img src="/images/service/scroll/mountains_behind.png" alt="" class="mountains_behind">
            <img src="/images/service/scroll/mountains_front.png" alt="" class="mountains_front">
        </section>
        <div class="text" id="title">
            <h2>《{{nav[curIndex].a}}》</h2>
            <p v-html="nav[curIndex].t">

            </p>
        </div>
    </div>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";

onMounted(() => {
    window.addEventListener('scroll', scrollTop, true)
    const stars = document.querySelector('.stars');
    const moon = document.querySelector('.moon');
    const desc = document.querySelector('.desc');
    const btn = document.querySelector('.btn');
    const mountains_behind = document.querySelector('.mountains_behind');
    const mountains_front = document.querySelector('.mountains_front');
    window.addEventListener('scroll', function() {
        let value = window.scrollY;
        stars.style.left = value * 0.25 + 'px';
        moon.style.top = value * 1.05 + 'px';
        mountains_behind.style.top = value * 0.5 + 'px';
        desc.style.marginTop = value * 1.5 + "px";
        desc.style.marginRight = value * 2.5 + "px";
        btn.style.marginTop = value * 1.5 + "px";
    })
})
const scrollTop = () => {
    let scroll = document.documentElement.scrollTop || document.body.scrollTop;
    // console.log(scroll)
}
let curIndex=ref(0)
let start=()=>{
    console.log('开始了')
}
let change=(i)=>{
    curIndex.value=i
}
let nav=reactive([
    {
        a:'love story',
        t:`We were both young when I first saw you<br>

                I close my eyes and the flashback starts<br>

                I'm standing there<br>

                On a balcony in summer air<br>

                See the lights see the party the ball gowns<br>

                See you make your way through the crowd<br>

                And say hello<br>

                Little did I know<br>

                That you were Romeo you were throwing pebbles<br>

                And my daddy said stay away from Juliet<br>

                And I was crying on the staircase<br>

                Begging you please don't go<br>

                And I said<br>

                Romeo take me somewhere we can be alone<br>

                I'll be waiting all there's left to do is run<br>

                You'll be the prince and I'll be the princess<br>

                It's a love story<br>

                Baby just say yes<br>

                So I sneak out to the garden to see you<br>

                We keep quiet cause we're dead if they knew<br>

                So close your eyes<br>

                Escape this town for a little while<br>

                Oh oh<br>

                Cause you were Romeo I was the scarlet letter<br>

                And my daddy said stay away from Juliet<br>

                But you were everything to me<br>

                I was begging you please don't go<br>

                And I said<br>

                Romeo take me somewhere we can be alone<br>

                I'll be waiting all there's left to do is run<br>

                You'll be the prince and I'll be the princess<br>

                It's a love story<br>

                Baby just say yes<br>

                Romeo save me<br>

                They try to tell me how to feel<br>

                This love is difficult but it's real<br>

                Don't be afraid we'll make it out of this mess<br>

                It's a love story<br>

                Baby just say yes<br>

                Oh oh<br>

                I got tired of waiting<br>

                Wondering if you were ever coming around<br>

                My faith in you was fading<br>

                When I met you on the outskirts of town<br>

                And I said<br>

                Romeo save me<br>

                I've been feeling so alone<br>

                I keep waiting for you but you never come<br>

                Is this in my head<br>

                I don't know what to think<br>

                He knelt to the ground and pulled out a ring<br>

                And said<br>

                Marry me Juliet you'll never have to be alone<br>

                I love you and that's all I really know<br>

                I talked to your dad<br>

                Go pick out a white dress<br>

                It's a love story<br>

                Baby just say yes<br>

                Oh oh oh<br>

                Oh oh oh oh<br>

                'Cause we were both young when I first saw you.<br/>`
    },{
        a:'exile',
        t:` I can see you standing, honey<br>
                With his arms around your body<br>
                Laughing but the joke’s not funny at all<br>
                And it took you five whole minutes<br>
                To pack us up and leave me with it<br>
                Holding all this love out here in the hall<br>
                I think I’ve seen this film before<br>
                And I didn’t like the ending<br>
                You’re not my homeland anymore<br>
                So what am I defending now?<br>
                You were my town<br>
                Now I’m in exile seeing you out<br>
                I think I’ve seen this film before<br>
                I can see you staring, honey<br>
                Like he’s just your understudy<br>
                Like you’d get your knuckles bloody for me<br>
                Second, third, and hundredth chances<br>
                Balancing on breaking branches<br>
                Those eyes add insult to injury<br>
                I think I’ve seen this film before<br>
                And I didn’t like the ending<br>
                I’m not your problem anymore<br>
                So who am I offending now?<br>
                You were my crown<br>
                Now I’m in exile seeing you out<br>
                I think I’ve seen this film before<br>
                So I’m leaving out the side door<br>
                So step right now<br>
                There is no amount<br>
                Of crying I can do for you<br>
                All this time<br>
                We always walked a very thin line<br>
                You didn’t even hear me out<br>
                (Didn’t even hear me out)<br>
                You never gave a warning sign<br>
                (I gave so many signs)<br>
                All this time<br>
                I never learned to read your mind<br>
                (Never learned to read my mind)<br>
                I couldn’t turn things around<br>
                (You never turned things around)<br>
                Cause you never gave a warning sign<br>
                (I gave so many signs)<br>
                (So many signs)<br>
                (So many signs)<br>
                You didn’t even see the signs<br>
                I think I’ve seen this film before<br>
                And I didn’t like the ending<br>
                You’re not my homeland anymore<br>
                So what am I defending now?<br>
                You were my town<br>
                Now I’m in exile seeing you out<br>
                I think I’ve seen this film before<br>
                So I’m leaving out the side door<br>
                So step right out<br>
                There is no amount<br>
                Of crying I can do for you<br>
                All this time<br>
                We always walked a very thin line<br>
                You didn’t even hear me out<br>
                (Didn’t even hear me out)<br>
                You never gave a warning sign<br>
                (I gave so many signs)<br>
                All this time<br>
                I never learned to read your mind<br>
                (Never learned to read my mind)<br>
                I couldn’t turn things around<br>
                (You never turned things around)<br>
                Cause you never gave a warning sign<br>
                (I gave so many signs)<br>
                (So many signs)<br>
                (So many signs)<br>`
    },{
        a:'22',
        t:` It feels like a perfect night to dress up like hipsters<br>

                And make fun of our exes, uh uh uh uh<br>

                It feels like a perfect night for breakfast at midnight<br>

                To fall in love with strangers uh uh uh uh<br>

                Yeaaaah<br>

                We're happy free confused and lonely at the same time<br>

                It's miserable and magical oh yeah<br>

                Tonight's the night when we forget about the deadlines,<br>

                it's time uh uh<br>

                I don't know about you know but I'm feeling 22<br>

                Everything will be alright if you keep me next to you<br>

                You don't know about me but I bet you want to<br>

                Everything will be alright<br>

                if we just keep dancing like we're 22, 22<br>

                It seem like one of those nights<br>

                This place is too crowded too many cool kids uh uh<br>

                It seem like one of those nights<br>

                We ditch the whole scene and end up dreaming<br>

                instead of sleeping<br>

                Yeaaaah<br>

                We're happy free confused and lonely in the best way<br>

                It's miserable and magical oh yeah<br>

                Tonight's the night when we forget about the heartbreaks<br>

                it's time uh uh<br>

                I don't know about you but I'm feeling 22<br>

                Everything will be alright if you keep me next to you<br>

                You don't know about me but I bet you want to<br>

                Everything will be alright<br>

                if we just keep dancing like we're 22, 22<br>

                I don't know about you, 22, 22<br>

                It seem like one of those nights<br>

                We ditch the whole scene.<br>

                It seem like one of those nights<br>

                We won't be sleeping.<br>

                It feels like one of those nights<br>

                You look like bad news I gotta have you, I gotta have you<br>

                I don't know about you but I'm feeling 22<br>

                Everything will be alright if you keep me next to you<br>

                You don't know about me but I bet you want to<br>

                Everything will be alright<br>

                if we just keep dancing like we're 22, 22<br>

                Dancing like 22, yeah, 22, yeah yeah<br>

                It feels like one of those nights<br>

                We ditch the whole scene<br>

                It feels like one of those nights<br>

                We won't be sleeping<br>

                It feels like one of those nights<br>

                You look like bad news I gotta have you, I gotta have you<br>`
    },
])
</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
}

#write {
    min-height: 100vh;
    background: linear-gradient(#2b1055, #7597de);
    scroll-behavior: smooth;
}

header {
    position: absolute;
    top: 100px;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 10;
    padding: 20px 100px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    overflow: hidden;
}

header #logo {
    font-size: 25px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
}

header ul {
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
}

header ul li {
    font-size: 25px;
    font-weight: 600;
    margin-left: 15px;
    transition: all .5s linear;
    padding: 2px 8px;
    border-radius: 20px;
}

header ul li:hover {
    background: #fff;
    color: #2b1055;
}

header ul li.active {
    background: #fff;
    color: #2b1055;
}

section {
    position: relative;
    width: 100%;
    overflow: hidden;
    height: 100vh;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
}

section .desc {
    position: absolute;
    z-index: 5;
    font-size: 70px;
    font-weight: 700;
    right: -350px;
    white-space: nowrap;
}

section .btn {
    position: absolute;
    z-index: 5;
    padding: 10px 20px;
    font-weight: 600;
    transform: translateY(80px);
    background-color: #fff;
    border-radius: 30px;
    text-decoration: none;
    color: #ffc107;
}

section::after {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100px;
    bottom: 0;
    left: 0;
    background: linear-gradient(to top, #1c0522, transparent);
    z-index: 7;
}

section img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    object-fit: cover;
    pointer-events: none;
}

.stars {
    z-index: 1;
}

.moon {
    z-index: 2;
    mix-blend-mode: screen;
}

.mountains_behind {
    z-index: 4;
}

.mountains_front {
    z-index: 5;
}
#title p{
    font-size: 20px;
    margin-bottom: 100px;
}
.text {
    color: #fff;
    padding: 20px 150px;
    background-color: #1c0522;
}

.text h2 {
    font-size: 30px;
    font-weight: 600;
}
</style>