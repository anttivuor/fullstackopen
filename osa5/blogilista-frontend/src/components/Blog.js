import React, {useState} from 'react';

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

const Blog = ({blog, updateBlogLikes}) => {
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
                </>
            }
        </div>
    );
};

export default Blog;