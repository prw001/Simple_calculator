const buttons = document.querySelectorAll('.buttons');
const positiveInts = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const operators = ['+', '-', '/', '*', '=', '.'];
const funcs = ['AC', 'del'];
const display = document.getElementById('display');
var initialValue = 0;
var expression = [];
var index = 0;
var numString = '';
var isFirstNum = true;
var hasDecimal = false;

buttons.forEach(button => button.addEventListener('click', buttonClicked));


function buttonClicked(e){
	const buttonVal = this.value;
	switch(true){
		case (positiveInts.includes(Number(buttonVal))):
			if(numString.length < 16){
				display.textContent += buttonVal;
				integerPicked(buttonVal);
			};
			isFirstNum = false;
			break;
		case (operators.includes(buttonVal)):
			operatorCalled(buttonVal);
			break;
		case (funcs.includes(buttonVal)):
			funcUsed(buttonVal);
			break;
		case (buttonVal === '0'):
			if(!isFirstNum){
				display.textContent += 0;
			};
			pressedZero();
			break;
		default:
			display.textContent = "ERROR";
	};
};

function integerPicked(currentInt){
	numString += currentInt;
	console.log(numString);
};

function pressedZero(){

};

function operatorCalled(currentOp){
	switch(currentOp){
		case '+':
		case '-':
		case '/':
		case '*':
			expression.push(Number(numString));
			display.textContent = '';
			numString = '';
			hasDecimal = false;
			expression.push(currentOp);
			break;
		case '=':
			expression.push(Number(numString));
			hasDecimal = false;
			display.textContent = '';
			numString = '';
			evaluate();
			break;
		case '.':
			if(!hasDecimal){
				numString += '.'
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
		numString = ''
		initialValue = 0;
		index = 0;
		expression = [];
		isFirstNum = true;
		hasDecimal = false;
		display.textContent = '';
	}else{
		display.textContent = numString.slice(0, (numString.length - 1));
		if(numString[(numString.length - 1)] === '.'){
			hasDecimal = false;
		};
		numString = numString.slice(0, (numString.length - 1));
	};
};

function evaluate(){

};






function toggleStyle(e){

};