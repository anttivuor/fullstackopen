import {createSlice} from '@reduxjs/toolkit';

import anecdoteService from '../services/anecdotes';

const initialState = [];

const anecdotes = createSlice({
    name: 'anecdotes',
    initialState,
    reducers: {
        update(state, action) {
            const {id} = action.payload;
            return state.map((anecdote) => {
                if (anecdote.id === id) {
                    return action.payload;
                };
                return anecdote;
            });
        },
        add(state, action) {
            const newAnecdote = action.payload;
            state.push(newAnecdote);
        },
        setAll(state, action) {
            return action.payload;
        },
    },
});

export const {update, add, setAll} = anecdotes.actions;

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll();
        dispatch(setAll(anecdotes));
    };
};

export const createAnecdote = (content) => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.add(content);
        dispatch(add(newAnecdote));
    };
};

export const voteAnecdote = (anecdote) => {
    return async dispatch => {
        const data = {
            ...anecdote,
            votes: anecdote.votes + 1,
        };
        const editedAnecdote = await anecdoteService.vote(data);
        dispatch(update(editedAnecdote));
    }
}

export default anecdotes.reducer;