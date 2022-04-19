import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

import {createAnecdote} from '../reducers/anecdoteReducer';
import {setNotification} from '../reducers/notificationReducer';

const AnecdoteForm = () => {
    const dispatch = useDispatch();
    const [input, setInput] = useState('');

    const onSubmit = (event) => {
        event.preventDefault();

        const content = input.trim();

        if (!!content) {
            dispatch(createAnecdote(content));
            setInput('');
            dispatch(setNotification(`You added '${content}'`, 5));
        };
    };

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <input value={input} onChange={(event) => setInput(event.target.value)} />
                </div>
                <button type={'submit'}>create</button>
            </form>
        </div>
    );
};

export default AnecdoteForm;