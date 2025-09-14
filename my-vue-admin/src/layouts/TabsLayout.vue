<template>
    <el-tabs v-model="currentTab.name" class="demo-tabs" @tab-click="handleClick" type="card" closable @tab-remove="remove">
        <el-tab-pane 
          v-for="item in tabs"
          :key="item.name"
          :lable = "item.name"
          :name="item.name"
        >
          <template #label>
            <span class="custom-tabs-label" >
              <el-icon>
                <component :is="item.icon"></component>
              </el-icon>
              <span>&nbsp;{{item.name}}</span>
            </span>
          </template>
        </el-tab-pane>
    </el-tabs>
    <RouterView v-slot="{Component}">
        <KeepAlive>
            <component :is="Component" :key="$route.name" v-if="$route.meta.keepAlive"></component>
        </KeepAlive>
        <component :is="Component" :key="$route.name" v-if="!$route.meta.keepAlive"></component>
    </RouterView>
</template>
<script setup lang="ts">
    import { useTabsStore } from "@/store/tabs";
    import { storeToRefs } from "pinia";
    import { useRouter,useRoute } from "vue-router";
    import { useUserStore } from "@/store/auth";
    interface TabItemType{
        name:string,
        url:string,
        icon:string,
        query?:string,
    }
    const useTabs = useTabsStore();
    const router =  useRouter();
    const route = useRoute();
    const path = route.path;
    const userStore = useUserStore();
    const {menu} = storeToRefs(userStore);
    const {tabs,currentTab} = storeToRefs(useTabs);
    const {setCurrentTab,removeTab,addTabs} = useTabs;
    function findObjByUrl(arr:any,url:string){
      for (const item of arr) {
          if(item.url === url){
             return item;
          }
          if(item.children){
            const found:any = findObjByUrl(item.children,url);
            if(found)return found;
          }
      }
      return null;
    }
    const found:TabItemType = findObjByUrl(menu.value,path);
    const {name,url} = found
    addTabs(found);
    setCurrentTab(name,url);
    const handleClick = ({index}:{index:number}) => {
      const tabData = tabs.value[index];
      setCurrentTab(tabData.name,tabData.url);
      const curUrl = tabData.query ? `${tabData.url}?orderNo=${tabData.query}`: `${tabData.url}`;
      router.push(curUrl);
    }
    const remove = (tabPaneName:string)=>{
      removeTab(tabPaneName);
      router.push(currentTab.value.url);
    }
</script>
<style scoped lang="less">
  .demo-tabs{
    :deep(.is-active){
      background-color: rgb(34, 136, 255) !important;
      color: #fff !important;
    }
  }
</style>