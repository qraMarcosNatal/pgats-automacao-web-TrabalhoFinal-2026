const seletores = {
  linkSair: 'a[href="/logout"]'
};

function efetuarLogout() {
  cy.get(seletores.linkSair).click();
  cy.url().should('include', '/login');
}

module.exports = {
  efetuarLogout
};
