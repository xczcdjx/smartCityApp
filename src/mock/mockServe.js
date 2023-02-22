import Mock from 'mockjs'
import carousel from './banner/carousel.js'
import activities from './service/activities.js'
import stage from "./service/stage.js";
import recipes from "./service/cuisine/recipes";
import menu from "./service/cuisine/menu";
import book from "./banner/book";
import job from "./banner/job";
Mock.mock("/mock/carousel",{code:200,data:carousel})
Mock.mock("/mock/activities",{code:200,data:activities})
Mock.mock("/mock/stage",{code:200,data:stage})
Mock.mock("/mock/book",{code:200,data:book})
Mock.mock("/mock/job",{code:200,data:job})

Mock.mock("/mock/recipes",{code:200,data:recipes})
Mock.mock("/mock/menu",{code:200,data:menu})

import search from "./service/search";
Mock.mock("/mock/search",{code:200,data:search})

import wbquestion from "./service/search/answer/wbquestion";
import wbanswer from "./service/search/answer/wbanswer";
Mock.mock('/mock/wbquestion',{code:200,data:wbquestion})
Mock.mock('/mock/wbanswer',{code:200,data:wbanswer})


