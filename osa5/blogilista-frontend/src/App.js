import {useEffect, useState} from 'react';

import AddBlog from './components/AddBlog';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import UserInfo from './components/UserInfo';
import blogService from './services/blogs';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        );
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            blogService.setToken(user.token);
        }
    }, []);

    useEffect(() => {
        if (notification) {
            setTimeout(() => {
                setNotification(null);
            }, 5000);
        }
    }, [notification, setNotification]);

    const addBlog = (blog) => {
        const newBlogs = [...blogs, blog];
        setBlogs(newBlogs);
    };

    if (!user) {
        return (
            <LoginForm setUser={setUser} showNotification={setNotification} notification={notification} />
        );
    }

    return (
        <div>
            <h2>blogs</h2>

            <Notification notification={notification} />

            <UserInfo user={user} setUser={setUser} />

            <AddBlog addBlog={addBlog} showNotification={setNotification} />

            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    );
}

export default App;
