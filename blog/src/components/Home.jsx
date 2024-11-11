import React, { useEffect, useState } from 'react';
import { fetchPosts, deletePost } from '../api';
import { Link } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts().then(response => {
      setPosts(response.data);
    });
  }, []);

  const handleDelete = (id) => {
    deletePost(id).then(() => {
      setPosts(posts.filter(post => post.id !== id));
    });
  };

  return (
    <div>
      <h1>Posts</h1>
      <Link to="/create">Create New Post</Link>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
            <Link to={`/edit/${post.id}`}>Edit</Link>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
