import service from "@/utils/request"
import requestUrl from "./requestUrl"
export function GetCity(data={}){
    return service.request({
        method:"post",
        url:"/cityPicker/",
        data
    })
}

export function GetTableData(params={}){
 
    return service.request({
        method:"post",
        url:requestUrl[params.url],
        data:params.data
       
    })
}
// 获取车辆品牌
export function getCarsBrand(data){
    return service.request({
        method:"post",
        url:"/common/getCarsBrand/",
        data
    })
}
// 获取停车场
export function getParking(data){
    return service.request({
        method:"post",
        url:"/common/getParking/",
        data
    })
}
// 删除列表
export function Delete(params={}){ 

    return service.request({
        method:"post",
        url:requestUrl[params.url],
        data:params.data
       
    })
}

// 获取七牛云token
export function GetQiniuToken(data={}){
 
    return service.request({
        method:"post",
        url:"/uploadImgToken/",
        data
       
    })
}