import service from "@/utils/request"
// 新增停车场
export function ParkingAdd(data){
    return service.request({
        method: "post",
        url: "/parking/add/",
        data
    })
}

// 停车场列表
export function ParkingList(data={}){
    return service.request({
        method: "post",
        url: "/parking/list/",
        data
    })
}

// 停车场详情
export function ParkingDetailed(data={}){
    return service.request({
        method: "post",
        url: "/parking/detailed/",
        data
    })
}

// 停车场编辑
export function ParkingEdit(data={}){
    return service.request({
        method: "post",
        url: "/parking/edit/",
        data
    })
}

// 停车场删除
export function ParkingDelate(data={}){
    return service.request({
        method: "post",
        url: "/parking/delete/",
        data
    })
}

// 禁启用
export function ParkingStatus(data={}){
    return service.request({
        method: "post",
        url: "/parking/status/",
        data
    })
}