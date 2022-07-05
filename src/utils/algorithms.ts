import { Dispatch, SetStateAction } from 'react';
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from '../constants/delays';
import { ElementStates } from '../types/element-states';
import {
	TElement,
	TListElement,
	TQueueElement,
	TStackElement,
	TSymbol,
} from '../types/element-types';

let interval: ReturnType<typeof setInterval>;

//СТРОКА
export const reverseString = (
	elements: TSymbol[],
	loaderSetter: Dispatch<SetStateAction<boolean>>,
	SymbolsSetter: Dispatch<SetStateAction<TSymbol[]>>
) => {
	loaderSetter(true);
	SymbolsSetter(elements);
	let i = 0;
	let j = elements.length - 1;
	interval = setInterval(() => {
		[elements[i], elements[j]] = [elements[j], elements[i]];
		elements[i].state = ElementStates.Modified;
		elements[i + 1].state = ElementStates.Changing;
		elements[j].state = ElementStates.Modified;
		elements[j - 1].state = ElementStates.Changing;
		SymbolsSetter([...elements]);
		i++;
		j--;
		if (Math.floor(elements.length / 2) === i) {
			elements[i].state = ElementStates.Modified;
			elements[i - 1].state = ElementStates.Modified;
			loaderSetter(false);
			clearInterval(interval);
		}
	}, DELAY_IN_MS);
};

//ПОСЛЕДОВАТЕЛЬНОСТЬ ФИБОНАЧЧИ
export const generateFibArr = (
	n: number,
	loaderSetter: Dispatch<SetStateAction<boolean>>,
	fibNumbersSetter: Dispatch<SetStateAction<string[]>>
) => {
	loaderSetter(true);
	const fibArr: string[] = [];
	let i = 1;
	interval = setInterval(() => {
		if (i <= 2) fibArr.push('1');
		else fibArr.push(`${+fibArr[i - 2] + +fibArr[i - 3]}`);

		fibNumbersSetter([...fibArr]);

		if (n === i - 1) {
			loaderSetter(false);
			clearInterval(interval);
		}
		i++;
	}, SHORT_DELAY_IN_MS);
};

//СОРТИРОВКА
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

//СТЭК
export const addToStack = (
	stack: TStackElement[],
	value: string,
	stackSetter: Dispatch<SetStateAction<TStackElement[]>>,
	inputValueSetter: Dispatch<SetStateAction<string>>
) => {
	stack.push({ element: value, state: ElementStates.Changing, top: '' });
	stack.map((el) =>
		el === stack[stack.length - 1] ? (el.top = 'top') : (el.top = '')
	);
	setTimeout(() => {
		stack[stack.length - 1].state = ElementStates.Default;
		stackSetter([...stack]);
	}, SHORT_DELAY_IN_MS);
	inputValueSetter('');
};

export const removeFromStack = (
	stack: TStackElement[],
	stackSetter: Dispatch<SetStateAction<TStackElement[]>>
) => {
	stack[stack.length - 1].state = ElementStates.Changing;
	setTimeout(() => {
		stack[stack.length - 1].state = ElementStates.Default;
		stack.splice(-1, 1);
		if (stack.length) stack[stack.length - 1].top = 'top';
		stackSetter([...stack]);
	}, SHORT_DELAY_IN_MS);
	stackSetter([...stack]);
};

//ОЧЕРЕДЬ
export const generateDefaultQueue = () =>
	Array.from({ length: 7 }, () => ({
		element: '',
		state: ElementStates.Default,
		head: '',
		tail: '',
	}));

