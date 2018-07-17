const buttons = document.querySelectorAll('.buttons');
const positiveInts = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const operators = ['+', '-', '/', '*', '=', '.'];
const funcs = ['AC', 'del'];
const display = document.getElementById('display');
const funcDisplay = document.getElementById('func-Display');
const clear = document.getElementById('AC')

var runningTotal = 0;
var isFirstNum = true;
var hasDecimal = false;
var operatorInEffect = true;
var eqOperatorUsed = false;
var previousNum = '';
var currentNum = '';
var prevOpr = '';
var currentOpr = '';
var calcLocked = false;
var shiftDown = false;

buttons.forEach(button => button.addEventListener('click', buttonClicked));
window.addEventListener('keyup', shiftUp);

window.addEventListener('keydown', function(e){
	if(e.keyCode === 16){
		shiftDown = true;
		console.log(shiftDown);
	}else{
		const boardButton = document.querySelector(`button[data-key="${e.keyCode}"]`)
		if(shiftDown && boardButton.value === '8'){
			keyPressed('*');
		}else if(shiftDown && boardButton.value === '='){
			keyPressed('+');
		}else{
			keyPressed(boardButton.value);
		};
	};
});


function shiftUp(){
	shiftDown = false;
	console.log(shiftDown);
};


function keyPressed(buttonVal){
	selectType(buttonVal);
};

function buttonClicked(){
	const buttonVal = this.value;
	selectType(buttonVal);
};

function selectType(buttonVal){
	if(!calcLocked || (calcLocked && (buttonVal === 'AC'))){
		switch(true){
			case (positiveInts.includes(Number(buttonVal))):
				selectionIsInt(buttonVal);
				break;
			case (operators.includes(buttonVal)):
				selectionIsOpr(buttonVal);
				break;
			case (funcs.includes(buttonVal)):
				funcUsed(buttonVal);
				break;
			case (buttonVal === '0'):
				selectionIsZero(buttonVal);
				break;
			default:
				display.textContent = "INPUT ERROR";
				calcLock();
		};
	};
}

function selectionIsInt(buttonVal){
	if(eqOperatorUsed){
		eqOperatorUsed = false;
		currentNum = '';
		display.textContent = '';
	};
	if(currentNum.length < 16){
		if(isFirstNum){
			display.textContent = '';
			operatorInEffect = false;
			isFirstNum = false;
		};
	display.textContent += buttonVal;
	integerPicked(buttonVal);
	};
};

function selectionIsOpr(buttonVal){
	if(buttonVal === '.'){
		operatorCalled(buttonVal);
	}else{
		if(eqOperatorUsed){
			funcDisplay.textContent = buttonVal;
			eqOperatorUsed = false;
			operatorCalled(buttonVal);
			prevOpr = buttonVal;
		};
		if(!operatorInEffect && !eqOperatorUsed){
			funcDisplay.textContent = buttonVal;
			operatorCalled(buttonVal);
			prevOpr = buttonVal;
			operatorInEffect = true;
		};
	};
};

function selectionIsZero(buttonVal){
	if(!isFirstNum){
		display.textContent += 0;
		currentNum += buttonVal;
	};
};

function integerPicked(currentInt){
	currentNum += currentInt;
	console.log(currentNum);
};

function operatorCalled(buttonVal){
	currentOpr = buttonVal;
	switch(currentOpr){
		case '+':
		case '-':
		case '/':
		case '*':
			if(previousNum.length == 0){
				previousNum = currentNum;
				currentNum = '';
				prevOpr = currentOpr;
				console.log(prevOpr);
				isFirstNum = true;
				hasDecimal = false;
			}else{
				console.log(prevOpr);
				runningTotal = evaluate(previousNum, prevOpr, currentNum);
				display.textContent = runningTotal;
				previousNum = runningTotal;
				currentNum = '';
				prevOpr = currentOpr;
				isFirstNum = true;
				hasDecimal = false;
			};
			break;
		case '=':
			//previousNum !== '' && prevOpr !== ''
			if(!eqOperatorUsed){
				runningtotal = evaluate(previousNum, prevOpr, currentNum);
				display.textContent = runningtotal;
				previousNum = ''
				currentNum = String(runningtotal);
				currentOpr = ''
				prevOpr = '';
				isFirstNum = true;
				hasDecimal = false;
				operatorInEffect = false;
				eqOperatorUsed = true;
			};
			break;
		case '.':
			if(!hasDecimal){
				if(eqOperatorUsed){
					eqOperatorUsed = false;
					currentNum = '';
				};
				if(isFirstNum){
					isFirstNum = false;
					operatorInEffect = false;
					display.textContent = '';
				};
				currentNum += '.'
				display.textContent += '.';
				hasDecimal = true;
			};
			break;
		default:
			display.textContent = 'Error';
	};
};

function funcUsed(currentFunc){
	if(currentFunc === "AC"){
		previousNum = '';
		currentNum = '';
		prevOpr = '';
		currentOpr = '';
		isFirstNum = true;
		hasDecimal = false;
		display.textContent = '';
		funcDisplay.textContent = '';
		if(calcLocked){
			calcLock();
		}
	}else{
		if(!eqOperatorUsed && !operatorInEffect){
			display.textContent = currentNum.slice(0, (currentNum.length - 1));
			if(currentNum[(currentNum.length - 1)] === '.'){
				hasDecimal = false;
			};
			currentNum = currentNum.slice(0, (currentNum.length - 1));
		};
	};
};

function evaluate(numOne, opr, numTwo){
	var evaluation;
	switch(opr){
		case '+':
			evaluation = sum(numOne, numTwo);
			break;
		case '-':
			evaluation = subtract(numOne, numTwo);
			break;
		case '*':
			evaluation = multiply(numOne, numTwo);
			break;
		case '/':
			evaluation = divide(numOne, numTwo);
			break;
		default:
			calcLock();
			evaluation = 'Invalid Input';
	};

	return evaluation;
};


function multiply(a, b){
	return ((Number(a)) * (Number(b)));
};

function divide(a, b){
	if(Number(b) == 0 || Number(b) == NaN){
		calcLock();
		return "Div 0 Error";
	}else{
		return (Number(a) / Number(b));
	};
};

function sum(a, b){
	return (Number(a) + Number(b));
};

function subtract(a, b){
	return (Number(a) - Number(b));
};

function calcLock(){
	if(calcLocked){
		calcLocked = false;
	}else{
		calcLocked = true;
	};
	clear.classList.toggle('lockout');
};