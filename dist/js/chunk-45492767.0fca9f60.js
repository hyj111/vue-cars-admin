(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-45492767"],{"0e32":function(t,e,r){},"14b8":function(t,e,r){"use strict";var n=r("0e32"),o=r.n(n);o.a},"14c3":function(t,e,r){var n=r("c6b6"),o=r("9263");t.exports=function(t,e){var r=t.exec;if("function"===typeof r){var s=r.call(t,e);if("object"!==typeof s)throw TypeError("RegExp exec method returned something other than an Object or null");return s}if("RegExp"!==n(t))throw TypeError("RegExp#exec called on incompatible receiver");return o.call(t,e)}},"1e41":function(t,e,r){},"3c35":function(t,e){(function(e){t.exports=e}).call(this,{})},"4d63":function(t,e,r){var n=r("83ab"),o=r("da84"),s=r("94ca"),i=r("7156"),a=r("9bf2").f,c=r("241c").f,u=r("44e7"),l=r("ad6d"),h=r("9f7f"),f=r("6eeb"),d=r("d039"),p=r("69f3").set,_=r("2626"),m=r("b622"),g=m("match"),E=o.RegExp,v=E.prototype,S=/a/g,b=/a/g,x=new E(S)!==S,H=h.UNSUPPORTED_Y,A=n&&s("RegExp",!x||H||d((function(){return b[g]=!1,E(S)!=S||E(b)==b||"/a/i"!=E(S,"i")})));if(A){var R=function(t,e){var r,n=this instanceof R,o=u(t),s=void 0===e;if(!n&&o&&t.constructor===R&&s)return t;x?o&&!s&&(t=t.source):t instanceof R&&(s&&(e=l.call(t)),t=t.source),H&&(r=!!e&&e.indexOf("y")>-1,r&&(e=e.replace(/y/g,"")));var a=i(x?new E(t,e):E(t,e),n?this:v,R);return H&&r&&p(a,{sticky:r}),a},w=function(t){t in R||a(R,t,{configurable:!0,get:function(){return E[t]},set:function(e){E[t]=e}})},y=c(E),I=0;while(y.length>I)w(y[I++]);v.constructor=R,R.prototype=v,f(o,"RegExp",R)}_("RegExp")},5319:function(t,e,r){"use strict";var n=r("d784"),o=r("825a"),s=r("7b0b"),i=r("50c4"),a=r("a691"),c=r("1d80"),u=r("8aa5"),l=r("14c3"),h=Math.max,f=Math.min,d=Math.floor,p=/\$([$&'`]|\d\d?|<[^>]*>)/g,_=/\$([$&'`]|\d\d?)/g,m=function(t){return void 0===t?t:String(t)};n("replace",2,(function(t,e,r,n){var g=n.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,E=n.REPLACE_KEEPS_$0,v=g?"$":"$0";return[function(r,n){var o=c(this),s=void 0==r?void 0:r[t];return void 0!==s?s.call(r,o,n):e.call(String(o),r,n)},function(t,n){if(!g&&E||"string"===typeof n&&-1===n.indexOf(v)){var s=r(e,t,this,n);if(s.done)return s.value}var c=o(t),d=String(this),p="function"===typeof n;p||(n=String(n));var _=c.global;if(_){var b=c.unicode;c.lastIndex=0}var x=[];while(1){var H=l(c,d);if(null===H)break;if(x.push(H),!_)break;var A=String(H[0]);""===A&&(c.lastIndex=u(d,i(c.lastIndex),b))}for(var R="",w=0,y=0;y<x.length;y++){H=x[y];for(var I=String(H[0]),C=h(f(a(H.index),d.length),0),k=[],F=1;F<H.length;F++)k.push(m(H[F]));var T=H.groups;if(p){var X=[I].concat(k,C,d);void 0!==T&&X.push(T);var $=String(n.apply(void 0,X))}else $=S(I,d,C,k,T,n);C>=w&&(R+=d.slice(w,C)+$,w=C+I.length)}return R+d.slice(w)}];function S(t,r,n,o,i,a){var c=n+t.length,u=o.length,l=_;return void 0!==i&&(i=s(i),l=p),e.call(a,l,(function(e,s){var a;switch(s.charAt(0)){case"$":return"$";case"&":return t;case"`":return r.slice(0,n);case"'":return r.slice(c);case"<":a=i[s.slice(1,-1)];break;default:var l=+s;if(0===l)return e;if(l>u){var h=d(l/10);return 0===h?e:h<=u?void 0===o[h-1]?s.charAt(1):o[h-1]+s.charAt(1):e}a=o[l-1]}return void 0===a?"":a}))}}))},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,r){var n=r("1d80"),o=r("5899"),s="["+o+"]",i=RegExp("^"+s+s+"*"),a=RegExp(s+s+"*$"),c=function(t){return function(e){var r=String(n(e));return 1&t&&(r=r.replace(i,"")),2&t&&(r=r.replace(a,"")),r}};t.exports={start:c(1),end:c(2),trim:c(3)}},6199:function(module,exports,__webpack_require__){(function(process,global){var __WEBPACK_AMD_DEFINE_RESULT__;
/*
 * [js-sha1]{@link https://github.com/emn178/js-sha1}
 *
 * @version 0.6.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */(function(){"use strict";var root="object"===typeof window?window:{},NODE_JS=!root.JS_SHA1_NO_NODE_JS&&"object"===typeof process&&process.versions&&process.versions.node;NODE_JS&&(root=global);var COMMON_JS=!root.JS_SHA1_NO_COMMON_JS&&"object"===typeof module&&module.exports,AMD=__webpack_require__("3c35"),HEX_CHARS="0123456789abcdef".split(""),EXTRA=[-2147483648,8388608,32768,128],SHIFT=[24,16,8,0],OUTPUT_TYPES=["hex","array","digest","arrayBuffer"],blocks=[],createOutputMethod=function(t){return function(e){return new Sha1(!0).update(e)[t]()}},createMethod=function(){var t=createOutputMethod("hex");NODE_JS&&(t=nodeWrap(t)),t.create=function(){return new Sha1},t.update=function(e){return t.create().update(e)};for(var e=0;e<OUTPUT_TYPES.length;++e){var r=OUTPUT_TYPES[e];t[r]=createOutputMethod(r)}return t},nodeWrap=function(method){var crypto=eval("require('crypto')"),Buffer=eval("require('buffer').Buffer"),nodeMethod=function(t){if("string"===typeof t)return crypto.createHash("sha1").update(t,"utf8").digest("hex");if(t.constructor===ArrayBuffer)t=new Uint8Array(t);else if(void 0===t.length)return method(t);return crypto.createHash("sha1").update(new Buffer(t)).digest("hex")};return nodeMethod};function Sha1(t){t?(blocks[0]=blocks[16]=blocks[1]=blocks[2]=blocks[3]=blocks[4]=blocks[5]=blocks[6]=blocks[7]=blocks[8]=blocks[9]=blocks[10]=blocks[11]=blocks[12]=blocks[13]=blocks[14]=blocks[15]=0,this.blocks=blocks):this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],this.h0=1732584193,this.h1=4023233417,this.h2=2562383102,this.h3=271733878,this.h4=3285377520,this.block=this.start=this.bytes=this.hBytes=0,this.finalized=this.hashed=!1,this.first=!0}Sha1.prototype.update=function(t){if(!this.finalized){var e="string"!==typeof t;e&&t.constructor===root.ArrayBuffer&&(t=new Uint8Array(t));var r,n,o=0,s=t.length||0,i=this.blocks;while(o<s){if(this.hashed&&(this.hashed=!1,i[0]=this.block,i[16]=i[1]=i[2]=i[3]=i[4]=i[5]=i[6]=i[7]=i[8]=i[9]=i[10]=i[11]=i[12]=i[13]=i[14]=i[15]=0),e)for(n=this.start;o<s&&n<64;++o)i[n>>2]|=t[o]<<SHIFT[3&n++];else for(n=this.start;o<s&&n<64;++o)r=t.charCodeAt(o),r<128?i[n>>2]|=r<<SHIFT[3&n++]:r<2048?(i[n>>2]|=(192|r>>6)<<SHIFT[3&n++],i[n>>2]|=(128|63&r)<<SHIFT[3&n++]):r<55296||r>=57344?(i[n>>2]|=(224|r>>12)<<SHIFT[3&n++],i[n>>2]|=(128|r>>6&63)<<SHIFT[3&n++],i[n>>2]|=(128|63&r)<<SHIFT[3&n++]):(r=65536+((1023&r)<<10|1023&t.charCodeAt(++o)),i[n>>2]|=(240|r>>18)<<SHIFT[3&n++],i[n>>2]|=(128|r>>12&63)<<SHIFT[3&n++],i[n>>2]|=(128|r>>6&63)<<SHIFT[3&n++],i[n>>2]|=(128|63&r)<<SHIFT[3&n++]);this.lastByteIndex=n,this.bytes+=n-this.start,n>=64?(this.block=i[16],this.start=n-64,this.hash(),this.hashed=!0):this.start=n}return this.bytes>4294967295&&(this.hBytes+=this.bytes/4294967296<<0,this.bytes=this.bytes%4294967296),this}},Sha1.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var t=this.blocks,e=this.lastByteIndex;t[16]=this.block,t[e>>2]|=EXTRA[3&e],this.block=t[16],e>=56&&(this.hashed||this.hash(),t[0]=this.block,t[16]=t[1]=t[2]=t[3]=t[4]=t[5]=t[6]=t[7]=t[8]=t[9]=t[10]=t[11]=t[12]=t[13]=t[14]=t[15]=0),t[14]=this.hBytes<<3|this.bytes>>>29,t[15]=this.bytes<<3,this.hash()}},Sha1.prototype.hash=function(){var t,e,r,n=this.h0,o=this.h1,s=this.h2,i=this.h3,a=this.h4,c=this.blocks;for(e=16;e<80;++e)r=c[e-3]^c[e-8]^c[e-14]^c[e-16],c[e]=r<<1|r>>>31;for(e=0;e<20;e+=5)t=o&s|~o&i,r=n<<5|n>>>27,a=r+t+a+1518500249+c[e]<<0,o=o<<30|o>>>2,t=n&o|~n&s,r=a<<5|a>>>27,i=r+t+i+1518500249+c[e+1]<<0,n=n<<30|n>>>2,t=a&n|~a&o,r=i<<5|i>>>27,s=r+t+s+1518500249+c[e+2]<<0,a=a<<30|a>>>2,t=i&a|~i&n,r=s<<5|s>>>27,o=r+t+o+1518500249+c[e+3]<<0,i=i<<30|i>>>2,t=s&i|~s&a,r=o<<5|o>>>27,n=r+t+n+1518500249+c[e+4]<<0,s=s<<30|s>>>2;for(;e<40;e+=5)t=o^s^i,r=n<<5|n>>>27,a=r+t+a+1859775393+c[e]<<0,o=o<<30|o>>>2,t=n^o^s,r=a<<5|a>>>27,i=r+t+i+1859775393+c[e+1]<<0,n=n<<30|n>>>2,t=a^n^o,r=i<<5|i>>>27,s=r+t+s+1859775393+c[e+2]<<0,a=a<<30|a>>>2,t=i^a^n,r=s<<5|s>>>27,o=r+t+o+1859775393+c[e+3]<<0,i=i<<30|i>>>2,t=s^i^a,r=o<<5|o>>>27,n=r+t+n+1859775393+c[e+4]<<0,s=s<<30|s>>>2;for(;e<60;e+=5)t=o&s|o&i|s&i,r=n<<5|n>>>27,a=r+t+a-1894007588+c[e]<<0,o=o<<30|o>>>2,t=n&o|n&s|o&s,r=a<<5|a>>>27,i=r+t+i-1894007588+c[e+1]<<0,n=n<<30|n>>>2,t=a&n|a&o|n&o,r=i<<5|i>>>27,s=r+t+s-1894007588+c[e+2]<<0,a=a<<30|a>>>2,t=i&a|i&n|a&n,r=s<<5|s>>>27,o=r+t+o-1894007588+c[e+3]<<0,i=i<<30|i>>>2,t=s&i|s&a|i&a,r=o<<5|o>>>27,n=r+t+n-1894007588+c[e+4]<<0,s=s<<30|s>>>2;for(;e<80;e+=5)t=o^s^i,r=n<<5|n>>>27,a=r+t+a-899497514+c[e]<<0,o=o<<30|o>>>2,t=n^o^s,r=a<<5|a>>>27,i=r+t+i-899497514+c[e+1]<<0,n=n<<30|n>>>2,t=a^n^o,r=i<<5|i>>>27,s=r+t+s-899497514+c[e+2]<<0,a=a<<30|a>>>2,t=i^a^n,r=s<<5|s>>>27,o=r+t+o-899497514+c[e+3]<<0,i=i<<30|i>>>2,t=s^i^a,r=o<<5|o>>>27,n=r+t+n-899497514+c[e+4]<<0,s=s<<30|s>>>2;this.h0=this.h0+n<<0,this.h1=this.h1+o<<0,this.h2=this.h2+s<<0,this.h3=this.h3+i<<0,this.h4=this.h4+a<<0},Sha1.prototype.hex=function(){this.finalize();var t=this.h0,e=this.h1,r=this.h2,n=this.h3,o=this.h4;return HEX_CHARS[t>>28&15]+HEX_CHARS[t>>24&15]+HEX_CHARS[t>>20&15]+HEX_CHARS[t>>16&15]+HEX_CHARS[t>>12&15]+HEX_CHARS[t>>8&15]+HEX_CHARS[t>>4&15]+HEX_CHARS[15&t]+HEX_CHARS[e>>28&15]+HEX_CHARS[e>>24&15]+HEX_CHARS[e>>20&15]+HEX_CHARS[e>>16&15]+HEX_CHARS[e>>12&15]+HEX_CHARS[e>>8&15]+HEX_CHARS[e>>4&15]+HEX_CHARS[15&e]+HEX_CHARS[r>>28&15]+HEX_CHARS[r>>24&15]+HEX_CHARS[r>>20&15]+HEX_CHARS[r>>16&15]+HEX_CHARS[r>>12&15]+HEX_CHARS[r>>8&15]+HEX_CHARS[r>>4&15]+HEX_CHARS[15&r]+HEX_CHARS[n>>28&15]+HEX_CHARS[n>>24&15]+HEX_CHARS[n>>20&15]+HEX_CHARS[n>>16&15]+HEX_CHARS[n>>12&15]+HEX_CHARS[n>>8&15]+HEX_CHARS[n>>4&15]+HEX_CHARS[15&n]+HEX_CHARS[o>>28&15]+HEX_CHARS[o>>24&15]+HEX_CHARS[o>>20&15]+HEX_CHARS[o>>16&15]+HEX_CHARS[o>>12&15]+HEX_CHARS[o>>8&15]+HEX_CHARS[o>>4&15]+HEX_CHARS[15&o]},Sha1.prototype.toString=Sha1.prototype.hex,Sha1.prototype.digest=function(){this.finalize();var t=this.h0,e=this.h1,r=this.h2,n=this.h3,o=this.h4;return[t>>24&255,t>>16&255,t>>8&255,255&t,e>>24&255,e>>16&255,e>>8&255,255&e,r>>24&255,r>>16&255,r>>8&255,255&r,n>>24&255,n>>16&255,n>>8&255,255&n,o>>24&255,o>>16&255,o>>8&255,255&o]},Sha1.prototype.array=Sha1.prototype.digest,Sha1.prototype.arrayBuffer=function(){this.finalize();var t=new ArrayBuffer(20),e=new DataView(t);return e.setUint32(0,this.h0),e.setUint32(4,this.h1),e.setUint32(8,this.h2),e.setUint32(12,this.h3),e.setUint32(16,this.h4),t};var exports=createMethod();COMMON_JS?module.exports=exports:(root.sha1=exports,AMD&&(__WEBPACK_AMD_DEFINE_RESULT__=function(){return exports}.call(exports,__webpack_require__,exports,module),void 0===__WEBPACK_AMD_DEFINE_RESULT__||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)))})()}).call(this,__webpack_require__("4362"),__webpack_require__("c8ba"))},6759:function(t,e,r){"use strict";var n=r("1e41"),o=r.n(n);o.a},7156:function(t,e,r){var n=r("861d"),o=r("d2bb");t.exports=function(t,e,r){var s,i;return o&&"function"==typeof(s=e.constructor)&&s!==r&&n(i=s.prototype)&&i!==r.prototype&&o(t,i),t}},"8aa5":function(t,e,r){"use strict";var n=r("6547").charAt;t.exports=function(t,e,r){return e+(r?n(t,e).length:1)}},9263:function(t,e,r){"use strict";var n=r("ad6d"),o=r("9f7f"),s=RegExp.prototype.exec,i=String.prototype.replace,a=s,c=function(){var t=/a/,e=/b*/g;return s.call(t,"a"),s.call(e,"a"),0!==t.lastIndex||0!==e.lastIndex}(),u=o.UNSUPPORTED_Y||o.BROKEN_CARET,l=void 0!==/()??/.exec("")[1],h=c||l||u;h&&(a=function(t){var e,r,o,a,h=this,f=u&&h.sticky,d=n.call(h),p=h.source,_=0,m=t;return f&&(d=d.replace("y",""),-1===d.indexOf("g")&&(d+="g"),m=String(t).slice(h.lastIndex),h.lastIndex>0&&(!h.multiline||h.multiline&&"\n"!==t[h.lastIndex-1])&&(p="(?: "+p+")",m=" "+m,_++),r=new RegExp("^(?:"+p+")",d)),l&&(r=new RegExp("^"+p+"$(?!\\s)",d)),c&&(e=h.lastIndex),o=s.call(f?r:h,m),f?o?(o.input=o.input.slice(_),o[0]=o[0].slice(_),o.index=h.lastIndex,h.lastIndex+=o[0].length):h.lastIndex=0:c&&o&&(h.lastIndex=h.global?o.index+o[0].length:e),l&&o&&o.length>1&&i.call(o[0],r,(function(){for(a=1;a<arguments.length-2;a++)void 0===arguments[a]&&(o[a]=void 0)})),o}),t.exports=a},"9f7f":function(t,e,r){"use strict";var n=r("d039");function o(t,e){return RegExp(t,e)}e.UNSUPPORTED_Y=n((function(){var t=o("a","y");return t.lastIndex=2,null!=t.exec("abcd")})),e.BROKEN_CARET=n((function(){var t=o("^r","gy");return t.lastIndex=2,null!=t.exec("str")}))},a2c0:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"login"},[r("div",{staticClass:"form-wrap"},[r("ul",{staticClass:"menu-tab"},t._l(t.menuTab,(function(e,n){return r("li",{key:e,class:{current:t.currentIndex==n},on:{click:function(e){return t.check(n)}}},[t._v(t._s(e))])})),0),r("sign",{ref:"newForm",attrs:{currentIndex:t.currentIndex},on:{changeLogin:t.changeLogin}})],1)])},o=[],s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm login-form",attrs:{model:t.ruleForm,"status-icon":"",rules:t.rules,"label-width":"100px",size:"midele"}},[r("el-form-item",{attrs:{label:"邮箱",prop:"username"}},[r("el-input",{attrs:{type:"text",autocomplete:"off"},model:{value:t.ruleForm.username,callback:function(e){t.$set(t.ruleForm,"username",e)},expression:"ruleForm.username"}})],1),r("el-form-item",{attrs:{label:"密码",prop:"password"}},[r("el-input",{attrs:{type:"password",autocomplete:"off",minlength:"6",maxlength:"12"},model:{value:t.ruleForm.password,callback:function(e){t.$set(t.ruleForm,"password",e)},expression:"ruleForm.password"}})],1),0!=t.currentIndex?r("el-form-item",{attrs:{label:"确认密码",prop:"checkPass"}},[r("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:t.ruleForm.checkPass,callback:function(e){t.$set(t.ruleForm,"checkPass",e)},expression:"ruleForm.checkPass"}})],1):t._e(),r("el-form-item",{attrs:{label:"验证码",prop:"code"}},[r("el-row",{attrs:{gutter:0}},[r("el-col",{attrs:{span:14}},[r("el-input",{model:{value:t.ruleForm.code,callback:function(e){t.$set(t.ruleForm,"code",e)},expression:"ruleForm.code"}})],1),r("el-col",{attrs:{span:12}},[r("el-button",{staticClass:"verification",attrs:{type:"success",disabled:t.codeButtonStatus},on:{click:t.getSms}},[t._v(t._s(t.codeButtonText))])],1)],1)],1),r("el-form-item",[r("el-button",{staticClass:"block",attrs:{type:"danger",disabled:t.loginButton},on:{click:function(e){return t.submitForm("ruleForm")}}},[t._v(t._s(0==t.currentIndex?"登录":"注册"))])],1)],1)],1)},i=[],a=(r("a9e3"),r("6199")),c=r.n(a),u=r("b775");function l(t){return u["a"].request({method:"post",url:"/getSms/",data:t})}function h(t){return u["a"].request({method:"post",url:"/login/",data:t})}function f(t){return u["a"].request({method:"post",url:"/register/",data:t})}r("4d63"),r("ac1f"),r("25f0"),r("5319");function d(t){for(var e=new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{ }【】‘；：”“'。，、？]"),r="",n=0;n<t.length;n++)r+=t.substr(n,1).replace(e,"");return r}var p={name:"Sign",props:{currentIndex:{type:Number,default:0}},data:function(){var t=this,e=function(e,r,n){t.ruleForm.code=d(r),r=t.ruleForm.code;var o=/^[a-z0-9]{6}$/;if(!r)return n(new Error("请输入验证码"));o.test(r)?n():n(new Error("验证码格式不正确"))},r=function(t,e,r){var n=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;""===e?r(new Error("请输入用户名")):n.test(e)?r():r(new Error("用户名格式不正确"))},n=function(e,r,n){t.ruleForm.password=d(r),r=t.ruleForm.password;var o=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;""===r?n(new Error("请输入密码")):o.test(r)?n():n(new Error("密码格式不对"))},o=function(e,r,n){""===r?n(new Error("请再次输入密码")):r!==t.ruleForm.password?n(new Error("两次输入密码不一致!")):n()};return{ruleForm:{username:"",password:"",code:""},rules:{username:[{validator:r,trigger:"blur"}],password:[{validator:n,trigger:"blur"}],code:[{validator:e,trigger:"blur"}],checkPass:[{validator:o,trigger:"blur"}]},codeButtonStatus:!1,codeButtonText:"获取验证码",loginButton:!0,timer:null}},watch:{currentIndex:function(){clearInterval(this.timer),this.codeButtonStatus=!1,this.codeButtonText="获取验证码"}},methods:{submitForm:function(t){var e=this;this.$refs[t].validate((function(t){if(!t)return console.log("error submit!!"),!1;0==e.currentIndex?e.login():e.register()}))},login:function(){var t=this,e={username:this.ruleForm.username,password:c()(this.ruleForm.password),code:this.ruleForm.code};h(e).then((function(e){t.$message({message:e.data.message,type:"success"}),t.$store.commit("setUsername",e.data.data.username),t.$store.commit("setToken",e.data.data.token),t.$router.push("/ParkingIndex")})).catch((function(t){console.log(t)}))},register:function(){var t=this,e={username:this.ruleForm.username,password:c()(this.ruleForm.password),code:this.ruleForm.code};f(e).then((function(e){t.$emit("changeLogin"),t.$message({message:e.data.message,type:"success"})})).catch((function(t){console.log(t)}))},getSms:function(){var t=this,e=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;if(""==this.ruleForm.username)return this.$message.error("邮箱不能为空"),!1;if(0==e.test(this.ruleForm.username))return this.$message.error("邮箱格式错误"),!1;var r={username:this.ruleForm.username,module:"login"};0!=this.currentIndex?r.module="register":r.module="login",this.codeButtonStatus=!0,this.codeButtonText="发送中",setTimeout((function(){l(r).then((function(e){t.loginButton=!1,t.$message({message:e.data.message,type:"success"}),t.countDown(60)})).catch((function(t){console.log(t)}))}),1e3)},countDown:function(t){var e=this,r=t;this.timer&&clearInterval(this.timer),this.timer=setInterval((function(){r--,0==r?(clearInterval(e.timer),e.codeButtonStatus=!1,e.codeButtonText="再次获取"):e.codeButtonText="倒计时".concat(r,"秒")}),1e3)}}},_=p,m=(r("14b8"),r("2877")),g=Object(m["a"])(_,s,i,!1,null,"7784efb2",null),E=g.exports,v={data:function(){return{menuTab:["登录","注册"],currentIndex:0}},components:{sign:E},methods:{check:function(t){t!=this.currentIndex&&this.$refs.newForm.$refs["ruleForm"].resetFields(),this.currentIndex=t},changeLogin:function(){this.currentIndex=0,this.$refs.newForm.$refs["ruleForm"].resetFields()}}},S=v,b=(r("6759"),Object(m["a"])(S,n,o,!1,null,"61097552",null));e["default"]=b.exports},a9e3:function(t,e,r){"use strict";var n=r("83ab"),o=r("da84"),s=r("94ca"),i=r("6eeb"),a=r("5135"),c=r("c6b6"),u=r("7156"),l=r("c04e"),h=r("d039"),f=r("7c73"),d=r("241c").f,p=r("06cf").f,_=r("9bf2").f,m=r("58a8").trim,g="Number",E=o[g],v=E.prototype,S=c(f(v))==g,b=function(t){var e,r,n,o,s,i,a,c,u=l(t,!1);if("string"==typeof u&&u.length>2)if(u=m(u),e=u.charCodeAt(0),43===e||45===e){if(r=u.charCodeAt(2),88===r||120===r)return NaN}else if(48===e){switch(u.charCodeAt(1)){case 66:case 98:n=2,o=49;break;case 79:case 111:n=8,o=55;break;default:return+u}for(s=u.slice(2),i=s.length,a=0;a<i;a++)if(c=s.charCodeAt(a),c<48||c>o)return NaN;return parseInt(s,n)}return+u};if(s(g,!E(" 0o1")||!E("0b1")||E("+0x1"))){for(var x,H=function(t){var e=arguments.length<1?0:t,r=this;return r instanceof H&&(S?h((function(){v.valueOf.call(r)})):c(r)!=g)?u(new E(b(e)),r,H):b(e)},A=n?d(E):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),R=0;A.length>R;R++)a(E,x=A[R])&&!a(H,x)&&_(H,x,p(E,x));H.prototype=v,v.constructor=H,i(o,g,H)}},ac1f:function(t,e,r){"use strict";var n=r("23e7"),o=r("9263");n({target:"RegExp",proto:!0,forced:/./.exec!==o},{exec:o})},d784:function(t,e,r){"use strict";r("ac1f");var n=r("6eeb"),o=r("d039"),s=r("b622"),i=r("9263"),a=r("9112"),c=s("species"),u=!o((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")})),l=function(){return"$0"==="a".replace(/./,"$0")}(),h=s("replace"),f=function(){return!!/./[h]&&""===/./[h]("a","$0")}(),d=!o((function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var r="ab".split(t);return 2!==r.length||"a"!==r[0]||"b"!==r[1]}));t.exports=function(t,e,r,h){var p=s(t),_=!o((function(){var e={};return e[p]=function(){return 7},7!=""[t](e)})),m=_&&!o((function(){var e=!1,r=/a/;return"split"===t&&(r={},r.constructor={},r.constructor[c]=function(){return r},r.flags="",r[p]=/./[p]),r.exec=function(){return e=!0,null},r[p](""),!e}));if(!_||!m||"replace"===t&&(!u||!l||f)||"split"===t&&!d){var g=/./[p],E=r(p,""[t],(function(t,e,r,n,o){return e.exec===i?_&&!o?{done:!0,value:g.call(e,r,n)}:{done:!0,value:t.call(r,e,n)}:{done:!1}}),{REPLACE_KEEPS_$0:l,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:f}),v=E[0],S=E[1];n(String.prototype,t,v),n(RegExp.prototype,p,2==e?function(t,e){return S.call(t,this,e)}:function(t){return S.call(t,this)})}h&&a(RegExp.prototype[p],"sham",!0)}}}]);