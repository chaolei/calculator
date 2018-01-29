'use strict';

//const ipc = require('ipc');

let btnarea = document.querySelector('.btns-con');
let tempresult="0",tempcal="",caltype="",tempNum1;
let tempresultNode = document.querySelector('.tempresult');
let tempcalNode = document.querySelector('.tempcal');
let calFlag = false; //是否已经计算过
let calType=""; //计算类型

function handleCal(type){
    tempNum1 = parseFloat(tempresult);
    calType = type;    

    switch(type){
        case "+": tempcal = tempresult+ " +";break;
        case "-": tempcal = tempresult+ " -";break;
        case "*": tempcal = tempresult+ " *";break;
        case "/": tempcal = tempresult+ " /";break;
    }
    tempresult = "0";
}

function getResult(){
    let result=0;
    let curNum = tempresult;
    switch(calType){
        case "+": result = tempNum1 + parseFloat(curNum); break;
        case "-":result = tempNum1 - parseFloat(curNum); break;
        case "*": result = tempNum1 * parseFloat(curNum); break;
        case "/": result = tempNum1 / parseFloat(curNum); break;
    }
    calFlag = true;
    return result;
}

btnarea.addEventListener('click', function (e) {
    let btn = e.target;
    let ntype = btn.getAttribute("data-type");
    let nval = btn.getAttribute("data-val");
    switch(ntype){
        case "num": if(calFlag){tempresult = "0";calFlag=false;} tempresult = tempresult == "0" ? nval : tempresult + nval;break;
        case "point":   if(tempresult.indexOf(".") == -1){
                            tempresult += nval;
                            calFlag=false;
                        } 
                        break;
        case "cal": handleCal(nval);break;
        case "result": tempresult = getResult(nval);tempcal="";break;
    }
    tempresult += "";
    tempresultNode.innerHTML = tempresult;
    tempcalNode.innerHTML = tempcal;
});
