import React from 'react';

import {getNotification} from '../reducers/selectors';
import {useSelector} from 'react-redux';

const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
};

const Notification = () => {
    const notification = useSelector(getNotification);

    if (!notification) return null;

    return (
        <div style={style}>
            {notification}
        </div>
    );
};

export default Notification;