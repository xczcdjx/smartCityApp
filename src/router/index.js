import { createRouter, createWebHashHistory } from 'vue-router'
import loading from '../pages/loading2.vue'
import loading2 from '../pages/loading.vue'
import {getStorage} from "../utils/storage";

const routes = [
    {
        path: '/',
        name: 'loading',
        component: loading,
        meta:{
            t:'引导1',
        }
    },
    {
        path: '/loading2',
        name: 'loading2',
        component: loading2,
        meta:{
            t:'引导2',
        }
    },
    {
        path: '/login',
        name: 'login',
        component:()=> import('../pages/login/index.vue'),
        meta:{
            t:'登录',
        }
    },
    {
        path: '/register',
        name: 'register',
        component:()=> import('../pages/register/index.vue'),
        meta:{
            t:'注册',
        }
    },
    {
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: "about" */ '../pages/home/index.vue'),
        children: [
            {
                path: '',
                name: 'homeindex',
                component: () => import('../pages/home/homeindex/index.vue')
                ,meta:{
                    t:'主页',
                    is:true,
                    show:true
                }
            },
            {
                path: 'hottheme',
                name: 'hottheme',
                component: () => import('../pages/home/homeindex/newsDetails/hottheme.vue')
                ,meta:{
                    t:'热点话题',
                }
            },
            {
                path: 'hotnews',
                name: 'hotnews',
                component: () => import('../pages/home/homeindex/newsDetails/hotnews.vue')
                ,meta:{
                    t:'热点新闻',
                }
            },
            {
                path: 'shortVideo',
                name: 'shortVideo',
                component: () => import('../pages/home/homeindex/items/shortVideo/index.vue')
                ,meta:{
                    t:'短视频',
                }
            },
            {
                path: 'music',
                name: 'music',
                component: () => import('../pages/home/homeindex/items/music/index.vue')
                ,meta:{
                    t:'音乐',
                }
            },
            {
                path: 'deliver',
                name: 'deliver',
                component: () => import('../pages/home/homeindex/items/deliver/index.vue')
                ,meta:{
                    t:'外卖',
                }
            },
            {
                path: 'deliverfoods',
                name: 'deliverfoods',
                component: () => import('../pages/home/homeindex/items/deliver/foods/index.vue')
                ,meta:{
                    t:'美食',
                }
            },
            {
                path: 'merchantD',
                name: 'merchantD',
                component: () => import('../pages/home/homeindex/items/deliver/merchantD/index.vue')
                ,meta:{
                    t:'商品详情',
                }
            },
            {
                path: 'deliverAddress',
                name: 'deliverAddress',
                component: () => import('../pages/home/homeindex/items/deliver/address/address.vue')
                ,meta:{
                    t:'收获地址',
                }
            },
            {
                path: 'payorder',
                name: 'payorder',
                component: () => import('../pages/home/homeindex/items/deliver/address/payorder.vue')
                ,meta:{
                    t:'支付订单',
                }
            },

            {
                path: 'book',
                name: 'book',
                // component: () => import('../pages/home/homeindex/items/book/index.vue')
                component: () => import('../pages/home/homeindex/items/book/library/libraryIndex.vue')
                ,meta:{
                    t:'书籍',
                }
            },
            {
                path: 'fleebook',
                name: 'fleebook',
                component: () => import('../pages/home/homeindex/items/book/index.vue')
                ,meta:{
                    t:'游离书籍',
                }
            },
            {
                path: 'libraryDetail',
                name: 'libraryDetail',
                // component: () => import('../pages/home/homeindex/items/book/index.vue')
                component: () => import('../pages/home/homeindex/items/book/library/libraryDetail/index.vue')
                ,meta:{
                    t:'图书详情',
                }
            },
            {
                path: 'job',
                name: 'job',
                component: () => import('../pages/home/homeindex/items/job/index.vue')
                ,meta:{
                    t:'工作',
                }
            },
            {
                path: 'explore',
                name: 'explore',
                component: () => import('../pages/home/homeindex/items/explore/index.vue')
                ,meta:{
                    t:'探索',
                }
            },
            {
                path: 'game',
                name: 'game',
                component: () => import('../pages/home/homeindex/items/game/index.vue'),
                redirect: '/home/game/grid',
                children: [
                    {
                        path: 'grid',
                        name: 'grid',
                        component: () => import('../pages/home/homeindex/items/game/gitem/grid.vue')
                        ,meta:{
                            t:'宫格游戏',
                        }
                    },
                    {
                        path: 'raffle',
                        name: 'raffle',
                        component: () => import('../pages/home/homeindex/items/game/gitem/raffle.vue')
                        ,meta:{
                            t:'抽奖游戏',
                        }
                    },
                ]
            },
            {
                path: 'write',
                name: 'write',
                component: () => import('../pages/home/homeindex/items/write/index.vue')
                ,meta:{
                    t:'写作',
                }
            },
            {
                path: 'life',
                name: 'life',
                component: () => import('../pages/home/homeindex/items/life/index.vue')
                ,meta:{
                    t:'生活',
                }
            },
            {
                path: 'clock',
                name: 'clock',
                component: () => import('../pages/home/homeindex/items/clock/index.vue')
                ,meta:{
                    t:'时间',
                }
            },
            {
                path: 'telecharge',
                name: 'telecharge',
                component: () => import('../pages/home/homeindex/items/life/telecharge/index.vue')
                ,meta:{
                    t:'话费充值',
                }
            },
            {
                path: 'elecharge',
                name: 'elecharge',
                component:()=> import('../pages/home/homeindex/items/life/elecharge/index.vue')
                ,meta:{
                    t:'水燃费充值',
                }
            },
            {
                path: 'recipes',
                name: 'recipes',
                component: () => import('../pages/home/homeindex/items/recipes/index.vue'),
                redirect: '/home/recipes/recipesSearch',
                children: [
                    {
                        path: 'recipesSearch',
                        name: 'recipesSearch',
                        component: () => import('../pages/home/homeindex/items/recipes/search/index.vue')
                        ,meta:{
                            t:'菜单搜索',
                        }
                    },
                    {
                        path: 'searchD',
                        name: 'searchD',
                        component: () => import('../pages/home/homeindex/items/recipes/search/searchD/index.vue')
                        ,meta:{
                            t:'菜谱详情',
                        }
                    },
                    {
                        path: 'recipesClassify',
                        name: 'recipesClassify',
                        component: () => import('../pages/home/homeindex/items/recipes/classify/index.vue')
                        ,meta:{
                            t:'菜谱分类',
                        }
                    }
                ]
            },
            {
                path: 'stage',
                name: 'stage',
                component: () => import('../pages/home/homeindex/items/stage/index.vue'),
                redirect: '/home/stage/stagecontent',
                children: [
                    {
                        path: 'stagedetail',
                        name: 'stagedetail',
                        component: () => import('../pages/home/homeindex/items/stage/stagedetail/index.vue')
                        ,meta:{
                            t:'驿站详情',
                        }
                    },
                    {
                        path: 'stagecontent',
                        name: 'stagecontent',
                        component: () => import('../pages/home/homeindex/items/stage/stagecontent/index.vue')
                        ,meta:{
                            t:'服务内容',
                        }
                    },
                    {
                        path: 'stagecultivate',
                        name: 'stagecultivate',
                        component: () => import('../pages/home/homeindex/items/stage/stagecultivate/index.vue')
                        ,meta:{
                            t:'人才政策',
                        }
                    }
                ]
            },


            {
                path: 'search',
                name: 'search',
                component: () => import('../pages/home/search/index.vue'),
                meta: {
                    show:true
                },
                redirect: '/home/search/searchHome',
                children: [
                    {
                        path: 'searchHome',
                        name: 'searchHome',
                        component: () => import('../pages/home/search/home/index.vue'),
                        redirect: '/home/search/searchHome/Answer',
                        children: [
                            {
                                path: 'allstage',
                                name: 'allstage',
                                component: () => import('../pages/home/search/home/searchitem/allstage.vue')
                                ,meta:{
                                    t:'全站',
                                }
                            },
                            {
                                path: 'allstagedetail',
                                name: 'allstagedetail',
                                component: () => import('../pages/home/search/home/allstageD/allstagedetail.vue')
                                ,meta:{
                                    t:'全站详情',
                                }
                            },

                            {
                                path: 'alljudge',
                                name: 'alljudge',
                                component: () => import('../pages/home/search/home/judge/alljudge.vue')
                                ,meta:{
                                    t:'登录认证',
                                    is:true,
                                    isr:true
                                }
                            },

                            {
                                path: 'Answer',
                                name: 'Answer',
                                component: () => import('../pages/home/search/home/searchitem/Answer.vue')
                                ,meta:{
                                    t:'吾辈问答',
                                    is:true
                                }
                            },
                            {
                                path: 'wbanswer',
                                name: 'wbanswer',
                                component: () => import('../pages/home/search/home/wbanswer/index.vue')
                                ,meta:{
                                    t:'吾辈问答详情',
                                }
                            },
                            {
                                path: 'subItems',
                                name: 'subItems',
                                component: () => import('../pages/home/search/home/searchitem/subItems.vue')
                                ,meta:{
                                    t:'模块',
                                    is:true
                                }
                            },
                            {
                                path: 'allIndex',
                                name: 'allIndex',
                                component: () => import('../pages/home/search/home/searchitem/allServices.vue')
                                ,meta:{
                                    t:'全部服务',
                                    is:true
                                }
                            },
                        ]
                    },
                    {
                        path: 'searchDiscover',
                        name: 'searchDiscover',
                        component: () => import('../pages/home/search/discover/index.vue')
                        ,meta:{
                            t:'发现',
                            is:true
                        }
                    },
                    {
                        path: 'searchReply',
                        name: 'searchReply',
                        component: () => import('../pages/home/search/reply/index.vue')
                        ,meta:{
                            t:'等你来答',
                            is:true
                        }
                    },
                ]
            },

            {
                path: 'movie',
                name: 'movie',
                component: () => import('../pages/home/movie/index.vue')
                ,meta:{
                    t:'电影',
                    is:true,
                    show:true
                }
            },
            {
                path: 'ticket',
                name: 'ticket',
                component: () => import('../pages/home/movie/ticket/index.vue')
                ,meta:{
                    t:'购票',
                }
            },
            {
                path: 'enterT',
                name: 'enterT',
                component: () => import('../pages/home/movie/ticket/enterT/index.vue')
                ,meta:{
                    t:'确认购票',
                }
            },
            {
                path: 'movieDetail',
                name: 'movieDetail',
                component: () => import('../pages/home/movie/movieDetail/index.vue')
                ,meta:{
                    t:'电影详情',
                }
            },
            {
                path: 'movieAddress',
                name: 'movieAddress',
                component: () => import('../pages/home/movie/movieAddress/index.vue')
                ,meta:{
                    t:'电影地址详情',
                }
            },
            {
                path: 'starNews',
                name: 'starNews',
                component: () => import('../pages/home/movie/starNews/index.vue')
                ,meta:{
                    t:'星闻',
                }

            },
            {
                path: 'starDetail',
                name: 'starDetail',
                component: () => import('../pages/home/movie/starNews/starDetail/index.vue')
                ,meta:{
                    t:'星闻详情',
                }
            },
            {
                path: 'recommend',
                name: 'recommend',
                component: () => import('../pages/home/movie/recommend/index.vue')
                ,meta:{
                    t:'推荐',
                }
            },
            {
                path: 'predict',
                name: 'predict',
                component: () => import('../pages/home/movie/predict/index.vue')
                ,meta:{
                    t:'预告',
                }
            },
            {
                path: 'preDetail',
                name: 'preDetail',
                component: () => import('../pages/home/movie/predict/preDetail/index.vue')
                ,meta:{
                    t:'预告详情',
                }
            },

            {
                path: 'my',
                name: 'my',
                component: () => import('../pages/home/my/index.vue')
                ,meta:{
                    t:'个人中心',
                    is:true,
                    show:true
                }
            },
            {
                path: 'updateinfo',
                name: 'updateinfo',
                component: () => import('../pages/home/my/updateinfo/index.vue')
                ,meta:{
                    t:'更改用户信息',
                }
            },
            {
                path: 'updatelist',
                name: 'updatelist',
                component: () => import('../pages/home/my/updatelist/index.vue')
                ,meta:{
                    t:'订单列表',
                }
            },
            {
                path: 'listDetail',
                name: 'listDetail',
                component: () => import('../pages/home/my/updatelist/listDetail/index.vue')
                ,meta:{
                    t:'订单详情',
                }
            },
            {
                path: 'updatepassword',
                name: 'updatepassword',
                component: () => import('../pages/home/my/updatepassword/index.vue')
                ,meta:{
                    t:'修改密码',
                }
            },
            {
                path: 'addcomment',
                name: 'addcomment',
                component: () => import('../pages/home/my/addcomment/index.vue')
                ,meta:{
                    t:'意见反馈',
                }
            },

        ]
    },

]

let router = createRouter({
    history: createWebHashHistory(),
    routes
})
// router=transitionE(router)


router.beforeEach((to, from, next) => {
    // console.log(to,from)
    if (to.path==='/'){
        if (getStorage('info')){
            setTimeout(()=>{
                router.replace('/home')
            },3000)
        }else {
            router.replace('/loading2')
        }
    }
    if (to.path==='/loading2'){
        // console.log('ddjdj')
        setTimeout(()=>{
            router.replace('/login')
        },5000)
    }
    /*if (to.path==='/home'&&!getStorage('info')){
        router.replace('/login')
    }*/
    /*if (to.path==='/login'&&!getStorage('info')){
        console.log(to.path)
    }*/
    // console.log(to.name)
    /*if (!getStorage('info')&&from.path!='/login'){
        // console.log('dassadsadad')
        router.replace('/login')
    }*/
    // console.log(from.name,to.name)
    next()
})
router.afterEach((to, from) => {
    document.title=to.meta.t
})

/*export function resetRouter () {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // the relevant part
}*/
export default router
