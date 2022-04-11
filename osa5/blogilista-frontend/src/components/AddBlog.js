import React, {useState} from 'react';

import blogService from '../services/blogs';

const AddBlog = ({addBlog, showNotification, setVisible}) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const createBlog = async (event) => {
        event.preventDefault();

        try {
            const blog = await blogService.create({title, author, url});
            addBlog(blog);
            setTitle('');
            setAuthor('');
            setUrl('');
            showNotification({type: 'success', text: `a new blog ${blog.title} by ${blog.author} added`});
            setVisible(false);
        } catch (exception) {
            console.error(exception);
            alert('Failed to add new blog!');
        }
    };

    return (
        <div>
            <h2>create new</h2>

            <form onSubmit={createBlog}>
                <div>
                    <label>title:</label>
                    <input
                        name={'title'}
                        placeholder={'title'}
                        type={'text'}
                        value={title}
                        onChange={(event) => setTitle(event.target.value || '')}
                    />
                </div>
                <div>
                    <label>author:</label>
                    <input
                        name={'author'}
                        placeholder={'author'}
                        type={'text'}
                        value={author}
                        onChange={(event) => setAuthor(event.target.value || '')}
                    />
                </div>
                <div>
                    <label>url:</label>
                    <input
                        name={'url'}
                        placeholder={'url'}
                        type={'text'}
                        value={url}
                        onChange={(event) => setUrl(event.target.value || '')}
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
};

export default AddBlog;