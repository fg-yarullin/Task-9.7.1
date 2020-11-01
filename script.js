
let lastOperand = 0;
let operation = null;
let isCalculated = false;

const inputWindow = document.querySelector('#inputWindow');
const actionsCheckBox = document.querySelector("#show_last_actions");
const lastActionsDiv = document.querySelector("#last_actions");

actionsCheckBox.addEventListener('change', () => {
    if (actionsCheckBox.checked == true){
        lastActionsDiv.style.display = "block";
      } else {
        lastActionsDiv.style.display = "none";
      }
});

function removeLeadingZerro(str) {
    if (str.length > 2) {
        if (str[0] === '0' && str[1] !== '.') {
            str = str.slice(1);
        }
        if (str[0] === '-' && str[1] === '0' && str[2] !== '.') {
            str = str.slice(2);
        }
    }
    return str;
}

document.querySelector('.keys').addEventListener('click', function (event) {
    let targetKey = event.target;
    switch (targetKey.id) {
        case "btn_clr": {
            lastOperand = 0;
            operation = null;
            inputWindow.value = '0';
            operationCount = false
        }
        break;

        case "negative": {
            if (inputWindow.value[0] != '-') {
                inputWindow.value = '-' + inputWindow.value;
            } else {
                inputWindow.value = inputWindow.value.slice(1);
            }
        }
        break;

        case "btn_1": 
        case "btn_2": 
        case "btn_3": 
        case "btn_4": 
        case "btn_5": 
        case "btn_6": 
        case "btn_7": 
        case "btn_8": 
        case "btn_9": 
        case "btn_0":
        case "btn_dot": {
            if (isCalculated) {
                inputWindow.value = '';
                isCalculated = false;
            }
            inputWindow.value += targetKey.innerText;
            inputWindow.value = removeLeadingZerro(inputWindow.value);
        }
        break; 

        case "btn_sum": 
        case "btn_dif": 
        case "btn_prod": 
        case "btn_div": {
            lastOperand =  Number(inputWindow.value);
            operation = targetKey.innerText;
            //console.log();
            inputWindow.value = '';
        }
        break;

        case "btn_sqrt": {
            lastOperand = Number(inputWindow.value);
            if (lastOperand < 0) {
                inputWindow.value = 'Ошибка!';
                return;
            }
            inputWindow.value = Math.sqrt(lastOperand);
            document.querySelector("#last_actions").innerHTML += '<li>' + targetKey.innerText + lastOperand + ' = ' + inputWindow.value + '</li>';
            isCalculated = true;
        }
        break;

        case "btn_result": {
            let lastAction = '';
            let result = 0;
            switch (operation) {
                case "+": {
                    result = lastOperand + Number(inputWindow.value);
                }
                break;
                case "-": {
                    result = lastOperand - Number(inputWindow.value);
                }
                break;
                case "*": {
                    result = lastOperand * Number(inputWindow.value);
                }
                break;
                case "/": {
                    if (inputWindow.value !== '0') {
                        result = lastOperand / Number(inputWindow.value);
                    } else {
                        inputWindow.value = 'Деление на нуль';
                        return;
                    }
                }
                break;
            }
            lastActionsDiv.innerHTML += '<li>' + lastOperand + ' ' + operation + ' ' +  inputWindow.value + ' = ' + result + '</li>';
            lastOperand = 0;
            operation = null;
            inputWindow.value = result;
            isCalculated = true;
            lastAction = '';
        }
        break;
    }
})