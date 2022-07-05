import { nanoid } from 'nanoid';
import { FC, useState } from 'react';
import StackStyles from './stack.module.css';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { TStackElement } from '../../types/element-types';
import { addToStack, removeFromStack } from '../../utils/algorithms';

export const StackPage: FC = () => {
	const [stack, setStack] = useState<TStackElement[]>([]);
	const [value, setValue] = useState<string>('');
	
	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const addHandler = () => addToStack(stack, value, setStack, setValue);

	const removeHandler = () => removeFromStack(stack, setStack);

	const clearHandler = () => setStack([]);

	return (
		<SolutionLayout title='Стек'>
			<div className={StackStyles.container}>
				<div className={StackStyles.controls}>
					<Input
						onChange={onChangeInput}
						value={value}
						isLimitText
						maxLength={4}></Input>
					<Button
						text='Добавить'
						disabled={!value.length}
						onClick={addHandler}></Button>
					<Button
						text='Удалить'
						disabled={!stack.length}
						onClick={removeHandler}></Button>
				</div>
				<Button
					text='Очистить'
					disabled={!stack.length}
					onClick={clearHandler}></Button>
			</div>
			<div className={StackStyles.stack}>
				{stack.map(({ element, state, top }: TStackElement, i) => (
					<Circle
						letter={element}
						key={nanoid()}
						head={top}
						state={state}
						index={i}></Circle>
				))}
			</div>
		</SolutionLayout>
	);
};
