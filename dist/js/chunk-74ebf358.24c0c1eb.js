(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-74ebf358"],{1148:function(t,e,r){"use strict";var a=r("a691"),i=r("1d80");t.exports="".repeat||function(t){var e=String(i(this)),r="",n=a(t);if(n<0||n==1/0)throw RangeError("Wrong number of repetitions");for(;n>0;(n>>>=1)&&(e+=e))1&n&&(r+=e);return r}},"159b":function(t,e,r){var a=r("da84"),i=r("fdbc"),n=r("17c2"),s=r("9112");for(var o in i){var c=a[o],l=c&&c.prototype;if(l&&l.forEach!==n)try{s(l,"forEach",n)}catch(u){l.forEach=n}}},"17c2":function(t,e,r){"use strict";var a=r("b727").forEach,i=r("a640"),n=r("ae40"),s=i("forEach"),o=n("forEach");t.exports=s&&o?[].forEach:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}},"194b":function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"parking-add"},[r("VueForm",{ref:"vuForm",attrs:{formItem:t.form_item,form_handler:t.form_handler,formData:t.form},scopedSlots:t._u([{key:"maintain",fn:function(){return[r("el-row",[r("el-col",{attrs:{span:6}},[r("el-date-picker",{attrs:{type:"date","value-format":"yyyy-MM-dd",placeholder:"选择日期"},model:{value:t.form.maintainDate,callback:function(e){t.$set(t.form,"maintainDate",e)},expression:"form.maintainDate"}})],1),r("el-col",{attrs:{span:6}},[t._v("下次保养日期：2020-11-11")])],1)]},proxy:!0},{key:"energy",fn:function(){return[r("el-radio-group",{on:{change:t.changeEnergyType},model:{value:t.form.energyType,callback:function(e){t.$set(t.form,"energyType",e)},expression:"form.energyType"}},t._l(t.energyType,(function(e){return r("el-radio",{key:e.value,attrs:{label:e.value}},[t._v(t._s(e.label))])})),1),1==t.form.energyType||3==t.form.energyType?r("div",{staticClass:"progress-bar-wrap"},[r("span",{staticClass:"label-text"},[t._v("电量")]),r("el-row",[r("el-col",{attrs:{span:10}},[r("el-slider",{attrs:{"show-input":""},model:{value:t.form.electric,callback:function(e){t.$set(t.form,"electric",e)},expression:"form.electric"}})],1)],1)],1):t._e(),2==t.form.energyType||3==t.form.energyType?r("div",{staticClass:"progress-bar-wrap"},[r("span",{staticClass:"label-text"},[t._v("油量")]),r("el-row",[r("el-col",{attrs:{span:10}},[r("el-slider",{attrs:{"show-input":""},model:{value:t.form.oil,callback:function(e){t.$set(t.form,"oil",e)},expression:"form.oil"}})],1)],1)],1):t._e()]},proxy:!0},{key:"carsAttr",fn:function(){return[r("carsAttr",{ref:"carsAttr",attrs:{value:t.form.carsAttr,initValue:t.form.carsAttr,oil:t.form.oil},on:{"update:value":function(e){return t.$set(t.form,"carsAttr",e)}}})]},proxy:!0}])})],1)},i=[],n=(r("4de4"),r("caad"),r("a434"),r("b64b"),r("2532"),r("2934")),s=r("a8b5"),o=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("carsBasisAttr",{on:{getAttrList:t.getAttrList}}),t._v(" "+t._s("公里数"+t.countKm)+" "),r("el-row",{attrs:{gutter:15}},t._l(t.attr_data,(function(e){return r("el-col",{key:e.key,attrs:{span:4}},[r("el-input",{attrs:{placeholder:e.value},model:{value:t.attr_item[t.attr_basis_data.key][e.key],callback:function(r){t.$set(t.attr_item[t.attr_basis_data.key],e.key,r)},expression:"attr_item[attr_basis_data.key][item.key]"}})],1)})),1)],1)},c=[],l=(r("4160"),r("a9e3"),r("b680"),r("159b"),function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",t._l(t.cars_list_basis_item,(function(e){return r("el-button",{key:e.id,attrs:{type:t.cars_list_type_id==e.id?"danger":"",size:"small"},on:{click:function(r){return t.getTypeList(e)}}},[t._v(t._s(e.value))])})),1)}),u=[],d=r("361e"),f={name:"carsBasisAttr",data:function(){return{cars_list_basis_item:[],cars_list_type_id:"",current_cars_type_data:{}}},beforeMount:function(){this.getCarsTypeBasis()},methods:{getCarsTypeBasis:function(){var t=this;Object(d["b"])().then((function(e){var r=e.data.data.data;t.cars_list_basis_item=r}))},getTypeList:function(t){this.cars_list_type_id=t.id,this.current_cars_type_data=t,this.getAttrList()},getAttrList:function(){var t=this;Object(d["c"])({typeId:this.current_cars_type_data.id}).then((function(e){t.$emit("getAttrList",{attr_data:e.data.data.data,attr_basis_data:t.current_cars_type_data})}))}}},p=f,m=r("2877"),h=Object(m["a"])(p,l,u,!1,null,null,null),_=h.exports,y={name:"CarsAttr",data:function(){return{attr_data:[],attr_basis_data:{},attr_item:{}}},components:{carsBasisAttr:_},computed:{countKm:function(){if(this.attr_item.basics&&this.attr_item.carsBody){console.log(this.attr_item.carsBody["Tank volume"]);var t=this.oil*this.attr_item.carsBody["Tank volume"]/100,e=t/this.attr_item.basics.true_oli_consume*100;return e.toFixed(2)}}},props:{initValue:{type:String,default:""},oil:{type:Number,default:0}},watch:{initValue:{handler:function(t){t&&(this.attr_item=JSON.parse(t))},immediate:!0}},methods:{getAttrList:function(t){this.attr_basis_data=t.attr_basis_data,this.attr_data=t.attr_data,this.attrFormat()},attrFormat:function(){if(0==this.attr_data.length)return!1;var t=this.attr_basis_data.key;if(this.attr_item[t])return!1;var e={};this.attr_data.forEach((function(t){e[t.key]=""})),this.$set(this.attr_item,t,e)},callbackValue:function(){this.$emit("update:value",JSON.stringify(this.attr_item))}}},b=y,g=Object(m["a"])(b,o,c,!1,null,null,null),v=g.exports,k=r("b6ee"),A={name:"CarsAdd",components:{VueForm:s["a"],carsAttr:v},data:function(){var t=this;return{cars_attr:[],form_item:[{type:"select",label:"车辆品牌",placeholder:"请选择车辆品牌",prop:"carsBrandId",select_vlaue:"id",select_label:"nameCh",required:!0,options:[]},{type:"select",label:"停车场",placeholder:"请选择停车场",select_vlaue:"id",select_label:"parkingName",prop:"parkingId",required:!0,options:[]},{type:"input",label:"车辆型号",placeholder:"请输入车辆型号",required:!0,prop:"carsNumber"},{type:"input",label:"车牌号",placeholder:"请输入车牌号",required:!0,prop:"carsMode"},{type:"input",label:"车架号",placeholder:"请输入车架号",required:!0,prop:"carsFrameNumber"},{type:"input",label:"发动机号",placeholder:"请输入发动机号",required:!0,prop:"engineNumber"},{type:"upload",label:"缩略图",prop:"carsImg"},{type:"radio",label:"年检",placeholder:"请选择年检",prop:"yearCheck",options:this.$store.state.config.year_check},{type:"slot",slotName:"maintain",prop:"maintainDate",label:"保养日期"},{type:"radio",label:"档位",placeholder:"请选择档位",prop:"gear",options:this.$store.state.config.gear},{type:"slot",slotName:"energy",prop:"energyType",label:"能源类型"},{type:"radio",label:"禁启用",prop:"status",required:!0,options:this.$store.state.config.radio_disabled},{type:"slot",slotName:"carsAttr",prop:"carsAttr",label:"车辆属性"},{type:"wangeditor",prop:"content",label:"车辆描述"}],form_handler:[{label:"确定",type:"danger",handler:function(){return t.onSubmit()}},{label:"重置",type:""}],form:{parkingId:"",carsBrandId:"",carsMode:"",carsNumber:"",carsFrameNumber:"",engineNumber:"",yearCheck:!0,gear:1,energyType:1,electric:100,oil:100,carsAttr:"",content:"",maintainDate:"",status:!0,carsImg:""},carsBrandList:[],energyType:this.$store.state.config.energyType,id:this.$route.query.id,uploadData:{}}},beforeMount:function(){this.GetCarsBrandList(),this.GetParking()},mounted:function(){this.getDetail()},methods:{addCarsAttr:function(){this.cars_attr.push({attr_key:"",attr_value:""})},delCarsAttr:function(t){this.cars_attr.splice(t,1)},onSubmit:function(){var t=this;this.formatCarsAttr(),this.$refs.vuForm.$refs.form.validate((function(e){if(!e)return console.log("error submit!!"),!1;t.id?t.editCars():t.addCars()}))},GetCarsBrandList:function(){var t=this;Object(n["e"])().then((function(e){var r=e.data.data.data;if(r){var a=t.form_item.filter((function(t){return"carsBrandId"==t.prop}));a.length>0&&(a[0].options=r)}}))},GetParking:function(){var t=this;Object(n["f"])().then((function(e){var r=e.data.data.data;if(r){var a=t.form_item.filter((function(t){return"parkingId"==t.prop}));a.length>0&&(a[0].options=r)}}))},changeEnergyType:function(t){this.form.oil=0,this.form.electric=0},formatCarsAttr:function(){this.$refs.carsAttr.callbackValue()},addCars:function(){var t=this;Object(k["a"])(this.form).then((function(e){t.$message({message:e.data.message,type:"success"}),t.reset()}))},editCars:function(){var t=this,e=JSON.parse(JSON.stringify(this.form));e.id=this.id,this.btn_loading=!0,Object(k["c"])(e).then((function(e){t.btn_loading=!1,t.$message({message:e.data.message,type:"success"})}))},getDetail:function(){var t=this;if(this.id){var e={id:this.id};Object(k["b"])(e).then((function(e){var r=e.data.data;if(!r)return!1;for(var a in r)Object.keys(t.form).includes(a)&&(t.form[a]=r[a]);console.log(t.form)}))}},reset:function(){this.$refs.vuForm.resetForm()}}},w=A,x=(r("497e"),Object(m["a"])(w,a,i,!1,null,null,null));e["default"]=x.exports},"361e":function(t,e,r){"use strict";r.d(e,"b",(function(){return i})),r.d(e,"c",(function(){return n})),r.d(e,"a",(function(){return s}));var a=r("b775");function i(t){return a["a"].request({method:"post",url:"/carsAttr/type/",data:t})}function n(t){return a["a"].request({method:"post",url:"/carsAttr/list/",data:t})}function s(t){return a["a"].request({method:"post",url:"/carsAttr/add/",data:t})}},"408a":function(t,e,r){var a=r("c6b6");t.exports=function(t){if("number"!=typeof t&&"Number"!=a(t))throw TypeError("Incorrect invocation");return+t}},4160:function(t,e,r){"use strict";var a=r("23e7"),i=r("17c2");a({target:"Array",proto:!0,forced:[].forEach!=i},{forEach:i})},"497e":function(t,e,r){"use strict";var a=r("5b2a"),i=r.n(a);i.a},"4de4":function(t,e,r){"use strict";var a=r("23e7"),i=r("b727").filter,n=r("1dde"),s=r("ae40"),o=n("filter"),c=s("filter");a({target:"Array",proto:!0,forced:!o||!c},{filter:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}})},"5b2a":function(t,e,r){},a434:function(t,e,r){"use strict";var a=r("23e7"),i=r("23cb"),n=r("a691"),s=r("50c4"),o=r("7b0b"),c=r("65f0"),l=r("8418"),u=r("1dde"),d=r("ae40"),f=u("splice"),p=d("splice",{ACCESSORS:!0,0:0,1:2}),m=Math.max,h=Math.min,_=9007199254740991,y="Maximum allowed length exceeded";a({target:"Array",proto:!0,forced:!f||!p},{splice:function(t,e){var r,a,u,d,f,p,b=o(this),g=s(b.length),v=i(t,g),k=arguments.length;if(0===k?r=a=0:1===k?(r=0,a=g-v):(r=k-2,a=h(m(n(e),0),g-v)),g+r-a>_)throw TypeError(y);for(u=c(b,a),d=0;d<a;d++)f=v+d,f in b&&l(u,d,b[f]);if(u.length=a,r<a){for(d=v;d<g-a;d++)f=d+a,p=d+r,f in b?b[p]=b[f]:delete b[p];for(d=g;d>g-a+r;d--)delete b[d-1]}else if(r>a)for(d=g-a;d>v;d--)f=d+a-1,p=d+r-1,f in b?b[p]=b[f]:delete b[p];for(d=0;d<r;d++)b[d+v]=arguments[d+2];return b.length=g-a+r,u}})},b680:function(t,e,r){"use strict";var a=r("23e7"),i=r("a691"),n=r("408a"),s=r("1148"),o=r("d039"),c=1..toFixed,l=Math.floor,u=function(t,e,r){return 0===e?r:e%2===1?u(t,e-1,r*t):u(t*t,e/2,r)},d=function(t){var e=0,r=t;while(r>=4096)e+=12,r/=4096;while(r>=2)e+=1,r/=2;return e},f=c&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==(0xde0b6b3a7640080).toFixed(0))||!o((function(){c.call({})}));a({target:"Number",proto:!0,forced:f},{toFixed:function(t){var e,r,a,o,c=n(this),f=i(t),p=[0,0,0,0,0,0],m="",h="0",_=function(t,e){var r=-1,a=e;while(++r<6)a+=t*p[r],p[r]=a%1e7,a=l(a/1e7)},y=function(t){var e=6,r=0;while(--e>=0)r+=p[e],p[e]=l(r/t),r=r%t*1e7},b=function(){var t=6,e="";while(--t>=0)if(""!==e||0===t||0!==p[t]){var r=String(p[t]);e=""===e?r:e+s.call("0",7-r.length)+r}return e};if(f<0||f>20)throw RangeError("Incorrect fraction digits");if(c!=c)return"NaN";if(c<=-1e21||c>=1e21)return String(c);if(c<0&&(m="-",c=-c),c>1e-21)if(e=d(c*u(2,69,1))-69,r=e<0?c*u(2,-e,1):c/u(2,e,1),r*=4503599627370496,e=52-e,e>0){_(0,r),a=f;while(a>=7)_(1e7,0),a-=7;_(u(10,a,1),0),a=e-1;while(a>=23)y(1<<23),a-=23;y(1<<a),_(1,1),y(2),h=b()}else _(0,r),_(1<<-e,0),h=b()+s.call("0",f);return f>0?(o=h.length,h=m+(o<=f?"0."+s.call("0",f-o)+h:h.slice(0,o-f)+"."+h.slice(o-f))):h=m+h,h}})},b6ee:function(t,e,r){"use strict";r.d(e,"a",(function(){return i})),r.d(e,"c",(function(){return n})),r.d(e,"d",(function(){return s})),r.d(e,"b",(function(){return o}));var a=r("b775");function i(t){return a["a"].request({method:"post",url:"/cars/add/",data:t})}function n(t){return a["a"].request({method:"post",url:"/cars/edit/",data:t})}function s(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return a["a"].request({method:"post",url:"/cars/status/",data:t})}function o(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return a["a"].request({method:"post",url:"/cars/detailed/",data:t})}}}]);