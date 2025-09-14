exports.getDocumentData = (ctx)=>{
    const data = {
        type:["招商类","广告类","公告类","提示类","日常类","告警类","其他"],//文章类型
        important:["一级","二级","三级","四级"],//重要程度
        publish:["站内信","公众号","小程序","H5","官网"]//发布渠道
    }
    ctx.success('成功',data)
}