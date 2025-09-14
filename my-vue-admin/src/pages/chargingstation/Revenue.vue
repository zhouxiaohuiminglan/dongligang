<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="4">
                <el-card >
                    <div class="title">
                        <div class="round">
                            <el-icon>
                                <Document/>
                            </el-icon>
                        </div>
                        <h4>今日总收入(元)</h4>
                    </div>
                    <div class="total mt">
                        <h1>{{fmtNumToThousands(529908)}}</h1>
                        <div class="percent">-21%</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card>
                    <div class="title">
                        <div class="round">
                            <el-icon>
                                <Document/>
                            </el-icon>
                        </div>
                        <h4>本月总收入(万元)</h4>
                    </div>
                    <div class="total mt">
                        <h1>{{fmtNumToThousands(2940)}}</h1>
                        <div class="percent">-23%</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card>
                    <div class="title">
                        <div class="round">
                            <el-icon>
                                <Document/>
                            </el-icon>
                        </div>
                        <h4>会员卡储值金额(元)</h4>
                    </div>
                    <div class="total mt">
                        <h1>{{fmtNumToThousands(239765)}}</h1>
                        <div class="percent">-2%</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card>
                    <div class="title">
                        <div class="round">
                            <el-icon>
                                <Document/>
                            </el-icon>
                        </div>
                        <h4>服务费总金额(元)</h4>
                    </div>
                    <div class="total mt">
                        <h1>{{fmtNumToThousands(132265)}}</h1>
                        <div class="percent">-31%</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card>
                    <div class="title">
                        <div class="round">
                            <el-icon>
                                <Document/>
                            </el-icon>
                        </div>
                        <h4>停车费总金额(元)</h4>
                    </div>
                    <div class="total mt">
                        <h1>{{fmtNumToThousands(21925)}}</h1>
                        <div class="percent">-11%</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card>
                    <div class="title">
                        <div class="round">
                            <el-icon>
                                <Document/>
                            </el-icon>
                        </div>
                        <h4>电费总金额(元)</h4>
                    </div>
                    <div class="total mt">
                        <h1>{{fmtNumToThousands(12355)}}</h1>
                        <div class="percent">-3%</div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <div>
            <el-card class="mt">
                <div ref="chartRef" style="width: 100%;height: 300px;">
                </div>
            </el-card>
        </div>
        <div>
            <el-card class="mt">
                <div>
                    <el-input
                        v-model.trim="inputInfo"
                        placeholder="请输入站点名称"
                        class="input-with-select"
                        style="width: 500px;"
                        >
                        <template #append>
                            <el-button icon="Search" @click="revenueList" />
                        </template>
                    </el-input>
                </div>
                
                <el-table :data="tableData" v-loading="loading">
                    <el-table-column type="index" label="序号" width="55"></el-table-column>
                    <el-table-column label="充电站名称" min-width="90" prop="name"></el-table-column>
                    <el-table-column label="充电站id" prop="id"></el-table-column>
                    <el-table-column label="所属城市" prop="city"></el-table-column>
                    <el-table-column label="总数量(个)" prop="count"></el-table-column>
                    <el-table-column label="单日总收入(元)" prop="day" min-width="120" sortable>
                        <template #default="scope">
                            <span>{{ scope.row.day }}</span>
                            <el-tag class="ml-10" :type="scope.row.percent>0?'danger':'success'">
                                {{scope.row.percent>0 ? '+'+ scope.row.percent+"%" : scope.row.percent+"%" }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="月度总收入(万元)" prop="month" min-width="120">
                        <template #default="scope">
                            <span>{{ scope.row.month }}</span>
                            <el-tag class="ml-10" :type="scope.row.mpercent>0?'danger':'success'">
                                {{scope.row.mpercent>0 ? '+'+ scope.row.mpercent+"%" : scope.row.mpercent+"%" }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="电费(元)" prop="electricity"></el-table-column>
                    <el-table-column label="停车费(元)" prop="parkingFee"></el-table-column>
                    <el-table-column label="服务费(元)" prop="serviceFee"></el-table-column>
                    <el-table-column label="储备金(元)" prop="member"></el-table-column>
                </el-table>
                <el-pagination
                    class="fr mt mb"
                    v-model:current-page="pageInfo.page"
                    v-model:page-size="pageInfo.pageSize"
                    :page-sizes="[10, 20, 30, 40]"
                    background
                    layout=" sizes, prev, pager, next, jumper,total"
                    :total="totals"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    />
            </el-card>
        </div>
    </div>
</template>
<script setup lang="ts">
    import fmtNumToThousands from '@/utils/toThousands';
    import { getRevenue,getRevenueList } from '@/api/chargingstation';
    import { useChart } from '@/hooks/useCharts';
    import {ref,reactive, onMounted} from "vue"
    import type { RevenueType } from '@/types/station';
    import { userPagination } from '@/hooks/usePaginations';
    const chartRef = ref();
    const setChartData = async ()=>{
        const chartOption = reactive({
            legend:{
                data:[],
            },
            xAxis: {
                type: 'category',
                data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月']
            },
            yAxis: [
                 {
                    type: 'value',
                    name: '',
                },
                {
                    type: 'value',
                    name: '',
                }
            ],
            series: [
                {
                    data: [],
                    type: 'bar',
                    name:"",
                    yAxisIndex: 0,
                    itemStyle:{
                        color:"#409eff"
                    }
                },
                {
                    data: [],
                    type: 'line',
                    name:"",
                    yAxisIndex: 1,
                    itemStyle:{
                        color:"#409eff"
                    },
                    smooth: true
                }
            ]
        });
        const res = await getRevenue();
        chartOption.legend.data = res.data.list.map((item:any)=>item.name);
        for(let i =0 ;i<res.data.list.length;i++){
            const chartData = chartOption.series[i];
            const resData = res.data.list[i];
            chartData.name = resData.name;
            chartData.data = resData.data;
            chartOption.yAxis[i].name = res.data.list[i].name;
        }
        return chartOption;
    }
    useChart(chartRef,setChartData);
    const tableData = ref<RevenueType[]>();
    const loading = ref<boolean>(false);
    const inputInfo = ref();
    
    const revenueList = async ()=>{
        loading.value = true;
        const {data:{list,total}} =  await getRevenueList({...pageInfo,name:inputInfo.value});
        loading.value = false;
        tableData.value = list;
        totals.value = total;
        tableData.value = list.map((item:RevenueType)=>({
            ...item,
            day:item.electricity + item.parkingFee + item.serviceFee + item.member
        }));
    }
    const {pageInfo,totals,handleCurrentChange,handleSizeChange} = userPagination(revenueList);
    onMounted(()=>{
        revenueList();
    })
</script>
<style lang="less">
.title{
    display: flex;
    align-items: center;
    .round{
        margin-right: 10px;
        background-color: rgb(235, 236, 245);
        border-radius: 50%;
        text-align: center;
        width: 30px;
        height: 30px;
        line-height: 30px;
    }
    h4{
        color: #666;
        font-size: 10px;
    }
}
.total{
    display: flex;
    align-items: center;
    h1{
        font-size: 26px;
        margin-right: 10px;
    }
    .percent{
        display: inline-block;
        background-color:  rgb(235, 247, 239);
        border-radius: 2px;
        padding: 3px 5px;
        height: 20px;
        line-height: 20px;
        color: green;
    }
}
:deep(.cell){
    text-align: center;
}
</style>