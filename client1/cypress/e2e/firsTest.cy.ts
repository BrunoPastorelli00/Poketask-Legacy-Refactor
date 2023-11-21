describe('AddTask Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/addTask')
  })

  it('should add a task when the confirm button is clicked', () => {
    const taskName = 'Test task'

    cy.intercept('POST', '/addTask', (req) => {
      req.reply({
        statusCode: 200,
        body: { 
          message: 'Task added successfully',
          task: { index: 1, text: taskName, done: false } // replace with the actual task object structure
        }
      })
    }).as('addTask')

    cy.get('input[name="task"]').type(taskName)
    cy.get('.form-submit').click()

    cy.wait('@addTask').its('response.statusCode').should('eq', 200)
  })
})