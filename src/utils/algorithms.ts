import { Dispatch, SetStateAction } from 'react';
import { DELAY_IN_MS } from '../constants/delays';
import { ElementStates } from '../types/element-states';

type TSymbol = {
	symbol: string;
	state: ElementStates;
};

let interval: NodeJS.Timer;

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
