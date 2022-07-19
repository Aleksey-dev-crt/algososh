import { nanoid } from 'nanoid';
import { FC, useState } from 'react';
import StackStyles from './stack.module.css';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { TStackElement } from '../../types/element-types';
import { st } from '../../utils/stack';
import { ElementStates } from '../../types/element-states';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';

export const StackPage: FC = () => {
	const [stack, setStack] = useState<TStackElement[]>([]);
	const [value, setValue] = useState<string>('');

	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const addHandler = () => {
		st.push({ element: value, state: ElementStates.Changing, top: '' });
		st.getElements().map((el) =>
			el === st.getElements()[st.getSize() - 1] ? (el.top = 'top') : (el.top = '')
		);
		setStack([...st.getElements()])
		setTimeout(() => {
			st.getElements()[st.getSize() - 1].state = ElementStates.Default;
			setStack([...st.getElements()]);
		}, SHORT_DELAY_IN_MS);
		setValue('');
	};

	const removeHandler = () => {
		st.getElements()[st.getSize() - 1].state = ElementStates.Changing;
		setTimeout(() => {
			st.getElements()[st.getSize() - 1].state = ElementStates.Default;
			st.pop()
			if (st.getSize() > 0) st.getElements()[st.getSize() - 1].top = 'top';
			setStack([...st.getElements()]);
		}, SHORT_DELAY_IN_MS);
		setStack([...st.getElements()]);	
	}

	const clearHandler = () => setStack([...st.clear()]);

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
