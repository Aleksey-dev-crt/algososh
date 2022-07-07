import { Dispatch, SetStateAction } from 'react';
import { SHORT_DELAY_IN_MS } from '../constants/delays';

let interval: ReturnType<typeof setInterval>;

const getFibonacciNumbers = (n: number) => {
	const fibonacciArr = [0, 1];
	for (let i = 2; i < n; i++)
		fibonacciArr.push(fibonacciArr[i - 1] + fibonacciArr[i - 2]);
	return fibonacciArr;
};

export const generateFibArr = (
	n: number,
	loaderSetter: Dispatch<SetStateAction<boolean>>,
	fibNumbersSetter: Dispatch<SetStateAction<string[]>>
) => {
	loaderSetter(true);
	const fibNumbers = getFibonacciNumbers(n + 2).map((el) => `${el}`);
	const fibArr: string[] = [];
	let i = 1;
	interval = setInterval(() => {
		fibArr.push(fibNumbers[i]);
		fibNumbersSetter([...fibArr]);

		if (n + 1 === i) {
			loaderSetter(false);
			clearInterval(interval);
		}
		i++;
	}, SHORT_DELAY_IN_MS);
};
