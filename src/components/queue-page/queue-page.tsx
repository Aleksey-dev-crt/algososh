import { FC, useState } from 'react';
import QueueStyles from './queue.module.css';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { nanoid } from 'nanoid';
import { TQueueElement } from '../../types/element-types';
import { qe } from '../../utils/queue';
import { ElementStates } from '../../types/element-states';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';

export const QueuePage: FC = () => {
	const defaultQueue = qe.getElements();

	const [queue, setQueue] = useState<TQueueElement[]>(defaultQueue);
	const [value, setValue] = useState<string>('');

	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const enqueueHandler = () => {
		if (qe.head >= 6) return
		qe.enqueue({
			element: value,
			state: ElementStates.Default,
			head: '',
			tail: '',
		});
		qe.getTail().state = ElementStates.Changing;
		qe.getTail().tail = 'tail';
		qe.getHead().head = 'head';
		if (qe.length > 1) qe.getElements()[qe.tail - 2].tail = '';
		setTimeout(() => {
			qe.getTail().state = ElementStates.Default;
			setQueue([...qe.getElements()]);
		}, SHORT_DELAY_IN_MS);
		setQueue([...qe.getElements()]);
		setValue('');
	};

	const dequeueHandler = () => {
		if (qe.isEmpty()) return
		if (qe.length) qe.getHead().state = ElementStates.Changing;
		setQueue([...qe.getElements()]);
		if (qe.length > 1) qe.dequeue();
		else {
			qe.getElements()[qe.head].state = ElementStates.Default;
			qe.getHead().element = ''
			qe.getHead().tail = ''
			qe.tail--
			qe.length--
		} 
		setTimeout(() => {
			if (qe.length > 0) qe.getHead().head = 'head';
			qe.getHead().state = ElementStates.Default;
			setQueue([...qe.getElements()]);
		}, SHORT_DELAY_IN_MS);	
	};

	const clearHandler = () => {
		setQueue([...qe.clear()]);
	};

	return (
		<SolutionLayout title='Очередь'>
			<div className={QueueStyles.container}>
				<div className={QueueStyles.controls}>
					<Input
						onChange={onChangeInput}
						value={value}
						isLimitText
						maxLength={4}></Input>
					<Button
						text='Добавить'
						disabled={!value.length}
						onClick={enqueueHandler}></Button>
					<Button
						text='Удалить'
						disabled={qe.head === 6 && qe.isEmpty()}
						onClick={dequeueHandler}></Button>
				</div>
				<Button text='Очистить' onClick={clearHandler}></Button>
			</div>
			<div className={QueueStyles.queue}>
				{queue.map(({ element, state, head, tail }: TQueueElement, i) => (
					<Circle
						letter={element}
						key={nanoid()}
						head={head}
						tail={tail}
						state={state}
						index={i}
					/>
				))}
			</div>
		</SolutionLayout>
	);
};
