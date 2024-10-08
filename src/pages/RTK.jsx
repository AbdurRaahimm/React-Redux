import { useState } from 'react';
import Layout from '@/components/layout';
import { useDeletePostMutation, useFetchPostsQuery } from '../redux/apiSlice';
import timeAgo from '../utilis/timeAgo';
import AddPost from '../components/AddPost';

export default function RTK() {
    const { data: posts, isLoading, isError, error } = useFetchPostsQuery();
    const [deletePost] = useDeletePostMutation();


    // State to track whether we're editing a post or adding a new one
    const [editingPost, setEditingPost] = useState(null);

    if (isLoading) return <h2>Loading...</h2>
    if (isError) return <h2>Error: {error.data}</h2>

    const handleDeletePost = async (id) => {
        if (confirm('Are you sure?')) {
            await deletePost(id);
        }
    };

    const handleEditPost = (post) => {
        // Set the post to be edited and prefill the form
        setEditingPost(post);
    };



    return (
        <Layout>
            <div className="container py-4 d-flex justify-content-between align-items-center">
                <h2>Posts</h2>
                <button popovertarget="addpost" className='btn btn-primary text-capitalize'>
                    {editingPost ? 'Edit Post' : 'Add Post'}
                </button>
            </div>

            <div className='d-flex flex-wrap justify-content-center align-content-center'>
                {posts && posts.map(post => (
                    <div key={post.id} className='card m-2' style={{ width: '18rem' }}>
                        <div className='card-body'>
                            <h5 className='card-title'>{post.title}</h5>
                            <p className='card-text text-justify'>{post.desc.slice(0, 35)}</p>
                            <p className="card-text">
                                <small className="text-muted">Last updated {timeAgo(post.id)} ago</small>
                            </p>
                        </div>
                        <div className="card-footer">
                            <button onClick={() => handleEditPost(post)} popovertarget="updatepost" className='btn btn-primary text-capitalize m-4'>
                                Edit
                            </button>
                            <button onClick={() => handleDeletePost(post.id)} className='btn btn-danger'>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div id='addpost' className="py-4 px-5 rounded border-1" popover="true">
                <AddPost editingPost={editingPost} setEditingPost={setEditingPost} />
            </div>
        </Layout>
    );
}
