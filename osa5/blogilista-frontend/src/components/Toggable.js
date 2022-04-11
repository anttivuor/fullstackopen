import React, {forwardRef, useImperativeHandle, useState} from 'react';

import PropTypes from 'prop-types';

const Toggable = forwardRef(({label, children, buttonId}, ref) => {
    const [visible, setVisible] = useState(false);

    useImperativeHandle(ref, () => {
        return {
            hideForm: () => setVisible(false),
        };
    });

    return (
        <div>
            {visible && children}
            <input
                type={'button'}
                onClick={() => setVisible(!visible)}
                value={visible ? 'cancel' : label}
                id={buttonId}
            />
        </div>
    );
});

Toggable.propTypes = {
    label: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
    buttonId: PropTypes.string,
};

Toggable.displayName = 'Toggable';

export default Toggable;