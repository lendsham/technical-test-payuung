// function fibonacciGenerator(n) {
//     let output = [];
//     if (n === 1) {
//         output = [0];
//     } else if (n === 2) {
//         output = [0, 1];
//     } else {
//         output = [0, 1];

//         for (let i = 2; i < n; i++) {
//             output.push(output[output.length - 2] + output[output.length - 1])
//         }
//     }

//     return output;
// }

// console.log(fibonacciGenerator(40));

function fibonacciGenerator(n) {
    let a = 0
    let b = 1
    let next
    let string = '';

    for (let i = 0; i <= n; i++) {
        if (a < n) {
            string += a + " ";
            next = a + b;
            a = b;
            b = next;
        }
    }
    return `Fibonacci: ${string}`;
}

console.log(fibonacciGenerator(40));