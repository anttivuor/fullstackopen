import {createSlice} from '@reduxjs/toolkit';

const initialState = '';

const notification = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        set(state, action) {
            const text = action.payload;
            return text;
        },
    },
});

export const {set} = notification.actions;

let timeoutID;

export const setNotification = (text, timeout) => {
    return async dispatch => {
        clearTimeout(timeoutID);
        dispatch(set(text));
        timeoutID = setTimeout(() => {
            dispatch(set(''));
        }, timeout * 1000);
    };
};

export default notification.reducer;