import renderer from 'react-test-renderer';
import { Circle } from './circle';
import { ElementStates } from "../../../types/element-states";

describe('Circle', () => {
	it('Кружок без буквы рендерится без ошибок', () => {
		const tree = renderer.create(<Circle />).toJSON();
		expect(tree).toMatchSnapshot();
	});
	it('Кружок с буквами рендерится без ошибок', () => {
		const tree = renderer.create(<Circle letter='abcd' />).toJSON();
		expect(tree).toMatchSnapshot();
	});
	it('Кружок с head рендерится без ошибок', () => {
		const tree = renderer.create(<Circle head='head' />).toJSON();
		expect(tree).toMatchSnapshot();
	});
	it('Кружок с реакт элементом в head рендерится без ошибок', () => {
		const tree = renderer.create(<Circle head={<Circle isSmall={true} letter='head' />} />).toJSON();
		expect(tree).toMatchSnapshot();
	});	
	it('Кружок с tail рендерится без ошибок', () => {
		const tree = renderer.create(<Circle tail='tail' />).toJSON();
		expect(tree).toMatchSnapshot();
	});
	it('Кружок с реакт элементом в tail рендерится без ошибок', () => {
		const tree = renderer.create(<Circle tail={<Circle isSmall={true} letter='tail' />} />).toJSON();
		expect(tree).toMatchSnapshot();
	});	
	it('Кружок с index рендерится без ошибок', () => {
		const tree = renderer.create(<Circle index={0} />).toJSON();
		expect(tree).toMatchSnapshot();
	});
	it('Кружок с пропом isSmall рендерится без ошибок', () => {
		const tree = renderer.create(<Circle isSmall={true} />).toJSON();
		expect(tree).toMatchSnapshot();
	});
	it('Кружок в состоянии default рендерится без ошибок', () => {
		const tree = renderer.create(<Circle state='default' />).toJSON();
		expect(tree).toMatchSnapshot();
	});
	it('Кружок в состоянии changing рендерится без ошибок', () => {
		const tree = renderer.create(<Circle state='changing' />).toJSON();
		expect(tree).toMatchSnapshot();
	});
	it('Кружок в состоянии modified рендерится без ошибок', () => {
		const tree = renderer.create(<Circle state='modified' />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
