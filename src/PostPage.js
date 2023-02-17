import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useContext } from 'react'
import DataContext from './context/DataContext'
import api from './api/posts';
import { useStoreState, useStoreActions } from 'easy-peasy';

const PostPage = () => {

  // const { posts, setPosts } = useContext(DataContext)
  const { id } = useParams();
  const deletePost = useStoreActions((actions) => actions.deletePost);
  const getPostById = useStoreState((state) => state.getPostsById);
  const post = getPostById(id);
  

  const handleDelete = (id) => {
    deletePost(id);
  }

  // const handleDelete = async (id) => {
  //   try {
  //     await api.delete(`http://localhost:3500/posts/${id}`);
  //     const postsList = posts.filter(post => post.id !== id);
  //     setPosts(postsList);
  //   }
  //   catch (err) {
  //     if (err.response) {
  //       // Not in the 200 response range 
  //       console.log(err.response.data);
  //       console.log(err.response.status);
  //       console.log(err.response.headers);
  //     } else {
  //       console.log(`Error: ${err.message}`);
  //     }
  //   }
  // } 

  return (
    <main className='PostPage'>
      <article className='post'>
        {post &&
          <>
          <h2>{post.title}</h2>
          <p className="postDate">{post.datetime}</p>
          <p className="postBody">{post.body}</p>
          <Link to={`/edit/${post.id}`}><button className="editButton">Edit Post</button></Link>
          <button className="deleteButton" onClick={() => handleDelete(post.id)}>
              Delete Post
          </button>
      </>
        }
        {!post &&
          <>
          <h2>Post not found</h2>
          <p>Well, that's dissapointing</p>
          <p>
            <Link to='/'>Visit Our Homepage</Link>
          </p>
          </>
        }
      </article>  
    </main>
  )
}

export default PostPage
