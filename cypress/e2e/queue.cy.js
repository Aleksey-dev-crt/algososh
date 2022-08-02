describe('Очередь', function () {
	before(function () {
		cy.visit('http://localhost:3000/algososh');
	});

	it('Если в инпуте пусто, то кнопка добавления недоступна', () => {
		cy.get('a[href*="queue"]').click();
		cy.contains('Очередь');
		cy.get('input').should('be.empty');
		cy.contains('Добавить').should('be.disabled');
	});

	it('Добавление элементов', () => {
		cy.get('input').type('5');
		cy.contains('Добавить').click();
		cy.get('[class^=queue_queue__]').as('queue');
		cy.get('@queue')
			.find('[class^=circle_content__]')
			.each((el, index) => {
				cy.wrap(el).should(
					'have.css',
					[
						['border', '4px solid #d252e1'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
					][index]
				);
			});

		cy.wait(500);

		cy.get('@queue')
			.find('[class^=circle_content__]')
			.each((el, index) => {
				cy.wrap(el).should('contain', ['5', '', '', '', '', '', ''][index]);
				cy.wrap(el).should('contain', ['head', '', '', '', '', '', ''][index]);
				cy.wrap(el).should('contain', ['tail', '', '', '', '', '', ''][index]);
				cy.wrap(el).should(
					'have.css',
					[
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
					][index]
				);
			});

		cy.wait(500);

		cy.get('input').type('abc');
		cy.contains('Добавить').click();
		cy.get('@queue')
			.find('[class^=circle_content__]')
			.each((el, index) => {
				cy.wrap(el).should(
					'have.css',
					[
						['border', '4px solid #0032ff'],
						['border', '4px solid #d252e1'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
					][index]
				);
			});

		cy.wait(500);

		cy.get('@queue')
			.find('[class^=circle_content__]')
			.each((el, index) => {
				cy.wrap(el).should('contain', ['5', 'abc', '', '', '', '', ''][index]);
				cy.wrap(el).should('contain', ['head', '', '', '', '', '', ''][index]);
				cy.wrap(el).should('contain', ['', 'tail', '', '', '', '', ''][index]);
				cy.wrap(el).should(
					'have.css',
					[
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
					][index]
				);
			});

		cy.wait(500);

		cy.get('input').type('42');
		cy.contains('Добавить').click();
		cy.get('@queue')
			.find('[class^=circle_content__]')
			.each((el, index) => {
				cy.wrap(el).should(
					'have.css',
					[
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #d252e1'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
					][index]
				);
			});

		cy.wait(500);

		cy.get('@queue')
			.find('[class^=circle_content__]')
			.each((el, index) => {
				cy.wrap(el).should(
					'contain',
					['5', 'abc', '42', '', '', '', ''][index]
				);
				cy.wrap(el).should('contain', ['head', '', '', '', '', '', ''][index]);
				cy.wrap(el).should('contain', ['', '', 'tail', '', '', '', ''][index]);
				cy.wrap(el).should(
					'have.css',
					[
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
					][index]
				);
			});

		cy.wait(500);

		cy.get('input').type('53');
		cy.contains('Добавить').click();
		cy.get('@queue')
			.find('[class^=circle_content__]')
			.each((el, index) => {
				cy.wrap(el).should(
					'have.css',
					[
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #d252e1'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
					][index]
				);
			});

		cy.wait(500);

		cy.get('@queue')
			.find('[class^=circle_content__]')
			.each((el, index) => {
				cy.wrap(el).should(
					'contain',
					['5', 'abc', '42', '53', '', '', ''][index]
				);
				cy.wrap(el).should('contain', ['head', '', '', '', '', '', ''][index]);
				cy.wrap(el).should('contain', ['', '', '', 'tail', '', '', ''][index]);
				cy.wrap(el).should(
					'have.css',
					[
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
					][index]
				);
			});
	});

	it('Удаление элемента', () => {
		cy.get('[class^=queue_queue__]').as('queue');

		cy.contains('Удалить').click();
		cy.get('@queue')
			.find('[class^=circle_content__]')
			.each((el, index) => {
				cy.wrap(el).should(
					'have.css',
					[
						['border', '4px solid #d252e1'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
					][index]
				);
			});

		cy.wait(500);

		cy.get('@queue')
			.find('[class^=circle_content__]')
			.each((el, index) => {
				cy.wrap(el).should(
					'contain',
					['', 'abc', '42', '53', '', '', ''][index]
				);
				cy.wrap(el).should('contain', ['', 'head', '', '', '', '', ''][index]);
				cy.wrap(el).should('contain', ['', '', '', 'tail', '', '', ''][index]);
				cy.wrap(el).should(
					'have.css',
					[
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
					][index]
				);
			});

		cy.contains('Удалить').click();
		cy.get('@queue')
			.find('[class^=circle_content__]')
			.each((el, index) => {
				cy.wrap(el).should(
					'have.css',
					[
						['border', '4px solid #0032ff'],
						['border', '4px solid #d252e1'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
					][index]
				);
			});

		cy.wait(500);

		cy.get('@queue')
			.find('[class^=circle_content__]')
			.each((el, index) => {
				cy.wrap(el).should('contain', ['', '', '42', '53', '', '', ''][index]);
				cy.wrap(el).should('contain', ['', '', 'head', '', '', '', ''][index]);
				cy.wrap(el).should('contain', ['', '', '', 'tail', '', '', ''][index]);
				cy.wrap(el).should(
					'have.css',
					[
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
					][index]
				);
			});
	});

	it('Очистить очередь', () => {
		cy.contains('Очистить').click();
		cy.get('[class^=queue_queue__]').as('queue');
		cy.get('@queue')
			.find('[class^=circle_content__]')
			.each((el, index) => {
				cy.wrap(el).should('contain', ['', '', '', '', '', '', ''][index]);
				cy.wrap(el).should(
					'have.css',
					[
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
					][index]
				);
			});
	});
});
