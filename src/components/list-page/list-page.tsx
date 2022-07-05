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
import {
	addByIndex,
	addToHead,
	addToTail,
	removeByIndex,
	removeFromHead,
	removeFromTail,
} from '../../utils/algorithms';

export const ListPage: FC = () => {
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

	const smallCircle = (value: string) => (
		<Circle isSmall={true} state={ElementStates.Changing} letter={value} />
	);

	const addToHeadHandler = () =>
		addToHead(list, value, setLoaderAddToHead, setList, setValue, smallCircle);

	const addToTailHandler = () =>
		addToTail(list, value, setLoaderAddToTail, setList, setValue, smallCircle);

	const removeFromHeadHandler = () =>
		removeFromHead(list, setLoaderRemoveFromHead, setList, smallCircle);

	const removeFromTailHandler = () =>
		removeFromTail(list, setLoaderRemoveFromTail, setList, smallCircle);

	const addByIndexHandler = () =>
		addByIndex(
			list,
			value,
			index,
			setLoaderAddByIndex,
			setList,
			setValue,
			setIndex,
			smallCircle
		);

	const removeByIndexHandler = () =>
		removeByIndex(
			list,
			index,
			setLoaderRemoveByIndex,
			setList,
			setIndex,
			smallCircle
		);

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
