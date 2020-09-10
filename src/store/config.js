const state = {
    parking_type: [{
            label: "室内",
            value: 1
        },
        {
            label: "室外",
            value: 2
        }
    ],
    // 停车场状态
    parking_status: [{
            label: "禁用",
            value: 2
        },
        {
            label: "启用",
            value: 1
        }
    ],
      // 禁用、启用
      radio_disabled: [
        { label: "禁用", value: false },
        { label: "启用", value: true }
    ],
}
export default {
    namespaced: true,
    state
}