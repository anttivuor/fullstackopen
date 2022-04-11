Cypress.Commands.add('createUser', ({username, password, name}) => {
    cy.request('POST', 'http://localhost:3003/api/users', {
        username, password, name
    });
});

Cypress.Commands.add('login', ({username, password}) => {
    cy.request('POST', 'http://localhost:3003/api/login', {
        username, password
    }).then(({body}) => {
        localStorage.setItem('loggedUser', JSON.stringify(body));
    });
});

Cypress.Commands.add('addBlog', (body) => {
    cy.request({
        url: 'http://localhost:3003/api/blogs',
        method: 'POST',
        body,
        headers: {
            Authorization: `bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`,
        },
    });
})