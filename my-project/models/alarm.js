const {qurey} = require('./db')
exports.findAlarmList = () => qurey('select * from alarm')