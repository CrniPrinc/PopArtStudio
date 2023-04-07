import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./signUpForm.module.css";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedIn } from "../slices/userSlice";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords do not match")
    .required(),
});

const SignUpForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  let currentUser = useSelector((state) => state.currentUser);

  const dispatch = useDispatch();

  const registerUser = (username, password) => {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    let newUser = { username, password };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
  };

  const handleFormSubmit = (data) => {
    registerUser(data.username, data.password);

    dispatch(
      setIsLoggedIn({
        isLoggedIn: true,
        user: { username: data.username },
      })
    );
  };

  return (
    <>
      {isLoggedIn ? (
        <div>
          <h2>{currentUser.username}</h2>
          <button
            className={styles.button}
            onClick={() => {
              dispatch(setIsLoggedIn(false));
              localStorage.setItem("currentUser", false);
              navigate("/");
            }}
          >
            Log out
          </button>
        </div>
      ) : (
        <>
          <h2>Sign up</h2>
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className={styles.form}
          >
            <div className={styles.container}>
              <div className={styles.container}>
                <label htmlFor="username" className={styles.label}>
                  Username:
                </label>
                <input
                  type="text"
                  id="username"
                  className={styles.input}
                  {...register("username")}
                />
                {errors.username && (
                  <span className={styles.error}>
                    {errors.username.message}
                  </span>
                )}
              </div>
              <div className={styles.container}>
                <label htmlFor="email" className={styles.label}>
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  className={styles.input}
                  {...register("email")}
                />
                {errors.email && (
                  <span className={styles.error}>{errors.email.message}</span>
                )}
              </div>
              <div className={styles.container}>
                <label htmlFor="password" className={styles.label}>
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  className={styles.input}
                  {...register("password")}
                />
                {errors.password && (
                  <span className={styles.error}>
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className={styles.container}>
                <label htmlFor="confirmPassword" className={styles.label}>
                  Confirm Password:
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className={styles.input}
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <span className={styles.error}>
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
              <div className={styles.container}>
                <button className={styles.button}>Sign up</button>
              </div>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default SignUpForm;
