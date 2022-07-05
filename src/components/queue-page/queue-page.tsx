import { FC, useState } from 'react';
import QueueStyles from './queue.module.css';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { nanoid } from 'nanoid';
import { TQueueElement } from '../../types/element-types';
import { dequeue, enqueue, generateDefaultQueue } from '../../utils/algorithms';

export const QueuePage: FC = () => {
	const defaultQueue = generateDefaultQueue()

	const [queue, setQueue] = useState<TQueueElement[]>(defaultQueue);
	const [endOfQueue, setEndOfQueue] = useState<boolean>(false);
	const [queueLength, setQueueLength] = useState<number>(0);
	const [value, setValue] = useState<string>('');

	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const enqueueHandler = () =>
		enqueue(queue, value, endOfQueue, setQueue, setQueueLength, setValue);

	const dequeueHandler = () =>
		dequeue(queue, queueLength, setQueue, setQueueLength, setEndOfQueue);

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
