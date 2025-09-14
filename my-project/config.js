exports.db = {
  connectionLimit:10,  
  host     : 'localhost',
  port:3306,
  user     : 'root',
  password : 'approle123456',
  database : 'dongligang',
}
exports.port = 3001
exports.menulist = [
    {
      name: "数据看板",
      url: "/dashboard",
      icon: "DataLine"
    },
    {
      name: "充电站管理",
      url: "/chargingstation",
      icon: "Lightning",
      children: [
        {
          name: "充电站监控",
          url: "/chargingstation/monitor",
          icon: "VideoCamera"
        },
        {
          name: "营收统计",
          url: "/chargingstation/revenue",
          icon: "DataAnalysis"
        },
        {
          name: "充电桩管理",
          url: "/chargingstation/fault",
          icon: "Warning"
        }
      ]
    },
    {
      name: "电子地图",
      url: "/map",
      icon: "MapLocation"
    },
    {
      name: "运营管理",
      url: "/operations",
      icon: "Files",
      children: [
        {
          name: "订单管理",
          url: "/operations/orders",
          icon: "DocumentCopy",
        },
        {
          name: "订单详情",
          url: "/operations/detail",
          icon: "Share"
        },
        {
          name: "计费管理",
          url: "/operations/total",
          icon: "Money"
        },
      ]
    },
    {
      name: "报警管理",
      url: "/alarm",
      icon: "Phone"
    },
    {
      name: "会员卡管理",
      url: "/equipment",
      icon: "Magnet"
    },
    {
      name: "招商管理",
      url: "/document",
      icon: "Document"
    },
    {
      name: "系统设置",
      url: "/system",
      icon: "Setting"
    },
  
    {
      name: "个人中心",
      url: "/personal",
      icon: "User"
    },
]
exports.menulist2 = [
    {
      name: "数据看板",
      url: "/dashboard",
      icon: "DataLine"
    },
    {
      name: "充电站管理",
      url: "/chargingstation",
      icon: "Lightning",
      children: [
        {
          name: "充电站监控",
          url: "/chargingstation/monitor",
          icon: "VideoCamera"
        },
        {
          name: "营收统计",
          url: "/chargingstation/revenue",
          icon: "DataAnalysis"
        },
        {
          name: "充电桩管理",
          url: "/chargingstation/fault",
          icon: "Warning"
        }
      ]
    },
    {
      name: "电子地图",
      url: "/map",
      icon: "MapLocation"
    },
    {
      name: "运营管理",
      url: "/operations",
      icon: "Files",
      children: [
        {
          name: "订单管理",
          url: "/operations/orders",
          icon: "DocumentCopy",
        },
        {
          name: "订单详情",
          url: "/operations/detail",
          icon: "Share"
        },
        {
          name: "计费管理",
          url: "/operations/total",
          icon: "Money"
        },
      ]
    },
    {
      name: "报警管理",
      url: "/alarm",
      icon: "Phone"
    },
    {
      name: "会员卡管理",
      url: "/equipment",
      icon: "Magnet"
    },  
    {
      name: "个人中心",
      url: "/personal",
      icon: "User"
    },
]
exports.menulist3 = [
  {
    name: "数据看板",
    url: "/dashboard",
    icon: "DataLine"
  },
  {
    name: "充电站管理",
    url: "/chargingstation",
    icon: "Lightning",
    children: [
      {
        name: "充电站监控",
        url: "/chargingstation/monitor",
        icon: "VideoCamera"
      },

      {
        name: "充电桩管理",
        url: "/chargingstation/fault",
        icon: "Warning"
      }
    ]
  },
  {
    name: "电子地图",
    url: "/map",
    icon: "MapLocation"
  },

  {
    name: "报警管理",
    url: "/alarm",
    icon: "Phone"
  },

  {
    name: "会员卡管理",
    url: "/equipment",
    icon: "Magnet"
  },
  {
    name: "个人中心",
    url: "/personal",
    icon: "User"
  },
]
exports.secretKey = "minglan"
exports.tokenExpires = 6000

//白名单路由
exports.whiteList = ['/user/login','/user/loginOut']

exports.cityList =  [
  {
    label: "北京总部",
    children: [
      {
        label: "东城区",
        children: [
          { label: "东城区充电站01" },
          { label: "东城区充电站02" },
          { label: "东城区充电站03" },
          { label: "东城区充电站04" },
        ]
      },
      {
        label: "西城区",
        children: [
          { label: "西城区充电站01" },
          { label: "西城区充电站02" },
          { label: "西城区充电站03" },
        ]
      },
      {
        label: "朝阳区",
        children: [
          { label: "朝阳区充电站01" },
          { label: "朝阳区充电站02" },
          { label: "朝阳区充电站03" },
        ]
      },
      {
        label: "海淀区",
        children: [
          { label: "海淀区充电站01" },
          { label: "海淀区充电站02" },
        ]
      },
      {
        label: "丰台区",
        children: [
          { label: "丰台区充电站01" },
          { label: "丰台区充电站02" },
        ]
      }

    ]
  },
  {
    label: "深圳总部",
    children: [
      {
        label: "南山区",
        children: [
          {
            label: "南山区充电站01"
          }
        ]
      }, {
        label: "福田区",
        children: [
          {
            label: "福田区充电站01"
          }
        ]
      }
    ]
  }, {
    label: "青岛市",
    children: [
      {
        label: "市南区",
        children: [
          {
            label: "市南区充电站01"
          },
          {
            label: "市南区充电站02"
          }
        ]
      },
      {
        label: "市北区",
        children: [
          {
            label: "市北区充电站01"
          },
          {
            label: "市北区充电站02"
          }
        ]
      },
      {
        label: "崂山区",
        children: [
          {
            label: "崂山区充电站01"
          },
          {
            label: "崂山区充电站02"
          }
        ]
      }
    ]
  },
  {
    label: "武汉市",
    children: [
      {
        label: "武汉充电站01"
      },
      {
        label: "武汉充电站02"
      }, {
        label: "武汉充电站03"
      }
    ]
  }, {
    label: "成都市",
    children: [
      {
        label: "成都充电站01"
      },
      {
        label: "成都充电站02"
      }, {
        label: "成都充电站03"
      }
    ]
  },
  {
    label: "上海市",
    children: [
      {
        label: "上海充电站01"
      },
      {
        label: "上海充电站02"
      }, {
        label: "上海充电站03"
      }
    ]
  },
  {
    label: "长沙市",
    children: [
      {
        label: "长沙充电站01"
      },
      {
        label: "长沙充电站02"
      }, {
        label: "长沙充电站03"
      }
    ]
  }
]
