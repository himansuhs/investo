import React, { useEffect, useState } from "react";
import { fetchPosts } from "../api/api";
import PostList from "../components/PostList";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const { data } = await fetchPosts();
      setPosts(data);
    };
    getPosts();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">All Posts</h2>
      <PostList posts={posts} />
    </div>
  );
};

export default Home;
