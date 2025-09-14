interface StationType{
    name:string,
    id:string,
    city:string,
    fast:string,
    now:string,
    slow:string,
    status:number,
    fault:string,
    person:string,
    tel:string
}

interface RevenueType{
    name:string,
    id:string,
    city:string,
    count:string,// 充电桩总数量
    electricity:string,//电费
    parkingFee:string,//停车费
    serviceFee:number,//服务费
    month:string,//月度总收入
    member:string,//会员储值金
    percent:string//日增长比例
    mpercent:string//月增长比例
}

export  type {StationType,RevenueType}