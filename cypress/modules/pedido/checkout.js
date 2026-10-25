const seletores = {
  produtos: '.features_items .product-image-wrapper',
  botaoAdicionarProduto: '.productinfo a.add-to-cart',
  modalCarrinho: '#cartModal',
  carrinho: '#cart_info',
  botaoProsseguirCheckout: 'a',
  campoComentario: 'textarea[name="message"]',
  botaoFazerPedido: 'a',
  nomeCartao: '[data-qa="name-on-card"]',
  numeroCartao: '[data-qa="card-number"]',
  codigoSeguranca: '[data-qa="cvc"]',
  mesValidade: '[data-qa="expiry-month"]',
  anoValidade: '[data-qa="expiry-year"]',
  botaoPagar: '[data-qa="pay-button"]',
  pedidoRealizado: '[data-qa="order-placed"]'
};

function adicionarPrimeiroProdutoAoCarrinho() {
  cy.get(seletores.produtos)
    .first()
    .find(seletores.botaoAdicionarProduto)
    .click();
  cy.get(seletores.modalCarrinho)
    .should('be.visible')
    .contains('a', 'View Cart')
    .click();
  cy.url().should('include', '/view_cart');
  cy.get(seletores.carrinho).should('be.visible').and('contain.text', 'Blue Top');
}

function finalizarCompra(dadosPedido) {
  cy.contains(seletores.botaoProsseguirCheckout, 'Proceed To Checkout').click();
  cy.contains('h2', 'Address Details').should('be.visible');
  cy.contains('h2', 'Review Your Order').should('be.visible');
  cy.get(seletores.campoComentario).type(dadosPedido.comentario);
  cy.contains(seletores.botaoFazerPedido, 'Place Order').click();

  cy.get(seletores.nomeCartao).type(dadosPedido.nomeNoCartao);
  cy.get(seletores.numeroCartao).type(dadosPedido.numeroCartao);
  cy.get(seletores.codigoSeguranca).type(dadosPedido.codigoSeguranca);
  cy.get(seletores.mesValidade).type(dadosPedido.mesValidade);
  cy.get(seletores.anoValidade).type(dadosPedido.anoValidade);
  cy.get(seletores.botaoPagar).click();
  cy.get(seletores.pedidoRealizado)
    .should('be.visible')
    .and('contain.text', 'Order Placed!');
}

module.exports = {
  adicionarPrimeiroProdutoAoCarrinho,
  finalizarCompra
};
