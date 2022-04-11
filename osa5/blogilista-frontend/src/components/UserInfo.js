import React from 'react';

const UserInfo = ({setUser, user}) => {
    const logout = () => {
        setUser(null);
        window.localStorage.clear('loggedUser');
    };

    return (
        <p>{user.name} logged in<input type={'button'} onClick={() => logout()} value={'logout'} /></p>
    );
};

export default UserInfo;