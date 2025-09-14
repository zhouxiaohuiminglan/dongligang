import service from "./axios";

export interface ResponseData{
    code:number,
    message:string,
    data:any
}

function get(url:string,params?:any):Promise<ResponseData>{
    return service.get(url,{params});
}

function post(url:string,data?:any):Promise<ResponseData>{
    return service.post(url,data);
}

export {get,post}