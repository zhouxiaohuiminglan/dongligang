<template>
    <div style="max-width: 600px;">
        <el-steps :active="currentStep" finish-status="success" align-center >
            <el-step v-for="step,index in steps" :key="index" :title="step.title"/>
        </el-steps>
        <div v-if="currentStep === 0" class="mt">
           <slot name="step0"></slot>
        </div>
        <div v-if="currentStep === 1" class="mt">
           <slot name="step1"></slot>
        </div>
        <div v-if="currentStep === 2" class="mt">
           <slot name="step2"></slot>
        </div>
        <div>
            <el-button v-if="currentStep > 0" @click="beforeStep">上一步</el-button>
            <el-button type="primary" @click="neetStep">{{currentStep < steps.length-1 ? "下一步" : "提交" }}</el-button>
        </div>
    </div>
</template>
<script setup lang="ts">
    import {ref, watch} from "vue"
    const currentStep = ref<number>(0);
    const props = defineProps(["steps","form0","form1","form2","drawer"]);
    watch(()=>props.drawer,(vala:boolean)=>{ // 关闭之后，从第一步开始
        if(!vala){
            currentStep.value = 0;
        }
    });
    const emit = defineEmits(['submitForm']);
    const neetStep = ()=>{
        const curForms= [props.form0,props.form1,props.form2];
        curForms[currentStep.value].validate((isValid:boolean)=>{
            if(isValid){
                if(currentStep.value < props.steps.length-1){
                    currentStep.value++;
                }else{
                    console.log("提交表单");
                    currentStep.value = 0;
                    emit("submitForm");
                }
            }
        });
        
    }
    const beforeStep = ()=>{
        if(currentStep.value > 0){
            currentStep.value--;
        }
    }
</script>
<style lang="less" scoped>
</style>
