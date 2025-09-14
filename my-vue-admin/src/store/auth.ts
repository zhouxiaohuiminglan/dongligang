import { loginApi,loginOut } from "@/api/user"
import { defineStore } from "pinia" 
interface LoginParams{
    username:string,
    password:string,
}

export const useUserStore = defineStore("user",{
    state:()=>({
        token:sessionStorage.getItem("token") || null,
        username:sessionStorage.getItem("username")|| "",
        roles:sessionStorage.getItem("roles") ? JSON.parse(sessionStorage.getItem("roles")!) : [],
        menu:sessionStorage.getItem("menulist") ? JSON.parse(sessionStorage.getItem("menulist")!) : []
    }),
    actions:{
       async login(data:LoginParams){
            try{
                let {data:{token,user:{username,roles},menulist}} = await loginApi(data);
                this.token = token;
                this.username = username;
                this.roles = roles;
                this.menu = menulist;
                sessionStorage.setItem("token",token);
                sessionStorage.setItem("username",username);
                sessionStorage.setItem("roles",JSON.stringify(roles));
                sessionStorage.setItem("menulist",JSON.stringify(menulist));
            }catch(error){
            }
        },
        async logout(){
            const res = await loginOut()
            if(res.code === 200){
                this.clearInfo()
            }
        },
        clearInfo(){
            this.token = "";
            this.username = "";
            this.roles = [];
            this.menu = [];
            sessionStorage.clear(); 
        }
    },
})