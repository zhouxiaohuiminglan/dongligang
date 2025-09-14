const {qurey} = require('./db')
exports.findMemberList = () => qurey('select * from member')
exports.findRecordByCardNo = (cardNo) => qurey('select * from transactionrecord where memberCardNumber=?',[cardNo])