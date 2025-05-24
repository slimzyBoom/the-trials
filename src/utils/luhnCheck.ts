const luhnCheck = (digits: string ): number => {
    let sum = digits.split("").reverse().map((digit, index) => {
        let n = parseInt(digit, 10);
        if (index % 2 === 0) n *= 2;
        if (n > 9) n -= 9;
        return n;
    }).reduce((sum, n) => sum + n, 0);

    return (10 - (sum % 10)) % 10;
}

export default luhnCheck;