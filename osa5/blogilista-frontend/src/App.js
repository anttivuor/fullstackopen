import React, {useEffect, useMemo, useState} from 'react';

import AddBlog from './components/AddBlog';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Toggable from './components/Toggable';
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

    const updateBlogLikes = (blog) => {
        const {id, likes} = blog;
        const newBlogs = blogs.map((b) => {
            if (b.id === id) {
                return {
                    ...b,
                    likes,
                };
            }
            return b;
        });
        setBlogs(newBlogs);
    }

    const addBlog = (blog) => {
        const newBlogs = [...blogs, blog];
        setBlogs(newBlogs);
    };

    const sortedBlogs = useMemo(() => {
        return blogs.sort((a, b) => b.likes - a.likes);
    }, [blogs]);

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

            <Toggable label={'new note'}>
                <AddBlog addBlog={addBlog} showNotification={setNotification} />
            </Toggable>

            {sortedBlogs.map(blog =>
                <Blog key={blog.id} blog={blog} updateBlogLikes={updateBlogLikes} />
            )}
        </div>
    );
}

export default App;
