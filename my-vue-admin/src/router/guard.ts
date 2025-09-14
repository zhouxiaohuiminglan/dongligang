import { useUserStore } from "@/store/auth";
import router from ".";
router.beforeEach((to)=>{
    let useStore = useUserStore();
    let isLogin = useStore.token;
    if(!isLogin){ //未登录
        if(to.path !="/login"){
            return {path:"/login"};
        }
    }else{
        if(to.path === "/login"){
            return {path:"/"};
        }
        if(to.meta?.needAuth && !useStore.roles.some((role:string)=>(to.meta.needAuth as string[]).includes(role))){
            return {path:"/"};
        }
    }
})