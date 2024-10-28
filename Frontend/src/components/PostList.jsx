import React from "react";

const PostList = ({ posts, onEdit, onDelete }) => (
  <div className="space-y-4">
    {posts.map((post) => (
      <div key={post._id} className="border p-4 rounded bg-gray-100">
        <h3 className="text-xl font-semibold">{post.title}</h3>
        <p>{post.content}</p>
        <div className="flex gap-4">
          <button onClick={() => onEdit(post)} className="text-blue-600">
            Edit
          </button>
          <button onClick={() => onDelete(post._id)} className="text-red-600">
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
);

export default PostList;
