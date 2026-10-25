/// <reference types="cypress" />

// Exercicio 3 - Passado no final da primeira semana de aula
// Utilizando como base o que foi aprendido na primeira aula, instale a biblioteca cypress-xpath no projeto
// e tente adaptar os seletores para usar xpath.

// Eu separei em um novo arquivo para colocar somente a parte do xpath, pois quero manter o automation-exercise.cy.js intacto


// Exercício 5 -> Vale nota.
/*
Adaptar seletores para usar xpath
Dica: Utilizando os mesmos conceitos que usamos em aula, criar uma diretriz para gerar uma versão do código, usar algo similar,
para a espec, vocês irão criar uma espec separada de preferencia para esse exercicio aqui para não bagunçar a Espec que já temos,
ai irão adaptar os seletores que já temos para utilizar xpath
qual expec é para enviar via formulario?
É a expec copia lá da nossa primeira expec: automation-exercise.cy.js (que é antes da modularização), pegar a expec que tem os seletores todos inline e vão adaptar os seletores para usar xpath.
Pegar todo o código gerado e colocar no formulário disponivel no site da pós.
*/

describe('Automation Exercise - XPath', () => {

    const email = 'pgats.tc@test.com'
    const password = '12345'

    // TC1 - Register User
    it('Test Case 1: Register User', () => {

        // Prepara a conta fixa para permitir novas execuções da suíte.
        // Se a conta já existir, ela é excluída antes do novo cadastro.
        // Se a conta ainda não existir, o fluxo segue diretamente para o cadastro.
        // A conta criada permanecerá disponível para TC2, TC4 e TC5.
        cy.visit('https://automationexercise.com/login')
        cy.xpath('//input[@data-qa="login-email"]').type(email)
        cy.xpath('//input[@data-qa="login-password"]').type(password)
        cy.xpath('//button[@data-qa="login-button"]').click()


        // Criei uma lógica de preparaçãono TC1 para permitir executar a spec várias vezes usando o mesmo e-mail. 
        // Tento fazer login com a conta fixa. Depois uso uma união de seletores XPath para verificar se apareceu o link de exclusão ou a mensagem de credenciais incorretas. 
        //Com o .then() e um if, verifico qual elemento foi encontrado. 
        //  Se a conta existe, deleto e continuo. Se não, sigo para o cadastro.
    
        cy.xpath('//a[@href="/delete_account"] | //p[contains(text(), "Your email or password is incorrect!")]')
        .then(($resultado) => {
                if ($resultado.is('a[href="/delete_account"]')) 
                {
                    cy.xpath('//a[@href="/delete_account"]').click()
                    cy.xpath('//h2[contains(., "Account Deleted!")]').should('be.visible')
                    cy.xpath('//a[@data-qa="continue-button"]').click()
                }
            })

        // Acessa a página inicial e abre o formulário de cadastro.
        cy.visit('https://automationexercise.com')
        cy.xpath('//img[@alt="Website for automation practice"]').should('be.visible')
        cy.xpath('//a[contains(@href, "/login")]').click()
        cy.xpath('//h2[contains(., "New User Signup!")]').should('be.visible')

        // Informa nome e e-mail para iniciar o cadastro.
        cy.xpath('//input[@data-qa="signup-name"]').type('PGATS Auto')
        cy.xpath('//input[@data-qa="signup-email"]').type(email)
        cy.xpath('//button[@data-qa="signup-button"]').click()

        // Valida a abertura da etapa de informações da conta.
        cy.xpath('//div[contains(@class, "login-form")]//h2//b[contains(., "Enter Account Information")]')
            .should('be.visible')

        // Preenche os dados da conta.
        cy.xpath('//input[@id="id_gender1"]').check()
        cy.xpath('//input[@data-qa="password"]').type(password)

        cy.xpath('//select[@data-qa="days"]').select('1')
        cy.xpath('//select[@data-qa="months"]').select('April')
        cy.xpath('//select[@data-qa="years"]').select('2021')

        cy.xpath('//input[@id="newsletter"]').check()
        cy.xpath('//input[@id="optin"]').check()

        cy.xpath('//input[@data-qa="first_name"]').type('PGATS Auto')
        cy.xpath('//input[@data-qa="last_name"]').type('AUTO')
        cy.xpath('//input[@data-qa="company"]').type('PGATS AUTO')
        cy.xpath('//input[@data-qa="address"]').type('PGATS NAO SEI')
        cy.xpath('//input[@data-qa="address2"]').type('PGATS NAO SEI 2')

        cy.xpath('//select[@data-qa="country"]').select('United States')

        cy.xpath('//input[@data-qa="state"]').type('LogoAli')
        cy.xpath('//input[@data-qa="city"]').type('Ali')
        cy.xpath('//input[@data-qa="zipcode"]').type('01234567')
        cy.xpath('//input[@data-qa="mobile_number"]').type('99999-9999')

        // Finaliza o cadastro e valida a criação da conta.
        cy.xpath('//button[@data-qa="create-account"]').click()
        cy.xpath('//h2[contains(., "Account Created!")]').should('be.visible')
        cy.xpath('//a[@data-qa="continue-button"]').click()
        cy.xpath('//a[contains(., "Logged in as PGATS Auto")]').should('be.visible')

        // A conta não é excluída ao final do TC1.
        // Ela será reutilizada pelos TC2, TC4 e TC5.
    })

    // TC2 - Login User with correct email and password
    it('Test Case 2: Login User with correct email and password', () => {

        // Acessa a página inicial e valida o carregamento.
        cy.visit('https://automationexercise.com')
        cy.xpath('//img[@alt="Website for automation practice"]').should('be.visible')

        // Acessa a tela de login.
        cy.xpath('//a[contains(@href, "/login")]').click()
        cy.xpath('//h2[contains(., "Login to your account")]').should('be.visible')

        // Realiza o login com as credenciais válidas.
        cy.xpath('//input[@data-qa="login-email"]').type(email)
        cy.xpath('//input[@data-qa="login-password"]').type(password)
        cy.xpath('//button[@data-qa="login-button"]').click()

        // Valida o usuário autenticado.
        cy.xpath('//a[contains(., "Logged in as PGATS Auto")]').should('be.visible')
    })

    // TC3 - Login User with incorrect email and password
    it('Test Case 3: Login User with incorrect email and password', () => {

        // Acessa a página inicial e valida o carregamento.
        cy.visit('https://automationexercise.com')
        cy.xpath('//img[@alt="Website for automation practice"]').should('be.visible')

        // Acessa a tela de login.
        cy.xpath('//a[contains(@href, "/login")]').click()
        cy.xpath('//h2[contains(., "Login to your account")]').should('be.visible')

        // Informa credenciais propositalmente inválidas.
        cy.xpath('//input[@data-qa="login-email"]').type('pgats.invalido@test.com')
        cy.xpath('//input[@data-qa="login-password"]').type('senha-incorreta')
        cy.xpath('//button[@data-qa="login-button"]').click()

        // Valida a mensagem apresentada para credenciais inválidas.
        cy.xpath('//p[contains(., "Your email or password is incorrect!")]')
            .should('be.visible')
    })

    // TC4 - Logout User
    it('Test Case 4: Logout User', () => {

        // Acessa a página inicial e valida o carregamento.
        cy.visit('https://automationexercise.com')
        cy.xpath('//img[@alt="Website for automation practice"]').should('be.visible')

        // Acessa a tela de login.
        cy.xpath('//a[contains(@href, "/login")]').click()
        cy.xpath('//h2[contains(., "Login to your account")]').should('be.visible')

        // Realiza o login com as credenciais válidas.
        cy.xpath('//input[@data-qa="login-email"]').type(email)
        cy.xpath('//input[@data-qa="login-password"]').type(password)
        cy.xpath('//button[@data-qa="login-button"]').click()

        // Valida o usuário autenticado.
        cy.xpath('//a[contains(., "Logged in as PGATS Auto")]').should('be.visible')

        // Realiza o logout e valida o retorno à página de login.
        cy.xpath('//a[@href="/logout"]').click()
        cy.url().should('include', '/login')
    })

    // TC5 - Register User with existing email
    it('Test Case 5: Register User with existing email', () => {

        // Acessa a página inicial e valida o carregamento.
        cy.visit('https://automationexercise.com')
        cy.xpath('//img[@alt="Website for automation practice"]').should('be.visible')

        // Acessa a tela de cadastro.
        cy.xpath('//a[contains(@href, "/login")]').click()
        cy.xpath('//h2[contains(., "New User Signup!")]').should('be.visible')

        // Tenta cadastrar novamente o e-mail já existente.
        cy.xpath('//input[@data-qa="signup-name"]').type('PGATS Auto')
        cy.xpath('//input[@data-qa="signup-email"]').type(email)
        cy.xpath('//button[@data-qa="signup-button"]').click()

        // Valida a mensagem de e-mail já cadastrado.
        cy.xpath('//p[contains(., "Email Address already exist!")]')
            .should('be.visible')
    })
})