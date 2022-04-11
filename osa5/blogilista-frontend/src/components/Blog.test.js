import '@testing-library/jest-dom/extend-expect';

import {fireEvent, render, screen} from '@testing-library/react';

import Blog from './Blog';
import React from 'react';
import blogService from '../services/blogs'

let likeMockHandler = jest.fn();

const defaultProps = {
    user: {
        id: '6253ea393ab6f31869246b63',
        name: 'Antti Vuorenmaa',
        username: 'Bulkki8',
    },
    blog: {
        title: 'Example blog title',
        author: 'Antti Vuorenmaa',
        likes: 10,
        url: 'https://example.com',
        user: {
            id: '6253ea393ab6f31869246b63',
            name: 'Antti Vuorenmaa',
            username: 'Bulkki8',
        },
    },
    updateBlogLikes: likeMockHandler,
    deleteBlog: () => {},
    showNotification: () => {},
};

describe('<Blog />', () => {
    let component;

    beforeEach(() => {
        component = render(<Blog {...defaultProps} />);
    });

    blogService.like = jest.fn().mockImplementation(() => {
        return Promise.resolve({ success: true });
    })

    test('renders content', () => {
        expect(component.container).toHaveTextContent('Example blog title');
        expect(component.container).toHaveTextContent('Antti Vuorenmaa');
        expect(component.container).not.toHaveTextContent('https://example.com');
        expect(component.container).not.toHaveTextContent('likes: 10');
    });

    test('renders content when blog details have been opened', () => {
        const button = component.getByText('view');
        // We have to use fireEvent since userEvent didn't work for some reason
        // Should affect anything because userEvent uses fireEvent API
        fireEvent.click(button);

        expect(component.container).toHaveTextContent('Example blog title');
        expect(component.container).toHaveTextContent('Antti Vuorenmaa');
        expect(component.container).toHaveTextContent('https://example.com');
        expect(component.container).toHaveTextContent('likes: 10');
    });

    test('if like is pressed two times, the event handler should be called twice', () => {
        const button = component.getByText('view');
        fireEvent.click(button);

        const likeButton = component.getByText('like');

        fireEvent.click(likeButton);
        fireEvent.click(likeButton);

        expect(likeMockHandler.mock.calls).toHaveLength(2);
    });
});