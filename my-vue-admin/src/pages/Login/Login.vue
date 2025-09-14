<template>
    <div class="bg">
        <div class="login">
            <div class="logo">
                <img :src="logoImg" style="width: 70px;height: 70px;"/>
                <h1 class="ml">动力港能源平台</h1>
            </div>
            <el-form :model="ruleForm" :rules="rules" ref="formRef">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" prefix-icon="User" placeholder="请输入用户名"/>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="ruleForm.password" prefix-icon="Lock" placeholder="请输入密码" show-password/>
                </el-form-item>
                <el-button type="primary" style="width: 100%;" @click="handleLogin">登录</el-button>
            </el-form>
        </div>
    </div>
</template>
<script setup lang="ts">
    import logoImg from "@/assets/logo.png"
    import type { FormInstance, FormRules } from "element-plus";
    import { reactive, ref } from "vue";
    import { useUserStore } from "@/store/auth";
    import { useRouter } from "vue-router";
    interface RuleForm {
        username:string,
        password:string
    }
    const ruleForm:RuleForm = reactive({
        username:"",
        password:""
    })
    const userStore = useUserStore();
    const useRoute = useRouter();
    const formRef = ref<FormInstance>();
    const handleLogin = ()=>{
        formRef.value?.validate( async (isValid:boolean)=>{
            if(isValid){ //验证通过，登录
                await userStore.login(ruleForm);
                useRoute.push("/");
            }
        });
    }
    const rules = reactive<FormRules<RuleForm>>({
            username:[
                {required:true,message:'请输入用户名',trigger:'blur'},
                {min:4,max:8,message:'必须是4-8位字母与数字组合',pattern:/^[a-z0-9A-Z]{4,8}$/,trigger:'blur'}
            ],
            password:[
                {required:true,message:'请输入密码',trigger:'blur'},
                {pattern:/^[a-z0-9A-Z]{1,10}$/,message:'必须是10位以内的数字字母组合',trigger:'blur'}
            ],
        })
</script>

<style lang="less" scoped>
.bg{
    background-image:url("../../assets/bg.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100vh;
    .login{
        width: 500px;
        height: 300px;
        padding: 50px;
        box-shadow: 0 0 10px 10px #f4f4f4;
        text-align: center;
        position: absolute;
        top: 50%;
        margin-top: -200px; // (300 + 2*50）/2
        left: 10%;
        .logo{
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 40px;
            h1{
                color: rgb(14, 53, 148);
            }
        }
    }
}
</style>