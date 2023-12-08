// PS2.P1.js
const generateFibonacci = function* () {
    let prev = 0;
    let curr = 1;

    while (true) {
        yield prev;
        [prev, curr] = [curr, prev + curr];
    }
};

const generateEvenFibonacci = function* () {
    const fibonacciGenerator = generateFibonacci();

    while (true) {
        let current = fibonacciGenerator.next().value;

        while (current % 2 !== 0) {
            current = fibonacciGenerator.next().value;
        }

        yield current;
    }
};

// Example usage
const evenFibonacciGenerator = generateEvenFibonacci();
for (let i = 0; i < 6; i++) {
    console.log(evenFibonacciGenerator.next().value);
}
