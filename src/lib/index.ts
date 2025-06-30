function evalInlineArr(arr: string[]) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === "*") {
            const left = parseFloat(arr[i - 1]);
            const right = parseFloat(arr[i + 1]);
            arr.splice(i - 1, 3, (left * right).toString());
            i--;
        } else if (arr[i] === "/") {
            const left = parseFloat(arr[i - 1]);
            const right = parseFloat(arr[i + 1]);
            if (right === 0) {
                throw new Error("Division by zero");
            }
            arr.splice(i - 1, 3, (left / right).toString());
            i--;
        }
    }

    let isPlus = true;
    let res = 0;

    for (const item of arr) {
        if (item === "-") {
            isPlus = !isPlus;
        } else if (item !== "+") {
            const value = parseFloat(item);

            if (isNaN(value)) {
                throw new Error(`Invalid number: ${item}`);
            }

            res += isPlus ? value : -value;
            isPlus = true;
        }
    }

    return res;
}

function evalArr(arr: string[]) {
    const stacks: string[][] = [];
    let temp: string[] = [];

    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];

        if (item === "(") {
            if (!Number.isNaN(parseFloat(temp.at(-1) ?? "+"))) {
                temp.push("*");
            }

            stacks.push(temp);
            temp = [];
        } else if (item === ")") {
            if (stacks.length === 0) {
                throw new Error("Mismatched parentheses");
            }
            
            const last = stacks.pop();
            if (last === undefined) {
                throw new Error("Unexpected closing parenthesis");
            }

            last.push(evalInlineArr(temp).toString());
            temp = last;
        } else {
            if (arr[i - 1] === ")" && !Number.isNaN(parseFloat(item))) {
                temp.push("*");
            }

            temp.push(item);
        }
    }

    if (stacks.length > 0) {
        throw new Error("Mismatched parentheses");
    }

    if (temp.length === 0) {
        throw new Error("Empty expression");
    }

    return evalInlineArr(temp);
}

const tokenRegex = /(-?\d+(?:\.\d+)?|[-+*/()])/g;

export function evalMath(expression: string) {
    const tokens = expression.match(tokenRegex);
    if (!tokens) {
        throw new Error("Invalid expression");
    }

    console.log("Tokens:", tokens);

    return evalArr(tokens);
}
