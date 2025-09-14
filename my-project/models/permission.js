const {qurey} = require('./db')
exports.findPermissionList = () => qurey('select * from permission')
exports.delUser = (account) => qurey('delete from permission where account=?',[account])