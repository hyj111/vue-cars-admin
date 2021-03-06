import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const Layout = () => import("../views/Layout/layout.vue")

const routes = [{
    path: "/",
    redirect: "/login",
    hidden: true,
    meta: {
      name: "主页"
    }
  },
  {
    path: "/login",
    name: "Login",
    hidden: true,
    meta: {
      name: "登录"
    },
    component: () => import("../views/Login/login.vue"),
  },
  // {
  //   path:"/layout",
  //   name:"Layout",
  //   redirect:"/console",
  //   meta:{
  //     name:"控制台",
  //     icon:"iconfont icon-supplier-features"
  //   },
  //   component:Layout,
  //   children:[
  //     {
  //       path: "/console",
  //       name: "Console",
  //       meta:{
  //         name:"首页",         
  //       },
  //       component: ()=>import("../views/Console/console.vue")
  //     }
  //   ]
  //  },
  //停车场
  {
    path: "/parking",
    name: "Parking",
    meta: {
      name: "停车场",
      icon: 'iconfont icon-tingchechang1'
    },
    component: Layout,
    children: [{
        path: "/ParkingIndex",
        name: "ParkingIndex",
        meta: {
          name: "列表管理",
        },
        component: () => import("../views/Parking/ParkingIndex.vue")
      },
      {
        path: "/ParkingAdd",
        name: "ParkingAdd",
        meta: {
          name: "新增停车场",
        },
        component: () => import("../views/Parking/ParkingAdd.vue")
      },
    ]
  },

  // 车辆品牌
  {
    path: "/carsBrand",
    name: "CarsBrand",
    meta: {
      name: "车辆品牌",
      icon: 'iconfont icon-qiche1'
    },
    component: Layout,
    children: [{
      path: "/carsBrandIndex",
      name: "CarBrandIndex",
      meta: {
        name: "品牌列表",
      },
      component: () => import("../views/carsBrand/CarsBrandIndex.vue")
    }, ]
  },

  //车辆管理
  {
    path: "/cars",
    name: "Cars",
    meta: {
      name: "车辆管理",
      icon: 'iconfont icon-qiche1'
    },
    component: Layout,
    children: [{
        path: "/carsAttr",
        name: "CrarsAttr",
        meta: {
          name: "车辆属性",
        },
        component: () => import("../views/Cars/attrList.vue")
      },
      {
        path: "/carsIndex",
        name: "CrarsIndex",
        meta: {
          name: "车辆列表",
        },
        component: () => import("../views/Cars/CarsIndex.vue")
      },
      {
        path: "/carsAdd",
        name: "CarsAdd",
        meta: {
          name: "新增车辆",
        },
        component: () => import("../views/Cars/CarsAdd.vue")
      },
    ]
  },
  // 销售管理
  {
    path: "/sale",
    name: "Sale",
    meta: {
      name: "销售管理",
      icon: 'iconfont icon-qiche1'
    },
    component: Layout,
    children: [{
      path: "/leaseList",
      name: "LeaseList",
      meta: {
        name: "租车类型",
      },
      component: () => import("../views/Sale/leaseList.vue")
    }, ]
  }

];

const router = new VueRouter({
  routes,

});

export default router;