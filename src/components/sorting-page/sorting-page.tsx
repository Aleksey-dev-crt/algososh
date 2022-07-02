import { FC, useState } from 'react';
import SortingStyles from './sorting.module.css';
import { Button } from '../ui/button/button';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { RadioInput } from '../ui/radio-input/radio-input';
import { Direction } from '../../types/direction';
import { nanoid } from 'nanoid';
import { Column } from '../ui/column/column';
import { ElementStates } from '../../types/element-states';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';

export const SortingPage: FC = () => {
	type TElement = {
		element: number;
		state: ElementStates;
	};

	const [array, setArray] = useState<TElement[]>([]);
	const [loaderAscending, setLoaderAscending] = useState<boolean>(false);
	const [loaderDescending, setLoaderDescending] = useState<boolean>(false);
	let interval: NodeJS.Timer;

	const [sortingMethod, setSortingMethod] = useState<string>('SELECTION');
	const onChangeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSortingMethod(e.target.value);
	};

	const compareTool = (a: number, operator: string, b: number) => {
		if (operator === '<') return a < b;
		if (operator === '>') return a > b;
	};

	const sortSelection = (operator: string) => {
		if (operator === '<') setLoaderAscending(true);
		if (operator === '>') setLoaderDescending(true);
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

			setArray([...array]);
			j++;

			if (i === array.length) {
				if (operator === '<') setLoaderAscending(false);
				if (operator === '>') setLoaderDescending(false);
				minIndex = 0;
				clearInterval(interval);
			}
		}, SHORT_DELAY_IN_MS);
	};

	const sortBubble = (operator: string) => {
		if (operator === '<') setLoaderDescending(true);
		if (operator === '>') setLoaderAscending(true);
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

			setArray([...array]);
			left++;
			right++;

			if (count === 0) {
				if (operator === '<') setLoaderDescending(false);
				if (operator === '>') setLoaderAscending(false);
				clearInterval(interval);
			}
		}, SHORT_DELAY_IN_MS);
	};

	const sortAscending = () => {
		array.map((el) =>
			el.state === ElementStates.Modified
				? (el.state = ElementStates.Default)
				: el
		);
		if (sortingMethod === 'SELECTION') sortSelection('<');
		if (sortingMethod === 'BUBBLE') sortBubble('>');
	};

	const sortDescending = () => {
		array.map((el) =>
			el.state === ElementStates.Modified
				? (el.state = ElementStates.Default)
				: el
		);
		if (sortingMethod === 'SELECTION') sortSelection('>');
		if (sortingMethod === 'BUBBLE') sortBubble('<');
	};

	const randomArr = () => {
		const arrLength = Math.floor(Math.random() * 15 + 3);
		const arr = Array.from({ length: arrLength }, () => ({
			element: Math.floor(Math.random() * 100),
			state: ElementStates.Default,
		}));
		setArray([...arr]);
	};

	return (
		<SolutionLayout title='Сортировка массива'>
			<div className={SortingStyles.container}>
				<div className={SortingStyles.controlPanel}>
					<div className={SortingStyles.radioButtons} onChange={onChangeRadio}>
						<RadioInput
							label={'Выбор'}
							value='SELECTION'
							name='sorting'
							defaultChecked></RadioInput>
						<RadioInput
							label={'Пузырек'}
							value='BUBBLE'
							name='sorting'></RadioInput>
					</div>
					<div className={SortingStyles.sortingButtons}>
						<Button
							text='По&nbsp;возрастанию'
							onClick={sortAscending}
							style={{ minWidth: '205px' }}
							sorting={Direction.Ascending}
							disabled={!array.length || loaderDescending}
							isLoader={loaderAscending}></Button>
						<Button
							text='По&nbsp;убыванию'
							onClick={sortDescending}
							style={{ minWidth: '205px' }}
							sorting={Direction.Descending}
							disabled={!array.length || loaderAscending}
							isLoader={loaderDescending}></Button>
					</div>
					<Button
						text='Новый массив'
						onClick={randomArr}
						disabled={loaderDescending || loaderAscending}
						style={{ minWidth: '205px' }}></Button>
				</div>
				<div className={SortingStyles.array}>
					{array.map(({ element, state }: TElement) => (
						<Column index={element} key={nanoid()} state={state}></Column>
					))}
				</div>
			</div>
		</SolutionLayout>
	);
};
