describe('Связный список', function () {
	before(function () {
		cy.visit('http://localhost:3000/algososh');
	});

	it('Если в инпуте пусто, то кнопка добавления недоступна', () => {
		cy.get('a[href*="list"]').click();
		cy.contains('Связный список');
		cy.get('input').eq(0).should('be.empty');
		cy.contains('Добавить в head').should('be.disabled');
		cy.contains('Добавить в tail').should('be.disabled');
		cy.get('input').eq(1).should('be.empty');
		cy.contains('Добавить по индексу').should('be.disabled');
		cy.contains('Удалить по индексу').should('be.disabled');
	});

	it('Список по умолчанию отрисовывается корректно', () => {
		cy.get('[class^=list_list__]').as('list');
		cy.get('@list')
			.find('[class^=circle_content__]')
			.each((el, index) => {
				cy.wrap(el).should('contain', ['', '', '', ''][index]);
				cy.wrap(el).should('contain', ['head', '', '', ''][index]);
				cy.wrap(el).should('contain', ['', '', '', 'tail'][index]);
				cy.wrap(el).should(
					'have.css',
					[
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
					][index]
				);
			});
	});

	it('Добавление элемента в head', () => {
		cy.get('input').eq(0).type('5');
		cy.contains('Добавить в head').click();
		cy.get('[class^=list_list__]').as('list');
		cy.get('@list')
			.find('[class^=circle_content__]')
			.each((el, index) => {
				cy.wrap(el).should(
					'have.css',
					[
						['border', '4px solid #7fe051'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
					][index]
				);
			});

		cy.wait(500);

		cy.get('@list')
			.find('[class^=circle_content__]')
			.each((el, index) => {
				cy.wrap(el).should('contain', ['5', '', '', '', ''][index]);
				cy.wrap(el).should('contain', ['head', '', '', '', ''][index]);
				cy.wrap(el).should('contain', ['', '', '', '', 'tail'][index]);
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
	});

	it('Добавление элемента в tail', () => {
		cy.get('input').eq(0).type('42');
		cy.contains('Добавить в tail').click();
		cy.get('[class^=list_list__]').as('list');
		cy.get('@list')
			.find('[class^=circle_content__]')
			.each((el, index) => {
				cy.wrap(el).should(
					'have.css',
					[
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #7fe051'],
					][index]
				);
			});

		cy.wait(500);

		cy.get('@list')
			.find('[class^=circle_content__]')
			.each((el, index) => {
				cy.wrap(el).should('contain', ['5', '', '', '', '', '42'][index]);
				cy.wrap(el).should('contain', ['head', '', '', '', '', ''][index]);
				cy.wrap(el).should('contain', ['', '', '', '', '', 'tail'][index]);
				cy.wrap(el).should(
					'have.css',
					[
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

	it('Добавление элемента по индексу', () => {
		cy.get('input').eq(0).type('67');
		cy.get('input').eq(1).type('3');
		cy.contains('Добавить по индексу').click();
		cy.get('[class^=list_list__]').as('list');
		cy.get('@list')
			.find('[class^=circle_content__]')
			.each((el, index) => {
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

		cy.get('@list')
			.find('[class^=circle_content__]')
			.each((el, index) => {
				cy.wrap(el).should('contain', ['5', '', '', '', '', '', '42'][index]);
				cy.wrap(el).should('contain', ['', '67', '', '', '', '', ''][index]);
				cy.wrap(el).should('contain', ['', '', '', '', '', '', 'tail'][index]);
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

		cy.get('@list')
			.find('[class^=circle_content__]')
			.each((el, index) => {
				cy.wrap(el).should('contain', ['5', '', '', '', '', '', '42'][index]);
				cy.wrap(el).should(
					'contain',
					['head', '', '67', '', '', '', ''][index]
				);
				cy.wrap(el).should('contain', ['', '', '', '', '', '', 'tail'][index]);
				cy.wrap(el).should(
					'have.css',
					[
						['border', '4px solid #d252e1'],
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

		cy.get('@list')
			.find('[class^=circle_content__]')
			.each((el, index) => {
				cy.wrap(el).should('contain', ['5', '', '', '', '', '', '42'][index]);
				cy.wrap(el).should(
					'contain',
					['head', '', '', '67', '', '', ''][index]
				);
				cy.wrap(el).should('contain', ['', '', '', '', '', '', 'tail'][index]);
				cy.wrap(el).should(
					'have.css',
					[
						['border', '4px solid #d252e1'],
						['border', '4px solid #d252e1'],
						['border', '4px solid #d252e1'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
					][index]
				);
			});

		cy.wait(500);

		cy.get('@list')
			.find('[class^=circle_content__]')
			.each((el, index) => {
				cy.wrap(el).should('contain', ['5', '', '', '', '', '', '42'][index]);
				cy.wrap(el).should(
					'contain',
					['head', '', '', '67', '', '', ''][index]
				);
				cy.wrap(el).should('contain', ['', '', '', '', '', '', 'tail'][index]);
				cy.wrap(el).should(
					'have.css',
					[
						['border', '4px solid #d252e1'],
						['border', '4px solid #d252e1'],
						['border', '4px solid #d252e1'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
					][index]
				);
			});

		cy.wait(500);

		cy.get('@list')
			.find('[class^=circle_content__]')
			.each((el, index) => {
				cy.wrap(el).should('contain', ['5', '', '', '', '', '', '42'][index]);
				cy.wrap(el).should(
					'contain',
					['head', '', '', '67', '', '', ''][index]
				);
				cy.wrap(el).should('contain', ['', '', '', '', '', '', 'tail'][index]);
				cy.wrap(el).should(
					'have.css',
					[
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #7fe051'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
					][index]
				);
			});
	});

	it('Удаление элемента по индексу', () => {
		cy.get('input').eq(1).type('3');
		cy.contains('Удалить по индексу').click();
		cy.get('[class^=list_list__]').as('list');
		cy.get('@list')
			.find('[class^=circle_content__]')
			.each((el, index) => {
				cy.wrap(el).should('contain', ['5', '', '', '', '', '', '42'][index]);
				cy.wrap(el).should('contain', ['', '', '', '67', '', '', ''][index]);
				cy.wrap(el).should('contain', ['', '', '', '', '', '', 'tail'][index]);
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

		cy.get('@list')
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

		cy.get('@list')
			.find('[class^=circle_content__]')
			.each((el, index) => {
				cy.wrap(el).should(
					'have.css',
					[
						['border', '4px solid #d252e1'],
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

		cy.get('@list')
			.find('[class^=circle_content__]')
			.each((el, index) => {
				cy.wrap(el).should(
					'have.css',
					[
						['border', '4px solid #d252e1'],
						['border', '4px solid #d252e1'],
						['border', '4px solid #d252e1'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #d252e1'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
					][index]
				);
			});

		cy.wait(500);

		cy.get('@list')
			.find('[class^=circle_content__]')
			.each((el, index) => {
				cy.wrap(el).should('contain', ['head', '', '', '', '', 'tail'][index]);
				cy.wrap(el).should(
					'have.css',
					[
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

	it('Удаление элемента из head', () => {
		cy.contains('Удалить из head').click();
		cy.get('[class^=list_list__]').as('list');
		cy.get('@list')
			.find('[class^=circle_content__]')
			.each((el, index) => {
				cy.wrap(el).should('contain', ['5', '', '', '', '', '', '42'][index]);
				cy.wrap(el).should('contain', ['5', '', '', '', '', '', 'tail'][index]);
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

		cy.get('@list')
			.find('[class^=circle_content__]')
			.each((el, index) => {
				cy.wrap(el).should('contain', ['', '', '', '', '42'][index]);
				cy.wrap(el).should('contain', ['head', '', '', '', 'tail'][index]);
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
	});

	it('Удаление элемента из tail', () => {
		cy.contains('Удалить из tail').click();
		cy.get('[class^=list_list__]').as('list');
		cy.get('@list')
			.find('[class^=circle_content__]')
			.each((el, index) => {
				cy.wrap(el).should('contain', ['', '', '', '', '', '42'][index]);
				cy.wrap(el).should('contain', ['head', '', '', '', '', '42'][index]);
				cy.wrap(el).should(
					'have.css',
					[
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #d252e1'],
						['border', '4px solid #0032ff'],
					][index]
				);
			});

		cy.wait(500);

		cy.get('@list')
			.find('[class^=circle_content__]')
			.each((el, index) => {
				cy.wrap(el).should('contain', ['', '', '', ''][index]);
				cy.wrap(el).should('contain', ['head', '', '', 'tail'][index]);
				cy.wrap(el).should(
					'have.css',
					[
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
						['border', '4px solid #0032ff'],
					][index]
				);
			});
	});
});
