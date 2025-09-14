<template>
    <el-card> 
       <el-select style="width: 300px;" placeholder="请选择站点名称" v-model="selectVal" filterable>
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.name">

            </el-option>
       </el-select>
    </el-card>
    <el-card class="mt">
        <el-radio-group size="large" v-model="chooseVal" @change ="changeRadio">
            <el-radio-button :label="`全部(${allCount})`" :value="0"/>
            <el-radio-button :label="`空闲中(${checkCount(1)})`" :value="1"/>
            <el-radio-button :label="`充电中(${checkCount(2)})`" :value="2"/>
            <el-radio-button :label="`连接中(${checkCount(3)})`" :value="3"/>
            <el-radio-button :label="`排队中(${checkCount(4)})`" :value="4"/>
            <el-radio-button :label="`已预约(${checkCount(5)})`" :value="5"/>
            <el-radio-button :label="`故障/离线(${checkCount(6)})`" :value="6"/>
        </el-radio-group>
    </el-card>
    <el-card class="mt">
        <el-row :gutter="20">
            <el-col :span="6" v-for="item in dataList" :key="item.id" >
                <div class="item">
                    <div class="pic">
                        <p v-if="item.status == 1">空闲中</p>
                        <p v-else-if="item.status == 2">充电中</p>
                        <p v-else-if="item.status == 3">连接中</p>
                        <p v-else-if="item.status == 4">排队中</p>
                        <p v-else-if="item.status == 5">已预约</p>
                        <p v-else-if="item.status == 6">故障/离线</p>
                        <img :src="item.status == 1 ? free :(item.status == 6 ? outline:ing)" style="width: 100px;">
                        <p v-if="item.status == 2">{{item.percent}}</p>
                        <p v-else>0%</p>
                    </div>
                    <div class="info">
                         <h1>{{item.id}}</h1>
                         <hr>
                         <p>电压：{{item.voltage}}</p>   
                         <p>电流：{{item.current}}</p> 
                         <p>功率：{{item.power}}</p> 
                         <p>温度：{{item.tem}}</p> 
                    </div>
                </div>
                <div class="btn">
                    <div class="divder"></div>
                    <div>
                        <p class="fl ml" style="font-size: 12px;color: #999;">暂无预警</p>
                        <div class="fr">
                            <el-button size="small">
                            维保记录
                            </el-button>
                            <el-popover placement="right" :width="400" trigger="click">
                                <template #reference>
                                    <el-button class="mr" type="primary" size="small" @click="getRecord(item.chargingPice_id)">
                                        使用记录
                                    </el-button>
                                </template>
                                <h3 class="mb">使用记录</h3>
                                <el-timeline>
                                    <el-timeline-item
                                        v-for="recordData in recordList"
                                        :key="recordData.time"
                                        :timestamp="recordData.time"
                                        type="primary"
                                        :hollow="true"
                                        >
                                        {{ recordData.msg }}
                                    </el-timeline-item>
                                </el-timeline>
                                
                            </el-popover>
                            
                        </div>
                        
                    </div>
                    
                </div>
            </el-col>
        </el-row>
    </el-card>
</template>

<script setup lang="ts">
    import free from "@/assets/free.png"
    import outline from "@/assets/outline.png"
    import ing from "@/assets/ing.png"
    import { getStationList,getChargingpileList,getRecordList } from "@/api/chargingstation";
    import { computed, onMounted,ref,watch } from "vue";
    const options = ref<any>([]);
    const selectVal =ref<string>();
    const dataList = ref<any>([]);//页面渲染
    const dataListCopy = ref<any>([]);//原始数据
    const chooseVal = ref<number>(0);
    const loadData = async ()=>{
        const {data:{list}} = await getStationList({page:1,pageSize:100,status:1});
        options.value = list;
        selectVal.value = list[0].name
    }
    const allCount = computed(()=>checkCount(1) + checkCount(2) + checkCount(3)+ checkCount(4)+ checkCount(5)+ checkCount(6))
    const checkCount = (status:number)=>{
        return dataListCopy.value.filter((item:any)=>item.status == status).length;
    }
    const changeRadio = (val:number)=>{
        dataList.value = dataListCopy.value;
        if(val!=0){
            dataList.value = dataList.value.filter((item:any)=>item.status == val);
        }
    }
    watch(selectVal,async (newValue)=>{
        const selectData = options.value.filter((item:any)=>item.name == newValue);
        const {data:{list}} = await getChargingpileList(selectData[0].station_id)
        dataList.value = list;
        dataListCopy.value = list;
    });
    const recordList = ref<any[]>([])
    const getRecord = async (chargingPice_id:string)=>{
        const {data:{list}} = await getRecordList(chargingPice_id)
        recordList.value = list
    }
    onMounted(()=>{
        loadData();
    })
</script>
<style scoped lang="less">
    .item{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 200px;
        background-color: rgb(247, 251, 254);
        padding: 20px;
        border-radius: 10px 10px 0 0 ;
        .pic{
            p{
                width: 76px;
                color: rgb(61, 187, 46);
                margin-bottom: 10px;
                text-align: center;
            }
            
        }
        .info{
            margin-top: -20px;
            color: #999;
            margin-left: 30px;
            line-height: 26px;
        }
    }
    .btn{
        width: 100%;
        height: 50px;
        line-height: 50px;
        background-color: rgb(247, 251, 254);
        .divder{
            width: 95%;
            background-color: #f4f4f4;
            height: 2px;
            margin: auto;
        }
    }
</style>