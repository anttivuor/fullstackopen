import React, {useState} from 'react';
import {connect} from 'react-redux';

import {createAnecdote as createAnecdoteAction} from '../reducers/anecdoteReducer';
import {setNotification as setNotificationAction} from '../reducers/notificationReducer';

const AnecdoteForm = ({createAnecdote, setNotification}) => {
    const [input, setInput] = useState('');

    const onSubmit = (event) => {
        event.preventDefault();

        const content = input.trim();

        if (!!content) {
            createAnecdote(content);
            setInput('');
            setNotification(`You added '${content}'`, 5);
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

const mapDispatchToProps = (dispatch) => ({
    createAnecdote: (value) => dispatch(createAnecdoteAction(value)),
    setNotification: (...values) => dispatch(setNotificationAction(...values)),
});

export default connect(null, mapDispatchToProps)(AnecdoteForm);