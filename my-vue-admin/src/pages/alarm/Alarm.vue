<template>
    <el-card>
        <el-radio-group v-model="radio1" size="large" @change="menuChange">
            <el-radio-button label="严重告警" :value="1"></el-radio-button>
            <el-radio-button label="紧急告警" :value="2"></el-radio-button>
            <!-- <el-radio-button label="重要告警" :value="3"></el-radio-button> -->
            <el-radio-button label="一般告警" :value="3"></el-radio-button>
        </el-radio-group>
    </el-card>
    <el-card class="mt" v-for="item in showList" :key="item.equNo">
        <el-alert :title="`${item.address}充电桩异常`" type="warning" show-icon />
        <el-card class="mt" >
            <el-descriptions :column="4" :border="true" direction="vertical">
                <el-descriptions-item v-for="(descItem,key) in item"  :label="getCurLab(key)">
                    <el-tag 
                    v-if="key == 'level'"
                    :type="descItem == 1? 'danger' : (descItem == 2) ? 'warning':'info'"
                    >{{descItem == 1? '严重' : (descItem == 2) ? '紧急':'一般'}}</el-tag>
                    <el-text 
                        v-else-if="key == 'status'"
                        :type= "descItem == 1? 'danger' : (descItem == 2) ? 'warning':'info'"
                    >
                    {{descItem == 1? '待指派' : (descItem == 2) ? '处理中':'处理异常'}}
                    </el-text>
                    <span v-else>{{descItem}}</span>
                    
                </el-descriptions-item>
                <el-descriptions-item label="操作">
                    <el-button @click="drawer = true" :type="item.status == 2 ? 'warning' : 'primary'">{{item.status == 1? '指派' : (item.status == 2) ? '催办':'查看'}}</el-button>
                </el-descriptions-item>
            </el-descriptions>
        </el-card>
    </el-card>

    <el-drawer
            v-model="drawer"
            title="报警任务指派"
            @close="drawerClose"
        >
        <StepForm :steps="steps" :form0="form0" :form1="form1" :form2="form2" :drawer="drawer" @submitForm="handleSubmit">
            <template #step0>
                <el-form ref="form0" :model="ruleForm.basicInfo" :rules="basicRules">
                    <el-form-item label="姓名：" prop="name">
                        <el-input v-model="ruleForm.basicInfo.name" />
                    </el-form-item>
                    <el-form-item label="邮箱：" prop="email">
                        <el-input v-model="ruleForm.basicInfo.email" />
                    </el-form-item>
                    <el-form-item label="电话：" prop="tel">
                        <el-input maxlength="11" v-model="ruleForm.basicInfo.tel"/>
                    </el-form-item>
                    <el-form-item label="工号：" prop="empno">
                        <el-input  v-model="ruleForm.basicInfo.empno"/>
                    </el-form-item>
                    <el-form-item label="是否加急：">
                        <el-switch v-model="ruleForm.basicInfo.ugent" />
                    </el-form-item>
                    <el-form-item label="其他选项：" >
                        <el-checkbox-group v-model="ruleForm.basicInfo.other">
                            <el-checkbox :value="1" label="更换设备" size="large" />
                            <el-checkbox :value="2" label="仅维修" size="large" />
                            <el-checkbox :value="3" label="需拍照" size="large" />
                            <el-checkbox :value="4" label="需报备" size="large" />
                        </el-checkbox-group>
                        
                    </el-form-item>
                    <el-form-item label="其他备注信息：">
                        <el-input v-model="ruleForm.basicInfo.note" type="textarea"/>
                    </el-form-item>
                </el-form>
            </template>
            <template #step1>
                <el-form ref="form1" :model="ruleForm.shenpi" :rules="shenpiRules">
                    <el-form-item label="审批部门：" prop="a">
                        <el-select placeholder="选择部门" v-model="ruleForm.shenpi.a">
                            <el-option label="总裁办" :value="1">
                            </el-option>
                            <el-option label="运营部" :value="2">

                            </el-option>
                            <el-option label="维修部" :value="3">

                            </el-option>
                            <el-option label="市场部" :value="4">

                            </el-option>
                            <el-option label="财务部" :value="5">

                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="抄送部门：" prop="b" >
                        <el-select placeholder="选择部门" v-model="ruleForm.shenpi.b" >
                            <el-option label="总裁办" :value="1">
                            </el-option>
                            <el-option label="运营部" :value="2">

                            </el-option>
                            <el-option label="维修部" :value="3">

                            </el-option>
                            <el-option label="市场部" :value="4">

                            </el-option>
                            <el-option label="财务部" :value="5">

                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </template>
            <template #step2>
                <el-form ref="form2" :model="ruleForm.fzr" :rules="fzrRules">
                    <el-form-item label="负责人姓名：" prop="name">
                        <el-input v-model="ruleForm.fzr.name" />
                    </el-form-item>
                    <el-form-item label="负责人电话：" prop="tel">
                        <el-input  maxlength="11" v-model="ruleForm.fzr.tel" />
                    </el-form-item>
                </el-form>
            </template>
        </StepForm>
        <el-result
            icon="warning"
            title="设备编号：CD1001"
            sub-title="该任务已催促2次，请抓紧处理"
        >
            <template #extra>
            <el-button type="primary" @click="drawer =false">我已知晓</el-button>
            </template>
        </el-result>
    </el-drawer>
