import React, {useState} from 'react';

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

const Blog = ({blog}) => {
    const [showDetails, setShowDetails] = useState(false);

    console.log(blog);

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
                            onClick={() => console.log('like')}
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