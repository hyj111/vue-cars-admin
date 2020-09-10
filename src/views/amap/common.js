export function getLngLat(e){
    return {
        lng: e.lnglat.getLng(),
        lat: e.lnglat.getLat(),
        value:e.lnglat.getLng() + ',' + e.lnglat.getLat()
    }  
}

//覆盖物的方法
let marker = null
export function amapsetMarker(lnglat,map){
    if(marker){
        map.remove(marker)
        marker = null
    }
     marker = new AMap.Marker({
        position:[lnglat.lng,lnglat.lat]
    })
    map.add(marker)
    
    map.setFitView();
}

// 清除覆盖物
export function amapClearMarker(map){

    if(marker){

        map.remove(marker)
        marker = null
    }
}
