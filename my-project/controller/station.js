const {findStationList,addStation,updateStation,deleteStation,findChargingpileList,findRecordList} = require('../models/station')
exports.getStationList = async (ctx)=>{
    const {id,name,page,pageSize,status} = ctx.request.body
    let chargingStation = await findStationList()
    if(id){
        chargingStation = chargingStation.filter(item=>item.id === id);
    }
    if(name){
        chargingStation = chargingStation.filter(item=>item.name === name);
    }
    if(status!=1){
        chargingStation = chargingStation.filter(item=>item.status === status);
    }
    //实现分页
    const total = chargingStation.length;
    const start = (page-1)*pageSize;
    const list = chargingStation.slice(start,start + pageSize);
    ctx.success('成功',{list,total})
}
exports.addStation = async (ctx)=>{
    const data = ctx.request.body
    const {affectedRows} = await addStation(data)
    if(affectedRows === 1){
        ctx.success('成功',{message:'新增成功'})
    }
}

exports.editStation = async (ctx)=>{
    const {id,name,city,fast,slow,person,tel} = ctx.request.body
    const {affectedRows} = await updateStation(id,name,city,fast,slow,person,tel)
    if(affectedRows === 1){
        ctx.success('成功',{message:'编辑成功'})
    }
}
exports.deleteStation = async (ctx)=>{
    const {id} = ctx.request.body
    const {affectedRows} = await deleteStation(id)
    if(affectedRows === 1){
        ctx.success('成功',{message:'删除成功'})
    }
}
exports.getcgpList = async (ctx)=>{
    const {station_id} = ctx.request.body
    const list = await findChargingpileList(station_id)
    ctx.success('成功',{list})
}

exports.getRecordList = async (ctx)=>{
    const {chargingPice_id} = ctx.request.body
    const list = await findRecordList(chargingPice_id)
    ctx.success('成功',{list})
}