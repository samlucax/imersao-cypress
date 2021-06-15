/// <reference types="cypress" />

/* 
  3 partes importante em cada nome de teste
    1. o que está sendo testado? Twitter, Feed
    2. sob que circuntâncias, condições? 
    3. qual o resultado esperado?
*/

/* 

  O que fazer quando um serviço externo impacta no teste?

    1. pedir pra corrigir
    2. isolar este serviço do fluxo de teste (quando possível)

  Uma alternativa é através do uso de um mock - uma camada simulada de uma parte da aplicação ou de um serviço externo

  Por exemplo, sempre que chamar:
  https://res.cloudinary.com/douy56nkf/image/upload/v1588127894/twitter-build/bvxmlgckusmrwyivsnzr.svg

  O mock irá retornar baseado no contrato / padrão do serviço que foi isolado: 
    - uma imagem
    - status de sucesso

  No Cypress, usamos o cy.intercept para lidar com mocks de requisições XHR.

*/

describe('Twitter - ', () => {

  // hooks - blocos de controle para antes / depois dos testes
  beforeEach(() => {

    // ARRANGE
    // interceptar uma requisição
    cy.intercept({
      method: 'GET',
      hostname: 'res.cloudinary.com'
    }, {
      statusCode: 200,
      fixture: 'meme'
    })

    cy.login()

  });

  context('Feed', () => {
    it('Quando estiver autenticado, devo visualizar o menu navegável', () => {
      // ACT
      cy.visit('/')

      // Movido para um comando customizado: cy.login()
      // cy.get('input[type=email]').type('qweqwer@mail.com')
      // cy.get('input[type=password]').type('123456')

      // cy.contains('button[type=submit]', 'Login').click()

      // cy.get('button[type=submit]')
      // cy.contains('Login')

      // ASSERT
      cy.get('nav ul li')
        .should('be.visible')
        .and('have.length', 6)
        
        .each(($el, index, $list) => {
          let options = [
            'Home',
            'Explore',
            'Notifications',
            'Bookmarks',
            'Profile',
            'More'
          ]

          cy.log(index)

          cy.get($el)
            .find('span')
            .should('have.text', options[index])

        })

    })

  });


});

