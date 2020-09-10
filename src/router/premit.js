//路由守卫
import router from "./index";
import {getToken} from "@/utils/app"
import { Message } from 'element-ui';
const whiteRouter = '/login'
router.beforeEach((to,from,next)=>{
    if(getToken()){
       next()
    }else{        
        
        if(to.fullPath==whiteRouter){ //当路由的下一个页面指向登录时就执行next（）           
            next()                    
        }else{ //路由下一个页面不知向登录时就执行next('/login')让他指向登录页面
            next('/login')
            Message.error('请登录账户')  
        }
    }
    //console.log(to); //下一个页面
    //console.log(from); // 上一个页   
  })

  /**
   * 1.直接进入console的时候，参数to变为了"/console",就会触发beforeEach
   * 2.再一次next指向login，再次改变路由指向，再执行beforeEach，参数to变为"/login"
   * 3.白名单判断存在，则直接执行next(),因为没参数，不会再次执行beforeEach
   */