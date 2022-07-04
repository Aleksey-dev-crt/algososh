import { FC, useState } from 'react';
import QueueStyles from './queue.module.css';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { nanoid } from 'nanoid';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { ElementStates } from '../../types/element-states';

export const QueuePage: FC = () => {
	type TQueueElement = {
		element: string;
		state: ElementStates;
		head: string;
		tail: string;
	};

	const defaultQueue = Array.from({ length: 7 }, () => ({
		element: '',
		state: ElementStates.Default,
		head: '',
		tail: '',
	}));

	const [queue, setQueue] = useState<TQueueElement[]>(defaultQueue);

	const [endOfQueue, setEndOfQueue] = useState<boolean>(false);
	const [queueLength, setQueueLength] = useState<number>(0);
	const [value, setValue] = useState<string>('');
	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const enqueueHandler = () => {
		const tail = queue.findIndex((el) => el.tail === 'tail');
		if (tail === 6 || endOfQueue) return;
		if (tail !== -1) queue[tail].state = ElementStates.Changing;
		else queue[0].state = ElementStates.Changing;
		setTimeout(() => {
			queue[tail + 1].element = value;
			if (tail === -1) queue[0].head = 'head';
			if (tail !== -1) {
				queue[tail].state = ElementStates.Default;
				queue[tail + 1].tail = 'tail';
				queue[tail].tail = '';
			} else {
				queue[0].state = ElementStates.Default;
				queue[0].tail = 'tail';
			}
			setQueue([...queue]);
		}, SHORT_DELAY_IN_MS);
		setQueue([...queue]);
		setQueueLength((prev) => prev + 1);
		setValue('');
	};

	const dequeueHandler = () => {
		const head = queue.findIndex((el) => el.head === 'head');
		if (head === 6 || queueLength === 1) {
			setEndOfQueue(true);
			queue[head].element = '';
			queue[head].tail = '';
			setQueue([...queue]);
			return;
		}
		queue[head].state = ElementStates.Changing;
		setTimeout(() => {
			queue[head].state = ElementStates.Default;
			queue[head].element = '';
			queue[head].head = '';
			queue[head + 1].head = 'head';
			setQueue([...queue]);
		}, SHORT_DELAY_IN_MS);
		setQueue([...queue]);
		setQueueLength((prev) => prev - 1);
	};

	const clearHandler = () => {
		setEndOfQueue(false);
		setQueue(defaultQueue);
		setQueueLength(0);
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
						disabled={endOfQueue}
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
