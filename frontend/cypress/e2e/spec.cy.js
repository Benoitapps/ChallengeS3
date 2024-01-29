Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe('My First Test !', () => {
    it('Does not do much!', () => {
        expect(true).to.equal(true)
    })
})

describe('Simple test', () => {
    it('Login', () => {
        cy.visit('http://localhost:4173')
        cy.contains('Se connecter')
        cy.contains('Se connecter').click()
        cy.url().should('include', '/login')
        cy.get('#email').type('user@user.fr')
        cy.get('#password').type('test')
        cy.get('input[type="submit"]').click()
    })

    it('Sign up', () => {
        cy.visit('http://localhost:4173')
        cy.contains('Inscription')
        cy.contains('Inscription').click()
        cy.url().should('include', '/signup')
        cy.get('#firstname').type('user')
        cy.get('#lastname').type('user')
        cy.get('#email').type('userTest@user.fr')
        cy.get('#password').type('test')
        cy.get('#passwordConfirm').type('test')
        cy.get('#Client input[type="submit"]').click()
    })
})