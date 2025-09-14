<template>
    <el-card>
        <el-row :gutter="20">
            <el-col :span="6">
                <el-input
                    placeholder="请输入站点名称、ID"
                    v-model.trim="inputParams.input"
                    >
                    <template #append>
                        <el-select v-model="select" style="width: 115px">
                        <el-option label="按名称查询" value="name" />
                        <el-option label="按ID查询" value="id" />
                        </el-select>
                    </template>
                </el-input>
            </el-col>
            <el-col :span="6">
                <el-select v-model="inputParams.value">
                    <el-option label="全部" :value="1" />
                    <el-option label="使用中" :value="2" />
                    <el-option label="空闲中" :value="3" />
                    <el-option label="维护中" :value="4" />
                    <el-option label="待维修" :value="5" />
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-button type="primary" @click="getList">查询</el-button>
                <el-button @click="reset">重置</el-button>
            </el-col>
        </el-row>
        
    </el-card>
    <el-card class="mt">
        <el-row>
            <el-col :span="6">
                <el-statistic title="累计充电量(度)" :value="268900" />
            </el-col>
            <el-col :span="6">
                <el-statistic title="累计充电次数(次)" :value="1389" />
            </el-col>
            <el-col :span="6">
                <el-statistic title="服务区域(个)" :value="88" />
            </el-col>
            <el-col :span="6">
                <el-statistic title="累计效益(元)" :value="5622178" />
            </el-col>
        </el-row>
    </el-card>
    <el-card class="mt">
        <el-button type="primary" icon="Plus" @click="addStation">新增充电站</el-button>
    </el-card>
    <el-card class="mt">
        <el-table :data="tableData" style="width: 100%" v-loading="isLoading">
            <el-table-column type="index" width="60" label="序号"/>
            <el-table-column prop="name" width="150" label="站点名称" />
            <el-table-column prop="id" label="站点ID" />
            <el-table-column prop="city" label="城市" width="60"/>
            <el-table-column prop="fast" label="快充数" />
            <el-table-column prop="slow" label="慢充数" />
            <el-table-column prop="status" label="充电站状态" width="100">
                <template #default="scope">
                    <el-tag v-if="scope.row.status == 2" >使用中</el-tag>
                    <el-tag v-if="scope.row.status == 3" type="success">空闲中</el-tag>
                    <el-tag v-if="scope.row.status == 4" type="warning">维护中</el-tag>
                    <el-tag v-if="scope.row.status == 5" type="danger">待维修</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="now" label="正在充电" />
            <el-table-column prop="fault" label="故障数" />
            <el-table-column prop="person" label="负责人" />
            <el-table-column prop="tel" label="电话" width="120"/>
            <el-table-column label="操作" width="150"  >
                <template #default="scope">
                    <el-button size="small" type="primary" @click="editStation(scope.row)">编辑</el-button>
                    <el-popconfirm 
                    title="确定要删除吗?" 
                    @confirm="rmvStation(scope.row.id)"
                    confirm-button-text="确定"
                    cancel-button-text="取消"
                    >
                        <template #reference>
                        <el-button type="danger" size="small">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
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
    <StationForm :dialog-visible="visible" @close="visible = false" @reload="getList"/>
</template>
<script setup lang="ts">
    import {ref,reactive, onMounted} from "vue"
    import { getStationList, removeStation } from "@/api/chargingstation";
    import StationForm from "./components/StationForm.vue";
    import { useStationStore } from "@/store/station";
    import type { StationType } from "@/types/station";
    import { ElMessage } from "element-plus";
    import { userPagination } from '@/hooks/usePaginations';
    const select = ref("name");
    const tableData = ref<StationType[]>([]);
    const isLoading = ref<boolean>(false);
    const visible = ref<boolean>(false);
    const inputParams = reactive({
        input:"",
        value:1,
    });
    const getList = async ()=>{
        isLoading.value = true;
        const {data:{list,total}} =   await getStationList({...pageInfo,status:inputParams.value,[select.value]:inputParams.input});
        isLoading.value = false;
        tableData.value = list;
        totals.value = total;
    }
    const reset = ()=>{
        inputParams.input = "";
        inputParams.value = 1;
        select.value = "name";
        resetData();
    }
    const {pageInfo,totals,handleCurrentChange,handleSizeChange,resetData} = userPagination(getList);
    onMounted(()=>{
        getList();
    })
    const stationStore = useStationStore();
    const {setStationData,rmvStationData} = stationStore;
    const editStation = (row:StationType)=>{
        setStationData(row);
        visible.value = true;
        //stationTitle.value = !row ? "新增充电站信息": "编辑充电站信息";
    }
    const addStation = ()=>{
        rmvStationData();
        visible.value = true;
    }
    const rmvStation = async (id:string)=>{
        const res =  await removeStation(id);
        if(res.code ==200){
            ElMessage({
                message:res.data.message,
                type:'success'
            });
            getList();
        }
        
    }
</script>
<style scoped lang="less">
    :deep(.cell){
        text-align: center;
    }
</style>