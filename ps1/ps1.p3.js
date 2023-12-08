const decorateString = (inputString, decorator) => {
    return decorator(inputString);
};

const expression1 = "supercalifragilisticexpialidocious";
const decorator1 = (str) => str.split("c").filter(Boolean);
const result1 = decorateString(expression1, decorator1);

const expression2 = "supercalifragilisticexpialidocious";
const decorator2 = (str) => {
    const modifiedString = str.replace(/a/g, "A");
    const numberReplaced = (str.match(/a/g) || []).length;
    return {
        originalString: str,
        modifiedString: modifiedString,
        numberReplaced: numberReplaced,
        length: modifiedString.length,
    };
};
const result2 = decorateString(expression2, decorator2);

console.log("Expression 1 Result:");
console.table(result1);

console.log("Expression 2 Result:");
console.table([result2]);
