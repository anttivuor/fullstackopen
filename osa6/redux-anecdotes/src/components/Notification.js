import React from 'react';
import {connect} from 'react-redux';

import {getNotification} from '../reducers/selectors';

const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
};

const Notification = ({notification}) => {
    if (!notification) return null;

    return (
        <div style={style}>
            {notification}
        </div>
    );
};

const mapStateToProps = (state) => ({
    notification: getNotification(state),
});

export default connect(mapStateToProps)(Notification);