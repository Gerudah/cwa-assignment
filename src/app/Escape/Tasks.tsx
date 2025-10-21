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
    // Your code here \n //BE SURE TO USE CORRECT CASING "Fizz" "Buzz" "FizzBuzz"
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
    // Your code here \n//hint: you will need to return a value that contains your filtered list
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
    // Your code here \n //hint: you will need to return a value that contains your filtered list
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
    {
        id: 'one-thousand',
        title: 'Generate 1-1000',
        description: 'Write a function `OneThousand` that generates all numbers from 1 to 1000. The function should return an array of the results.',
        starterCode: `function OneThousand() {
    const result = [];
    // Your code here
    return result;
}`,
        validate: (code: string): boolean => {
            try {
                // Use Function constructor to evaluate the user's code safely
                const userFunc = new Function(`return ${code}`)();
                const result = userFunc();
                if (!Array.isArray(result) || result.length !== 1000) return false;
                const expected = Array.from({ length: 1000 }, (_, i) => {
                    const n = i + 1;
                    return n;
                });
                return JSON.stringify(result) === JSON.stringify(expected);
            } catch (e) {
                return false;
            }
        },
    },
    {
        id: 'format',
        title: 'Format This Code',
        description: 'This block of code is functionally correct but a mess to read. Fix the formatting (indentation, spacing, brace placement) to make it clean and readable.',
        starterCode: `function findLongestString(arr)
{
let longest = '' ;
    for ( let i=0;                i < 
    arr.length;i++ ) {
if( 
arr[i].length >

            longest.length) {
    longest=arr[i] ;
}
    }
    return longest;
}`,
        validate: (code: string): boolean => {
            const correctlyFormattedCode = `function findLongestString(arr) {
    let longest = ''; 
    for (let i = 0; i < arr.length; i++) { 
        if (arr[i].length > longest.length) { 
            longest = arr[i];
        }
    }
    return longest;
}`;
            // Normalize whitespace and compare the user's submission to the ideal format.
            const normalize = (str: string) => str.replace(/\s+/g, ' ').trim();
            return normalize(code) === normalize(correctlyFormattedCode);
        },
    },
    {
        id: 'debug-count-occurrences',
        title: 'Debug: Count Occurrences',
        description: 'This function is supposed to count how many times a specific item appears in an array. It has a bug that causes it to return an incorrect count in certain scenarios. Find and fix the bug.',
        starterCode: `function countOccurrences(arr, item){
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === item) {
            count++;
        } else {
            count = 0;
        }
    }
    return count;
}`,
        validate: (code: string): boolean => {
            try {
                const userFuncWrapper = new Function('arr', 'item', `${code}; return countOccurrences(arr, item);`);

                const testCases = [
                    { arr: [1, 2, 1, 3, 1], item: 1, expected: 3 },
                    { arr: ['apple', 'banana', 'apple', 'orange'], item: 'apple', expected: 2 },
                    { arr: [true, false, true, true], item: true, expected: 3 },
                    { arr: [1, 2, 3, 4, 5], item: 6, expected: 0 },
                    { arr: [], item: 'test', expected: 0 },
                ];

                return testCases.every(test => userFuncWrapper(test.arr, test.item) === test.expected);
            } catch (e) {
                return false;
            }
        },
    },
    {
        id: 'most-frequent',
        title: 'Most Frequent Character',
        description: 'Design a function that returns the most frequent character in a string',
        starterCode: `function mostFrequent(str){
        let frequent = ''
    //Your code here
    //HINT: you will need a way to clean your string
    //HINT: Maps are a good tool for people who are lost
    return frequent;
}`,
        validate: (code: string): boolean => {
            try {
                const userFunc = new Function('str', `${code}; return mostFrequent(str);`);

                const testCases = [
                    { str: 'Busy bees bother bored beavers but bob buys both braids', expected: 'b' },
                    { str: 'jump for joy said jjj the janitor jjj\'s job jives with jjj\'s jolliness', expected: 'j' },
                    { str: 'googling goggles makes giggly girls and guys giggle', expected: 'g' },
                    { str: '1 1 was a racehorse 2 2 was 1 2, 1 1 won 1 race 2 2 1 1 2 1111111111111111111111111111111', expected: '1' },
                    { str: '', expected: '' },
                ];

                return testCases.every(test => userFunc(test.str) === test.expected);
            } catch (e) {
                return false;
            }
        },
    },
    { 
        id: 'fix-accessibility',
        title: 'Fix HTML Accessibility',
        description: 'This HTML snippet has several accessibility issues. Your task is to correct them to make the code more accessible. Focus on adding `alt` attributes to images, associating `label` with `input` fields, and using semantic elements for interactive controls.',
        starterCode: `<div>
    <img src="logo.png">
    <input type="text" placeholder="Your Name">
    <p onclick="submitForm()">Submit</p>
    <a href="/about">More Info</a>
</div>`,
        validate: (code: string): boolean => {
            const correctlyAccessibleCode = `<div lang="en">
    <img src="logo.png" alt="Company Logo">
    <label for="nameInput">Your Name:</label>
    <input type="text" id="nameInput" placeholder="Your Name">
    <button type="button" onclick="submitForm()">Submit</button>
    <a href="/about" aria-label="Learn more about our company">More Info</a>
</div>`;
            
            const normalize = (str: string) => str.replace(/\s+/g, ' ').trim();
            return normalize(code) === normalize(correctlyAccessibleCode);

        },
    },
];