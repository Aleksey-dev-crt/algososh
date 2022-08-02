describe('Тестирование приложения', function () {
  it('Приложение поднялось на localhost:3000', function () {
    cy.visit('http://localhost:3000/algososh');
  });
});