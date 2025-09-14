<template>
    <el-row :gutter="20">
        <el-col :span="18">
            <el-card>
                <MapContainer/>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card class="des">
                <div>1.累计充电站数：<el-text type="primary">34个</el-text></div>
                <div>2.单省份最多充电桩：<el-text type="primary">北京(4个)</el-text></div>
                <div>3.充电站遍及省份：<el-text type="primary">14个</el-text></div>
                <div>4.暂无充电站省份：<el-text type="primary">22个</el-text></div>
                <div>5.累计充电站：<el-text type="primary">北京(4个)</el-text></div>
                <div>6.单日营收最高：<el-text type="primary">北京西单充电站</el-text></div>
                <div>7.单日营收最低：<el-text type="primary">南宁青秀山充电站</el-text></div>
                <div>8.故障率最高：<el-text type="primary">兰州黄河桥充电站</el-text></div>
            </el-card>
            <el-card class="mt">
                <template #header>
                    <div class="card-header">
                        <h1>新增站点地图</h1>
                    </div>
                </template>
                <el-form :model="fromVal" style="max-width: 600px;" label-width="100px" :rules="rules" ref="formRef">
                    <el-form-item  label="站点名称：" prop="name">
                        <el-input  placeholder="请输入站点名称" v-model="fromVal.name"/>
                    </el-form-item>
                    <el-form-item label="充电桩数量：" prop="count">
                        <el-input placeholder="请输入站点地址" v-model="fromVal.count"/>
                    </el-form-item>
                    <el-form-item label="站点经度：" prop="location1">
                        <el-input placeholder="请输入站点经度" v-model="fromVal.location1"/>
                    </el-form-item>
                    <el-form-item label="站点纬度：" prop="location2">
                        <el-input placeholder="请输入站点纬度" v-model="fromVal.location2"/>
                    </el-form-item>
                    <el-form-item label="状态:" prop="status">
                        <el-radio-group v-model="fromVal.status">
                            <el-radio :value="1" size="large">空闲中</el-radio>
                            <el-radio :value="2" size="large">充电中</el-radio>
                            <el-radio :value="3" size="large">连接中</el-radio>
                            <el-radio :value="4" size="large">排队中</el-radio>
                            <el-radio :value="5" size="large">已预约</el-radio>
                            <el-radio :value="6" size="large">故障/离线</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item >
                        <el-button type="primary" @click="addMap">创建</el-button>
                        <el-button style="margin-left: 70px;" @click="reset">清空</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-col>
    </el-row>
    
</template>
<script lang="ts" setup>
    import MapContainer from '@/components/Map/MapContainer.vue';
    import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
    import { reactive, ref } from 'vue';
    import { addMap as addStation } from '@/api/map';
    const fromVal = reactive({
        name:"",
        count:null,
        location1:"",
        location2:"",
        status:1,
    });
    const rules = reactive<FormRules<any>>({
        name:{
            trigger: 'blur',
            required:true,
            message: '请输入站点名称'
        },
        count:{
            trigger: 'blur',
            required:true,
             message: '请输入充电桩数量'
        },
        location1:{
            trigger: 'blur',
            required:true,
             message: '请输入站点经度'
        },
        location2:{
            trigger: 'blur',
            required:true,
            message: '请输入站点纬度'
        },
        status:{
            trigger: 'blur',
            required:true,
        }
    });
    const addMap = ()=>{
        formRef.value?.validate(async(isValidate:boolean)=>{
            if(isValidate){
                const res  = await addStation(fromVal)
                if(res.code === 200){
                    ElMessage({
                        type:"success",
                        message:res.data.message
                    })
                    reset();
                }
            }
        })
    }
    const formRef = ref<FormInstance>();
    const reset = ()=>{
        formRef.value?.resetFields();
    }
</script>
<style lang="less">
    .des{
        line-height: 35px;
    }
</style>