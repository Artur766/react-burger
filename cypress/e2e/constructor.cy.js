//npm i cypress-drag-drop

describe('service is available', function () {
  beforeEach('should be available on localhost:3000', () => {
    cy.intercept("GET", "api/auth/user", { fixture: "user.json" });
    cy.intercept("GET", "api/ingredients", { fixture: "ingredients.json" });
    cy.intercept("POST", "api/orders", { fixture: "order.json" });
    cy.setCookie("token", "test-accessToken");
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

  it('should drag ingredients to the constructor', () => {
    
    cy.get('.Ingredient_card__Ssxog').first().as('bun');
    cy.get('.Ingredient_card__Ssxog').last().as('ingredient');
    cy.get('.').first().as('quantityBun');
    cy.get('.').first().as('quantityIngredient');

    //Проверяем что ингредиенит и булка перетаскивается
    cy.get('@bun').drag('.Bun_containerConstructorElement__Pe-+V');
    cy.get('@ingredient').drag('.BurgerConstructor_scrollBarContainer__KvplW');
    cy.get('@quantityBun').should('contain', '1');
    cy.get('@quantityIngredient').should('contain', '1');
  });


  it('the modal should open that the order has been placed', () => {
    //клик на оформить заказ
    cy.get('.').contains('Оформить заказ').click();
    cy.contains('...');
  });

});