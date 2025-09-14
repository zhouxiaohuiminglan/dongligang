<template>
    <div class="header">
        <div class="personal">
            <el-badge :is-dot="info > 0" class="item">
                <el-icon><Bell /></el-icon>
            </el-badge>
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" class="ml mr"/>
            <el-dropdown @command="handleTop">
                <span class="el-dropdown-link">
                欢迎您，{{username}}
                <el-icon class="el-icon--right">
                    <arrow-down />
                </el-icon>
                </span>
                <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item icon="user" command="user">个人中心</el-dropdown-item>
                    <el-dropdown-item icon="switchButton" command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>
<script setup lang="ts">
    import {ref} from "vue"
    import { useUserStore } from "@/store/auth";
    import { storeToRefs } from "pinia";
    import { useRouter } from "vue-router";
    const info = ref(5);
    const userStore = useUserStore();
    //storeToRefs是Pinia状态管理库提供的工具函数，用于在Vue3组合式API中解构Store状态时保持响应性‌。它通过将Store实例的属性转换为ref对象，解决了直接解构导致的响应性丢失问题。‌‌
    const {username} = storeToRefs(userStore);
    const useRoute = useRouter();
    const handleTop = async (val:string)=>{
        if(val == "user"){
            useRoute.push("/personal");
        }else{
            await userStore.logout();
            useRoute.push("/login");
        }
    }
</script>
<style scoped lang="less">
    .header{
        background-color: white;
        height: 60px;
        padding: 0 20px;
        .personal{
            float: right;
            display: flex;
            align-items: center;
            /*
            justify-content: center; 水平居中 
            align-items: center;     垂直居中 
            */
            height: 60px;
            .item{
                margin-top: 10px;
            }
        }
    }
</style>

