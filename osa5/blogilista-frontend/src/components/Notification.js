import React, {useCallback} from 'react';

import PropTypes from 'prop-types';

const styles = {
    container: {
        border: '2px solid',
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#D3D3D3',
    },
    containerSuccess: {
        borderColor: 'green',
        color: 'green',
    },
    containerError: {
        borderColor: 'red',
        color: 'red',
    },
}

const Notification = ({notification = {}}) => {
    const {type = null, text} = notification || {};

    const getStyle = useCallback(() => {
        if (type === 'success') return styles.containerSuccess;
        if (type === 'error') return styles.containerError;
        return {};
    }, [type])

    if (!notification) return null;

    return (
        <div style={{...styles.container, ...getStyle()}}>
            {text}
        </div>
    );
};

Notification.propTypes = {
    notification: PropTypes.object,
};

export default Notification;