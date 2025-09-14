const {qurey} = require('./db')

exports.findOrdersList = () => qurey('select * from orders')
exports.findOrdersListByDate = (startTime,endTime)=>qurey('select * from orders where date between (?) and (?);',[startTime,endTime])
exports.deleteOrdersByorderNo = (orderNo) => qurey(`delete from orders where orderNo in (${orderNo.toString()});`)