import { FC, useState } from 'react';
import StringStyles from './string.module.css';
import { Button } from '../ui/button/button';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Circle } from '../ui/circle/circle';
import { nanoid } from 'nanoid';
import { ElementStates } from '../../types/element-states';
import { reverseString } from '../../utils/algorithms';
import { TSymbol } from '../../types/element-types';

export const StringComponent: FC = () => {
	const [symbols, setSymbols] = useState<TSymbol[]>([]);
	const [loader, setLoader] = useState<boolean>(false);
	const [value, setValue] = useState<string>('');

	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const reverseHandler = () => {
		const elements = value
			.split('')
			.map((el) => ({ symbol: el, state: ElementStates.Default }));
		reverseString(elements, setLoader, setSymbols);
	};

	return (
		<SolutionLayout title='Строка'>
			<div className={StringStyles.container}>
				<Input onChange={onChangeInput} isLimitText maxLength={11}></Input>
				<Button
					text='Развернуть'
					onClick={reverseHandler}
					disabled={!value.length}
					isLoader={loader}></Button>
			</div>
			<div className={StringStyles.string}>
				{symbols.map(({ symbol, state }: TSymbol) => (
					<Circle letter={symbol} key={nanoid()} state={state} />
				))}
			</div>
		</SolutionLayout>
	);
};
