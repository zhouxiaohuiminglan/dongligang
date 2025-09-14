import {get,post} from "@/utils/http"

const Api = {
    mapList:"/map/list",
    addMap:'/map/add'
} as const

function getMapList(){
    return get(Api.mapList);
}
function addMap(data:any){
    return post(Api.addMap,data);
}

export {getMapList,addMap}
