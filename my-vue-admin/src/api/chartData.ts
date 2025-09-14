import {get} from "@/utils/http"

const ChartApi = {
    chartData: "/chart/data",
    chartData1:"/chart/data1",
    chartData2:"/chart/data2",
} as const

function getChartData(){
    return get(ChartApi.chartData);
}

function getChartData1(){
    return get(ChartApi.chartData1);
}

function getChartData2(){
    return get(ChartApi.chartData2);
}

export {getChartData,getChartData1,getChartData2}