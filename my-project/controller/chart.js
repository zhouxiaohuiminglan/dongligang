exports.getData = async (ctx)=>{
    const list = [
        {name:"充电量",data:[20, 50, 30, 70, 60, 80, 40,60,50]},
        {name:"充电时长",data:[40, 60, 50, 80, 70, 90, 60,70,80]},
        {name:"充电功率",data:[30, 40, 60, 50, 70, 20, 30,40,60]}
      ]
    ctx.success('操作成功',{list})
}
exports.getData1 = async (ctx)=>{
    const list = [
        { value: 35, name: '充电桩' },
        { value: 30, name: '充电站' },
        { value: 25, name: '充电杆' },
      ]
    ctx.success('操作成功',{list})
}
exports.getData2 = async (ctx)=>{
    const list = [42, 30, 200, 350, 500, 180]
    ctx.success('操作成功',{list})
}