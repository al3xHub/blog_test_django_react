import axios from 'axios';

const API_URL = 'http://localhost:8000/api/posts/';

export const fetchPosts = () => axios.get(API_URL);
export const createPost = async (postData) => {
    try {
      const response = await axios.post('http://localhost:8000/api/posts/', postData);
      console.log(response.data);  // Check if the post is created and returned
    } catch (error) {
      console.error('Error creating post:', error.response ? error.response.data : error.message);
    }
  };
export const updatePost = (id, post) => axios.put(`${API_URL}${id}/`, post);
export const deletePost = (id) => axios.delete(`${API_URL}${id}/`);
