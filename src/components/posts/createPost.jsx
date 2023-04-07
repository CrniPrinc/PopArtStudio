import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./createPost.module.css";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  author: yup.string().required("Name for author is required"),
  content: yup.string().required("Content is required"),
});

const CreatePost = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const navigate = useNavigate();

  const handleFormSubmit = (data) => {
    const newPost = {
      id: uuidv4(),
      title: data.title,
      author: data.author,
      content: data.content,
    };

    axios
      .post("http://localhost:3031/posts", newPost)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
        <div className={styles.container}>
          <label htmlFor="title" className={styles.label}>
            Title:
          </label>
          <input
            type="text"
            id="title"
            {...register("title")}
            className={styles.input}
          />
          {errors.title && (
            <span className={styles.error}>{errors.title.message}</span>
          )}
        </div>
        <div className={styles.container}>
          <label htmlFor="author" className={styles.label}>
            Author:
          </label>
          <input
            type="text"
            id="author"
            {...register("author")}
            className={styles.input}
          />
          {errors.author && (
            <span className={styles.error}>{errors.author.message}</span>
          )}
        </div>
        <div className={styles.container}>
          <label htmlFor="content" className={styles.label}>
            Content:
          </label>
          <textarea
            className={styles.input}
            id="content"
            rows={10}
            {...register("content")}
          ></textarea>
          {errors.content && (
            <span className={styles.error}>{errors.content.message}</span>
          )}
        </div>
        <div className={styles.container}>
          <button
            type="submit"
            className={styles.button}
            onClick={() => navigate("/")}
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default CreatePost;
