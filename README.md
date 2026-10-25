# Trabalho Final PGATS — Automação de Testes WEB

Projeto final da disciplina de Automação de Testes na Camada de Interface WEB da PGATS. O trabalho automatiza cenários do site Automation Exercise com Cypress e organiza as ações de negócio em módulos JavaScript.

## Tecnologias

- Cypress 13.7.3.
- Node.js 25.9.0 utilizado localmente.
- Node.js 25 configurado no GitHub Actions. Essa configuração não indica a versão local exata do Node.js.
- GitHub Actions para execução automatizada da spec final.
- Allure Report 3 para gerar relatórios a partir dos resultados do Cypress.
- Chrome para executar os testes localmente e na CI.

## Estrutura do projeto

- `cypress/e2e/`: specs Cypress. A spec final é `automation-exercise-conclusao.cy.js`; as specs antigas e os exemplos do Cypress também permanecem no projeto local.
- `cypress/modules/`: módulos organizados por funcionalidade, como início, login, cadastro, logout, conta, produto, assinatura e pedido.
- `cypress/support/`: suporte carregado pelo Cypress. `e2e.js` importa os comandos de suporte existentes, Cypress XPath e a integração do Allure.
- `cypress.config.js`: configuração do Cypress e inicialização do adaptador Allure, com resultados em `allure-results/`.
- `package.json`: dependências de desenvolvimento e scripts npm, incluindo os comandos de geração e abertura do relatório Allure.
- `package-lock.json`: versões resolvidas das dependências usadas pelo `npm ci`.
- `diretrizes-arquitetura-projeto-v3.md`: diretrizes de arquitetura e desenvolvimento adotadas para a modularização V3.
- `.github/workflows/cypress-e2e.yml`: workflow que executa somente `cypress/e2e/automation-exercise-conclusao.cy.js`.

## Arquitetura V3

A spec principal define os cenários, os dados usados e a ordem dos dez casos. Os módulos em `cypress/modules/` agrupam seletores, interações e asserções relacionados a cada funcionalidade ou etapa de negócio.

Os módulos usam funções JavaScript, exportadas com `module.exports`, e declaram os seletores em `const seletores`. A arquitetura adotada não usa classes nem Page Objects. A spec permanece como uma sequência legível dos fluxos de teste.

## Casos automatizados

- **TC1 — Register User:** libera o e-mail fixo caso já exista uma conta e cadastra o usuário fixo.
- **TC2 — Login User with correct email and password:** faz login com a conta fixa e verifica que o nome do usuário autenticado aparece na página.
- **TC3 — Login User with incorrect email and password:** tenta fazer login com credenciais inválidas e verifica a mensagem de erro.
- **TC4 — Logout User:** faz login com a conta fixa, verifica o usuário autenticado e realiza logout.
- **TC5 — Register User with existing email:** tenta cadastrar novamente o e-mail fixo e verifica a mensagem de e-mail já registrado.
- **TC8 — Verify All Products and product detail page:** verifica a lista de produtos e abre os detalhes do primeiro produto, verificando informações exibidas nessa página.
- **TC9 — Search Product:** pesquisa por `top`, verifica a página “Searched Products” e confirma que os produtos encontrados correspondem ao termo no nome ou na categoria.
- **TC10 — Verify Subscription in home page:** envia um e-mail exclusivo para a assinatura da página inicial e verifica a mensagem de sucesso.
- **TC15 — Place Order: Register before Checkout:** cadastra um usuário com e-mail exclusivo, adiciona o primeiro produto ao carrinho, conclui o fluxo de checkout e verifica a confirmação do pedido; ao final, exclui a conta criada.
- **TC16 — Place Order: Login before Checkout:** faz login com a conta fixa, adiciona o primeiro produto ao carrinho, conclui o fluxo de checkout e verifica a confirmação do pedido; ao final, exclui a conta.

## Instalação

Pré-requisitos para execução local:

- Node.js 25.9.0 e npm.
- Google Chrome instalado para usar o comando local com `--browser chrome`.

Na raiz do projeto, instale as versões registradas no lockfile:

```bash
npm ci
```

## Execução local

Para executar somente a spec final com o Chrome visível:

```bash
npx cypress run --spec "cypress/e2e/automation-exercise-conclusao.cy.js" --browser chrome --headed
```

A opção `--headed` abre o Chrome em modo visível durante a execução.

## Relatórios Allure

O adaptador Allure do Cypress grava os resultados brutos em `allure-results/`. O comando de geração cria o relatório HTML em `allure-report/`.

Para gerar o relatório e abri-lo localmente, use os scripts existentes:

```bash
npm run allure:generate
npm run allure:open
```

Execute os testes com a integração Allure antes de gerar o relatório para que ele reflita uma execução atualizada. O comando `allure:open` abre o relatório HTML gerado.

## GitHub Actions

O workflow está em `.github/workflows/cypress-e2e.yml` e executa exclusivamente a spec final. Ele é acionado por:

- `push` para a branch `master`;
- execução manual (`workflow_dispatch`);
- agendamento diário com cron `0 11 * * *`, às 11:00 UTC.

O job usa `ubuntu-latest`, configura Node.js 25 com cache npm, instala dependências com `npm ci` e executa a spec final no Chrome headless. Depois da execução, tenta gerar o relatório Allure e publica `allure-results/` e `allure-report/` como artefato, desde que o job não seja cancelado.

- Repositório: [pgats-automacao-web-TrabalhoFinal-2026](https://github.com/qraMarcosNatal/pgats-automacao-web-TrabalhoFinal-2026)
- Execuções: [GitHub Actions](https://github.com/qraMarcosNatal/pgats-automacao-web-TrabalhoFinal-2026/actions)

## Resultados validados

Conforme os resultados informados para o projeto, a última execução local passou nos dez testes da spec final. A primeira execução no GitHub Actions concluiu com sucesso em aproximadamente 2 minutos e 23 segundos e publicou o artefato `resultados-cypress-allure`. Não há aqui uma contagem confirmada individualmente dos dez testes nos logs do CI.

Para baixar o artefato, abra a execução desejada na página do GitHub Actions, acesse a seção **Summary** e selecione `resultados-cypress-allure` na área de artefatos.

## Observações

- `.gitignore` exclui `node_modules/`, `allure-results/`, `allure-report/`, `cypress/screenshots/` e `cypress/videos/`.
- As specs antigas permanecem no projeto local, mas a CI executa somente `cypress/e2e/automation-exercise-conclusao.cy.js`.
- O projeto reúne os cenários Cypress, os módulos V3, a documentação e a configuração de execução local e de CI.
