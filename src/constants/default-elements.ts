import { ElementStates } from '../types/element-states';
import { linkedList } from '../utils/linkedList';

const defaultArr = [
	{
		element: `${Math.floor(Math.random() * 100)}`,
		state: ElementStates.Default,
		head: 'head',
		tail: '',
	},
	{
		element: `${Math.floor(Math.random() * 100)}`,
		state: ElementStates.Default,
		head: '',
		tail: '',
	},
	{
		element: `${Math.floor(Math.random() * 100)}`,
		state: ElementStates.Default,
		head: '',
		tail: '',
	},
	{
		element: `${Math.floor(Math.random() * 100)}`,
		state: ElementStates.Default,
		head: '',
		tail: 'tail',
	},
];

export const defaultList = linkedList.fromArray(defaultArr);
