import React from 'react';
import {connect} from 'react-redux';

import {getFilter} from '../reducers/selectors';
import {set} from '../reducers/filterReducer';

const style = {
    marginBottom: 10,
};

const Filter = ({filter, setInput}) => {

    const handleChange = (event) => {
        setInput(event.target.value);
    };

    return (
        <div style={style}>
            filter
            <input value={filter} onChange={handleChange} />
        </div>
    );
};

const mapStateToProps = (state) => ({
    filter: getFilter(state),
});

const mapDispatchToProps = (dispatch) => ({
    setInput: (value) => dispatch(set(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);