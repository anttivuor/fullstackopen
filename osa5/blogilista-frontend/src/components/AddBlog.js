import React, {useState} from 'react';

import PropTypes from 'prop-types';

const AddBlog = ({addBlog, showNotification, hideForm}) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const createBlog = async (event) => {
        event.preventDefault();

        try {
            addBlog({title, author, url});
            setTitle('');
            setAuthor('');
            setUrl('');
            showNotification({type: 'success', text: `a new blog ${title} by ${author} added`});
            hideForm();
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
                        id={'title'}
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
                        id={'author'}
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
                        id={'url'}
                        name={'url'}
                        placeholder={'url'}
                        type={'text'}
                        value={url}
                        onChange={(event) => setUrl(event.target.value || '')}
                    />
                </div>
                <button id={'create_blog'} type={'submit'}>create</button>
            </form>
        </div>
    );
};

AddBlog.propTypes = {
    addBlog: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired,
    hideForm: PropTypes.func.isRequired,
};

export default AddBlog;