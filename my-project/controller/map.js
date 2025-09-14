const {findMapList,addMap} = require('../models/map')
exports.getMapList = async (ctx)=>{
    const list = await findMapList()
    ctx.success('成功',{list})
}

exports.addMap = async (ctx)=>{
    const {name,count,location1,location2,status} = ctx.request.body
    const {affectedRows} = await addMap(name,location1,location2,status,count)
    if(affectedRows === 1){
        ctx.success('成功',{message:'新增'})
    }
}