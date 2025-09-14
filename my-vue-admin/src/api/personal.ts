import {post} from "@/utils/http"

const Api = {
    updatePersonal:"/updatePersonal"
}as const 

function upPersonal(data:any){
    return post(Api.updatePersonal,data);
}
export {upPersonal}