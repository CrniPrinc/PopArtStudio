import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsLoggedIn } from "../../slices/userSlice";
import styles from "./login.module.css";

function Login() {
  const { register, handleSubmit } = useForm();
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const loginUser = (username, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (!user) {
      console.error("Ne postoji");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));
    dispatch(setIsLoggedIn(true));
  };

  const onSubmit = (data) => {
    loginUser(data.username, data.password);
    navigateTo("/");
  };

  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.container}>
          <label htmlFor="username" className={styles.label}>
            Username:
          </label>
          <input
            className={styles.input}
            type="text"
            id="username"
            {...register("username", { required: true })}
          />
        </div>
        <div className={styles.container}>
          <label htmlFor="password" className={styles.label}>
            Password:
          </label>
          <input
            className={styles.input}
            type="password"
            id="password"
            {...register("password", { required: true })}
          />
        </div>
        <div className={styles.container}>
          <button className={styles.button} type="submit">
            Log in
          </button>
        </div>
      </form>
    </div>
  );
}
export default Login;
