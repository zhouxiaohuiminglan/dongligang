<template>
    <el-card>
        <div>
            <span class="title">文章类型：</span>
            <el-tag :type="currentIndex[0] == -1 ? 'primary':'info'" @click="handleSelct(0,-1)">全部</el-tag> 
            <el-tag class="ml" :type="currentIndex[0] == index ? 'primary':'info'" v-for="item,index in documentData.type" :key="item" @click="handleSelct(0,index,item)">{{item}}</el-tag> 
        </div>
        <div class="mt">
            <span class="title">重要程度：</span>
            <el-tag :type="currentIndex[1] == -1 ? 'primary':'info'" @click="handleSelct(1,-1)">全部</el-tag> 
            <el-tag class="ml" :type="currentIndex[1] == index ? 'primary':'info'" v-for="item,index in documentData.important" :key="item" @click="handleSelct(1,index,item)">{{item}}</el-tag> 
        </div>
        <div class="mt">
            <span class="title">发布渠道：</span>
            <el-tag :type="currentIndex[2] == -1 ? 'primary':'info'" @click="handleSelct(2,-1)">全部</el-tag> 
            <el-tag class="ml" :type="currentIndex[2] == index ? 'primary':'info'" v-for="item,index in documentData.publish" :key="item" @click="handleSelct(2,index,item)">{{item}}</el-tag> 
        </div>
        <el-divider/>
        <div>
            <span class="title">已选</span>
            <el-tag type="success" class="ml" closable v-for="curItem,index in selectArr" :key="index" @close="closeTag(curItem)">{{curItem.value}}</el-tag>
        </div>
    </el-card>
    <el-button class="mt mb" type="primary" @click="submitDocu">导出富文本到Excel</el-button>
    <editor
      v-model="editorContent"
      apiKey="xvbamfm2vokka8qoim9r801qtdlldskjschd51yha7zhuusp"
      :init="{
        language:'zh_CN',
        plugins: 'advlist anchor autolink charmap code fullscreen help image insertdatetime link lists media preview searchreplace table visualblocks wordcount',
      }"
    />
</template>
<script setup lang="ts">
    import { getDocumentTitle } from '@/api/document';
    import { onMounted, ref } from 'vue';
    import Editor from '@tinymce/tinymce-vue'
    interface documentType {
        type:string[],
        important:string[],
        publish:string[],
    }
    const documentData = ref<documentType>({
        type:[],
        important:[],
        publish:[],
    });
    const currentIndex = ref([-1,-1,-1]);
    interface selectType {
        idx:number,
        value:string
    }
    const selectArr = ref<selectType[]>([]);
    onMounted(async ()=>{
        const {data} = await getDocumentTitle();
        console.log(data);
        documentData.value = data;
    });
    const handleSelct = (key:number,index:number,curTitle?:string)=>{
        currentIndex.value[key] = index;
        let findIdx = selectArr.value.findIndex((item:selectType) => item.idx === key);
        if(curTitle){
            //先判断数组中有没有添加进去 
            if(findIdx!=-1){
                selectArr.value[findIdx] = {idx:key,value:curTitle};
            }else{
                selectArr.value.push({idx:key,value:curTitle});
            }
        }else{
            //删掉对应的
            //selectArr.value.splice(findIdx,1); 这种方式也可以
            selectArr.value = selectArr.value.filter((item:selectType) => item.idx != key);
        }
    }
    const closeTag = (curData:selectType)=>{
        // let index = selectArr.value.findIndex(item => item.idx ===curData.idx);
        // selectArr.value.splice(index,1);
        selectArr.value = selectArr.value.filter((item:selectType) => item.idx != curData.idx);
        currentIndex.value[curData.idx] = -1;
    }
    const editorContent = ref("");
    const submitDocu = ()=>{
        const blob = new Blob([editorContent.value],{type:"text/html"});
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'document.html';
        link.click();
        URL.revokeObjectURL(link.href);
    }
</script>
<style scoped lang="less">
    .title{
        display: inline-block;
        font-size: 14px;
    }
    .el-tag{
        cursor: pointer;
    }
</style>