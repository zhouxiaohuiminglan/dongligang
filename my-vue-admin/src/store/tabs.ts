import {defineStore} from "pinia"
import {ref} from "vue"
interface TabItemType{
    name:string,
    url:string,
    icon:string,
    query?:string,
}
export const useTabsStore = defineStore("tabs",()=>{
    const tabs = ref<TabItemType[]>([]);
    const currentTab = ref<{name:string,url:string}>({name:"",url:""});
    const addTabs = ({name,url,icon,query}:TabItemType)=>{
        if(!tabs.value.some((tab)=>(tab.url === url))){
            tabs.value.push({name:name,url:url,icon:icon,query:query});
        }
    }
    const setCurrentTab = (name:string,url:string)=>{
        currentTab.value = {name:name,url:url};
    }
    const removeTab = (name:string)=>{
        //如果当前高亮
        if(currentTab.value.name === name){
            //找到前一个
            const index = tabs.value.findIndex(item=>item.name === name);
            if(index == 0){
                return;
            }
            const tabVal:TabItemType = tabs.value[index-1];
            currentTab.value = {name:tabVal.name,url:tabVal.url};
        }
        tabs.value = tabs.value.filter(item=>item.name!=name);
    }
    return {tabs,addTabs,currentTab,setCurrentTab,removeTab}
})