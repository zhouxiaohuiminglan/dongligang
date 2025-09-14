const {findOrdersList,deleteOrdersByorderNo,findOrdersListByDate} = require('../models/orders')
const {cityList} = require('../config')
exports.getOrdersList = async (ctx)=>{
    const {startTime,endTime,equipmentNo,name,orderNo,page,pageSize,status} = ctx.request.body
    let ordersList
    if(!startTime || !endTime){
        ordersList = await findOrdersList()
        if(equipmentNo){
            ordersList = ordersList.filter(item=>item.equipmentNo === equipmentNo);
        }
        if(name){
            ordersList = ordersList.filter(item=>item.name === name);
        }
        if(orderNo){
            ordersList = ordersList.filter(item=>item.orderNo === orderNo);
        }
        if(status!=1){
            ordersList = ordersList.filter(item=>item.status === status);
        }
    }else{
        ordersList = await findOrdersListByDate(startTime,endTime)
    }
    //实现分页
    const total = ordersList.length;
    const start = (page-1)*pageSize;
    const list = ordersList.slice(start,start + pageSize);
    ctx.success('成功',{list,total})
}
exports.deleteOrders = async (ctx)=>{
    const {order} = ctx.request.body
    const {affectedRows} = await deleteOrdersByorderNo(order)
    if(affectedRows === order.length){
        ctx.success('成功',{message:'删除成功'})
    }
}
exports.getCityList = (ctx)=>{
    ctx.success('成功',cityList)
}