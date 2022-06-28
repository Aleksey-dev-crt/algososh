import { FC, useState } from 'react';
import StringStyles from './string.module.css'
import { Button } from '../ui/button/button';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Circle } from '../ui/circle/circle';
import { nanoid } from 'nanoid';
import { ElementStates } from '../../types/element-states';
import { swap } from '../../utils/utils';

export const StringComponent: FC = () => {
  type TSymbol = {
    symbol: string,
    state: ElementStates
  }

  const [symbols, setSymbols] = useState<TSymbol[]>([])
  const [loader, setLoader] = useState<boolean>(false)
  let interval: NodeJS.Timer

  const [value, setValue] = useState('')
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
      
    const algorithm = (elements: TSymbol[]) => {
      setLoader(true)
      setSymbols(elements)
      let i = 0
      let j = elements.length - 1
      interval = setInterval(() => {
        swap(elements, i, j)
        elements[i].state = ElementStates.Modified
        elements[i+1].state = ElementStates.Changing
        elements[j].state = ElementStates.Modified
        elements[j-1].state = ElementStates.Changing
        setSymbols([...elements])
        i++
        j--
        if (Math.floor(elements.length / 2) === i) {
          elements[i].state = ElementStates.Modified
          elements[i-1].state = ElementStates.Modified
          setSymbols([...elements])
          setLoader(false)
          clearInterval(interval)
        } 
      }, 1000)      
    }    

  const reverseHandler = () => {
    const elements = value.split('').map(el => ({symbol: el, state: ElementStates.Default}))
    algorithm(elements)
  }

	return (
		<SolutionLayout title='Строка'>
			<div className={StringStyles.container}>
				<Input onChange={onChangeInput} isLimitText maxLength={11}></Input>
				<Button text='Развернуть' onClick={reverseHandler} isLoader={loader}></Button>
			</div>
      <div className={StringStyles.string}>
        {symbols.map(({symbol, state}: TSymbol) => (
        <Circle letter={symbol} key={nanoid()} state={state} ></Circle>
        ))}
      </div>
		</SolutionLayout>
	);
};

