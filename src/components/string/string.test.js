import { act } from 'react-dom/test-utils';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { String } from './string';

describe('String', () => {
	const testString = (value, result) => {
		it('Алгоритм корректно переворачивает строку', async () => {
			jest.useFakeTimers();
			render(<String />);
			const button = screen.getByText('Развернуть');
			const input = screen.getByPlaceholderText('Введите текст');
			fireEvent.change(input, { target: { value: value } });
			fireEvent.click(button);
			act(() => jest.advanceTimersByTime(11000));

			const elements = screen.getAllByTestId('circle');
			await waitFor(() =>
				expect(elements.map((el) => el.textContent).join('')).toBe(result)
			);
		});
	};
	testString('123456', '654321'); //четное количество символов
	testString('1234567', '7654321'); //нечетное количество символов
	testString('1', '1'); //1 символ
});