</template>
<script setup lang="ts">
    import {onMounted, ref} from "vue"
    import { getAlarmList } from "@/api/alarm"
    import { getCurLab } from "./formatAlarmMap"
    import StepForm from "@/components/StepComponent/StepForm.vue"
    import type { FormInstance} from "element-plus";
    import { submitAlarmData } from "@/api/alarm";
    interface alarmInfoType{
        description: string,
        address: string,
        equNo: string,
        level: number,//1严重 2紧急 3一般
        time: string,
        code: number,//故障代码
        status: number,//1待指派 2处理中 处理异常
    }
    const radio1 = ref<number>(1);
    const arlamList = ref<alarmInfoType[]>([]);
    const showList = ref<alarmInfoType[]>([]);
    onMounted(async ()=>{
        const {data} = await getAlarmList();
        arlamList.value = data;
        showList.value = data.filter((item:any)=>item.level == 1);
    });
    const menuChange = (value:number)=>{
        showList.value = arlamList.value.filter((item:any)=>item.level == value);
    }
    const drawer = ref<boolean>(false);
    const steps = [
        {title:"基本信息"},
        {title:"审批信息"},
        {title:"负责人信息"}
    ]
    const form0 = ref<FormInstance>();
    const form1 = ref<FormInstance>();
    const form2 = ref<FormInstance>();
    interface FormType {
        basicInfo:{
            name:string,
            email:string,
            tel:string,
            empno:string,
            ugent:boolean,
            other:[],
            note:string
        },
        shenpi:{
            a:string,
            b:string,
        },
        fzr:{
            name:string,
            tel:string,
        }
    }
    const ruleForm = ref<FormType>({
        basicInfo:{
            name:"",
            email:"",
            tel:"",
            empno:"",
            ugent:true,
            other:[],
            note:""
        },
        shenpi:{
            a:"",
            b:"",
        },
        fzr:{
            name:"",
            tel:"",
        }
    });
    const basicRules={
        name:[
            {required:true,message:"请输入姓名",trigger:"blur"}
        ],
        email:[
            {required:true,message:"请输入邮箱",trigger:"blur"}
        ],
        tel:[
            {required:true,message:"请输入电话",trigger:"blur"}
        ],
        empno:[
            {required:true,message:"请输入工号",trigger:"blur"}
        ]
    }
    const shenpiRules={
        a:[
            {required:true,message:"请输入审批部门",trigger:"blur"}
        ],
        b:[
            {required:true,message:"请输入抄送部门",trigger:"blur"}
        ],
    }
    const fzrRules={
        name:[
            {required:true,message:"请输入名字",trigger:"blur"}
        ],
        tel:[
            {required:true,message:"请输入电话",trigger:"blur"}
        ],
    }
    const drawerClose = ()=>{
        ruleForm.value = {
            basicInfo:{
                name:"",
                email:"",
                tel:"",
                empno:"",
                ugent:true,
                other:[],
                note:""
            },
            shenpi:{
                a:"",
                b:"",
            },
            fzr:{
                name:"",
                tel:"",
            }
        }
        form0.value?.resetFields();
        form1.value?.resetFields();
        form2.value?.resetFields();
    }
    const handleSubmit = async ()=>{
        console.log(ruleForm.value);
        try {
            const res = await submitAlarmData(ruleForm.value);
            if(res.code == 200){
                //提交表单
                drawer.value = false;
                drawerClose();
            }
        } catch (error) {
            
        }
        
    }
</script>