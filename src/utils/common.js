// 省市区街道
export function address(value) {
    let address = value;
    let addressInfo = "";
    if (address) {
        addressInfo = address.split(",").join("</br>");
        return addressInfo;
    }
}
// 停车场
export function parkingType(value) {
    return value == 1 ? "室内" : "室外";
}