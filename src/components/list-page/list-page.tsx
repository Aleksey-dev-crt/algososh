import { FC, useState, Fragment } from 'react';
import ListStyles from './list.module.css';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { nanoid } from 'nanoid';
import { ElementStates } from '../../types/element-states';
import { ArrowIcon } from '../ui/icons/arrow-icon';
import { defaultList } from '../../constants/default-elements';
import { TListElement } from '../../types/element-types';
import { linkedList } from '../../utils/linkedList';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';

export const ListPage: FC = () => {
	const initialList = defaultList.toArray();
	let interval: ReturnType<typeof setInterval>;

	const [list, setList] = useState<TListElement[]>(initialList);
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

	const smallCircle = (value: string) => (
		<Circle isSmall={true} state={ElementStates.Changing} letter={value} />
	);

	const addToHeadHandler = () => {
		if (list.length === 8) return;
		setLoaderAddToHead(true);
		let step = 0;
		linkedList.toArray()[0].head = smallCircle(value);
		interval = setInterval(() => {
			if (step === 0) {
				linkedList.toArray()[0].head = '';
				linkedList.prepend({
					element: value,
					state: ElementStates.Modified,
					head: 'head',
					tail: '',
				});
			}
			if (step === 1) linkedList.toArray()[0].state = ElementStates.Default;
			if (step === 2) {
				setLoaderAddToHead(false);
				clearInterval(interval);
			}
			setList([...linkedList.toArray()]);
			step++;
		}, SHORT_DELAY_IN_MS);
		setList([...linkedList.toArray()]);
		setValue('');
	};

	const addToTailHandler = () => {
		setList([...linkedList.toArray()]);
		if (list.length === 8) return;
		setLoaderAddToTail(true);
		let step = 0;
		linkedList.toArray()[linkedList.size - 1].head = smallCircle(value);
		interval = setInterval(() => {
			if (step === 0) {
				linkedList.toArray()[linkedList.size - 1].tail = '';
				linkedList.toArray()[linkedList.size - 1].head = '';
				linkedList.append({
					element: value,
					state: ElementStates.Modified,
					head: '',
					tail: 'tail',
				});
			}
			if (step === 1)
				linkedList.toArray()[linkedList.size - 1].state = ElementStates.Default;
			if (step === 2) {
				setLoaderAddToTail(false);
				clearInterval(interval);
			}
			setList([...linkedList.toArray()]);
			step++;
		}, SHORT_DELAY_IN_MS);
		setList([...linkedList.toArray()]);
		setValue('');
	};

	const removeFromHeadHandler = () => {
		if (list.length === 1) return;
		setLoaderRemoveFromHead(true);
		linkedList.toArray()[0].tail = smallCircle(linkedList.toArray()[0].element);
		linkedList.toArray()[0].element = '';
		setTimeout(() => {
			linkedList.deleteHead();
			linkedList.toArray()[0].head = 'head';
			setLoaderRemoveFromHead(false);
			setList([...linkedList.toArray()]);
		}, SHORT_DELAY_IN_MS);
	};

	const removeFromTailHandler = () => {
		setList([...linkedList.toArray()]);
		if (list.length === 1) return;
		setLoaderRemoveFromTail(true);
		linkedList.toArray()[linkedList.size - 1].tail = smallCircle(
			linkedList.toArray()[linkedList.size - 1].element
		);
		linkedList.toArray()[linkedList.size - 1].element = '';
		setTimeout(() => {
			linkedList.deleteTail();
			linkedList.toArray()[linkedList.size - 1].tail = 'tail';
			setLoaderRemoveFromTail(false);
			setList([...linkedList.toArray()]);
		}, SHORT_DELAY_IN_MS);
	};

	const addByIndexHandler = () => {
		setList([...linkedList.toArray()]);
		if (+index > list.length || /\D/g.test(index)) return;
		setLoaderAddByIndex(true);
		let step = 0;
		const idx = +index;
		linkedList.toArray()[0].head = smallCircle(value);
		interval = setInterval(() => {
			if (step <= idx && step > 0) {
				linkedList.toArray()[step - 1].state = ElementStates.Changing;
				linkedList.toArray()[step - 1].head = '';
				linkedList.toArray()[0].head = 'head';
				if (step < linkedList.size)
					linkedList.toArray()[step].head = smallCircle(value);
			}
			if (step === idx + 1) {
				if (step <= list.length) list[step - 1].head = '';
				linkedList.toArray().map((el) => (el.state = ElementStates.Default));
				linkedList.addByIndex(
					{
						element: value,
						state: ElementStates.Modified,
						head: '',
						tail: '',
					},
					+index
				);
			}
			if (step === idx + 2) {
				linkedList.toArray()[idx].state = ElementStates.Default;
				if (idx === 0) linkedList.toArray()[0].head = 'head';
				if (idx === linkedList.size - 1) {
					linkedList.toArray()[idx - 1].tail = '';
					linkedList.toArray()[linkedList.size - 1].tail = 'tail';
				}
				setLoaderAddByIndex(false);
				clearInterval(interval);
			}
			setList([...linkedList.toArray()]);
			step++;
		}, SHORT_DELAY_IN_MS);
		setList([...linkedList.toArray()]);
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
				linkedList.toArray()[step - 1].state = ElementStates.Changing;
			}
			if (step === idx + 1) {
				linkedList.toArray()[step - 1].tail = smallCircle(
					linkedList.toArray()[idx].element
				);
				linkedList.toArray()[step - 1].element = '';
			}
			if (step === idx + 2) {
				linkedList.deleteByIndex(+index);
				if (idx === 0) linkedList.toArray()[0].head = 'head';
				linkedList
					.toArray()
					.map((el) =>
						el === linkedList.toArray()[linkedList.size - 1]
							? (el.tail = 'tail')
							: el
					);
				linkedList.toArray().map((el) => (el.state = ElementStates.Default));
				setLoaderRemoveByIndex(false);
				clearInterval(interval);
			}
			setList([...linkedList.toArray()]);
			step++;
		}, SHORT_DELAY_IN_MS);
		setList([...linkedList.toArray()]);
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
