<template>
    <el-dialog
        :model-value="dialogVisible"
        :title="title"
        @close="handleClose"
        
    >
        <el-form 
        :rules="rules"
        :model="ruleForm" 
        label-width="120"
        ref="formRef"
        >
            <el-row>
                <el-col :span="12">
                    <el-form-item label="站点名称：" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="站点id：" prop="id">
                        <el-input v-model="ruleForm.id" :disabled="disabled"></el-input>
                    </el-form-item>
                    <el-form-item label="所属城市：" prop="city">
                        <el-input v-model="ruleForm.city"></el-input>
                    </el-form-item>
                    <el-form-item label="站点负责人：" prop="person">
                        <el-input v-model="ruleForm.person"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人电话：" prop="tel">
                        <el-input v-model="ruleForm.tel"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="快充数" prop="fast">
                        <el-input v-model="ruleForm.fast"></el-input>
                    </el-form-item>
                    <el-form-item label="慢充数：" prop="slow">
                        <el-input v-model="ruleForm.slow"></el-input>
                    </el-form-item>
                    <el-form-item label="充电站状态：" prop="status">
                        <el-select v-model="ruleForm.status" :disabled="disabled">
                            <el-option label="全部" :value="1" />
                            <el-option label="使用中" :value="2" />
                            <el-option label="空闲中" :value="3" />
                            <el-option label="维护中" :value="4" />
                            <el-option label="待维修" :value="5" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="正在充电：" prop="now">
                        <el-input v-model="ruleForm.now" :disabled="disabled"></el-input>
                    </el-form-item>
                    <el-form-item label="故障数：" prop="fault">
                        <el-input v-model="ruleForm.fault" :disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <template #footer>
        <span class="dialog-footer">
            <el-button @click="handleClose">取消</el-button>
            <el-button type="primary" @click="handleConfrim">确认</el-button>
        </span>
        </template>
  </el-dialog>
</template>
<script setup lang="ts">
    import type { StationType } from '@/types/station';
    import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
    import { reactive, ref, watch } from 'vue';
    import { useStationStore } from '@/store/station';
    import { storeToRefs } from 'pinia';
    import { editStation,addStation } from '@/api/chargingstation';
    const props = defineProps({
        dialogVisible:{
            type:Boolean,
            require:true,
        }
    })
    const ruleForm = ref<StationType>({
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

const rules = reactive<FormRules<StationType>>({
    name:[
        {required:true,message:"站点名称不能为空",trigger:"blur"}
    ],
    id: [
        { required: true, message: '站点id不能为空', trigger: 'blur' },
    ],
    city: [
        { required: true, message: '所属城市不能为空', trigger: 'blur' },
    ],
    person: [
        { required: true, message: '站点负责人不能为空', trigger: 'blur' },
    ],
    tel: [
        { required: true, message: '负责人电话不能为空', trigger: 'blur' },
    ],
    fast: [
        { required: true, message: '快充数不能为空', trigger: 'blur' },
    ],
    slow: [
        { required: true, message: '慢充数不能为空', trigger: 'blur' },
    ],
    status: [
        { required: true, message: '充电站状态不能为空', trigger: 'blur' },
    ],
    now: [
        { required: true, message: '正在充电数不能为空', trigger: 'blur' },
    ],
    fault: [
        { required: true, message: '故障数量不能为空', trigger: 'blur' },
    ]
})
const emit = defineEmits(['close','reload']);
const handleClose = ()=>{
    emit('close');
};
const stationStore = useStationStore();
const {stationData} = storeToRefs(stationStore);
const title = ref<string>("");
const disabled = ref<boolean>(false);
const isEdit = ref<boolean>(false);
watch(()=>props.dialogVisible,()=>{
    ruleForm.value = stationData.value;
    disabled.value = !!stationData.value.name;
    title.value = !!stationData.value.name ?"编辑充电站信息":"新增充电站信息";
    isEdit.value = !!stationData.value.name ;
    if(!props.dialogVisible){ //当页面关闭时候重置表单
        formRef.value?.resetFields();
    }
})
const formRef = ref<FormInstance>();
const handleConfrim = ()=>{
   formRef.value?.validate( async (isValidate:boolean)=>{
        if(isValidate){
            let res;
            if(isEdit.value){
                res = await editStation(ruleForm.value);
            }else{
                res = await addStation(ruleForm.value);
            }
            if(res.code == 200){
                ElMessage({
                    message:res.data.message,
                    type:'success'
                });
                handleClose();
                emit('reload');
            }
        }
   }) 
}
</script>