/// <reference types="cypress" />

const inicio = require('../modules/inicio/inicio');
const login = require('../modules/login/login');
const cadastro = require('../modules/cadastro');
const logout = require('../modules/logout/logout');
const produto = require('../modules/produto/consulta');
const assinatura = require('../modules/assinatura/assinatura');
const pedido = require('../modules/pedido/checkout');
const conta = require('../modules/conta/conta');

describe('Automation Exercise', () => {
  const usuarioFixo = {
    nome: 'PGATS Auto',
    email: 'pgats.tcFixo@test.com',
    senha: '12345',
    diaNascimento: '1',
    mesNascimento: 'April',
    anoNascimento: '2021',
    primeiroNome: 'PGATS Auto',
    sobrenome: 'AUTO',
    empresa: 'PGATS AUTO',
    endereco: 'PGATS NAO SEI',
    complemento: 'PGATS NAO SEI 2',
    pais: 'United States',
    estado: 'LogoAli',
    cidade: 'Ali',
    codigoPostal: '01234567',
    celular: '99999-9999'
  };

  const dadosPedido = {
    comentario: 'Pedido de teste PGATS',
    nomeNoCartao: 'PGATS Auto',
    numeroCartao: '1234567890123456',
    codigoSeguranca: '123',
    mesValidade: '12',
    anoValidade: '2028'
  };

  // Cadastro e preparacao da conta fixa.
  it('Test Case 1: Register User', () => {
    conta.liberarEmailParaCadastro(usuarioFixo.email, usuarioFixo.senha);
    inicio.acessarPaginaInicial();
    cadastro.acessarCadastro();
    cadastro.cadastrarUsuario(usuarioFixo);
  });

  // Login com as credenciais validas da conta fixa.
  it('Test Case 2: Login User with correct email and password : ', () => {
    inicio.acessarPaginaInicial();
    login.acessarTelaLogin();
    login.efetuarLogin(usuarioFixo.email, usuarioFixo.senha);
    login.validarUsuarioAutenticado(usuarioFixo.nome);
  });

  // Login com credenciais invalidas.
  it('Test Case 3: Login User with incorrect email and password : ', () => {
    inicio.acessarPaginaInicial();
    login.acessarTelaLogin();
    login.efetuarLogin('autopgats2incorreto@test.com', 'senha-incorreta');
    login.validarMensagemDeLoginInvalido();
  });

  // Login seguido de logout.
  it('Test Case 4: Logout User', () => {
    inicio.acessarPaginaInicial();
    login.acessarTelaLogin();
    login.efetuarLogin(usuarioFixo.email, usuarioFixo.senha);
    login.validarUsuarioAutenticado(usuarioFixo.nome);
    logout.efetuarLogout();
  });

  // Cadastro com e-mail ja registrado.
  it('Test Case 5: Register User with existing email', () => {
    inicio.acessarPaginaInicial();
    cadastro.acessarCadastro();
    cadastro.tentarCadastrarEmailExistente(usuarioFixo);
  });

  // Verifica a lista e os detalhes de um produto.
  it('Test Case 8: Verify All Products and product detail page', () => {
    inicio.acessarPaginaInicial();
    produto.acessarProdutos();
    produto.validarListaDeProdutos();
    produto.validarDetalhesDoPrimeiroProduto();
  });

  // A busca pode encontrar o termo no nome ou na categoria do produto.
  it('Test Case 9: Search Product', () => {
    inicio.acessarPaginaInicial();
    produto.acessarProdutos();
    produto.validarTituloListaDeProdutos();
    produto.pesquisarProduto('top');
  });

  // Assinatura com e-mail exclusivo.
  it('Test Case 10: Verify Subscription in home page', () => {
    const emailExclusivo = `pgats.tc10.${Date.now()}@test.com`;

    inicio.acessarPaginaInicial();
    assinatura.assinarNewsletter(emailExclusivo);
  });

  // Cadastro, pedido e exclusao da conta criada para o teste.
  it('Test Case 15: Place Order: Register before Checkout', () => {
    const usuario = {
      ...usuarioFixo,
      email: `pgats.tc15.${Date.now()}@test.com`
    };

    inicio.acessarPaginaInicial();
    cadastro.acessarCadastro();
    cadastro.cadastrarUsuario(usuario);
    produto.acessarProdutos();
    pedido.adicionarPrimeiroProdutoAoCarrinho();
    pedido.finalizarCompra(dadosPedido);
    conta.excluirConta();
  });

  // Pedido com a conta fixa e exclusao ao final.
  it('Test Case 16: Place Order: Login before Checkout', () => {
    inicio.acessarPaginaInicial();
    login.acessarTelaLogin();
    login.efetuarLogin(usuarioFixo.email, usuarioFixo.senha);
    login.validarUsuarioAutenticado(usuarioFixo.nome);
    produto.acessarProdutos();
    pedido.adicionarPrimeiroProdutoAoCarrinho();
    pedido.finalizarCompra(dadosPedido);
    conta.excluirConta();
  });
});
