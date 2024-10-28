import React, { useState } from "react";

const PostForm = ({ onSubmit, initialData = { title: "", content: "" } }) => {
  const [post, setPost] = useState(initialData);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(post);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-4 bg-white shadow-md rounded"
    >
      <input
        name="title"
        placeholder="Title"
        value={post.title}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <textarea
        name="content"
        placeholder="Content"
        value={post.content}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default PostForm;
