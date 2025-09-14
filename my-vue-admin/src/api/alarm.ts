import {get,post} from "@/utils/http"

const Api = {
   alarmList:"/alarm/list",
   setAlarmInfo:"/alarm/setAlarmInfo"
}as const

function getAlarmList(){
    return get(Api.alarmList);
}
function submitAlarmData(data:any){
    return post(Api.setAlarmInfo,data);
}

export {getAlarmList,submitAlarmData}