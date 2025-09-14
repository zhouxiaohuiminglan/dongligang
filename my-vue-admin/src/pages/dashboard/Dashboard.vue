<template>
    <el-row :gutter="20">
        <el-col :span="18">
            <el-card >
                <div class="title">
                    <h3>今日设备运行状态</h3>
                    <p class="ml">更新时间：2024年8月31日</p>
                    <el-icon style="margin-left: 5px;">
                        <Refresh color="#86909c"/>
                    </el-icon>
                </div>
                <div class="equipment mt">
                    <div class="item">
                        <h4>充电桩使用率</h4>
                        <img class="mt mb" :src="flash"/>
                        <h1 class="mb">2263 / 3398</h1>
                        <div class="statistic-card">
                            <el-statistic :value="9">
                            <template #title>
                                <div style="display: inline-flex; align-items: center">
                                异常设备
                                <el-tooltip
                                    effect="dark"
                                    content="Number of users who logged into the product in one day"
                                    placement="top"
                                >
                                    <el-icon style="margin-left: 4px" :size="12">
                                    <Warning />
                                    </el-icon>
                                </el-tooltip>
                                </div>
                            </template>
                            </el-statistic>
                            <div class="statistic-footer">
                            <div class="footer-item">
                                <span>相较昨日</span>
                                <span>
                                24%
                                <el-icon color="green">
                                    <CaretTop />
                                </el-icon>
                                </span>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <h4>充电柜使用率</h4>
                        <img class="mt mb" :src="flash2"/>
                        <h1 class="mb">655 / 1233</h1>
                        <div class="statistic-card">
                            <el-statistic :value="22">
                            <template #title>
                                <div style="display: inline-flex; align-items: center">
                                异常设备
                                <el-tooltip
                                    effect="dark"
                                    content="Number of users who logged into the product in one day"
                                    placement="top"
                                >
                                    <el-icon style="margin-left: 4px" :size="12">
                                    <Warning />
                                    </el-icon>
                                </el-tooltip>
                                </div>
                            </template>
                            </el-statistic>
                            <div class="statistic-footer">
                            <div class="footer-item">
                                <span>相较昨日</span>
                                <span>
                                12%
                                <el-icon color="red">
                                    <CaretTop />
                                </el-icon>
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    </div>
                    <div class="item">
                        <h4>充电站使用率</h4>
                        <img class="mt mb" :src="flash3"/>
                        <h1 class="mb">72 / 95</h1>
                        <div class="statistic-card">
                            <el-statistic :value="47">
                            <template #title>
                                <div style="display: inline-flex; align-items: center">
                                异常设备
                                <el-tooltip
                                    effect="dark"
                                    content="Number of users who logged into the product in one day"
                                    placement="top"
                                >
                                    <el-icon style="margin-left: 4px" :size="12">
                                    <Warning />
                                    </el-icon>
                                </el-tooltip>
                                </div>
                            </template>
                            </el-statistic>
                            <div class="statistic-footer">
                            <div class="footer-item">
                                <span>相较昨日</span>
                                <span>
                                22%
                                <el-icon color="green">
                                    <CaretTop />
                                </el-icon>
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    </div>
                </div>
            </el-card>
            <el-card class="mt">
                <template #header>
                    <div class="card-header">
                        <h1>常用功能</h1>
                    </div>
                </template>
                <div class="quick mt mb">
                    <el-row>
                        <el-col :span="4" @click="handle('充电站监控')">
                            <img :src="repair">
                            <p>充电站监控</p>
                        </el-col>
                        <el-col :span="4" @click="handle('营收统计')">
                            <img :src="progress">
                            <p>营收统计</p>
                        </el-col>
                        <el-col :span="4" @click="handle('电子地图')">
                            <img :src="remain">
                            <p>电子地图</p>
                        </el-col>
                        <el-col :span="4" @click="handle('报警管理')">
                            <img :src="total">
                            <p>报警管理</p>
                        </el-col>
                        <el-col :span="4" @click="handle('个人中心')">
                            <img :src="money">
                            <p>个人中心</p>
                        </el-col>
                        <el-col :span="4" @click="handle('订单管理')">
                            <img :src="daily">
                            <p>订单管理</p>
                        </el-col>
                    </el-row>
                </div>
                
            </el-card>
            <el-card class="mt">
                <template #header>
                    <div class="card-header">
                        <h1>能源统计</h1>
                    </div>
                </template>
                <el-row>
                    <el-col :span="6">
                        <div ref="chartRef1" style="width: 100%;height: 400px;">

                        </div>
                    </el-col>
                    <el-col :span="18">
                        <div ref="chartRef2" style="width: 100%;height: 400px;">

                        </div>
                    </el-col>
                </el-row>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card>
                <template #header>
                    <div class="card-header">
                        <h1>设备总览</h1>
                    </div>
                </template>
                <div ref="chartRef3" style="width: 100%;height: 240px;">

                </div>
            </el-card>
            <el-card class="mt">
                <template #header>
                    <div class="card-header">
                        <h1>营收统计表</h1>
                    </div>
                </template>
                <ul class="ranking-list">
                    <li class="ranking-item">
                        <span class="rank" style="background-color: rgb(103, 154, 93);color:#fff">1</span>
                        <span class="store-name">广州</span>
                        <span class="sales">52,234</span>
                        <span style="margin-left: 50px;">
                            24%
                            <el-icon color="green">
                                <CaretTop/>
                            </el-icon>
                        </span>
                    </li>
                    <li class="ranking-item">
                        <span class="rank" style="background-color: rgb(64, 158, 255);color:#fff">2</span>
                        <span class="store-name">上海</span>
                        <span class="sales">323,234</span>
                        <span style="margin-left: 50px;">
                            24%
                            <el-icon color="red">
                                <CaretBottom/>
                            </el-icon>
                        </span>
                    </li>
                    <li class="ranking-item">
                        <span class="rank" style="background-color: rgb(230, 162, 60);color:#fff">3</span>
                        <span class="store-name">佛山</span>
                        <span class="sales">192,255</span>
                        <span style="margin-left: 50px;">
                            24%
                            <el-icon color="red">
                                <CaretBottom/>
                            </el-icon>
                        </span>
                    </li>
                    <li class="ranking-item">
                        <span class="rank" >4</span>
                        <span class="store-name">珠海</span>
                        <span class="sales">17,234</span>
                        <span style="margin-left: 50px;">
                            24%
                            <el-icon color="green">
                                <CaretTop/>
                            </el-icon>
                        </span>
                    </li>
                    <li class="ranking-item">
                        <span class="rank">5</span>
                        <span class="store-name">深圳</span>
                        <span class="sales">662,337</span>
                        <span style="margin-left: 50px;">
                            24%
                            <el-icon color="red">
                                <CaretBottom />
                            </el-icon>
                        </span>
                    </li>
                    <li class="ranking-item">
                        <span class="rank">6</span>
                        <span class="store-name">厦门</span>
                        <span class="sales">22,941</span>
                        <span style="margin-left: 50px;">
                            24%
                            <el-icon color="green">
                                <CaretTop />
                            </el-icon>
                        </span>
                    </li>
                    <li class="ranking-item">
                        <span class="rank">7</span>
                        <span class="store-name">长沙</span>
                        <span class="sales">565,221</span>
                        <span style="margin-left: 50px;">
                            24%
                            <el-icon color="green">
                                <CaretTop />
                            </el-icon>
                        </span>
                    </li>
                </ul>
            </el-card>
            <el-card class="mt">
                <template #header>
                    <div class="card-header">
                        <h1>故障报警</h1>
                    </div>
                </template>
                <el-timeline>
                    <el-timeline-item timestamp="2025/4/12" placement="top" :hollow="true" type="danger">
                    <el-card>
                        <h4>矿业北路通讯中断</h4>
                    </el-card>
                    </el-timeline-item>
                    <el-timeline-item timestamp="2025/4/3" placement="top" :hollow="true" type="warning">
                    <el-card>
                        <h4>黄河南路超出服务区域</h4>
                    </el-card>
                    </el-timeline-item>
                    <el-timeline-item timestamp="2025/4/2" placement="top" :hollow="true" type="danger">
                    <el-card>
                        <h4>6号机组异常断电</h4>
                    </el-card>
                    </el-timeline-item>
                </el-timeline>
            </el-card>
        </el-col>
    </el-row>
