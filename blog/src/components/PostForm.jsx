import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createPost, fetchPosts, updatePost } from '../api';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchPosts().then(response => {
        const post = response.data.find(p => p.id === parseInt(id));
        if (post) {
          setTitle(post.title);
          setContent(post.content);
        }
      });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = { title, content };

    if (id) {
      updatePost(id, postData).then(() => navigate('/'));
    } else {
      createPost(postData).then(() => navigate('/'));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{id ? 'Edit Post' : 'Create Post'}</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button type="submit">{id ? 'Update' : 'Create'}</button>
    </form>
  );
};

export default PostForm;
