import {post} from '@/utils/http'
const ApiType = {
    orderList:"/orders/list",
    equipList:"/member/list",
    getRecordList:"/member/recordList",
    permissionList:"/permission/list"
} as const

function getRecordList(cardNo:string){
    return post(ApiType.getRecordList,{cardNo});
}

export {ApiType,getRecordList}