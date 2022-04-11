import React, {useEffect, useMemo, useRef, useState} from 'react';

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

    const addBlogRef = useRef();

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

    const updateBlogLikes = async (blog) => {
        const {id, user, likes, author, title, url} = blog;
        const body = {
            user: user.id,
            likes: likes + 1,
            author,
            title,
            url,
        };
        const newBlog = await blogService.like(id, body);
        const newBlogs = blogs.map((b) => {
            if (b.id === newBlog.id) {
                return {
                    ...b,
                    likes: newBlog.likes,
                };
            }
            return b;
        });
        setBlogs(newBlogs);
    };

    const addBlog = async (blog) => {
        const newBlog = await blogService.create(blog);
        const newBlogs = [...blogs, newBlog];
        setBlogs(newBlogs);
    };

    const deleteBlog = (id) => {
        const newBlogs = blogs.filter((b) => b.id !== id);
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

            <Toggable label={'new note'} ref={addBlogRef}>
                <AddBlog addBlog={addBlog} showNotification={setNotification} hideForm={() => addBlogRef.current.hideForm()} />
            </Toggable>

            {sortedBlogs.map(blog =>
                <Blog
                    key={blog.id}
                    blog={blog}
                    user={user}
                    updateBlogLikes={updateBlogLikes}
                    deleteBlog={deleteBlog}
                    showNotification={setNotification}
                />
            )}
        </div>
    );
};

export default App;