export const enqueue = (
	queue: TQueueElement[],
	value: string,
	endOfQueue: boolean,
	queueSetter: Dispatch<SetStateAction<TQueueElement[]>>,
	queueLengthSetter: Dispatch<SetStateAction<number>>,
	inputValueSetter: Dispatch<SetStateAction<string>>
) => {
	const tail = queue.findIndex((el) => el.tail === 'tail');
	if (tail === 6 || endOfQueue) return;
	if (tail !== -1) queue[tail].state = ElementStates.Changing;
	else queue[0].state = ElementStates.Changing;
	setTimeout(() => {
		queue[tail + 1].element = value;
		if (tail === -1) queue[0].head = 'head';
		if (tail !== -1) {
			queue[tail].state = ElementStates.Default;
			queue[tail + 1].tail = 'tail';
			queue[tail].tail = '';
		} else {
			queue[0].state = ElementStates.Default;
			queue[0].tail = 'tail';
		}
		queueSetter([...queue]);
	}, SHORT_DELAY_IN_MS);
	queueSetter([...queue]);
	queueLengthSetter((prev) => prev + 1);
	inputValueSetter('');
};

export const dequeue = (
	queue: TQueueElement[],
	queueLength: number,
	queueSetter: Dispatch<SetStateAction<TQueueElement[]>>,
	queueLengthSetter: Dispatch<SetStateAction<number>>,
	endOfQueueSetter: Dispatch<SetStateAction<boolean>>
) => {
	const head = queue.findIndex((el) => el.head === 'head');
	if (head === 6 || queueLength === 1) {
		endOfQueueSetter(true);
		queue[head].element = '';
		queue[head].tail = '';
		queueSetter([...queue]);
		return;
	}
	queue[head].state = ElementStates.Changing;
	setTimeout(() => {
		queue[head].state = ElementStates.Default;
		queue[head].element = '';
		queue[head].head = '';
		queue[head + 1].head = 'head';
		queueSetter([...queue]);
	}, SHORT_DELAY_IN_MS);
	queueSetter([...queue]);
	queueLengthSetter((prev) => prev - 1);
};

//СВЯЗНЫЙ СПИСОК
export const addToHead = (
	list: TListElement[],
	value: string,
	loaderAddToHeadSetter: Dispatch<SetStateAction<boolean>>,
	listSetter: Dispatch<SetStateAction<TListElement[]>>,
	inputValueSetter: Dispatch<SetStateAction<string>>,
	smallCircle: (value: string) => JSX.Element
) => {
	if (list.length === 8) return;
	loaderAddToHeadSetter(true);
	let step = 0;
	list[0].head = smallCircle(value);
	interval = setInterval(() => {
		if (step === 0) {
			list[0].head = '';
			list.unshift({
				element: value,
				state: ElementStates.Modified,
				head: 'head',
				tail: '',
			});
		}
		if (step === 1) list[0].state = ElementStates.Default;
		if (step === 2) {
			loaderAddToHeadSetter(false);
			clearInterval(interval);
		}
		listSetter([...list]);
		step++;
	}, SHORT_DELAY_IN_MS);
	listSetter([...list]);
	inputValueSetter('');
};

export const addToTail = (
	list: TListElement[],
	value: string,
	loaderAddToTailSetter: Dispatch<SetStateAction<boolean>>,
	listSetter: Dispatch<SetStateAction<TListElement[]>>,
	inputValueSetter: Dispatch<SetStateAction<string>>,
	smallCircle: (value: string) => JSX.Element
) => {
	if (list.length === 8) return;
	loaderAddToTailSetter(true);
	let step = 0;
	list[list.length - 1].head = smallCircle(value);
	interval = setInterval(() => {
		if (step === 0) {
			list[list.length - 1].tail = '';
			list[list.length - 1].head = '';
			list.push({
				element: value,
				state: ElementStates.Modified,
				head: '',
				tail: 'tail',
			});
		}
		if (step === 1) list[list.length - 1].state = ElementStates.Default;
		if (step === 2) {
			loaderAddToTailSetter(false);
			clearInterval(interval);
		}
		listSetter([...list]);
		step++;
	}, SHORT_DELAY_IN_MS);
	listSetter([...list]);
	inputValueSetter('');
};

