const {whiteList} = require('../config')
const {vertifyToekn,decode} = require('../utils')
exports.checkLogin = async (ctx,next)=>{
    //不在白名单内
    if(!whiteList.includes(ctx.url)){
        const {token} = ctx.headers
        const tokenIndex = ctx.blackTokenList.indexOf(token)
        if(!vertifyToekn(token)){
            ctx.blackTokenList.splice(tokenIndex,1)
            return ctx.tokenExpries('token已经失效')
        }else{
            if(tokenIndex !== -1){
                return ctx.tokenExpries('token已经失效')
            }
            ctx.state.user = decode(token)
            // 挂载成功后要放通行，否则404
            await next();
        }
    }else{
        await next()
    }
}