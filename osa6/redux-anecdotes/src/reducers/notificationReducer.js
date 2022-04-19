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

export const setNotification = (text, timeout) => {
    return async dispatch => {
        dispatch(set(text));
        setTimeout(() => {
            dispatch(set(''));
        }, timeout * 1000);
    };
};

export default notification.reducer;