export const removeFromHead = (
	list: TListElement[],
	loaderRemoveFromHeadSetter: Dispatch<SetStateAction<boolean>>,
	listSetter: Dispatch<SetStateAction<TListElement[]>>,
	smallCircle: (value: string) => JSX.Element
) => {
	if (list.length === 1) return;
	loaderRemoveFromHeadSetter(true);
	list[0].tail = smallCircle(list[0].element);
	list[0].element = '';
	setTimeout(() => {
		list.shift();
		list[0].head = 'head';
		loaderRemoveFromHeadSetter(false);
		listSetter([...list]);
	}, SHORT_DELAY_IN_MS);
};

export const removeFromTail = (
	list: TListElement[],
	loaderRemoveFromTailSetter: Dispatch<SetStateAction<boolean>>,
	listSetter: Dispatch<SetStateAction<TListElement[]>>,
	smallCircle: (value: string) => JSX.Element
) => {
	if (list.length === 1) return;
	loaderRemoveFromTailSetter(true);
	list[list.length - 1].tail = smallCircle(list[list.length - 1].element);
	list[list.length - 1].element = '';
	setTimeout(() => {
		list.pop();
		list[list.length - 1].tail = 'tail';
		loaderRemoveFromTailSetter(false);
		listSetter([...list]);
	}, SHORT_DELAY_IN_MS);
};

export const addByIndex = (
	list: TListElement[],
	value: string,
	index: string,
	loaderAddByIndexSetter: Dispatch<SetStateAction<boolean>>,
	listSetter: Dispatch<SetStateAction<TListElement[]>>,
	inputValueSetter: Dispatch<SetStateAction<string>>,
	indexSetter: Dispatch<SetStateAction<string>>,
	smallCircle: (value: string) => JSX.Element
) => {
	if (+index > list.length || /\D/g.test(index)) return;
	loaderAddByIndexSetter(true);
	let step = 0;
	const idx = +index;
	list[0].head = smallCircle(value);
	interval = setInterval(() => {
		if (step <= idx && step > 0) {
			list[step - 1].state = ElementStates.Changing;
			list[step - 1].head = '';
			list[0].head = 'head';
			if (step < list.length) list[step].head = smallCircle(value);
		}

		if (step === idx + 1) {
			if (step <= list.length) list[step - 1].head = '';
			list.map((el) => (el.state = ElementStates.Default));
			list.splice(idx, 0, {
				element: value,
				state: ElementStates.Modified,
				head: '',
				tail: '',
			});
		}

		if (step === idx + 2) {
			list[idx].state = ElementStates.Default;
			if (idx === 0) list[0].head = 'head';
			if (idx === list.length - 1) {
				list[idx - 1].tail = '';
				list[list.length - 1].tail = 'tail';
			}
			loaderAddByIndexSetter(false);
			clearInterval(interval);
		}
		listSetter([...list]);
		step++;
	}, SHORT_DELAY_IN_MS);
	listSetter([...list]);
	inputValueSetter('');
	indexSetter('');
};

export const removeByIndex = (
	list: TListElement[],
	index: string,
	loaderRemoveByIndexSetter: Dispatch<SetStateAction<boolean>>,
	listSetter: Dispatch<SetStateAction<TListElement[]>>,
	indexSetter: Dispatch<SetStateAction<string>>,
	smallCircle: (value: string) => JSX.Element
) => {
	if (+index > list.length - 1 || /\D/g.test(index)) return;
	loaderRemoveByIndexSetter(true);
	let step = 0;
	const idx = +index;
	interval = setInterval(() => {
		if (step <= idx && step > 0) {
			list[step - 1].state = ElementStates.Changing;
		}

		if (step === idx + 1) {
			list[step - 1].tail = smallCircle(list[idx].element);
			list[step - 1].element = '';
		}

		if (step === idx + 2) {
			list.splice(idx, 1);
			if (idx === 0) list[0].head = 'head';
			list.map((el) =>
				el === list[list.length - 1] ? (el.tail = 'tail') : el
			);
			list.map((el) => (el.state = ElementStates.Default));
			loaderRemoveByIndexSetter(false);
			clearInterval(interval);
		}
		listSetter([...list]);
		step++;
	}, SHORT_DELAY_IN_MS);
	listSetter([...list]);
	indexSetter('');
};
