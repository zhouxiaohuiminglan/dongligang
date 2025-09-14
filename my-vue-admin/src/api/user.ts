import {get,post } from "@/utils/http";
/*
enum HttpApi{
    Login="/login",
}

This syntax is not allowed when 'erasableSyntaxOnly' is enabled.ts(1294)
上面枚举方法会报错，原因是ts启用了可擦除语法（erasableSyntaxOnly）所以要用下面这种方式替代
*/

const HttpApi = {
    Login: "/user/login",
    LoginOut:"/user/loginOut"
} as const

interface LoginParams{
    username:string,
    password:string,
}

function loginApi(data:LoginParams):Promise<any>{
    return post(HttpApi.Login,data);
}
function loginOut():Promise<any>{
    return get(HttpApi.LoginOut);
}

export {loginApi,loginOut}