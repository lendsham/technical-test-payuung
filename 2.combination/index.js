function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    } else {
        return (n * factorial(n - 1))
    }
}

// console.log(factorial(4));

function combination(n, r) {
    let calc = factorial(n) / (factorial(r) * (factorial(n - r)));
    return calc;
}

console.log(combination(4, 2));
