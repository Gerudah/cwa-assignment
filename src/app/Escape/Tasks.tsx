export interface Task {
    id: string;
    title: string;
    description: string;
    starterCode: string;
    validate: (code: string) => boolean;
}

export const TASKS: Task[] = [
    {
        id: 'fizzbuzz',
        title: 'FizzBuzz',
        description: 'Write a function `fizzbuzz` that prints numbers from 1 to 100. For multiples of 3, print "Fizz". For multiples of 5, print "Buzz". For multiples of both 3 and 5, print "FizzBuzz". The function should return an array of the results.',
        starterCode: `function fizzbuzz() {
    const result = [];
    // Your code here
    return result;
}`,
        validate: (code: string): boolean => {
            try {
                // Use Function constructor to evaluate the user's code safely
                const userFunc = new Function(`return ${code}`)();
                const result = userFunc();
                if (!Array.isArray(result) || result.length !== 100) return false;
                const expected = Array.from({ length: 100 }, (_, i) => {
                    const n = i + 1;
                    if (n % 15 === 0) return 'FizzBuzz';
                    if (n % 3 === 0) return 'Fizz';
                    if (n % 5 === 0) return 'Buzz';
                    return n;
                });
                return JSON.stringify(result) === JSON.stringify(expected);
            } catch (e) {
                return false;
            }
        },
    },
    {
        id: 'odd-split',
        title: 'Filter Odd Numbers',
        description: 'Write a function `filterOdd` that iterates through numbers 1 to 100 and returns an array containing only the odd numbers.',
        starterCode: `function filterOdd(numbers) {
    // Your code here BE SURE TO USE CORRECT CASING "Fizz" "Buzz" "FizzBuzz"
    return [];
}`,
        validate: (code: string): boolean => {
            try {
                const userFunc = new Function('numbers', `
                    ${code}
                    return filterOdd(numbers);
                `);
                const testNumbers = Array.from({ length: 100 }, (_, i) => i);
                const result = userFunc(testNumbers);
                if (!Array.isArray(result) || result.length !== 50) return false;
                // Check if all numbers in the result are odd
                return result.every(n => typeof n === 'number' && n % 2 !== 0);
            } catch (e) {
                return false;
            }
        },
    },
    {
        id: 'even-split',
        title: 'Filter Even Numbers',
        description: 'Write a function `filterEven` that iterates through numbers 1 to 100 and returns an array containing only the even numbers.',
        starterCode: `function filterEven(numbers) {
    // Your code here
    return [];
}`,
        validate: (code: string): boolean => {
            try {
                const userFunc = new Function('numbers', `
                    ${code}
                    return filterEven(numbers);
                `);
                const testNumbers = Array.from({ length: 100 }, (_, i) => i);
                const result = userFunc(testNumbers);
                if (!Array.isArray(result) || result.length !== 50) return false;
                // Check if all numbers in the result are even
                return result.every(n => typeof n === 'number' && n % 2 === 0);
            } catch (e) {
                return false;
            }
        },
    },
];