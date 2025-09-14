<template>
    <el-row :gutter="20">
        <el-col :span="12">
            <el-card >
                <el-descriptions
                        :column="3"
                        :border="true"
                        direction="vertical"
                    >
                    <el-descriptions-item 
                    label="个人头像" 
                    :rowspan="2" 
                    :width="140"
                    :align="'center'"
                    >
                        <el-image
                            style="width: 100px; height: 100px"
                            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                        />
                    </el-descriptions-item>
                    <el-descriptions-item label="姓名">
                        {{username}}
                    </el-descriptions-item>
                    <el-descriptions-item label="电话">
                        18888888888
                    </el-descriptions-item>
                    <el-descriptions-item label="地址">
                        北京朝阳区
                    </el-descriptions-item>
                    <el-descriptions-item label="个人标签">
                        <el-tag type="primary">认真</el-tag>
                        <el-tag type="success">工作狂</el-tag>
                        <el-tag type="info">与人和善</el-tag>
                        <el-tag type="warning">代码洁癖</el-tag>
                    </el-descriptions-item>
                </el-descriptions>
            </el-card>
            <el-card class="mt">
                <el-calendar v-model="dateValue" />
            </el-card>
            <el-card class="mt">
                <template #header>
                    <div class="card-header">
                        <span>完善个人资料</span>
                    </div>
                </template>
                <el-row >
                    <el-col :span="18">
                        <StepForm :steps="steps" :form0="personalRef" :form1="personalRef1"  @submitForm="handleSubmit">
                            <template #step0>
                                <el-form ref="personalRef" :model="inputParams" :rules="rules">
                                    <el-form-item label="姓名：" prop="name">
                                        <el-input v-model="inputParams.name" />
                                    </el-form-item>
                                    <el-form-item label="电话：" prop="tel">
                                        <el-input v-model="inputParams.tel" />
                                    </el-form-item>
                                    <el-form-item label="地址：" prop="address">
                                        <el-input v-model="inputParams.address" />
                                    </el-form-item>
                                </el-form>
                            </template>
                            <template #step1>
                               <el-form ref="personalRef1" :model="inputParams1" :rules="rules1">
                                    <el-form-item prop="status">
                                        <el-select placeholder="请选择在职状态" v-model="inputParams1.status">
                                            <el-option label="工作中" :value="1"></el-option>
                                            <el-option label="请假中" :value="2"></el-option>
                                            <el-option label="出差中" :value="3"></el-option>
                                            <el-option label="年假中" :value="4"></el-option>
                                        </el-select>
                                    </el-form-item>
                               </el-form>
                                
                            </template>
                        </StepForm>
                    </el-col>
                    <el-col :span="6">
                        <div style="text-align: center;">
                            <h1 class="mb">资料完善度</h1>
                            <el-progress type="circle" :percentage="85" />
                        </div>
                        
                    </el-col>
                </el-row>
            </el-card>
        </el-col>
        <el-col :span="12">
            <el-card>
                <el-badge :value="12" class="item">
                    <el-button>comments</el-button>
                </el-badge>
                <el-badge :value="3" class="item">
                    <el-button>replies</el-button>
                </el-badge>
                <el-badge :value="1" class="item" type="primary">
                    <el-button>comments</el-button>
                </el-badge>
                <el-badge :value="2" class="item" type="warning">
                    <el-button>replies</el-button>
                </el-badge>
            </el-card>
            <el-card class="mt">
                <el-collapse v-model="activeNames" >
                    <el-collapse-item name="1" title="账号注销通知！">
                        <div style="display: flex;justify-content: space-between;" >
                            <h1>员工离职，账号需要注销，请及时处理！</h1>
                            <el-button class="fr" type="primary" size="small" v-permission="['admin']">去处理</el-button>
                        </div>
                    </el-collapse-item>
                    <el-collapse-item name="2" title="权限变更通知！">
                        <h1>王丽丽因部门调动账号权限需调整！</h1>
                    </el-collapse-item>
                </el-collapse>
            </el-card>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
    import { useUserStore } from '@/store/auth';
    import { storeToRefs } from 'pinia';
    import {ref} from "vue"
    import StepForm from "@/components/StepComponent/StepForm.vue"
    import type { FormInstance, FormRules } from 'element-plus';
    import { upPersonal } from '@/api/personal';
    const useStore = useUserStore();
    const {username} = storeToRefs(useStore);
    const dateValue = ref(new Date());
    const steps = [
        {title:"基本信息"},
        {title:"在职信息"}
    ]
    interface personalType{
        name:string,
        tel:string,
        address:string,
    }
    const inputParams = ref<personalType>({
        name:"",
        tel:"",
        address:"",
    });

    const inputParams1 = ref({
        status:"",
    });

    const rules = ref<FormRules<personalType>>({
        name:[
          {required:true,message:"请输入姓名",trigger:'blur'}
        ],
        tel:[
          {required:true,message:"请输入电话",trigger:'blur'}
        ],
        address:[
          {required:true,message:"请输入地址",trigger:'blur'}
        ],
    });
    const rules1 = ref({
        status:[
          {required:true,message:"请输入状态",trigger:'blur'}
        ],
    });
    const personalRef = ref<FormInstance>();
    const personalRef1 = ref<FormInstance>();
    const handleSubmit = async()=>{
       const res =  await upPersonal({...inputParams.value,...inputParams1.value});
       if(res.code == 200){
            inputParams.value = {
                name:"",
                tel:"",
                address:""
            }
            inputParams1.value = {
                status:""
            }
       }
    }
    const activeNames =ref([]);
</script>
<style lang="less" scoped>
    .el-tag{
        margin-left: 20px;
    }
    .item {
        margin-right: 40px;
    }
</style>