import Post from "./Post"
import { useStoreState } from 'easy-peasy';

const Feed = ({posts}) => {
  return (
    <>
      {posts.map(post => (
        <Post key={post.id} post={post}/>
      ))}
    </>
  )
}

export default Feed
