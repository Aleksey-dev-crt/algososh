describe('Последовательность Фибоначчи', function () {
	before(function () {
		cy.visit('http://localhost:3000/algososh');
	});

	it('Если в инпуте пусто, то кнопка добавления недоступна', () => {
		cy.get('a[href*="fibonacci"]').click();
		cy.contains('Последовательность Фибоначчи');
		cy.get('input').should('be.empty');
		cy.get('button').should('be.disabled');
	});

	it('Проверка алгоритма', () => {
		cy.get('input').type('5');
		cy.contains('Рассчитать').click();
		cy.get('[class^=fibonacci_fibonacci__]').as('fibonacci');
		cy.get('@fibonacci')
			.find('[class^=circle_circle__]')
			.each((el, index) => {
				cy.wrap(el).should('contain', ['1'][index]);
			});

		cy.wait(500);

		cy.get('@fibonacci')
			.find('[class^=circle_circle__]')
			.each((el, index) => {
				cy.wrap(el).should('contain', ['1', '1'][index]);
			});

		cy.wait(500);

		cy.get('@fibonacci')
			.find('[class^=circle_circle__]')
			.each((el, index) => {
				cy.wrap(el).should('contain', ['1', '1', '2'][index]);
			});

		cy.wait(500);

		cy.get('@fibonacci')
			.find('[class^=circle_circle__]')
			.each((el, index) => {
				cy.wrap(el).should('contain', ['1', '1', '2', '3'][index]);
			});

		cy.wait(500);

		cy.get('@fibonacci')
			.find('[class^=circle_circle__]')
			.each((el, index) => {
				cy.wrap(el).should('contain', ['1', '1', '2', '3', '5'][index]);
			});

		cy.wait(500);

		cy.get('@fibonacci')
			.find('[class^=circle_circle__]')
			.each((el, index) => {
				cy.wrap(el).should('contain', ['1', '1', '2', '3', '5', '8'][index]);
			});
	});
});
