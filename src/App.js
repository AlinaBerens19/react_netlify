import Header from './Header.js'
import Footer from './Footer.js'
import Home from './Home.js'
import Nav from './Nav.js'
import NewPost from './NewPost.js'
import About from './About.js'
import Missing from './Missing.js'
import PostPage from './PostPage.js'
import EditPost from './EditPost.js'
import { Route, Routes } from "react-router-dom"
// import { DataProvider } from './context/DataContext.js'
import useAxiosFetch from './hooks/useAxiosFetch.js'
import { useEffect } from 'react';
import { useStoreActions } from 'easy-peasy';

function App() {
  const setPosts = useStoreActions(actions => actions.setPosts);
  const {data, fetchError, isLoading} = useAxiosFetch('http://localhost:3500/posts');
  
  useEffect(() => {
    setPosts(data);
  }, [data, setPosts])

  return (
    <div className="App">
      <Header title="React JS Blog" />
      {/* <DataProvider> */}
      <Nav />
      <Routes>
        <Route exact path="/" element={
          <Home
            isLoading={isLoading}
            fetchError={fetchError}
          />
        } />
        <Route exact path="/post" element={<NewPost />} />
        <Route exact path="/edit/:id" element={<EditPost />} />
        <Route exact path="/post/:id" element={<PostPage />} />
        <Route exact path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
      {/* </DataProvider> */}
    </div>
  );
}

export default App;
