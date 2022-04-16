import {createSlice} from '@reduxjs/toolkit';

const initialState = '';

const filter = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        set(state, action) {
            const text = action.payload;
            return text;
        },
    },
});

export const {set} = filter.actions;
export default filter.reducer;