import React, {useState} from 'react';

import {addAction} from '../reducers/anecdoteReducer';
import {useDispatch} from 'react-redux';

const AnecdoteForm = () => {
    const dispatch = useDispatch();
    const [input, setInput] = useState('');

    const create = (event) => {
        event.preventDefault();

        if (!!input.trim()) {
            dispatch(addAction(input));
            setInput('');
        };
    };

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={create}>
                <div>
                    <input value={input} onChange={(event) => setInput(event.target.value)} />
                </div>
                <button type={'submit'}>create</button>
            </form>
        </div>
    );
};

export default AnecdoteForm;