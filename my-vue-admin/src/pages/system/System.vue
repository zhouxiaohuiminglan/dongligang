<template>
    <el-card>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-input v-model.trim="inputParams.name" placeholder="请输入姓名"/>
            </el-col>
            <el-col :span="8">
                <el-input v-model.trim="inputParams.department"  placeholder="请输入部门"/>
            </el-col>
            <el-col :span="8">
                <el-button type="primary" @click="loadData">查询</el-button>
                <el-button type="primary" @click="resetSystem">重置</el-button>
            </el-col>
        </el-row>
    </el-card>
    <el-card class="mt">
        <el-table :data="tableData" v-loading="loading" >
            <el-table-column type="index" width="80" label="序号"></el-table-column>
            <el-table-column label="账号" prop="account"></el-table-column>
            <el-table-column label="姓名" prop="name"></el-table-column>
            <el-table-column label="电话" prop="phone"></el-table-column>
            <el-table-column label="身份证号" prop="idNo"></el-table-column>
            <el-table-column label="职位" prop="position">
                <template #default="scope">
                    <el-tag type="primary">{{scope.row.position}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="部门" prop="department"></el-table-column>
            <el-table-column label="页面权限" prop="pageAuthority">
                <template #default="scope">
                    <el-tag type="success">{{scope.row.pageAuthority}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="按钮权限" prop="btnAuthority">
                <template #default="scope">
                    <el-tag type="info">{{scope.row.btnAuthority}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="280">
                <template #default="scope">
                    <el-button type="primary" size="small" @click="handleAuth(scope.row.pageAuthority,scope.row.account)">权限设置</el-button>
                    <el-button type="danger" size="small" @click="deleteUser(scope.row.account)">删除</el-button>
                    <el-button type="danger" size="small">禁用</el-button>
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
    <AuthSystem :isVisible="visible" @close="visible = false" :authList="authList" :btnList="btnList" :account="curAcc" @reload="loadData"/>
</template>
<script setup lang="ts">
    import { ApiType } from '@/api/apiType';
    import { useHttp } from '@/hooks/useHttp';
    import { ref } from 'vue';
    import AuthSystem from './AuthSystem.vue';
    import { getUserAuth,deleteUserAuth } from '@/api/system';
    import type { MenuItemType } from '@/types/user';
    import { ElMessage } from 'element-plus';
    
    const visible = ref<boolean>(false);
    const authList = ref<string[]>([]);
    const btnList = ref<string[]>([]);
    const handleAuth = async (pageAuthority:string,account:string)=>{
        const {data:{list,btn}}= await getUserAuth(pageAuthority);
        authList.value = getUrlList(list);
        btnList.value = btn;
        visible.value = true;
        curAcc.value = account;
    }
    //将列表数据转换成只有url的一维数组
    function getUrlList(list:MenuItemType[]){
        const newArr = ref<string[]>([]);
        list.map((item:MenuItemType)=>{
            getUrl(item);
        });
        function getUrl(node:MenuItemType){
            if(node.children){
                node.children.map((item:MenuItemType)=>{
                    getUrl(item);
                });
            }else{
                newArr.value.push(node.url);
            }
        }
        return newArr.value;
    }
    interface inputType {
        name:string,
        department:string,
    }
    const inputParams = ref<inputType>({
        name:"",
        department:"",
    });
    const {tableData,
            pageInfo,
            totals,
            loading,
            loadData,
            handleSizeChange,
            handleCurrentChange,
            resetData} = useHttp(ApiType.permissionList,inputParams);

    const resetSystem = ()=>{
        inputParams.value = {
            name:"",
            department:"",
        }
        resetData();
    }
    const deleteUser = async (account:string)=>{
        try {
            const res = await deleteUserAuth(account)
            if(res.code == 200){
                ElMessage   ({
                    message:res.data.message,
                    type:'success'
                });
                loadData()
            }
        } catch (error) {
            
        }
    }
    const curAcc = ref<string>("");
</script>
<style lang="less" scoped>
    .el-table-column{
        width: 120px;
    }
</style>