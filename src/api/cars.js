import service from "@/utils/request"
// 新增车辆
export function CarsAdd(data){
    return service.request({
        method: "post",
        url: "/cars/add/",
        data
    })
}
// 车辆修改
export function CarsEdit(data){
    return service.request({
        method: "post",
        url: "/cars/edit/",
        data
    })
}

// 禁启用
export function CarsStatus(data={}){
    return service.request({
        method: "post",
        url: "/cars/status/",
        data
    })
}
// 删除
export function CarsDelate(data={}){
    return service.request({
        method: "post",
        url: "/cars/delete/",
        data
    })
}
// 车辆详情
export function CarsDetailed(data={}){
    return service.request({
        method: "post",
        url: "/cars/detailed/",
        data
    })
}