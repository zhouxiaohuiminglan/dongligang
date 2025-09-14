<template>
    <div id="container"></div>
</template>
<script lang="ts" setup>
    import AMapLoader from '@amap/amap-jsapi-loader';
    import { onMounted, onUnmounted,ref} from 'vue';
    import { getMapList } from '@/api/map';
    import flashIcon from "@/assets/flashIcon.png"
    import station from "@/assets/station.jpg"
    let map:any = null;
    const markersData = ref<any[]>([]);
    const getStatusLab = (status:number)=>{
        let curStatus:string = "";
        if(status == 1){
            curStatus = "空闲中";
        }else if(status == 2){
            curStatus = "充电中";
        }else if(status == 3){
            curStatus = "连接中";
        }else if(status == 4){
            curStatus = "排队中";
        }else if(status == 5){
            curStatus = "已预约";
        }else if(status == 6){
            curStatus = "故障/离线";
        }
        return curStatus;
    }
    onMounted(()=>{
          AMapLoader.load({
            key: "7066344199d5d8c8bd499c1d4bfc1984", // 申请好的Web端开发者Key，首次调用 load 时必填
            version: "1.4.15", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            plugins: [], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
        }) .then((AMap) => {
            map = new AMap.Map("container", {
                // 设置地图容器id
                viewMode: "3D", // 是否为3D地图模式
                zoom: 5, // 初始化地图级别
                center: [116.397428, 33.90923], // 初始化地图中心点位置
            });
            const infoWindow = new AMap.InfoWindow({
                offset: new AMap.Pixel(0, -30),
            });
            getMapList().then(({data})=>{
                markersData.value = data.list;
                markersData.value.forEach(markerData => {
                    const marker = new AMap.Marker({
                        position: [markerData.position.x,markerData.position.y],
                        icon: flashIcon, //添加 icon 图标 URL
                        title:markerData.title
                    });
                    map.add(marker);
                     //创建点标记的点击事件
                    marker.on("click", function () {
                        infoWindow.setContent(`
                            <div style="display: flex;padding: 10px;align-items: center;">
                                <img src="${station}" style="width:200px"/>
                                <div style="width:180px;line-height:30px;margin-left:20px">
                                    <h3>${markerData.title}</h3>
                                    <p>充电桩数量：${markerData.count}</p>
                                    <p>充电桩状态：${getStatusLab(markerData.status)}</p>
                                </div>
                            </div>
                        `);
                        infoWindow.open(map,marker.getPosition());
                    });
                });
                
                
            });
        })
        .catch((e) => {
        console.log(e);
        });
    });
    onUnmounted(() => {
        map?.destroy();
    });
</script>
<style  scoped>
    #container{
        width: 100%;
        height: 80vh;
        
    }
</style>