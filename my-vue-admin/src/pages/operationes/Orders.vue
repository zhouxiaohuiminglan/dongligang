<template>
    <el-card>
        <el-row :gutter="20">
            <el-col :span="6">
                <el-input placeholder="请输入订单号" v-model="inputParams.orderNo"></el-input>
            </el-col>
            <el-col :span="6">
                <el-select placeholder="订单状态" v-model="inputParams.status">
                    <el-option label="全部" :value="1"></el-option>
                    <el-option label="进行中" :value="2"></el-option>
                    <el-option label="已完成" :value="3"></el-option>
                    <el-option label="异常" :value="4"></el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-input placeholder="设备编号" v-model="inputParams.equipmentNo"></el-input>
            </el-col>
            <el-col :span="6">
                <el-button type="primary" @click="loadData">查询</el-button>
                <el-button @click="resetTable">重置</el-button>
            </el-col>
            <el-col :span="6" class="mt">
                <el-input placeholder="请输入站点名称" v-model="inputParams.name"></el-input>
            </el-col>
            <el-col :span="6" class="mt">
                <el-date-picker
                    v-model="date"
                    type="daterange"
                    range-separator="/"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    value-format="YYYY-MM-DD"
                    @change="dateChange"
                    />
            </el-col>
        </el-row>
    </el-card>
    <el-card class="mt">
        <el-button type="danger" :disabled="!selectList.length" @click="deleteOrder('')">批量删除</el-button>
        <el-button icon="Download" type="primary" :disabled="!selectList.length" @click="exportToExcel">导出订单数据到Excel</el-button>
    </el-card>
    <el-card class="mt">
        <el-table :data="tableData" v-loading="loading" @selection-change="selectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column type="index" label="序号" width="80" />
            <el-table-column label="订单号" prop="orderNo"></el-table-column>
            <el-table-column label="设备编号" prop="equipmentNo"></el-table-column>
            <el-table-column label="订单日期" prop="date"></el-table-column>
            <el-table-column label="开始时间" prop="startTime"></el-table-column>
            <el-table-column label="结束时间" prop="endTime"></el-table-column>
            <el-table-column label="金额" prop="money"></el-table-column>
            <el-table-column label="支付方式" prop="pay"></el-table-column>
            <el-table-column label="订单状态" prop="status">
                <template #default="scope">
                    <el-tag :type="scope.row.status == 2 ? 'success':(scope.row.status == 3 ? 'primary':'danger')">
                        {{scope.row.status == 2 ? "进行中" :(scope.row.status == 3 ? "已完成":"异常")}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="primary" @click="handleDetail(scope.row.orderNo)">详情</el-button>
                    <el-button type="danger" @click="deleteOrder(scope.row.orderNo)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            class="fr mt mb"
            v-model:current-page="pageInfo.page"
            v-model:page-size="pageInfo.pageSize"
            :page-sizes="[10, 20, 30, 40]"
            background
            layout="sizes, prev, pager, next, jumper,total"
            :total="totals"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            />
    </el-card>
</template>
<script lang="ts" setup>
    import {ref, watch} from "vue"
    import { useHttp } from "@/hooks/useHttp";
    import { ApiType } from "@/api/apiType";
    import { deleteOrderList } from "@/api/operationes";
    import { ElMessage } from "element-plus";
    import { useRouter,useRoute } from "vue-router";
    import { useTabsStore } from "@/store/tabs";
    import * as XLSX from "xlsx";
    import {saveAs} from "file-saver"
    const date = ref<string[]>([]);
    interface orderType {
        orderNo:string,
        date:string,
        startTime:string,
        endTime:string,
        equipmentNo:string,
        money:string,
        pay:string,
        status:number,
    }
    interface inputType {
        orderNo:string,
        status:1,
        name:string,
        equipmentNo:string,
        startTime:string,
        endTime:string,
    }
    const inputParams = ref<inputType>({
        orderNo:"",
        status:1,
        name:"",
        equipmentNo:"",
        startTime:"",
        endTime:"",
    });
    const {pageInfo,handleCurrentChange,handleSizeChange,totals,tableData,loading,resetData,loadData} = useHttp<orderType>(ApiType.orderList,inputParams);
    const dateChange = (dates:string[])=>{
        date.value = dates;
        inputParams.value.startTime = dates[0];
        inputParams.value.endTime = dates[1];
    }
    const resetTable = ()=>{
        inputParams.value = {
            orderNo:"",
            status:1,
            name:"",
            equipmentNo:"",
            startTime:"",
            endTime:"",
        }
        date.value = [];
        resetData();
    }
    const selectList = ref<orderType[]>([]);
    const selectionChange = (selectArr:orderType[])=>{
        selectList.value = selectArr;
    }
    const deleteOrder = async (orderNo:string)=>{
        const orderList:string[] = orderNo ? [orderNo] : selectList.value.map(item=>item.orderNo);
        try {
           const res = await deleteOrderList(orderList);
           if(res.code == 200){
                ElMessage({
                    type:'success',
                    message:res.data.message
            })
           }
           loadData();
        } catch (error) {
            console.log(error);
        }
        
    }
    const router = useRouter();
    const useTab =  useTabsStore();
    const handleDetail = (orderNo:string)=>{
        router.push("/operations/detail?orderNo=" + orderNo);
        const {addTabs,setCurrentTab} = useTab;
        addTabs({name:"订单详情",url:"/operations/detail",icon:"Share",query:orderNo});
        setCurrentTab("订单详情","/operations/detail");
    }
    const route = useRoute();
    watch(()=>route.name,(to,from)=>{
        console.log(to,from);
        if(to == "orders" && from != "detail"){
            resetTable();
        }
    })
    const exportToExcel = ()=>{
       const ws = XLSX.utils.json_to_sheet(selectList.value);
       const wb = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb,ws,"sheet1");
       const wbOut = XLSX.write(wb,{bookType:"xlsx",type:"array"});
       const bold = new Blob([wbOut],{type:"appliaction/octet-stream"});
       saveAs(bold,"订单数据.xlsx");
    }

</script>