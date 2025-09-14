const {findAlarmList} = require('../models/alarm')
exports.getAlarmList = async (ctx)=>{
    let list = await findAlarmList()
    list = list.map((item)=>{
        return {
            address:item.address,
            equNo:item.equNo,
            level:item.level,
            time:item.update_time,
            code:item.code,
            description:item.description,
            status:item.status
        }
    })
    ctx.success('成功',list)
}
exports.setAlarmInfo = (ctx)=>{
    ctx.success('成功',{message:"操作成功"})
}