
function showResult(result){
    const display = document.querySelector('.result');
    display.textContent = result 

}

function showExpression(expression){
    const display = document.querySelector('.expression');
    display.textContent = expression;
}

function getResult(){
    const result = document.querySelector('.result').textContent;
    return result;
}

function getExpression(getExpression){
        const expression = document.querySelector('.expression').textContent;
        return expression;
}


showExpression('\u00A0');
let previousNum = 0;
let operator;
let isContinue = false;


const buttons = document.querySelectorAll('button');
buttons.forEach(button =>{
    button.addEventListener('click',() =>{
        const value = button.textContent;     
        console.log(value);               
        if (value =='AC'){
            showResult('0');
            showExpression("\u00A0");
            previousNum = 0;
            isContinue = false;
        }
        else if(value == '⌫'){
            let current_result = getResult();
            if(current_result.length >1 ){
                showResult(current_result.slice(0,-1));
            }
            else{
                showResult('0');
            }
        }
        else if((value>=0 && value <=9)){
            if (getResult().length >= 9) return;
            showResult((getResult() ==='0')?value : getResult()+value);
            console.log(getResult());
        }
        else if(value =='.'){
            inputChecker(value);
        }
        else if (value == '='){
            if (getExpression().includes('=') == false){
                showExpression(getExpression()+ " "+getResult() + " =");
                const result = calResult(Number(previousNum),Number(getResult()),operator);
                showResult(result);

            }
        }
        else if (value == '+/-'){
            showResult(Number(getResult())*(-1));
        }
        else if (value =='+' || value =='−' || value =='×' || value =='÷'){
            if (isContinue == true && getExpression().includes('=') == false){
                console.log('tr');
                const result = calResult(Number(previousNum),Number(getResult()),operator);
                operator = value;
                previousNum = result;
                showExpression(result + " " + operator + " ");
                showResult('0');
            }
            else{
            operator = value;
            previousNum = getResult();
            showExpression(previousNum + " " + operator + " ");
            showResult('0');
            }
            isContinue = true;
        }
        
    })
})



function calResult(previousNum,currentNum,operator){
    let result;
    switch (operator){
        case '+': result = previousNum + currentNum;break;  
        case '−': result = previousNum - currentNum;break;
        case '×': result = previousNum * currentNum;break;       
        case '÷': result = previousNum / currentNum;break;
        default:return currentNum;
    }
    previousNum = result;
    if(result.toString().length >9){
        return result.toExponential(4);
    }

    return result;
}









function inputChecker(value){
    if (value == '.'){
        if (getResult().includes(value)){
        }
        else{
            console.log('yes');
            showResult(getResult()+value);
        }
    }


}