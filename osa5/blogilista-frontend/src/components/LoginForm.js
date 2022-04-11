import React, {useState} from 'react';

import loginService from '../services/login';

const LoginForm = ({setUser}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const user = await loginService.login({username, password});
            setUser(user);
            setUsername('');
            setPassword('');
        } catch (exception) {
            console.error(exception);
            alert('Wrong credentials!');
        }
    }

    return (
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <input
                        name={'username'}
                        placeholder={'username'}
                        type={'text'}
                        value={username}
                        onChange={(event) => setUsername(event.target.value || '')}
                    />
                </div>
                <div>
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
}

export default LoginForm;