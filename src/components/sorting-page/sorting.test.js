import { act } from 'react-dom/test-utils';
import {
	render,
	screen,
	fireEvent,
	waitFor,
} from '@testing-library/react';
import { Sorting } from './sorting-page';

describe('String', () => {
    const testSorting = (direction, method) => {
        it('Алгоритм корректно сортирует массив', async () => {
            jest.useFakeTimers();
			render(<Sorting />);
			const ascending = screen.getByText('По возрастанию');
			const descending = screen.getByText('По убыванию');
			const selection = screen.getByLabelText('Выбор');
			const bubble = screen.getByLabelText('Пузырек');
			let expectedArr = null;
			if (method === 'selection') {
				fireEvent.click(selection);
				expect(bubble).not.toBeChecked();
				expect(selection).toBeChecked();
			} else {
				fireEvent.click(bubble);
				expect(selection).not.toBeChecked();
				expect(bubble).toBeChecked();
			}
			if (direction === 'ascending') {
				expectedArr = screen
					.getAllByTestId('column')
					.map((el) => el.textContent)
					.sort((a, b) => a - b);
				fireEvent.click(ascending);
			} else {
				expectedArr = screen
					.getAllByTestId('column')
					.map((el) => el.textContent)
					.sort((a, b) => b - a);
				fireEvent.click(descending);
			}

			act(() => jest.advanceTimersByTime(180000));

			const sortedArr = screen.getAllByTestId('column');
			await waitFor(() =>
				expect(sortedArr.map((el) => el.textContent)).toEqual(expectedArr)
			);
		});
	};
	testSorting('ascending', 'selection'); //Выбором по возрастанию
	testSorting('descending', 'selection'); //Выбором по убыванию
	testSorting('ascending', 'bubble'); //Пузырьком по возрастанию
	testSorting('descending', 'bubble'); //Пузырьком по убыванию
});
