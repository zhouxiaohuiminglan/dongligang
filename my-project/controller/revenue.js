const {findRevenueList} = require('../models/revenue')
exports.getSale = (ctx)=>{
    const list = [
        {
          name:"销售",
          data:[60, 40, 120, 140, 160, 80, 140]
        },
        {
          name:"访问量",
          data:[600, 400, 600, 700, 800, 400, 700]
        },
      ]
    ctx.success('成功',{list})
}
exports.getRevenueList = async (ctx)=>{
    const {name,page,pageSize} = ctx.request.body
    let revenueList = await findRevenueList()
    if(name){
        revenueList = revenueList.filter(item=>item.name === name);
    }
    //实现分页
    const total = revenueList.length;
    const start = (page-1)*pageSize;
    const list = revenueList.slice(start,start + pageSize);
    ctx.success('成功',{list,total})
}