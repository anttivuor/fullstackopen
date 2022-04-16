import React, {useState} from 'react';

import {add} from '../reducers/anecdoteReducer';
import {set as setNotification} from '../reducers/notificationReducer';
import {useDispatch} from 'react-redux';

const AnecdoteForm = () => {
    const dispatch = useDispatch();
    const [input, setInput] = useState('');

    const onSubmit = (event) => {
        event.preventDefault();

        const content = input.trim();

        if (!!content) {
            dispatch(add(content));
            setInput('');
            dispatch(setNotification(`You added '${content}'`))
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