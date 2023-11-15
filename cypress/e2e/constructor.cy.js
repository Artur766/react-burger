


describe('service is available', function () {

  beforeEach('should be available on localhost:3000', () => {
    cy.intercept("GET", "https://norma.nomoreparties.space/api/auth/user", { fixture: "user.json" });
    cy.intercept("POST", "api/orders", { fixture: "order.json" });
    cy.setCookie("token", "test-accessToken");
    cy.visit('http://localhost:3000/react-burger');
  });

  it('should shoe after click on 1st element', () => {
    cy.contains('Соберите бургер');

    //проверям что булка существует и модлка открывается 
    cy.get('[data-testid="ingredient-card"]').first().should('contain', 'Краторная булка N-200i').click();

    cy.contains('Детали ингредиента');

    //закрываем модалку
    cy.get('body').type('{esc}');
    cy.get('[data-testid="modal-overlay"]').should('not.be.visible');
  });

  it('should drag ingredients to the constructor', () => {

    cy.get('[data-testid="ingredient-card"]').first().as('bun');
    cy.get('[data-testid="ingredient-card"]').last().as('ingredient');
    cy.get('[data-testid="constructor-bun"]').first().as('bunContainer');
    cy.get('[data-testid="constructor-ingredient"]').as('ingredientContainer')

    //Проверяем что ингредиенит и булка перетаскивается
    cy.get('@bun').trigger("dragstart");
    cy.get('@bunContainer').trigger("drop");

    cy.get('@ingredient').trigger("dragstart");
    cy.get('@ingredientContainer').trigger("drop");

    //проверяем число булок и ингредиентов
    cy.get('.counter').first().as('quantityBun');
    cy.get('.counter').last().as('quantityIngredient');

    cy.get('@quantityBun').should('contain', '2');
    cy.get('@quantityIngredient').should('contain', '1');

    // клик на оформление заказа
    cy.get('button').contains('Оформить заказ').click();
    cy.contains('Ваш заказ начали готовить');
    cy.get('[data-testid="order-number"]').contains("123");
  });
});