function fibonacci(n) {
    n = +n;
    let a = 0;
    let b = 1;
    let next;
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