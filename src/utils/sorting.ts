import { Dispatch, SetStateAction } from 'react';
import { SHORT_DELAY_IN_MS } from '../constants/delays';
import { ElementStates } from '../types/element-states';
import { TElement } from '../types/element-types';

let interval: ReturnType<typeof setInterval>;

const compareTool = (a: number, operator: string, b: number) => {
	if (operator === '<') return a < b;
	if (operator === '>') return a > b;
};

export const resetArray = (array: TElement[]) =>
	array.map((el) =>
		el.state === ElementStates.Modified
			? (el.state = ElementStates.Default)
			: el
	);

export const randomArr = (
	arraySetter: Dispatch<SetStateAction<TElement[]>>
) => {
	const arrLength = Math.floor(Math.random() * 15 + 3);
	const arr = Array.from({ length: arrLength }, () => ({
		element: Math.floor(Math.random() * 100),
		state: ElementStates.Default,
	}));
	arraySetter([...arr]);
};

export const sortSelection = (
	operator: string,
	array: TElement[],
	loaderAscendingSetter: Dispatch<SetStateAction<boolean>>,
	loaderDescendingSetter: Dispatch<SetStateAction<boolean>>,
	arraySetter: Dispatch<SetStateAction<TElement[]>>
) => {
	if (operator === '<') loaderAscendingSetter(true);
	if (operator === '>') loaderDescendingSetter(true);
	let i = 0;
	let j = 0;
	let minIndex = 0;
	interval = setInterval(() => {
		array[i].state = ElementStates.Changing;
		if (j > i + 1) array[j - 1].state = ElementStates.Default;
		if (j < array.length) array[j].state = ElementStates.Changing;

		if (compareTool(array[j]?.element, operator, array[minIndex].element))
			minIndex = j;

		if (j === array.length) {
			if (minIndex !== i)
				[array[i].element, array[minIndex].element] = [
					array[minIndex].element,
					array[i].element,
				];
			array[i].state = ElementStates.Modified;
			i++;
			j = i;
			minIndex = i;
		}

		arraySetter([...array]);
		j++;

		if (i === array.length) {
			if (operator === '<') loaderAscendingSetter(false);
			if (operator === '>') loaderDescendingSetter(false);
			minIndex = 0;
			clearInterval(interval);
		}
	}, SHORT_DELAY_IN_MS);
};

export const sortBubble = (
	operator: string,
	array: TElement[],
	loaderAscendingSetter: Dispatch<SetStateAction<boolean>>,
	loaderDescendingSetter: Dispatch<SetStateAction<boolean>>,
	arraySetter: Dispatch<SetStateAction<TElement[]>>
) => {
	if (operator === '<') loaderDescendingSetter(true);
	if (operator === '>') loaderAscendingSetter(true);
	let left = 0;
	let right = 1;
	let count = array.length;
	interval = setInterval(() => {
		array[left].state = ElementStates.Changing;
		if (right < count) array[right].state = ElementStates.Changing;
		if (left > 0) array[left - 1].state = ElementStates.Default;

		if (compareTool(array[left]?.element, operator, array[right]?.element)) {
			[array[left].element, array[right].element] = [
				array[right].element,
				array[left].element,
			];
		}

		if (right === count) {
			array[count - 1].state = ElementStates.Modified;
			count--;
			left = -1;
			right = 0;
		}

		arraySetter([...array]);
		left++;
		right++;

		if (count === 0) {
			if (operator === '<') loaderDescendingSetter(false);
			if (operator === '>') loaderAscendingSetter(false);
			clearInterval(interval);
		}
	}, SHORT_DELAY_IN_MS);
};
