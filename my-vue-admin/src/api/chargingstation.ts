import type { StationType } from "@/types/station";
import {get,post} from "@/utils/http"

interface curStationType{
    page:number,
    pageSize:number,
    status:number,
    id?:number,
    name?:string
}

interface curRevenueType{
    page:number,
    pageSize:number,
    name:string
}

const Api = {
    list: "/station/list",
    add:'/station/add',
    edit:"/station/edit",
    remove:"/station/delete",
    revenue:"/revenue/sale",
    revenueList:"/revenue/list",
    chargingpileList:"/station/chargingpile",
    recordList:"/station/record"
} as const

function getStationList(data:curStationType){
    return post(Api.list,data);
}

function addStation(data:StationType){
    return post(Api.add,data);
}

function editStation(data:StationType){
    return post(Api.edit,data);
}

function removeStation(id:string){
    return post(Api.remove,{id});
}
function getRevenue(){
    return get(Api.revenue);
}

function getRevenueList(data:curRevenueType){
    return post(Api.revenueList,data);
}

function getChargingpileList(station_id:string){
    return post(Api.chargingpileList,{station_id});
}
function getRecordList(chargingPice_id:string){
    return post(Api.recordList,{chargingPice_id});
}

export {getStationList,editStation,removeStation,getRevenue,getRevenueList,getChargingpileList,getRecordList,addStation}