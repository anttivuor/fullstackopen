import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {getNotification} from '../reducers/selectors';
import {set} from '../reducers/notificationReducer';

const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
};

const Notification = () => {
    const dispatch = useDispatch();
    const notification = useSelector(getNotification);

    useEffect(() => {
        if (notification) {
            setTimeout(() => {
                dispatch(set(''));
            }, 5000);
        }
    }, [notification])

    if (!notification) return null;

    return (
        <div style={style}>
            {notification}
        </div>
    );
};

export default Notification;