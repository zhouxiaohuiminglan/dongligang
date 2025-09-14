const jwt = require('jsonwebtoken')
const {secretKey,tokenExpires} = require('../config')
exports.createToken = (user)=> jwt.sign(user,secretKey,{expiresIn:tokenExpires})
exports.vertifyToekn = (token)=>{
    let result
    try {
        result = jwt.verify(token,secretKey)
    } catch (error) {
        
    }finally{
        return result
    }
}
exports.decode = (decodeToken)=>jwt.decode(decodeToken,secretKey)