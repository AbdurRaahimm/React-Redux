import React from 'react'
import { useAddPostMutation, useUpdatePostMutation } from '../redux/apiSlice';

export default function AddPost({ editingPost, setEditingPost }) {
    const [addPost] = useAddPostMutation();
    const [updatePost] = useUpdatePostMutation();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const postData = Object.fromEntries(formData);

        try {
            if (editingPost) {
                // If in edit mode, update the post
                await updatePost({ ...editingPost, ...postData }).unwrap();
            } else {
                // If adding a new post, create a new one
                await addPost({ ...postData, id: Date.now().toString() }).unwrap();
            }
            // Reset form and state
            e.target.reset();
            setEditingPost(null);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>{editingPost ? 'Edit Post' : 'Create Post'}</h1>
                <button popovertarget="addpost" className='btn btn-primary text-capitalize ' data-bs-dismiss="popover">&times;</button>
            </div>
            <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        name='title'
                        className="form-control"
                        id="title"
                        required
                        defaultValue={editingPost ? editingPost.title : ''}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="desc" className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        name='desc'
                        id="desc"
                        rows="3"
                        required
                        defaultValue={editingPost ? editingPost.desc : ''}
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                    {editingPost ? 'Update' : 'Submit'}
                </button>
            </form>
        </>
    )
}


