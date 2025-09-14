const {qurey} = require('./db')

exports.findMapList = () => qurey('select * from map')
exports.addMap = (title,location1,location2,status,count)=>qurey('insert into map (title,position,status,count) values (?,Point(?,?),?,?)',[title,location1,location2,status,count])