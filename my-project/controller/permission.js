const {findPermissionList,delUser} = require('../models/permission')
const {menulist,menulist2,menulist3} = require('../config')
exports.getPermissionList = async (ctx)=>{
    const {department,name,page,pageSize} = ctx.request.body
    let chargingStation = await findPermissionList()
    if(department){
        chargingStation = chargingStation.filter(item=>item.department === department);
    }
    if(name){
        chargingStation = chargingStation.filter(item=>item.name === name);
    }
    //实现分页
    const total = chargingStation.length;
    const start = (page-1)*pageSize;
    const list = chargingStation.slice(start,start + pageSize);
    ctx.success('成功',{list,total})
}
exports.deleteUserAuth = async (ctx)=>{
    const {account} = ctx.request.body
    const {affectedRows} = await delUser(account)
        if(affectedRows === 1){
            ctx.success('成功',{message:'删除成功'})
        }
}
exports.getUserAuth = (ctx)=>{
    const {pageAuthority} = ctx.request.body
    const list = pageAuthority=="user"? menulist3:(pageAuthority=="manager"?menulist2:menulist)
    const btn = pageAuthority=="user"?['add']:(pageAuthority=="manager"?['add',"edit"]:['add',"edit","all","delete"])
    ctx.success('成功',{list,btn})
}
exports.setUserAuth = (ctx)=>{
    const {account,btnList,pageList} = ctx.request.body
    ctx.success('成功',{message:'设置成功'})
}