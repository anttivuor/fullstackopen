import PropTypes from 'prop-types';
import React from 'react';

const UserInfo = ({user, setUser}) => {
    const logout = () => {
        setUser(null);
        window.localStorage.removeItem('loggedUser');
    };

    return (
        <p>{user.name} logged in<input type={'button'} onClick={() => logout()} value={'logout'} /></p>
    );
};

UserInfo.propTypes = {
    user: PropTypes.object.isRequired,
    setUser: PropTypes.func.isRequired,
};

export default UserInfo;