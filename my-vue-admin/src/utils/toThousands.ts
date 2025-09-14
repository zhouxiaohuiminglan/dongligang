function fmtNumToThousands(num:number):string{
    if(isNaN(num) || typeof(num) != "number"){
        throw new Error("非法字符");
    }
    const [integerVal,decimalVal] = num.toString().split("."); // 1234.7
    let formatInteger = ""; //保存字符
    for(let i = integerVal.length -1 ;i>=0;i--){
        formatInteger = integerVal[i] + formatInteger;
        if((integerVal.length-i) % 3 === 0 && i!=0){
            formatInteger = "," + formatInteger;
        }
    }
    return decimalVal ? `${formatInteger}.${decimalVal}` : formatInteger;
}

export default fmtNumToThousands