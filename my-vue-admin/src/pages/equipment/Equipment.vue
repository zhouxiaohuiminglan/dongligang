<template>
    <el-card>
        <el-row :gutter="20">
            <el-col :span="6">
                <el-input v-model.trim="inputParams.no" placeholder="请输入会员卡号"></el-input>
            </el-col>
            <el-col :span="6">
                <el-input v-model.trim="inputParams.tel" placeholder="请输入手机号"></el-input>
            </el-col>
            <el-col :span="6">
                <el-input v-model.trim="inputParams.name" placeholder="请输入姓名"></el-input>
            </el-col>
            <el-col :span="6">
                <el-button type="primary" @click="loadData">查询</el-button>
                <el-button  @click="resetCurData">重置</el-button>
            </el-col>
        </el-row>
    </el-card>
    <el-card class="mt">
        <el-table :data="tableData" style="width: 100%" v-loading="loading">
            <el-table-column type="index" label="序号" width="80px"/>
            <el-table-column prop="memberCardNumber" label="会员卡号"/>
            <el-table-column prop="cardType" label="卡类型"/>
            <el-table-column prop="create_time" label="开卡日期"/>
            <el-table-column prop="holderName" label="持有人姓名" />
            <el-table-column prop="holderPhone" label="此有人电话" />
            <el-table-column prop="cardBalance" label="卡余额" />
            <el-table-column prop="transactionRecords" label="消费记录">
                <template #default="scope">
                    <el-popover title="消费金额" :width="240" placement="left-start" trigger="click">
                        <template #reference>
                            <el-button style="margin-right: 16px" @click="getRecord(scope.row.memberCardNumber)">消费记录</el-button>
                        </template>
                        <el-timeline>
                            <el-timeline-item v-for="(item, index) in recordList"
                                    :key="index"
                                    :timestamp="item.transactionDate"
                                    color="#0bbd87"
                                    style="line-height:25px"
                                >
                                <p>{{`消费金额：${item.transactionAmount}元`}}</p>
                                <p>{{`消费类型：${item.transactionType}`}}</p>
                            </el-timeline-item>
                        </el-timeline>
                    </el-popover>
                </template>
                
            </el-table-column>
            <el-table-column prop="validUntil" label="有效期至" />
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
<script setup lang="ts">
    import { useHttp } from "@/hooks/useHttp";
    import { ApiType,getRecordList } from "@/api/apiType";
    import { ref } from "vue";
    interface equipType {
        memberCardNumber:string,
        cardType:number,
        create_time:string,
        holderName:string,
        holderPhone:string,
        cardBalance:string,
        validUntil:string,
    }
    interface inputType {
        no:string,
        tel:string,
        name:string,
    }
    const inputParams = ref<inputType>({
        no:"",
        tel:"",
        name:"",
    });
    const {pageInfo,handleCurrentChange,handleSizeChange,totals,tableData,loading,resetData,loadData} = useHttp<equipType>(ApiType.equipList,inputParams);
    const resetCurData = ()=>{
        inputParams.value = {
           no:"",
            tel:"",
            name:"", 
        }
        resetData();
    }
    interface recordType {
        transactionDate:string,
        transactionAmount:number,
        transactionType:string
    }
    const recordList = ref<recordType[]>([])
    const getRecord = async (cardNo:string)=>{
        const {data:{list}} = await getRecordList(cardNo)
        recordList.value = list
    }
</script>