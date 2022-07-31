import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './button';

describe('Button', () => {
	it('Кнопка без текста рендерится без ошибок', () => {
		const tree = renderer.create(<Button />).toJSON();
		expect(tree).toMatchSnapshot();
	});
	it('Кнопка с текстом рендерится без ошибок', () => {
		const tree = renderer.create(<Button text='текст' />).toJSON();
		expect(tree).toMatchSnapshot();
	});
	it('Заблокированная кнопка рендерится без ошибок', () => {
		const tree = renderer.create(<Button disabled={true} />).toJSON();
		expect(tree).toMatchSnapshot();
	});
	it('Кнопка с индикацией загрузки рендерится без ошибок', () => {
		const tree = renderer.create(<Button isLoader={true} />).toJSON();
		expect(tree).toMatchSnapshot();
	});
	it('Нажатие на кнопку вызывает коллбек', () => {
		const onClick = jest.fn();
		render(<Button text='кнопка' onClick={onClick} />);
		const button = screen.getByText('кнопка');
		fireEvent.click(button);
		expect(onClick).toHaveBeenCalled();
	});
});
