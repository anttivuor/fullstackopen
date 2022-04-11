// describe('Blog app', () => {
//     beforeEach(() => {
//         cy.request('POST', 'http://localhost:3003/api/testing/reset');
//         cy.createUser({username: 'test-user', password: 'test-password', name: 'Test User'});
//         cy.visit('http://localhost:3000');
//     });

//     it('Login form is shown', () => {
//         cy.contains('Log in to application');
//     });

//     describe('Login', () => {
//         it('succeeds with correct credentials', () => {
//             cy.get('#username').type('test-user');
//             cy.get('#password').type('test-password');
//             cy.get('#submit').click();
//             cy.contains('Test User logged in');
//         });

//         it('fails with wrong credentials', () => {
//             cy.get('#username').type('wrong-username');
//             cy.get('#password').type('test-password');
//             cy.get('#submit').click();
//             cy.contains('wrong username or password');
//         });
//     });
// });

describe('When logged in', () => {
    beforeEach(() => {
        cy.request('POST', 'http://localhost:3003/api/testing/reset');
        cy.createUser({username: 'test-user', password: 'test-password', name: 'Test User'});
        cy.login({username: 'test-user', password: 'test-password'});
    });

    it('A blog can be created', () => {
        cy.visit('http://localhost:3000');
        cy.get('#toggle_blog_form').click();
        cy.get('#title').type('Test blog');
        cy.get('#author').type('Test User');
        cy.get('#url').type('https://example.com');
        cy.get('#create_blog').click();
        cy.contains('a new blog Test blog by Test User added');
        cy.get('.blog_title').contains('Test blog');
        cy.get('.blog_author').contains('Test User');
    });

    describe('blog exists already', () => {
        beforeEach(() => {
            cy.addBlog({title: 'Example Blog', author: 'Test User', url: 'https://example.com'});
            cy.visit('http://localhost:3000');
        });

        it('A blog can be liked', () => {
            cy.get('.toggle_blog_details').click();
            cy.contains('likes: 0');
            cy.get('.like_blog_button').click();
            cy.contains('likes: 1');
        });

        it('A blog can be deleted', () => {
            cy.get('.toggle_blog_details').click()
            cy.get('.remove_blog_button').click();
            cy.contains('Blog Example Blog by Test User removed');
            cy.get('.blog_title').should('not.exist');
            cy.get('.blog_author').should('not.exist');
        });

        it('Blogs are sorted in correct order', () => {
            const blog1 = {
                title: 'Test1',
                author: 'Antti1',
                url: 'https://example.com',
                likes: 10,
            };
            const blog2 = {
                title: 'Test2',
                author: 'Antti2',
                url: 'http://example.com',
                likes: 12,
            };
            const blog3 = {
                title: 'Test3',
                author: 'Antti3',
                url: 'http://example.com',
                likes: 8,
            };
            cy.addBlog(blog1);
            cy.addBlog(blog2);
            cy.addBlog(blog3);

            cy.visit('http://localhost:3000');

            cy.get('.toggle_blog_details').click({multiple: true});
            cy.get('.blog_likes').should('have.length', 4);
            cy.get('.blog_likes').should((items) => {
                expect(items[0]).to.contain('likes: 12');
                expect(items[1]).to.contain('likes: 10');
                expect(items[2]).to.contain('likes: 8');
                expect(items[3]).to.contain('likes: 0');
            });
        });
    });
});
