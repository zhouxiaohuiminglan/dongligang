import { useUserStore } from "@/store/auth"
export default {
    //自定义按钮指令实现按钮控制
    beforeMount(el:any,binding:any){
        const userStore = useUserStore();
        const {roles} = userStore;
        const binds = binding.value;
        //检测两个数组是否有交集，如果没有就隐藏
        if(!roles.some((role:any)=>{
            console.log(binds.includes(role));
           return binds.includes(role);
        })){
            el.style.display = 'none';
        }
    }
}