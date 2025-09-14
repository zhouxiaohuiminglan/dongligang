<template>
    <el-dialog :model-value="isVisible" title="权限设置" width="600px" @close="handleClose" @open="openDialog">
        <el-card>
            <template #header>
                <span class="card-header">页面权限</span>
            </template>
            <el-tree 
                ref = "treeRef"
                :data="treeData" 
                show-checkbox
                node-key="url"
            >

            </el-tree>
        </el-card>
        <el-card class="mt">
            <template #header>
                <span class="card-header">按钮权限</span>
            </template>
            <el-checkbox-group v-model="checkValues">
                <el-checkbox label="全部" value="all"></el-checkbox>
                <el-checkbox label="添加" value="add"></el-checkbox>
                <el-checkbox label="编辑" value="edit"></el-checkbox>
                <el-checkbox label="删除" value="delete"></el-checkbox>
            </el-checkbox-group>
        </el-card>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="handleClose">取消</el-button>
                <el-button type="primary" @click="handleConfirm">确定</el-button>
            </span>
        </template>
        
    </el-dialog>
</template>

<script setup lang="ts">
    import { useUserStore } from '@/store/auth';
    import { storeToRefs } from 'pinia';
    import { ref } from 'vue';
    import { transformMenu } from '@/utils/transformMenu';
    import { setUserAuth } from '@/api/system';
    import { ElMessage } from 'element-plus';
    interface TreeType {
        label: string
        url:string, //用来做key，做选中要用
        children?: TreeType[]
    }
    const useStore = useUserStore();
    const {menu} = storeToRefs(useStore);
    const treeRef = ref();
    const openDialog = ()=>{
        const newMenu = transformMenu(menu.value);
        treeData.value = newMenu;
        treeRef.value.setCheckedKeys(props.authList);
        console.log(props.btnList);
        checkValues.value = props.btnList;
    }
    const checkValues = ref<string[]>([]);
    //格式化成想要的数组
    const treeData = ref<TreeType[]>([]);
    const props = defineProps({
        isVisible:{
            type:Boolean,
            required:true
        },
        authList:{
            type:Array<string>,
            required:true
        },
        btnList:{
            type:Array<string>,
            required:true
        },
        account:{
            type:String,
            required:true
        },
    });
    const emit = defineEmits(['close','reload']);
    const handleClose = ()=>{
        emit('close');
    }
    const handleConfirm = async ()=>{
        const res =  await setUserAuth(props.account,checkValues.value,treeRef.value.getCheckedKeys(true));
        if(res.code == 200){
            ElMessage({
                type:'success',
                message:res.data.message
            });
            handleClose();
            emit('reload');
        }
    }
</script>