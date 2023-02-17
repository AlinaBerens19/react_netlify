import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { useStoreState, useStoreActions } from 'easy-peasy';
import DataContext from './context/DataContext'
import { format } from 'date-fns'
import api from './api/posts';

const EditPost = () => {
    // const { posts, setPosts } = useContext(DataContext);

    const { id } = useParams();

    const posts = useStoreState(state => state.posts);
    const editTitle = useStoreState(state => state.editTitle);
    const editBody = useStoreState(state => state.editBody);
  
    const editPost = useStoreActions((actions) => actions.editPost);
    const setEditTitle = useStoreActions((actions) => actions.setEditTitle);
    const setEditBody = useStoreActions((actions) => actions.setEditBody);

    const getPostById = useStoreState((state) => state.getPostsById);
    const post = getPostById(id);
  

    useEffect(() => {
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [post, setEditTitle, setEditBody])


    const handleEdit = (id) => {
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const updatedPost = { id, title: editTitle, datetime, body: editBody };
        editPost(updatedPost);
    }

    // const handleEdit = async (id) => {
    //     const dateTime = format(new Date(), 'MMMM dd, yyyy pp');
    //     const editedPost = {id, title: editTitle, datetime: dateTime, body: editBody};
    //     try {
    //       const response = await api.put(`http://localhost:3500/posts/${id}`, editedPost);
    //       const postsList = posts.map(post => post.id === id? response.data : post)
    //       setPosts(postsList);
    //       setEditBody('');
    //       setEditTitle('');
    //     }
    //     catch (err) {
    //       if (err.response) {
    //         // Not in the 200 response range 
    //         console.log(err.response.data);
    //         console.log(err.response.status);
    //         console.log(err.response.headers);
    //       } else {
    //         console.log(`Error: ${err.message}`);
    //       }
    //     }
     
    //   }

    return (
        <main className="NewPost">
            {editTitle &&
                <>
                    <h2>Edit Post</h2>
                    <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="postTitle">Title:</label>
                        <input
                            id="postTitle"
                            type="text"
                            required
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <label htmlFor="postBody">Post:</label>
                        <textarea
                            id="postBody"
                            required
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                        />
                        <button type="button" onClick={() => handleEdit(post.id)}>Submit</button>
                    </form>
                </>
            }
            {!editTitle &&
                <>
                    <h2>Post Not Found</h2>
                    <p>Well, that's disappointing.</p>
                    <p>
                        <Link to='/'>Visit Our Homepage</Link>
                    </p>
                </>
            }
        </main>
    )
}

export default EditPost