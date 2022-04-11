import React, {useState} from 'react';

import Notification from './Notification';
import PropTypes from 'prop-types';
import blogService from '../services/blogs';
import loginService from '../services/login';

const LoginForm = ({setUser, showNotification, notification}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const user = await loginService.login({username, password});
            window.localStorage.setItem('loggedUser', JSON.stringify(user));
            setUser(user);
            blogService.setToken(user.token);
            setUsername('');
            setPassword('');
        } catch (exception) {
            console.error(exception);
            console.log('setting notification');
            showNotification({type: 'error', text: 'wrong username or password'});
        }
    };

    return (
        <div>
            <h2>Log in to application</h2>

            <Notification notification={notification} />

            <form onSubmit={handleLogin}>
                <div>
                    <label>username</label>
                    <input
                        name={'username'}
                        placeholder={'username'}
                        type={'text'}
                        value={username}
                        onChange={(event) => setUsername(event.target.value || '')}
                    />
                </div>
                <div>
                    <label>password</label>
                    <input
                        name={'password'}
                        placeholder={'password'}
                        type={'password'}
                        value={password}
                        onChange={(event) => setPassword(event.target.value || '')}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    );
};

LoginForm.propTypes = {
    setUser: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired,
    notification: PropTypes.object,
};

export default LoginForm;