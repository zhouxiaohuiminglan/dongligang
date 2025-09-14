import type { MenuItemType } from "@/types/user";
import { ref } from "vue";
//使用递归方法返回对应的数据
interface TreeType {
    label: string
    url:string, //用来做key，做选中要用
    children?: TreeType[]
}
function transformMenu(menus:any):any{
    return menus.map((menuItem:MenuItemType)=>{
        const data = ref<TreeType>({
            label:menuItem.name,
            url:menuItem.url,
        });
       if(menuItem.children){
            data.value.children = transformMenu(menuItem.children);
        }
        return data.value;
    });
}

export {transformMenu}