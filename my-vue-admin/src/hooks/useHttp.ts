import { post } from "@/utils/http";
import { reactive, ref, unref,onMounted } from "vue";

export function useHttp<T>(url:string,initialParmas:any){
    const tableData = ref<T[]>([]);
    const pageInfo = reactive({
        page:1,
        pageSize:10
    });
    const totals = ref<number>(0);//要赋初始值，不然会提示 [ElPagination] Deprecated usages detected, please refer to the el-pagination documentation for more details
    const loading = ref<boolean>(false);
    const loadData = async ()=>{
        loading.value = true;
        try {
            const {data:{list,total}}=  await post(url,{...unref(initialParmas),...pageInfo});
            tableData.value = list;
            totals.value = total;
        } catch (error) {
            console.log(error);
        }finally{
            loading.value = false;
        }
    }
    onMounted(()=>{
      loadData();
    })
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
        pageInfo.pageSize = 10;
        loadData();
    }
    return {
            tableData,
            pageInfo,
            totals,
            loading,
            loadData,
            handleSizeChange,
            handleCurrentChange,
            resetData
       }
}