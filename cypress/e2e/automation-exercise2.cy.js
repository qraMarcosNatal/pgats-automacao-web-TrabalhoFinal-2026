
// Exercicio 2 - Passado no final da primeira semana de aula
// Utilizando como base o que foi aprendido na primeira aula, acessar o site https://devfinance-agilizei.netlify.app 
// copie o código para o vscode e encontre as falhas em todos os "it"
// todos tem falhas, algumas mais simples outras mais complexas.



// OBS: Deixei os itens com falha comentado só para recordar qual era a falha.
describe('Cadastrar entradas e saídas com bugs', () => {
  it('Cadastrar uma nova transação de entrada - falha 1', () => {
    cy.visit("https://devfinance-agilizei.netlify.app")
 
    cy.contains("Nova Transação").click()
    cy.get("#description").type("Mesada")
    cy.get("#amount").type(100)
    cy.get("#date").type("2023-02-01")

    //cy.contains("Salvar").contains().get().click()
    cy.contains("Salvar").click()

  });

  it('Cadastrar uma nova transação de entrada - falha 2', () => {
    cy.visit("https://devfinance-agilizei.netlify.app")

    cy.contains("Nova Transação").click()
    //cy.get("#description").type("Mesada")
    //cy.get("#amount").type(100)
    //cy.get("#date").type("2023-02-01")
    cy.get("#description").type("Mesada")
    cy.get("#amount").type(100)
    cy.get("#date").type("2023-02-01")

    cy.contains("Salvar").click()
    
    //cy.get("tbody tr").should("have.length", 1) // problema de estado, pois presupõe que deva existir 1 item na lista
  });  

  it('Cadastrar uma nova transação de entrada - falha 3', () => {

    //cy.contains("Nova Transação").click() -> Isso não existe
    cy.get("#description").type("Mesada")
    cy.get("#amount").type(100)

    //cy.get("#date").type("02/01/2023")
    cy.get("#date").type("2023-02-01")

    cy.contains("Salvar").click()
    
    //cy.get("tbody tr").should("have.length", 1)
  });

  it('Cadastrar uma nova transação de entrada - falha 4', () => {
    cy.visit("https://devfinance-agilizei.netlify.app")

    //cy.get("#amount").type(100)
    //cy.get("#description").type("Mesada")
    //cy.get("#date").type("2023-02-01")
    //cy.contains("Nova Transação").click()
    //cy.contains("Salvar").click()

    cy.contains("Nova Transação").click()
    cy.get("#description").type("Mesada")
    cy.get("#amount").type(100)
    cy.get("#date").type("2023-02-01")
    cy.contains("Salvar").click()


    //cy.get("tbody tr").should("have.length", 1) -> // problema de estado, pois presupõe que deva existir 1 item na lista
  });

  it('Cadastrar uma nova transação de entrada - falha 5', () => {
    cy.visit("https://devfinance-agilizei.netlify.app")

    cy.contains("Nova Transação").click()
    cy.get("#description").type("Mesada")
    cy.get("#amount").type(100)
    cy.get("#date").type("2023-02-01")

    cy.contains("Salvar").click()

    cy.get(".alert").should("not.exist")
  });

  //it.skip('Cadastrar uma nova transação de entrada - falha 6', () => { -> É para executar ou skipar?
    it('Cadastrar uma nova transação de entrada - falha 6', () => {
    cy.contains("Nova Transação").click()
    cy.get("#description").type("Mesada")
    cy.get("#amount").type(100)
    cy.get("#date").type("2023-02-01")

    cy.contains("Salvar").click()

    //cy.get("tbody tr").should("have.length", 100) -> Cadastra uma mas espera 100???
    cy.get("tbody tr").should("have.length", 1)
  });
}); 