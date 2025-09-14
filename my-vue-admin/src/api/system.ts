import {post} from "@/utils/http"

const Api = {
    userAuth:"/permission/userAuth",
    setAuth:"/permission/setAuth",
    deleteAuth:"/permission/deleteAuth"
} as const

function getUserAuth(pageAuthority:string){
    return post(Api.userAuth,{pageAuthority});
}

function setUserAuth(account:string,btnList:string[],pageList:string[]){
    return post(Api.setAuth,{account,btnList,pageList});
}

function deleteUserAuth(account:string){
    return post(Api.deleteAuth,{account});
}
export {getUserAuth,setUserAuth,deleteUserAuth}