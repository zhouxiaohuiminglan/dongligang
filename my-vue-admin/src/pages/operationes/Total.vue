<template>
    <el-row>
        <el-col :span="6">
            <el-card>
                <el-input style="max-width: 600px;" placeholder="请输入" v-model="inputLabel">
                    <template #append>
                        <el-button icon="Search"></el-button>
                    </template>
                </el-input>
            </el-card>
            <el-tree 
                ref="treeRef"
                :props="defaultProps"
                :data="treeData"
                :filter-node-method="filterNode"
                @node-click="handleNodeClick"
                empty-text="未找到充电站"
            >

            </el-tree>
        </el-col>
        <el-col :span="18">
            <el-card class="ml">
                <template #header>
                    <div class="card-header">
                        <h1>{{curNodeLab}}:计费模板</h1>
                    </div>
                </template>
                <div >
                    <el-form 
                    ref="formRef"
                    :model="dynamicValidateForm"
                    :rules="rules"
                    label-width="85px"
                    >
                    <el-form-item label="模板名称" prop="name" >
                        <el-input placeholder="请输入模板名称" style="max-width: 200px;" v-model="dynamicValidateForm.name" :disabled="!curNodeLab"></el-input>
                    </el-form-item>
                    
                    <el-form-item v-for="(domain, index) in dynamicValidateForm.domains"
                            :label="'时间区间 ' + index + ':'"
                            :key="index"
                            >
                        <el-row :gutter="20">
                            <el-col :span="8">
                                <el-form-item 
                                label="开始时间"
                                :prop="'domains.' + index + '.startTime'" 
                                :rules="{required: true,message: '时间不能为空',trigger: 'blur',}"> <!-- domains.0.startTime  就是 dynamicValidateForm.domains[0].startTime -->
                                    <el-time-picker
                                        v-model="domain.startTime"
                                        placeholder="选择开始时间"
                                        style="width: 200px;"
                                        value-format="hh:mm:ss"
                                    />
                                </el-form-item>
                                
                            </el-col>
                            <el-col :span="1" style="text-align: center;">
                                <span>--</span>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item 
                                label="结束时间"
                                :prop="'domains.' + index + '.endTime'"
                                :rules="{required: true,message: '时间不能为空',trigger: 'blur',}"
                                >
                                    <el-time-picker
                                    v-model="domain.endTime"
                                    placeholder="选择结束时间"
                                    style="width: 200px;"
                                    value-format="hh:mm:ss"
                                    />
                                </el-form-item>
                                
                            </el-col>
                             <el-col :span="7">
                                <el-form-item 
                                label="电费" 
                                class="ml" 
                                :prop="'domains.' + index + '.electricity'" 
                                :rules="{required: true,message: '电费不能为空',trigger: 'blur',}"
                                >
                                    <el-input placeholder="请输入电费" v-model="domain.electricity" style="width: 100%;"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        
                    </el-form-item>
                    
                    <el-form-item class="mt">
                        <el-button type="primary" @click="addDomain">添加时间区间</el-button>
                    </el-form-item>

                    <el-form-item label="服务费" prop="service">
                        <el-input placeholder="请输入服务费" style="max-width: 200px;" v-model="dynamicValidateForm.service"></el-input>
                    </el-form-item>
                    <el-form-item label="停车费" prop="parking">
                        <el-input placeholder="请输入停车费" style="max-width: 200px;" v-model="dynamicValidateForm.parking"></el-input>
                    </el-form-item>
                    <el-form-item label="特殊备注" prop="note">
                        <el-input placeholder="" type="textarea" v-model="dynamicValidateForm.note"></el-input>
                    </el-form-item>
                    </el-form>
                </div>
                <div class="mt">
                    <el-button type="primary" @click="submitTotal">创建</el-button>
                    <el-button @click="resetTotal">重置</el-button>
                </div>
                
            </el-card>
        </el-col>
    </el-row>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue';
import { getCityList } from '@/api/operationes';
import {ElMessage} from 'element-plus';
import type { ElTree, FormInstance, FormRules} from 'element-plus';
const defaultProps = {
  children: 'children',
  label: 'label',
}
interface treeType{
    label:string,
    children?:treeType[];
}
const inputLabel = ref<string>();
const treeData = ref<treeType>();
onMounted(async ()=>{
  const {data} = await getCityList();
  treeData.value = data;
});
const treeRef = ref<InstanceType<typeof ElTree>>();
watch(inputLabel,(val:any)=>{
    treeRef.value!.filter(val);
});
const filterNode = (value: string, data: treeType) => {
  if (!value) return true
  return data.label.includes(value)
}
const curNodeLab = ref<string>("");
const handleNodeClick = (data: treeType) => {
    if(!data.children){
        curNodeLab.value = data.label;
        resetTotal();
    }
}

const formRef = ref<FormInstance>();
interface DomainItem {
  startTime:string,
  endTime:string,
  electricity:string,
}
interface formType {
    domains:DomainItem[],
    name:string,
    service:string,
    parking:string,
    note:string,
}
const dynamicValidateForm = ref<formType>({
  domains: [
    {
      startTime:"",
      endTime:"",
      electricity:""
    }
  ],
  name:"",
  service:"",
  parking:"",
  note:"",
})
const rules = reactive<FormRules<formType>>({
    name:[
        {
            required: true,
            message: '模板名字不能为空',
            trigger: 'blur',
        }
    ],
    service:[
        {
            required: true,
            message: '服务费不能为空',
            trigger: 'blur',
        }
    ] ,
    parking:[
        {
            required: true,
            message: '停车费不能为空',
            trigger: 'blur',
        }
    ],    
    note:[
        {
            required: true,
            message: '备注不能为空',
            trigger: 'blur', 
        }
    ]
});
const addDomain = () => {
  dynamicValidateForm.value.domains.push({
    startTime:"",
    endTime:"",
    electricity:"",
  })
}
const submitTotal = ()=>{
    formRef.value?.validate((isValidate:boolean)=>{
        if(isValidate){
            ElMessage({
                    type:'success',
                    message:"创建成功"
            })
            resetTotal();
            console.log(dynamicValidateForm.value);
        }
    });
}
const resetTotal = ()=>{
    dynamicValidateForm.value = {
            domains: [
            {
            startTime:"",
            endTime:"",
            electricity:""
            }
        ],
        name:"",
        service:"",
        parking:"",
        note:"",
    }
    if(formRef.value){
        formRef.value.resetFields();
    }
}
</script>