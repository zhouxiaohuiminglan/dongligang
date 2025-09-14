import { reactive,ref } from "vue";

export function userPagination(loadData:()=>Promise<any>,initPageSize=10){
    const pageInfo = reactive({
        page:1,
        pageSize:initPageSize
    });
    const totals = ref<number>(0);

    const handleSizeChange = (val: number)=>{
        pageInfo.pageSize = val;
        loadData();
    }
    const handleCurrentChange = (val: number)=>{
        pageInfo.page = val;
        loadData();
    }
    const resetData = ()=>{
        pageInfo.page = 1;
        pageInfo.pageSize = initPageSize;
        loadData();
    }
    const setTotal=(val:number)=>{
        totals.value = val;
    }
    return {pageInfo,totals,handleSizeChange,handleCurrentChange,resetData,setTotal}
}