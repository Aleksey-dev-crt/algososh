import { FC, useState, ReactElement, Fragment } from 'react';
import ListStyles from './list.module.css';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { nanoid } from 'nanoid';
import { ElementStates } from '../../types/element-states';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { ArrowIcon } from '../ui/icons/arrow-icon';
import { defaultList } from '../../constants/default-elements';

export const ListPage: FC = () => {
	type TListElement = {
		element: string;
		state: ElementStates;
		head: string | ReactElement;
		tail: string | ReactElement;
	};

	let interval: NodeJS.Timer;

	const [list, setList] = useState<TListElement[]>(defaultList);
	const [value, setValue] = useState<string>('');
	const [index, setIndex] = useState<string>('');
	const [loaderAddToHead, setLoaderAddToHead] = useState<boolean>(false);
	const [loaderAddToTail, setLoaderAddToTail] = useState<boolean>(false);
	const [loaderRemoveFromHead, setLoaderRemoveFromHead] =
		useState<boolean>(false);
	const [loaderRemoveFromTail, setLoaderRemoveFromTail] =
		useState<boolean>(false);
	const [loaderAddByIndex, setLoaderAddByIndex] = useState<boolean>(false);
	const [loaderRemoveByIndex, setLoaderRemoveByIndex] =
		useState<boolean>(false);

	const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const onChangeInputIndex = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIndex(e.target.value);
	};

	const addToHeadHandler = () => {
		if (list.length === 8) return;
		setLoaderAddToHead(true);
		let step = 0;
		list[0].head = (
			<Circle isSmall={true} state={ElementStates.Changing} letter={value} />
		);
		interval = setInterval(() => {
			if (step === 0) {
				list[0].head = '';
				list.unshift({
					element: value,
					state: ElementStates.Modified,
					head: 'head',
					tail: '',
				});
			}
			if (step === 1) list[0].state = ElementStates.Default;
			if (step === 2) {
				setLoaderAddToHead(false);
				clearInterval(interval);
			}
			setList([...list]);
			step++;
		}, SHORT_DELAY_IN_MS);
		setList([...list]);
		setValue('');
	};

	const addToTailHandler = () => {
		if (list.length === 8) return;
		setLoaderAddToTail(true);
		let step = 0;
		list[list.length - 1].head = (
			<Circle isSmall={true} state={ElementStates.Changing} letter={value} />
		);
		interval = setInterval(() => {
			if (step === 0) {
				list[list.length - 1].tail = '';
				list[list.length - 1].head = '';
				list.push({
					element: value,
					state: ElementStates.Modified,
					head: '',
					tail: 'tail',
				});
			}
			if (step === 1) list[list.length - 1].state = ElementStates.Default;
			if (step === 2) {
				setLoaderAddToTail(false);
				clearInterval(interval);
			}
			setList([...list]);
			step++;
		}, SHORT_DELAY_IN_MS);
		setList([...list]);
		setValue('');
	};

	const removeFromHeadHandler = () => {
		if (list.length === 1) return;
		setLoaderRemoveFromHead(true);
		list[0].tail = (
			<Circle
				isSmall={true}
				state={ElementStates.Changing}
				letter={list[0].element}
			/>
		);
		list[0].element = '';
		setTimeout(() => {
			list.shift();
			list[0].head = 'head';
			setLoaderRemoveFromHead(false);
			setList([...list]);
		}, SHORT_DELAY_IN_MS);
	};

	const removeFromTailHandler = () => {
		if (list.length === 1) return;
		setLoaderRemoveFromTail(true);
		list[list.length - 1].tail = (
			<Circle
				isSmall={true}
				state={ElementStates.Changing}
				letter={list[list.length - 1].element}
			/>
		);
		list[list.length - 1].element = '';
		setTimeout(() => {
			list.pop();
			list[list.length - 1].tail = 'tail';
			setLoaderRemoveFromTail(false);
			setList([...list]);
		}, SHORT_DELAY_IN_MS);
	};

	const addByIndexHandler = () => {
		if (+index > list.length || /\D/g.test(index)) return;
		setLoaderAddByIndex(true);
		let step = 0;
		const idx = +index;
		list[0].head = (
			<Circle isSmall={true} state={ElementStates.Changing} letter={value} />
		);
		interval = setInterval(() => {
			if (step <= idx && step > 0) {
				list[step - 1].state = ElementStates.Changing;
				list[step - 1].head = '';
				list[0].head = 'head';
				if (step < list.length)
					list[step].head = (
						<Circle
							isSmall={true}
							state={ElementStates.Changing}
							letter={value}
						/>
					);
			}

			if (step === idx + 1) {
				if (step < list.length) list[step - 1].head = '';
				list.map((el) => (el.state = ElementStates.Default));
				list.splice(idx, 0, {
					element: value,
					state: ElementStates.Modified,
					head: '',
					tail: '',
				});
			}

			if (step === idx + 2) {
				list[idx].state = ElementStates.Default;
				if (idx === 0) list[0].head = 'head';
				if (idx === list.length - 1) {
					list[idx - 1].tail = '';
					list[list.length - 1].tail = 'tail';
				}
				setLoaderAddByIndex(false);
				clearInterval(interval);
			}
			setList([...list]);
			step++;
		}, SHORT_DELAY_IN_MS);
		setList([...list]);
		setValue('');
		setIndex('');
	};

	const removeByIndexHandler = () => {
		if (+index > list.length - 1 || /\D/g.test(index)) return;
		setLoaderRemoveByIndex(true);
		let step = 0;
		const idx = +index;
		interval = setInterval(() => {
			if (step <= idx && step > 0) {
				list[step - 1].state = ElementStates.Changing;
			}

			if (step === idx + 1) {
				list[step - 1].tail = (
					<Circle
						isSmall={true}
						state={ElementStates.Changing}
						letter={list[idx].element}
					/>
				);
				list[step - 1].element = '';
			}

			if (step === idx + 2) {
				list.splice(idx, 1);
				if (idx === 0) list[0].head = 'head';
				list.map((el) =>
					el === list[list.length - 1] ? (el.tail = 'tail') : el
				);
				list.map((el) => (el.state = ElementStates.Default));
				setLoaderRemoveByIndex(false);
				clearInterval(interval);
			}
			setList([...list]);
			step++;
		}, SHORT_DELAY_IN_MS);
		setList([...list]);
		setIndex('');
	};

	return (
		<SolutionLayout title='Связный список'>
			<div className={ListStyles.container}>
				<div className={ListStyles.controls}>
					<Input
						onChange={onChangeInputValue}
						value={value}
						placeholder='Введите значение'
						isLimitText
						maxLength={4}></Input>
					<Button
						text='Добавить&nbsp;в&nbsp;head'
						disabled={!value.length}
						isLoader={loaderAddToHead}
						style={{ minWidth: '175px' }}
						onClick={addToHeadHandler}></Button>
					<Button
						text='Добавить&nbsp;в&nbsp;tail'
						disabled={!value.length}
						isLoader={loaderAddToTail}
						style={{ minWidth: '175px' }}
						onClick={addToTailHandler}></Button>
					<Button
						text='Удалить&nbsp;из&nbsp;head'
						disabled={loaderAddToTail || loaderAddToHead}
						isLoader={loaderRemoveFromHead}
						style={{ minWidth: '175px' }}
						onClick={removeFromHeadHandler}></Button>
					<Button
						text='Удалить&nbsp;из&nbsp;tail'
						disabled={loaderAddToTail || loaderAddToHead}
						isLoader={loaderRemoveFromTail}
						style={{ minWidth: '175px' }}
						onClick={removeFromTailHandler}></Button>
				</div>
				<div className={ListStyles.controls}>
					<Input
						onChange={onChangeInputIndex}
						value={index}
						placeholder='Введите индекс'
						maxLength={1}></Input>
					<Button
						text='Добавить&nbsp;по&nbsp;индексу'
						disabled={!index.length || !value.length}
						isLoader={loaderAddByIndex}
						style={{ minWidth: '362px' }}
						onClick={addByIndexHandler}></Button>
					<Button
						text='Удалить&nbsp;по&nbsp;индексу'
						disabled={!index.length}
						isLoader={loaderRemoveByIndex}
						style={{ minWidth: '362px' }}
						onClick={removeByIndexHandler}></Button>
				</div>
			</div>
			<div className={ListStyles.list}>
				{list.map(({ element, state, head, tail }: TListElement, i) => (
					<Fragment key={nanoid()}>
						<Circle
							letter={element}
							head={head}
							tail={tail}
							state={state}
							index={i}
						/>
						<ArrowIcon />
					</Fragment>
				))}
			</div>
		</SolutionLayout>
	);
};
