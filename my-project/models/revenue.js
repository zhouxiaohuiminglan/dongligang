const {qurey} = require('./db')

exports.findRevenueList = () => qurey('select * from revenue')