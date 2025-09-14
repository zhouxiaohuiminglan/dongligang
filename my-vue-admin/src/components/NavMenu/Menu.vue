<template>
    <div class="logo">
        <img :src="logo" style="width:34px;height: 34px;"/>
        <h1>动力港</h1>
    </div>
    <!-- :router="true" :default-active="$route.path" -->
    <el-menu :router="true" :default-active="$route.path">
        <menu-item v-for="items in menu" :key="items.url" :item="items" ></menu-item>
    </el-menu>
</template>
<script setup lang="ts">
  import { useUserStore } from '@/store/auth';
  import MenuItem from "./MenuItem.vue"
  import logo from "@/assets/logo.png"
  import { storeToRefs } from 'pinia';
  const userStore = useUserStore();
  const {menu} = storeToRefs(userStore) ;
</script>
<style scoped lang="less">
  .logo{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    padding: 10px 0;
    img{
      margin-left: -10px;
    }
    h1{
      margin-left: 10px;
      color: #333;
      font-size: 22px;
    }
  }
  .el-menu{
      border-right: none;
  }

</style>