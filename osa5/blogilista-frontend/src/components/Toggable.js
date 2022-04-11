import React, {useState} from 'react';

const Toggable = ({label, children}) => {
    const [visible, setVisible] = useState(false);

    const childrenWithToggleProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {setVisible});
        }
        return child;
    });

    return (
        <div>
            {visible && childrenWithToggleProps}
            <input
                type={'button'}
                onClick={() => setVisible(!visible)}
                value={visible ? 'cancel' : label}
            />
        </div>
    );
};

export default Toggable;