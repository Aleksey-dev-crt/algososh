import { Dispatch, SetStateAction } from 'react';
import { DELAY_IN_MS } from '../constants/delays';
import { ElementStates } from '../types/element-states';
import { TSymbol } from '../types/element-types';

let interval: ReturnType<typeof setInterval>;

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
		if (elements.length === 1) {
			elements[i].state = ElementStates.Modified;
			loaderSetter(false);
			clearInterval(interval);
			return
		}
		[elements[i], elements[j]] = [elements[j], elements[i]];
		elements[i].state = ElementStates.Modified;
		elements[i + 1].state = ElementStates.Changing;
		elements[j - 1].state = ElementStates.Changing;
		elements[j].state = ElementStates.Modified;
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
