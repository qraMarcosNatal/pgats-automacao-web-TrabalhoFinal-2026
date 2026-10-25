const seletores = {
  linkAcesso: 'a[href*=login]',
  email: '[data-qa="login-email"]',
  senha: '[data-qa="login-password"]',
  botaoEntrar: '[data-qa="login-button"]'
};

function acessarTelaLogin() {
  cy.get(seletores.linkAcesso).click();
  cy.contains('Login to your account').should('be.visible');
}

function acessarLoginDireto() {
  cy.visit('https://automationexercise.com/login');
}

function efetuarLogin(email, senha) {
  cy.get(seletores.email).type(email);
  cy.get(seletores.senha).type(senha);
  cy.get(seletores.botaoEntrar).click();
}

function validarUsuarioAutenticado(nome) {
  cy.contains(`Logged in as ${nome}`).should('be.visible');
}

function validarMensagemDeLoginInvalido() {
  cy.contains('Your email or password is incorrect!').should('be.visible');
}

module.exports = {
  acessarTelaLogin,
  acessarLoginDireto,
  efetuarLogin,
  validarUsuarioAutenticado,
  validarMensagemDeLoginInvalido
};
