import React, { useEffect, useState } from "react";
import { fetchPosts, createPost, updatePost, deletePost } from "../api/api";
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const userRole = localStorage.getItem("role"); // Assume role is stored in local storage after login

  useEffect(() => {
    const getPosts = async () => {
      const { data } = await fetchPosts();
      setPosts(data);
    };
    getPosts();
  }, []);

  const handleCreate = async (post) => {
    const { data } = await createPost(post);
    setPosts([...posts, data]);
  };

  const handleUpdate = async (updatedPost) => {
    const { data } = await updatePost(editingPost._id, updatedPost);
    setPosts(posts.map((post) => (post._id === data._id ? data : post)));
    setEditingPost(null);
  };

  const handleDelete = async (id) => {
    await deletePost(id);
    setPosts(posts.filter((post) => post._id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Dashboard</h2>

      {userRole !== "User" && (
        <div className="mb-6">
          <h3 className="text-xl mb-2">
            {editingPost ? "Edit Post" : "Create Post"}
          </h3>
          <PostForm
            onSubmit={editingPost ? handleUpdate : handleCreate}
            initialData={editingPost || {}}
          />
        </div>
      )}

      <PostList
        posts={posts}
        onEdit={userRole !== "User" ? setEditingPost : null}
        onDelete={userRole !== "User" ? handleDelete : null}
      />
    </div>
  );
};

export default Dashboard;
