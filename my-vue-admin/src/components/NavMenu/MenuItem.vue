<template>
    <el-sub-menu v-if="item.children" :index="item.url" >
        <template #title>
            <el-icon>
                <component :is="item.icon"></component>
            </el-icon>
            <span>{{item.name}}</span>
        </template>
        <my-menu v-for="childs in item.children" :key="childs.url" :item="childs"></my-menu>
    </el-sub-menu>
    <el-menu-item :index="item.url" @click="add(item.name,item.url,item.icon)"  v-else v-show="!(item.name == '订单详情')">
        <el-icon>
            <component :is="item.icon"></component>
        </el-icon>
        <span>{{item.name}}</span>
    </el-menu-item>
</template>
<script setup lang="ts">
    // import { defineComponent } from 'vue'
    import type {PropType} from 'vue'
    import type { MenuItemType } from '@/types/user';
    import { useTabsStore } from '@/store/tabs';
    defineOptions({
        name:"MyMenu",
    })
    defineProps({
        item:{
            type: Object as PropType<MenuItemType>,
            required: true,
        },
    })
     const useTabs =  useTabsStore();
    const {addTabs,setCurrentTab} = useTabs;
    const add = (name:string,url:string,icon:string)=>{
        addTabs({name,url,icon});
        setCurrentTab(name,url);
    }
</script>

<style scoped lang="less">
   .is-active{
    background-color: rgb(34, 136, 255);
    color: #fff !important;
    div{
      span{
        color: #fff;
      }
    }
  }
  .el-menu-item:hover{
    background-color: rgb(34, 136, 255) !important;
    color: #fff !important;
  }
  :deep(.el-sub-menu__title:hover){
    background-color: rgb(34, 136, 255) !important;
    color: #fff !important;
  }  
</style>