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