describe('Строка', function () {
	before(function () {
		cy.visit('http://localhost:3000/algososh');
	});

	it('Если в инпуте пусто, то кнопка добавления недоступна', () => {
		cy.get('a[href*="recursion"]').click();
		cy.contains('Строка');
		cy.get('input').should('be.empty');
		cy.get('button').should('be.disabled');
	});

	it('Проверка алгоритма', () => {
		cy.get('input').type('12345');
		cy.contains('Развернуть').click();
		cy.get('[class^=string_string__]').as('string');
		cy.get('@string')
			.find('[class^=circle_circle__]')
			.each((el, index) => {
				cy.wrap(el).should('contain', ['1', '2', '3', '4', '5'][index]);
				cy.wrap(el).should(
					'have.css',
					[
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
					][index]
				);
			});

		cy.wait(1000);

		cy.get('@string')
			.find('[class^=circle_circle__]')
			.each((el, index) => {
				cy.wrap(el).should('contain', ['5', '2', '3', '4', '1'][index]);
				cy.wrap(el).should(
					'have.css',
					[
						['border', '4px solid #7fe051'],
						['border', '4px solid #d252e1'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #d252e1'],
						['border', '4px solid #7fe051'],
					][index]
				);
			});

		cy.wait(1000);

		cy.get('@string')
			.find('[class^=circle_circle__]')
			.each((el, index) => {
				cy.wrap(el).should('contain', ['5', '4', '3', '2', '1'][index]);
				cy.wrap(el).should(
					'have.css',
					[
						['border', '4px solid #7fe051'],
						['border', '4px solid #7fe051'],
						['border', '4px solid #7fe051'],
						['border', '4px solid #7fe051'],
						['border', '4px solid #7fe051'],
					][index]
				);
			});
	});
});
