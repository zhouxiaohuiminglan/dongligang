import { createRouter,createWebHistory } from "vue-router";
import routes from "./BasicRouterMap";

const router = createRouter({
        history:createWebHistory(),
        routes
    } 
)

export default router