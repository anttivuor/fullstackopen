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
export default notification.reducer;