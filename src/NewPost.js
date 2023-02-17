import React from 'react'
import { useState, useContext } from 'react'
import DataContext from './context/DataContext'
import { format } from 'date-fns'
import { useStoreState, useStoreActions } from 'easy-peasy';

const NewPost = () => {
  // const { posts, setPosts } = useContext(DataContext)
  // const [postTitle, setPostTitle] = useState('');
  // const [postBody, setPostBody] = useState('');

  const posts = useStoreState(state => state.posts);
  const postTitle = useStoreState(state => state.postTitle);
  const postBody = useStoreState(state => state.postBody);

  const savePost = useStoreActions((actions) => actions.savePost);
  const setPostTitle = useStoreActions((actions) => actions.setPostTitle);
  const setPostBody = useStoreActions((actions) => actions.setPostBody);

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const dateTime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = {id, title: postTitle, datetime: dateTime, body: postBody};
    savePost(newPost);

  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
  //   const dateTime = format(new Date(), 'MMMM dd, yyyy pp');
  //   const newPost = {id, title: postTitle, datetime: dateTime, body: postBody};
  //   try {
  //     const response = await api.post('http://localhost:3500/posts', newPost);
  //     setPosts([...posts, response.data]);
  //     setPostTitle('');
  //     setPostBody('');
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
    <main className='NewPost'>
      <form className='newPostForm' onSubmit={handleSubmit}>
        <label htmlFor='postTitle'>Title:</label>
        <input
          type='text'
          id='postTitle'
          // Chech about!!!
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor='postBody'>Post:</label>
        <textarea
          id='postBody'
          required
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />
        <button type='submit'>Submit</button>
      </form>  
    </main>
  )
}

export default NewPost
