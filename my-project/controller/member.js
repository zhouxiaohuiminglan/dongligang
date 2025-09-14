const {findMemberList,findRecordByCardNo} = require('../models/member')
exports.getMemberList = async (ctx)=>{
    const {no:memberCardNumber,name:holderName,page,pageSize,tel:holderPhone} = ctx.request.body
    let chargingStation = await findMemberList()
    if(memberCardNumber){
        chargingStation = chargingStation.filter(item=>item.memberCardNumber === memberCardNumber);
    }
    if(holderName){
        chargingStation = chargingStation.filter(item=>item.holderName === holderName);
    }
    if(holderPhone){
        chargingStation = chargingStation.filter(item=>item.holderPhone === holderPhone);
    }
    //实现分页
    const total = chargingStation.length;
    const start = (page-1)*pageSize;
    const list = chargingStation.slice(start,start + pageSize);
    ctx.success('成功',{list,total})
}
exports.getRecordbyCardNo = async (ctx)=>{
    const {cardNo} = ctx.request.body
    const list = await findRecordByCardNo(cardNo)
    ctx.success('成功',{list})
}