</template>
<script setup lang="ts">
    import flash from "@/assets/flash.png"
    import flash2 from "@/assets/flash2.png"
    import flash3 from "@/assets/flash3.png"
    import repair from "@/assets/repair.png"
    import progress from "@/assets/progress.png"
    import remain from "@/assets/remain.png"
    import total from "@/assets/total.png"
    import money from "@/assets/money.png"
    import daily from "@/assets/daily.png"
    import { useTabsStore } from '@/store/tabs';
    import { useUserStore } from "@/store/auth";
    import { storeToRefs } from "pinia";
    import { useRouter } from "vue-router"
    import {reactive, ref } from "vue"
    import { useChart } from "@/hooks/useCharts"
    import { getChartData,getChartData1,getChartData2 } from "@/api/chartData"
import { CaretBottom, CaretTop } from "@element-plus/icons-vue"
    const chartRef1 = ref(null);
    const chartRef2 = ref(null);
    const chartRef3 = ref(null);
    const setChartData = async ()=>{
        const chartOption = reactive({
            title: {
                text: '电量统计'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: []
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['13：00', '14：00', '15：00', '16：00', '17：00', '18：00', '19：00', '20：00', '21：00']
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                formatter: '{value} kw'
                }
            },
            series: [
                {
                name: '',
                type: 'line',
                data: [],
                smooth: true,
                lineStyle: {
                    width: 4,
                },
                itemStyle:{
                    color:'purple',
                    shadowColor: 'rgba(0,255,0,0.5)',
                    shadowBlur:5,
                }
                },
                {
                name: '',
                type: 'line',
                data: [],
                smooth: true,
                lineStyle: {
                    width: 4,
                },
                itemStyle:{
                    color:'lightgreen',
                    shadowColor: 'rgba(0,255,0,0.5)',
                    shadowBlur:5,
                }
                },
                {
                name: '',
                type: 'line',
                data: [],
                smooth: true,
                lineStyle: {
                    width: 4,
                },
                itemStyle:{
                    color:'skyblue',
                    shadowColor: 'rgba(0,255,0,0.5)',
                    shadowBlur:5,
                }
                }
            ]
        });
        const res = await getChartData();
        chartOption.legend.data = res.data.list.map((item:any)=>item.name);
        for(let i = 0;i<res.data.list.length;i++){
            chartOption.series[i].name = res.data.list[i].name;
            chartOption.series[i].data = res.data.list[i].data;
        }
        return chartOption;
    }
    useChart(chartRef2,setChartData);
    const setChartData1 = async ()=>{
        const chartOption = reactive({
        legend: {
            top: 'bottom'
        },
        tooltip: {
            trigger: 'item',
            formatter:'{a}<br />{b}:{c}%'
        },
        series: [
            {
                name: '营收占比',
                type: 'pie',
                radius: ['50%', '70%'],
                center: ['50%', '50%'],
                roseType: 'area',
                data: [],
                emphasis:{
                    label:{
                        show:true,
                        fontSize:'16',
                        fontWight:"bold"
                    }
                }
            }
        ],
        graphic:{
            type:'text',
            left: 'center',
            top: 'center',
            style:{
                text:'营收占比',
                fill:'#333',
                fontSize:20
            },
        }
        });
        const res = await getChartData1();
        chartOption.series[0].data = res.data.list;
        return chartOption;
    }
    useChart(chartRef1,setChartData1);
    const setChartData2 = async ()=>{
        const chartOption = reactive({
            radar: {
                indicator: [
                { name: '闲置数', max: 65 },
                { name: '使用数', max: 160 },
                { name: '故障数', max: 300 },
                { name: '维修数', max: 380 },
                { name: '更换数', max: 520 },
                { name: '报废数', max: 250 }
                ]
            },
            series: [
                {
                name: '设备总览',
                type: 'radar',
                data: [
                    {
                        value: [],
                        name: '设备总览'
                    }
                ]
                }
            ]
        });
        const res = await getChartData2();
        chartOption.series[0].data[0].value = res.data.list;
        return chartOption;
    }
    useChart(chartRef3,setChartData2);
    const userStore = useUserStore();
    const {menu} = storeToRefs(userStore);
    const useTabs =  useTabsStore();
    const router = useRouter();
    const {addTabs,setCurrentTab} = useTabs;

    function findObjByUrl(arr:any,name:string){
      for (const item of arr) {
          if(item.name === name){
             return item;
          }
          if(item.children){
            const found:any = findObjByUrl(item.children,name);
            if(found)return found;
          }
      }
      return null;
    }
    const handle = (val:string)=>{
        console.log(val);
        const found = findObjByUrl(menu.value,val);
        const {name,url} = found;
        addTabs(found);
        setCurrentTab(name,url);
        router.push(url);
    }
</script>
<style scoped lang="less">
    .title{
        display: flex;
        font-size: 20px;
        font-weight: bold;
        align-items: flex-end;
        text-align: center;
        p{
            color: #86909c;
        }
    }
    .equipment{
        display: flex;
        justify-content: space-between;
        padding: 0 50px;
        .item{
            h1{
                font-size: 36px;
            }
            :deep(.el-statistic__content){
                margin-top: 10px !important;
                margin-bottom: 10px !important;
            }
        }
    }
    .quick{
        text-align: center;
        p{
            color: #333;
            margin-top: 10px;
        }
    }
    .ranking-list{
        .ranking-item{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            .rank{
                display: inline-block;
                color:#666;
                font-weight: bold;
                border-radius: 50%;
                width: 30px;
                height: 30px;
                text-align: center;
                line-height: 30px;
            }
            .store-name{
                padding: 0 10px;
                flex-grow: 1;
            }
            .sales{
                color: #666;
            }
        }
        .ranking-item:nth-child(even){
            background-color: rgb(253, 246, 236);
        }
    }
</style>