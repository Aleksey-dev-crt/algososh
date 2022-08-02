describe('Роутинг', function () {

  const backToMain = () => {
    it('К оглавлению', () => {
      cy.get('button').contains('К оглавлению').click();
      cy.contains('МБОУ АЛГОСОШ');
    });
  };

  before(function () {
    cy.visit('http://localhost:3000/algososh');
  });

  it('Переход на страницу Строка', function () {
    cy.get("a[href*='recursion']").click();
    cy.contains('Строка');
  });

  backToMain();

  it('Переход на страницу Фибоначчи', function () {
    cy.get("a[href*='fibonacci']").click();
    cy.contains('Последовательность Фибоначчи');
  });

  backToMain();

  it('Переход на страницу Сортировка массива', function () {
    cy.get("a[href*='sorting']").click();
    cy.contains('Сортировка массива');
  });

  backToMain();

  it('Переход на страницу Стек', function () {
    cy.get("a[href*='stack']").click();
    cy.contains('Стек');
  });

  backToMain();

  it('Переход на страницу Очередь', function () {
    cy.get("a[href*='queue']").click();
    cy.contains('Очередь');
  });

  backToMain();

  it('Переход на страницу Связный список', function () {
    cy.get("a[href*='list']").click();
    cy.contains('Связный список');
  });

  backToMain();
});