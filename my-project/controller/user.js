const {findUserByUsername} = require('../models/user')
const {menulist:mlAdmin,menulist2:mlUser} = require('../config')
const {createToken} = require('../utils')
exports.doLogin = async (ctx)=>{
    let {username,password} = ctx.request.body
    if(!username || !password){
        return ctx.failed('请填写账号或密码')
    }
    const res = await findUserByUsername(username)
    if(res.length !== 1){
        return ctx.failed('用户名或密码不正确')
    }
    const {password:pwd,nick_name,roles,role_id}  = res[0]
    if(pwd !== password){
        return ctx.failed('用户名或密码不正确')
    }
    const resUser = {
        username:nick_name,
        roles
    }
    const token = createToken(resUser)
    const menulist = role_id === 1 ? mlAdmin : mlUser
    ctx.success('登录成功',{user:resUser,token,menulist})
}
exports.doLoginOut = async (ctx)=>{
    const {token} = ctx.headers
    ctx.blackTokenList.push(token)
    ctx.success('退出成功')
}