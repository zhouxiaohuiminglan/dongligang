const {qurey} = require('./db')

exports.findUserByUsername = username => qurey('select * from users where username = ?',[username])