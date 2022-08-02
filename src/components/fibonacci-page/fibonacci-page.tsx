import { FC, useState } from 'react';
import FibonacciStyles from './fibonacci.module.css';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { nanoid } from 'nanoid';
import { generateFibArr } from '../../utils/fibonacci';

export const FibonacciPage: FC = () => {
	const [fibNumbers, setFibNumbers] = useState<string[]>([]);
	const [loader, setLoader] = useState<boolean>(false);
	const [value, setValue] = useState('');

	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.target.value = e.target.value.substr(0, 2);
		setValue(e.target.value);
	};

	const fibHandler = () => generateFibArr(+value, setLoader, setFibNumbers);

	return (
		<SolutionLayout title='Последовательность Фибоначчи'>
			<div className={FibonacciStyles.container}>
				<Input
					onChange={onChangeInput}
					isLimitText={true}
					type='number'
					max={19}></Input>
				<Button
					text='Рассчитать'
					onClick={fibHandler}
					disabled={+value > 19 || !value}
					isLoader={loader}></Button>
			</div>
			<div
				className={FibonacciStyles.fibonacci}
				style={{
					justifyContent: fibNumbers.length < 10 ? 'center' : 'flex-start',
				}}>
				{fibNumbers.map((number: string, i: number) => (
					<Circle letter={number} key={nanoid()} index={i} />
				))}
			</div>
		</SolutionLayout>
	);
};
