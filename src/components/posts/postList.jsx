import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3031/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [posts]);

  return (
    <div>
      <h2>All Posts</h2>
      {posts.length === 0 ? (
        <h4>There are no posts yet be the first one to post something</h4>
      ) : (
        posts?.map((post) => (
          <div key={post?.id}>
            <h3>
              <Link to={`/post/${post?.id}`}>{post?.title}</Link>
            </h3>
            <p>{post?.author}</p>
            <p>{post?.content}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;
