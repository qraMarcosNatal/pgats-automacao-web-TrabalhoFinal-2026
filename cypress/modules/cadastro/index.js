const seletores = {
  linkAcesso: 'a[href*=login]',
  campoNomeCadastro: '[data-qa="signup-name"]',
  campoEmailCadastro: '[data-qa="signup-email"]',
  botaoCadastro: '[data-qa="signup-button"]',
  tituloInformacoesConta: '.login-form > h2 > b',
  generoMasculino: '#id_gender1',
  senha: '[data-qa="password"]',
  diaNascimento: '[data-qa="days"]',
  mesNascimento: '[data-qa="months"]',
  anoNascimento: '[data-qa="years"]',
  newsletter: '#newsletter',
  ofertas: '#optin',
  primeiroNome: '[data-qa="first_name"]',
  sobrenome: '[data-qa="last_name"]',
  empresa: '[data-qa="company"]',
  endereco: '[data-qa="address"]',
  complemento: '[data-qa="address2"]',
  pais: '[data-qa="country"]',
  estado: '[data-qa="state"]',
  cidade: '[data-qa="city"]',
  codigoPostal: '[data-qa="zipcode"]',
  celular: '[data-qa="mobile_number"]',
  botaoCriarConta: '[data-qa="create-account"]',
  botaoContinuar: '[data-qa="continue-button"]'
};

function acessarCadastro() {
  cy.get(seletores.linkAcesso).click();
  cy.contains('New User Signup!').should('be.visible');
}

function cadastrarUsuario(usuario) {
  cy.get(seletores.campoNomeCadastro).type(usuario.nome);
  cy.get(seletores.campoEmailCadastro).type(usuario.email);
  cy.get(seletores.botaoCadastro).click();

  cy.contains(seletores.tituloInformacoesConta, 'Enter Account Information')
    .should('be.visible');

  cy.get(seletores.generoMasculino).check();
  cy.get(seletores.senha).type(usuario.senha);
  cy.get(seletores.diaNascimento).select(usuario.diaNascimento);
  cy.get(seletores.mesNascimento).select(usuario.mesNascimento);
  cy.get(seletores.anoNascimento).select(usuario.anoNascimento);
  cy.get(seletores.newsletter).check();
  cy.get(seletores.ofertas).check();
  cy.get(seletores.primeiroNome).type(usuario.primeiroNome);
  cy.get(seletores.sobrenome).type(usuario.sobrenome);
  cy.get(seletores.empresa).type(usuario.empresa);
  cy.get(seletores.endereco).type(usuario.endereco);
  cy.get(seletores.complemento).type(usuario.complemento);
  cy.get(seletores.pais).select(usuario.pais);
  cy.get(seletores.estado).type(usuario.estado);
  cy.get(seletores.cidade).type(usuario.cidade);
  cy.get(seletores.codigoPostal).type(usuario.codigoPostal);
  cy.get(seletores.celular).type(usuario.celular);
  cy.get(seletores.botaoCriarConta).click();

  cy.contains('Account Created!').should('be.visible');
  cy.get(seletores.botaoContinuar).click();
  cy.contains(`Logged in as ${usuario.nome}`).should('be.visible');
}

function tentarCadastrarEmailExistente(usuario) {
  cy.get(seletores.campoNomeCadastro).type(usuario.nome);
  cy.get(seletores.campoEmailCadastro).type(usuario.email);
  cy.get(seletores.botaoCadastro).click();
  cy.contains('Email Address already exist!').should('be.visible');
}

module.exports = {
  acessarCadastro,
  cadastrarUsuario,
  tentarCadastrarEmailExistente
};
