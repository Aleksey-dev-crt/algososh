import { FC, useState } from 'react';
import FibonacciStyles from './fibonacci.module.css';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { nanoid } from 'nanoid';

export const FibonacciPage: FC = () => {
	const [fibNumbers, setFibNumbers] = useState<string[]>([]);
	const [loader, setLoader] = useState<boolean>(false);
	let interval: NodeJS.Timer;

	const [value, setValue] = useState('');
	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const algorithm = (n: number) => {
		setLoader(true);
		const fibArr: string[] = [];
		let i = 1;
		interval = setInterval(() => {
			if (i <= 2) {
				fibArr.push('1');
				setFibNumbers([...fibArr]);
			} else {
				fibArr.push(`${+fibArr[i - 2] + +fibArr[i - 3]}`);
				setFibNumbers([...fibArr]);
			}

			if (n === i - 1) {
				setLoader(false);
				clearInterval(interval);
			}
			i++;
		}, 500);
	};

	const reverseHandler = () => algorithm(+value);

	return (
		<SolutionLayout title='Последовательность Фибоначчи'>
			<div className={FibonacciStyles.container}>
				<Input
					onChange={onChangeInput}
					isLimitText
					type='number'
					max={19}></Input>
				<Button
					text='Рассчитать'
					onClick={reverseHandler}
					disabled={+value > 19}
					isLoader={loader}></Button>
			</div>
			<div className={FibonacciStyles.fibonacci} style={{justifyContent: fibNumbers.length < 10 ? 'center' : 'flex-start'}}>
				{fibNumbers.map((number: string, i: number) => (
					<Circle letter={number} key={nanoid()} index={i}></Circle>
				))}
			</div>
		</SolutionLayout>
	);
};
