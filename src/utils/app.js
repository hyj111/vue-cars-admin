// import cookie from "js-cookie";

// const adminToken = "admin_toKen"
// export function getToken(){
//     return cookie.get('adminToken')
// }
// export function getUsername(){
//     return cookie.get('username')
// }
// export function setToKen(toKen){
//     cookie.set('adminToken',toKen)
// }

// export function setUsername(value){
//     cookie.set('username',value)
// }
// export function removeToken(){
    
//     return cookie.remove("adminToken")
// }
// export function removeName(){
    
//     return cookie.remove("username")
// }

import Cookies from "js-cookie";
// 变量
const tokenKey = "tokenAdmin";
const userNameKey = "username";
// 获取token
export function getToken(){ return Cookies.get(tokenKey); }
// 写入token
export function setToken(value){ return Cookies.set(tokenKey, value); }
// 删除token
export function removeToken(){ return Cookies.remove(tokenKey); }
// 写入userName
export function setUsername(value){ return Cookies.set(userNameKey, value); }
// 获取userName
export function getUsername(){ return Cookies.get(userNameKey); }
// 删除userName
export function removeUsername(){ return Cookies.remove(userNameKey); }
