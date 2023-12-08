// PS2.P2.js
const generateWords = function* (sentence) {
    const words = sentence.split(' ');

    for (const word of words) {
        yield word;
    }
};

// Example usage
const sentence = "All I know is something like a bird within her sang";
const wordsGenerator = generateWords(sentence);

for (const word of wordsGenerator) {
    console.log(word);
}
