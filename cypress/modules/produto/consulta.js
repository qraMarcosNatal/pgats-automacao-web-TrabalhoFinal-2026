const seletores = {
  linkProdutos: 'a[href="/products"]',
  produtos: '.features_items .product-image-wrapper',
  botaoVerProduto: 'a',
  campoBusca: '#search_product',
  botaoBuscar: '#submit_search',
  informacoesProduto: '.product-information'
};

function acessarProdutos() {
  cy.get(seletores.linkProdutos).click();
}

function validarListaDeProdutos() {
  cy.url().should('include', '/products');
  validarTituloListaDeProdutos();
  cy.get(seletores.produtos).its('length').should('be.greaterThan', 0);
}

function validarTituloListaDeProdutos() {
  cy.contains('h2', 'All Products').should('be.visible');
}

function validarDetalhesDoPrimeiroProduto() {
  cy.get(seletores.produtos)
    .first()
    .contains(seletores.botaoVerProduto, 'View Product')
    .click();

  cy.url().should('include', '/product_details/');
  cy.get(seletores.informacoesProduto).should('be.visible').within(() => {
    cy.get('h2').should('be.visible');
    cy.contains('p', 'Category:').should('be.visible');
    cy.contains('span', 'Rs.').should('be.visible');
    cy.contains('p', 'Availability:').should('be.visible');
    cy.contains('p', 'Condition:').should('be.visible');
    cy.contains('p', 'Brand:').should('be.visible');
  });
}

function pesquisarProduto(termo) {
  cy.get(seletores.campoBusca).type(termo);
  cy.get(seletores.botaoBuscar).click();

  cy.contains('h2', 'Searched Products').should('be.visible');
  cy.get(seletores.produtos).its('length').should('be.greaterThan', 0);
  cy.get(seletores.produtos).then(($produtos) => {
    const linksDetalhes = Array.from($produtos).map((produto) =>
      Cypress.$(produto).find('a[href^="/product_details/"]').attr('href')
    );
    expect(linksDetalhes.every(Boolean)).to.be.true;

    cy.wrap(linksDetalhes).each((linkDetalhes) => {
      cy.visit(`https://automationexercise.com${linkDetalhes}`);
      cy.get(seletores.informacoesProduto).should('be.visible').then(($detalhes) => {
        const nome = $detalhes.find('h2').text();
        const categoria = $detalhes.find('p').filter((_, paragrafo) =>
          paragrafo.textContent.includes('Category:')
        ).text();
        expect(`${nome} ${categoria}`).to.match(new RegExp(termo, 'i'));
      });
    });
  });
}

module.exports = {
  acessarProdutos,
  validarListaDeProdutos,
  validarTituloListaDeProdutos,
  validarDetalhesDoPrimeiroProduto,
  pesquisarProduto
};
