import type { Ref } from "vue";
import {markRaw, onMounted, onUnmounted, ref} from "vue"
import * as echarts from 'echarts';
export function useChart(chartRef:Ref<HTMLElement| null>,setChartDara:any){
    const chartInstance:Ref<echarts.ECharts|null> = ref(null);
    const initChart = async ()=>{
        if(chartRef.value){
            //vue响应式与echarts响应式有冲突，关闭vue的响应式
            chartInstance.value = markRaw(echarts.init(chartRef.value));
            const options = await setChartDara();
            chartInstance.value.setOption(options);
        }
    }
    const resizeChart = ()=>{
            chartInstance.value?.resize();
    }
    onMounted(()=>{
        initChart();
        window.addEventListener("resize",resizeChart);
    });

    onUnmounted(()=>{
        window.removeEventListener("resize",resizeChart);
        if(chartInstance.value){
            chartInstance.value.dispose();
        }
    })
    
}