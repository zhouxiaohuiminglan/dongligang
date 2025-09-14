import {get,post} from "@/utils/http"

const Api = {
    batchDelete:"/orders/delete",
    cityList:"orders/cityList",
} as const

function deleteOrderList(list:string[]){
    return post(Api.batchDelete,{order:list});
}
function getCityList(){
    return get(Api.cityList);
}
export {deleteOrderList,getCityList}