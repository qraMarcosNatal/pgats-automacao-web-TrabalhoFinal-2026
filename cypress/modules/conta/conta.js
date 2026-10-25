const login = require('../login/login');

const seletores = {
  resultadoTentativaLogin: 'a[href="/delete_account"], p:contains("Your email or password is incorrect!")',
  linkExcluirConta: 'a[href="/delete_account"]',
  botaoContinuar: '[data-qa="continue-button"]'
};

function excluirConta() {
  cy.get(seletores.linkExcluirConta).click();
  cy.contains('Account Deleted!').should('be.visible');
  cy.get(seletores.botaoContinuar).click();
}

function liberarEmailParaCadastro(email, senha) {
  login.acessarLoginDireto();
  login.efetuarLogin(email, senha);
  cy.get(seletores.resultadoTentativaLogin).then(($resultado) => {
    if ($resultado.is(seletores.linkExcluirConta)) {
      excluirConta();
    }
  });
}

module.exports = {
  excluirConta,
  liberarEmailParaCadastro
};
