describe('The Login Page', function () {
    beforeEach(function () {


      cy.request('POST', 'https://id.sagasistemas.com.br/api/v1/token', { username: 'mauricio.morais', password:'dvsdv', app:'saga-dashboard' })
        .its('body.user')
        .as('currentUser')
    })
  
    it('sets auth cookie when logging in via form submission', function () {
        // destructuring assignment of the this.currentUser object
        const { username, password } = this.currentUser

        cy.visit('/login')
    
        cy.get('input[name=username]').type(username)
    
        // {enter} causes the form to submit
        cy.get('input[name=password]').type(`${password}{enter}`)

        cy
            .get('button')
            .click()
    
        // we should be redirected to /dashboard
        cy.url().should('include', '/')

  
        // our auth cookie should be present
        //cy.getCookie('user').should('exist')
    
        // UI should reflect this user being logged in
        //cy.get('.card-title').should('contain', 'Mauricio')
    })
  })