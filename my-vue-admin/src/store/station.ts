import type { StationType } from "@/types/station";
import { defineStore } from "pinia";
import { ref } from "vue";


export const useStationStore = defineStore('station',()=>{
    const stationData = ref<StationType>({
        name:"",
        id:"",
        city:"",
        fast:"",
        slow:"",
        now:"",
        status:1,
        fault:"",
        person:"",
        tel:""
    });
    const setStationData = (stationVal:StationType)=>{
        stationData.value = stationVal;
    }
    const rmvStationData = ()=>{
        stationData.value =
        {
            name:"",
            id:"",
            city:"",
            fast:"",
            slow:"",
            now:"",
            status:1,
            fault:"",
            person:"",
            tel:""
        }
    }
    return {stationData,setStationData,rmvStationData}
})