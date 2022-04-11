import '@testing-library/jest-dom/extend-expect';

import {fireEvent, render, screen} from '@testing-library/react';

import AddBlog from './AddBlog';
import React from 'react';

let addBlogMockHandler = jest.fn();

const defaultProps = {
    addBlog: addBlogMockHandler,
    showNotification: () => {},
    hideForm: () => {},
};

describe('<AddBlog />', () => {
    test('blog form is sent with correct inputs', () => {
        const component = render(<AddBlog {...defaultProps} />);

        const [title, author, url] = component.getAllByRole('textbox');

        fireEvent.change(title, {target: {value: 'Example title'}});
        fireEvent.change(author, {target: {value: 'Antti Vuorenmaa'}});
        fireEvent.change(url, {target: {value: 'https://example.com'}});

        const submitButton = component.getByText('create');

        fireEvent.click(submitButton);

        expect(addBlogMockHandler.mock.calls).toHaveLength(1);
        expect(addBlogMockHandler.mock.calls[0][0].title).toBe('Example title');
        expect(addBlogMockHandler.mock.calls[0][0].author).toBe('Antti Vuorenmaa');
        expect(addBlogMockHandler.mock.calls[0][0].url).toBe('https://example.com');
    });
});