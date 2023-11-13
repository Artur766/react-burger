require('@4tw/cypress-drag-drop');

describe('service is available', function () {
  beforeEach('should be available on localhost:3000', () => {
    cy.setCookie("token", "test-accessToken")
    cy.visit('http://localhost:3000/react-burger/');
  });

  it('should shoe after click on 1st element', () => {
    cy.contains('Соберите бургер');

    //проверям что булка существует и модлка открывается 
    cy.get('.Ingredient_card__Ssxog').first().contains('Краторная булка N-200i').click();

    cy.contains('Детали ингредиента');

    //закрываем модалку
    cy.get('body').type('{esc}');
    cy.get('.ModalOverlay_modalOverlay__mpk-v').should('not.be.visible');
  });

  // //проверяем что drag and drop раюботает 
  // it('the ingredient must be dragged', () => {

  // });

  // //заказ создается 
  // it('the modal should open that the order has been placed', () => {

  // });


});