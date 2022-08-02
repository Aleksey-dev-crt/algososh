describe('Стек', function () {
	before(function () {
		cy.visit('http://localhost:3000/algososh');
	});

	it('Если в инпуте пусто, то кнопка добавления недоступна', () => {
		cy.get('a[href*="stack"]').click();
		cy.contains('Стек');
		cy.get('input').should('be.empty');
		cy.contains('Добавить').should('be.disabled');
	});

	it('Добавление элементов', () => {
		cy.get('input').type('5');
		cy.contains('Добавить').click();
		cy.get('[class^=stack_stack__]').as('stack');
		cy.get('@stack')
			.find('[class^=circle_content__]')
			.eq(0)
			.as('el1')
			.contains('5')
			.should('have.css', ['border', '4px solid #d252e1']);

		cy.wait(500);

		cy.get('@el1')
			.contains('top')
			.should('have.css', ['border', '4px solid #0032ff']);

		cy.wait(500);

		cy.get('input').type('abc');
		cy.contains('Добавить').click();
		cy.get('@stack')
			.find('[class^=circle_content__]')
			.eq(1)
			.as('el2')
			.contains('abc')
			.should('have.css', ['border', '4px solid #d252e1']);

		cy.wait(500);

		cy.get('@el2')
			.contains('top')
			.should('have.css', ['border', '4px solid #0032ff']);

		cy.wait(500);

		cy.get('input').type('42');
		cy.contains('Добавить').click();
		cy.get('@stack')
			.find('[class^=circle_content__]')
			.eq(2)
			.as('el3')
			.contains('42')
			.should('have.css', ['border', '4px solid #d252e1']);

		cy.wait(500);

		cy.get('@el3')
			.contains('top')
			.should('have.css', ['border', '4px solid #0032ff']);
	});

	it('Удаление элемента', () => {
		cy.contains('Удалить').click();
		cy.get('[class^=stack_stack__]').as('stack');

		cy.get('@stack')
			.find('[class^=circle_content__]')
			.eq(2)
			.as('el3')
			.contains('top')
			.should('have.css', ['border', '4px solid #d252e1']);

		cy.wait(500);

		cy.get('@stack').find('[class^=circle_content__]').eq(1).contains('top');
		cy.get('@el3').should('not.exist');
	});

	it('Очистить стек', () => {
		cy.contains('Очистить').click();
		cy.get('[class^=stack_stack__]').as('stack');
		cy.get('@stack').find('[class^=circle_content__]').should('not.exist');
	});
});
