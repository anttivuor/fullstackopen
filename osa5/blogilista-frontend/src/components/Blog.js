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
    titleRow: {
        display: 'flex',
        flexDirection: 'row',
    },
    title: {
        marginRight: 5,
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
            <div style={styles.titleRow}>
                <div style={styles.title}>{blog.title}</div>
                <div>{blog.author}</div>
                <input
                    type={'button'}
                    value={showDetails ? 'hide' : 'view'}
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
                            onClick={() => updateBlogLikes(blog)}
                            style={styles.button}
                        />
                    </div>
                    <div>{blog.user.name}</div>
                    {blog.user.id === user.id &&
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