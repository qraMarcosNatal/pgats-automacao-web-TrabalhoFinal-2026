const seletores = {
  rodape: '#footer',
  campoEmail: '#susbscribe_email',
  botaoAssinar: '#subscribe'
};

function assinarNewsletter(email) {
  cy.get(seletores.rodape).scrollIntoView();
  cy.contains(seletores.rodape, 'Subscription').should('be.visible');
  cy.get(seletores.campoEmail).type(email);
  cy.get(seletores.botaoAssinar).click();
  cy.contains('You have been successfully subscribed!').should('be.visible');
}

module.exports = {
  assinarNewsletter
};
