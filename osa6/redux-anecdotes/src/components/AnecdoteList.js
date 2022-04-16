import {useDispatch, useSelector} from 'react-redux';

import React from 'react';
import {getSortedAnecdotes} from '../reducers/anecdoteSelectors';
import {voteAction} from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
    const dispatch = useDispatch();
    const anecdotes = useSelector(getSortedAnecdotes);

    const vote = (id) => {
        dispatch(voteAction(id));
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
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnecdoteList;