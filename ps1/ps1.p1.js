const reverseAlphabetical = (inputString) => {
    const cleanedString = inputString.replace(/[^a-zA-Z]/g, "").toLowerCase();
    const reversedString = cleanedString.split("").sort().reverse().join("");

    return reversedString;
};

const input = "supercalifragilisticexpialidocious";
const result = reverseAlphabetical(input);

console.log(result);
