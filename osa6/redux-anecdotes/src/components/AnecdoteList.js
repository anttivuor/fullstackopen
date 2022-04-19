import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {getSortedAnecdotes} from '../reducers/selectors';
import {setNotification} from '../reducers/notificationReducer';
import {voteAnecdote} from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
    const dispatch = useDispatch();
    const anecdotes = useSelector(getSortedAnecdotes);

    const onVote = (anecdote) => {
        dispatch(voteAnecdote(anecdote));
        dispatch(setNotification(`You voted '${anecdote.content}'`, 5));
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
                    <button onClick={() => onVote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnecdoteList;