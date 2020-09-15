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
            value: 0
        },
        {
            label: "启用",
            value: 1
        }
    ],
      // 禁用、启用
      radio_disabled: [
        { label: "启用", value: true },
        { label: "禁用", value: false},
        
      
    ],
    // 年检
    year_check: [
        { label: "未年检", value: false },
        { label: "已年检", value: true }
    ],
    // 档位
    gear: [
        { label: "手动", value: 1 },
        { label: "自动", value: 2 },
        { label: "人工智能", value: 3 }
    ],
    // 能源类型
    energyType: [
        { label: "电", value: 1 },
        { label: "油", value: 2 },
        { label: "混合动力", value: 3 }
    ],
    // 关键字搜索
    keyword_options: [
        {label:"停车场名称",value:"parkingName"},
        {label:"详细区域",value:"address"},
        {label:"字段",value:"key"},
        {label:"文本",value:"value"},

    ]
}
export default {
    namespaced: true,
    state
}