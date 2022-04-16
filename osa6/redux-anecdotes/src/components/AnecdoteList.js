import {useDispatch, useSelector} from 'react-redux';

import React from 'react';
import {getSortedAnecdotes} from '../reducers/selectors';
import {vote} from '../reducers/anecdoteReducer';
import {set as setNotification} from '../reducers/notificationReducer';

const AnecdoteList = () => {
    const dispatch = useDispatch();
    const anecdotes = useSelector(getSortedAnecdotes);

    const onVote = (id, content) => {
        dispatch(vote(id));
        dispatch(setNotification(content));
    };

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                    has {anecdote.votes}
                    <button onClick={() => onVote(anecdote.id, anecdote.content)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnecdoteList;