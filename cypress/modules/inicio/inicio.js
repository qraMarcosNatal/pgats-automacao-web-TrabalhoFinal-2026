const seletores = {
  logotipo: 'img[alt="Website for automation practice"]'
};

function acessarPaginaInicial() {
  cy.visit('https://automationexercise.com');
  cy.get(seletores.logotipo).should('be.visible');
}

module.exports = {
  acessarPaginaInicial
};
