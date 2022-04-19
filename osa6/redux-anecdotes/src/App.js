import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import Notification from './components/Notification';
import Filter from './components/Filter';
import AnecdoteList from './components/AnecdoteList';
import AnecdoteForm from './components/AnecdoteForm';
import {initializeAnecdotes} from './reducers/anecdoteReducer';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeAnecdotes());
    }, []);

    return (
        <div>
            <h2>Anecdotes</h2>
            <Filter />
            <Notification />
            <AnecdoteList />
            <AnecdoteForm />
        </div>
    );
};

export default App;