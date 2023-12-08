// PS1.P2.js
const evaluate = (expression) => {
    const parseExpression = (exp) => {
        const [left, operator, right] = exp.match(/(\d+)([+\-*/^])(\d+)/).slice(1);
        return [Number(left), operator, Number(right)];
    };

    const getOperatorFunction = (operator) => {
        switch (operator) {
            case '+':
                return (left, right) => left + right;
            case '-':
                return (left, right) => left - right;
            case '*':
                return (left, right) => left * right;
            case '/':
                return (left, right) => left / right;
            case '^':
                return (left, right) => Math.pow(left, right);
            default:
                throw new Error(`Unsupported operator: ${operator}`);
        }
    };

    const [left, operator, right] = parseExpression(expression);
    const operatorFunction = getOperatorFunction(operator);

    return operatorFunction;
};

// Example usage
const expressions = ['4+2', '5*7', '6-1', '9/2', '2^8'];

expressions.forEach((expression) => {
    const operator = evaluate(expression);
    console.log(`${expression} = ${operator(Number(expression[0]), Number(expression[2]))}`);
});
