'use strict';
let ipc = require('ipc');

let btnarea = document.querySelector('.btns-con');
let tempresultNode = document.querySelector('.tempresult');
let tempcalNode = document.querySelector('.tempcal');

let tempresult="0",tempcal="",caltype="",tempNum1;//存储输入数字及运算符
let calFlag = false; //是否已经计算过
let calType=""; //计算类型
let calSpeType=false; //特殊计算类型，如根号，
let curCal=false;//当前输入的是计算符

/**
* 处理不同运算符在屏幕上的显示，特殊运算符加表示
* 参数：运算类型
*/
function handleCal(type){
    tempNum1 = parseFloat(tempresult);
    calType = type;    

    switch(type){
        case "+": tempcal = tempresult+ " +";break;
        case "-": tempcal = tempresult+ " -";break;
        case "*": tempcal = tempresult+ " *";break;
        case "/": tempcal = tempresult+ " /";break;
        case "%": tempcal = tempresult+ " %";break;
        case "sqrt": tempcal = "sqrt(" + tempresult+ ")";calSpeType=true;break;
        case "invert": tempcal = "";calSpeType=true;break;
        case "reciproc": tempcal = "reciproc(" + tempresult+ ")";calSpeType=true;break;
        
    }
    curCal = true;
    //tempresult = "0";
}

/**
* 处理浮点数相乘时的误差，就是去小数点相乘后再加上小数点
* 参数：相乘的两个数
*/
function multiply(arg1, arg2) {
    let m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    m += s1.indexOf(".") > -1 ? s1.split(".")[1].length : 0;
    m += s2.indexOf(".") > -1 ? s2.split(".")[1].length : 0;
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}

/**
* 处理点=号后计算结果
* 参数：无
*/
function getResult(){
    let result=0;
    let curNum = tempresult;
    switch(calType){
        case "+": result = tempNum1 + parseFloat(curNum); break;
        case "-":result = tempNum1 - parseFloat(curNum); break;
        case "*": result = multiply(tempNum1,parseFloat(curNum)); break;
        case "/": result = (tempNum1 / parseFloat(curNum)).toFixed(15); break;
        case "%": result = tempNum1 % parseFloat(curNum); break;
        case "sqrt": result = Math.sqrt(parseFloat(tempNum1)); break;
        case "invert": result = -(parseFloat(tempNum1)); break;
        case "reciproc": result = 1 / parseFloat(tempNum1); break;
    }
    calFlag = true;
    return result;
}

/**
* 展示运算出的结果
* 参数：无
*/
function showResult(){
    tempresult += "";
    tempresultNode.innerHTML = tempresult;
    tempcalNode.innerHTML = tempcal;
}


/**
* 对按键绑定点击事件
* 参数：无
*/
btnarea.addEventListener('click', function (e) {
    let btn = e.target;
    let ntype = btn.getAttribute("data-type");
    let nval = btn.getAttribute("data-val");
    switch(ntype){
        case "num": if(calFlag){tempresult = "0";tempcal="";calFlag=false;}if(curCal){tempresult = "0";curCal=false;} tempresult = tempresult == "0" ? nval : tempresult + nval;break;
        case "point":   if(tempresult.indexOf(".") == -1 && !curCal){
                            tempresult += nval;
                            calFlag=false;
                        } 
                        break;
        case "cal": handleCal(nval);calFlag=false;break;
        case "result": tempresult = getResult();tempcal="";break;
        case "clear": tempresult = "0";tempcal="";calFlag=false;calSpeType=false;break;
    }
    //特殊运算符点了后直接算结果
    if(calSpeType){
        tempresult = getResult();
        calSpeType = false;
    }
    showResult();
});

document.querySelector(".about").addEventListener('click', function (e) {
    ipc.send('open-about-window');
});
