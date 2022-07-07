import { FC, useState } from 'react';
import SortingStyles from './sorting.module.css';
import { Button } from '../ui/button/button';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { RadioInput } from '../ui/radio-input/radio-input';
import { Direction } from '../../types/direction';
import { nanoid } from 'nanoid';
import { Column } from '../ui/column/column';
import { TElement } from '../../types/element-types';
import {
	randomArr,
	resetArray,
	sortBubble,
	sortSelection,
} from '../../utils/sorting';

export const SortingPage: FC = () => {
	const [array, setArray] = useState<TElement[]>([]);
	const [loaderAscending, setLoaderAscending] = useState<boolean>(false);
	const [loaderDescending, setLoaderDescending] = useState<boolean>(false);
	const [sortingMethod, setSortingMethod] = useState<string>('SELECTION');

	const onChangeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSortingMethod(e.target.value);
	};

	const sortAscending = () => {
		resetArray(array);
		if (sortingMethod === 'SELECTION')
			sortSelection(
				'<',
				array,
				setLoaderAscending,
				setLoaderDescending,
				setArray
			);
		if (sortingMethod === 'BUBBLE')
			sortBubble('>', array, setLoaderAscending, setLoaderDescending, setArray);
	};

	const sortDescending = () => {
		resetArray(array);
		if (sortingMethod === 'SELECTION')
			sortSelection(
				'>',
				array,
				setLoaderAscending,
				setLoaderDescending,
				setArray
			);
		if (sortingMethod === 'BUBBLE')
			sortBubble('<', array, setLoaderAscending, setLoaderDescending, setArray);
	};

	const generateArrHandler = () => randomArr(setArray);

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
						onClick={generateArrHandler}
						disabled={loaderDescending || loaderAscending}
						style={{ minWidth: '205px' }}></Button>
				</div>
				<div className={SortingStyles.array}>
					{array.map(({ element, state }: TElement) => (
						<Column index={element} key={nanoid()} state={state} />
					))}
				</div>
			</div>
		</SolutionLayout>
	);
};
