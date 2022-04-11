import React, {useState} from 'react';

import PropTypes from 'prop-types';
import blogService from '../services/blogs';

const styles = {
    container: {
        marginTop: 3,
        marginBottom: 3,
        padding: 3,
        border: '1px solid black',
    },
    button: {
        marginLeft: 3,
    },
};

const Blog = ({
    blog,
    user,
    updateBlogLikes,
    deleteBlog,
    showNotification,
}) => {
    const [showDetails, setShowDetails] = useState(false);

    const addLike = async () => {
        const {id, user, likes, author, title, url} = blog;
        const body = {
            user: user.id,
            likes: likes + 1,
            author,
            title,
            url,
        };
        const newBlog = await blogService.like(id, body);
        updateBlogLikes(newBlog);
    };

    const confirmRemove = async () => {
        const result = window.confirm(`Remove blog ${blog.title} by ${blog.author}`);
        if (result) {
            blogService.deleteBlog(blog.id)
            .then(() => {
                deleteBlog(blog.id);
                showNotification({type: 'success', text: `Blog ${blog.title} by ${blog.author} removed`});
            })
            .catch((error) => {
                console.error(error);
                showNotification({type: 'error', text: `Failed to delete blog ${blog.title} by ${blog.author}`});
            });
        }
    };

    return (
        <div style={styles.container}>
            <div>
                {blog.title} {blog.author}
                <input
                    type={'button'}
                    value={showDetails ? 'view' : 'hide'}
                    onClick={() => setShowDetails(!showDetails)}
                    style={styles.button}
                />
            </div>
            {showDetails &&
                <>
                    <div>{blog.url}</div>
                    <div>
                        likes: {blog.likes}
                        <input
                            type={'button'}
                            value={'like'}
                            onClick={() => addLike()}
                            style={styles.button}
                        />
                    </div>
                    <div>{blog.user?.name}</div>
                    {blog.user?.id === user.id &&
                        <div>
                            <input
                                type={'button'}
                                value={'remove'}
                                onClick={() => confirmRemove()}
                            />
                        </div>
                    }
                </>
            }
        </div>
    );
};

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    updateBlogLikes: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired,
};

export default Blog;