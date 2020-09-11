import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login/login.vue"
import Layout from "../views/Layout/layout.vue"
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect:"/login",
    hidden: true,
    meta:{
      name:"主页"
    }
  },
  {
    path:"/login",
    name:"Login",
    hidden:true,
    meta:{
      name:"登录"
    },
    component:Login,  
  },
  {
    path:"/layout",
    name:"Layout",
    redirect:"/console",
    meta:{
      name:"控制台",
      icon:"el-icon-s-home"
    },
    component:Layout,
    children:[
      {
        path: "/console",
        name: "Console",
        meta:{
          name:"首页",         
        },
        component: ()=>import("../views/Console/console.vue")
      }
    ]
  },
  //停车场
  {
    path:"/parking",
    name:"Parking", 
    meta:{
      name:"停车场",
      icon:'el-icon-message'
    },
    component:Layout,
    children:[
      {
        path: "/ParkingIndex",
        name: "ParkingIndex",
        meta:{
          name:"列表管理",       
        },
        component: ()=>import("../views/Parking/ParkingIndex.vue")
      },
      {
        path: "/ParkingAdd",
        name: "ParkingAdd",
        meta:{
          name:"新增停车场",       
        },
        component: ()=>import("../views/Parking/ParkingAdd.vue")
      },
    ]
  },

  // 车辆品牌
  {
    path:"/carsBrand",
    name:"CarsBrand", 
    meta:{
      name:"车辆品牌",
      icon:'el-icon-message'
    },
    component:Layout,
    children:[
      {
        path: "/carsBrandIndex",
        name: "CarBrandIndex",
        meta:{
          name:"品牌列表",       
        },
        component: ()=>import("../views/carsBrand/CarsBrandIndex.vue")
      },
    ]
  },

  //车辆管理
  {
    path:"/cars",
    name:"Cars", 
    meta:{
      name:"车辆管理",
      icon:'el-icon-message'
    },
    component:Layout,
    children:[{
      path: "/carsIndex",
      name: "CrarsIndex",
      meta:{
        name:"车辆列表",       
      },
      component:()=>import("../views/Cars/CarsIndex.vue")
    },
    {
      path: "/carsAdd",
      name: "CarsAdd",
      meta:{
        name:"新增车辆",       
      },
      component:()=>import("../views/Cars/CarsAdd.vue")
    },
  
  ]
  }
];

const router = new VueRouter({
  routes,
  mode:'history'
});

export default router;
