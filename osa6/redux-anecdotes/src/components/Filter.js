import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {getFilter} from '../reducers/selectors';
import {set} from '../reducers/filterReducer';

const style = {
    marginBottom: 10,
};

const Filter = () => {
    const dispatch = useDispatch();
    const filter = useSelector(getFilter);

    const handleChange = (event) => {
        dispatch(set(event.target.value));
    };

    return (
        <div style={style}>
            filter
            <input value={filter} onChange={handleChange} />
        </div>
    );
};

export default Filter;