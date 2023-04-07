import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsLoggedIn } from "../../slices/userSlice";
import styles from "./header.module.css";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.buttonsLeft}>
          <button className={styles.button} onClick={() => navigate("/")}>
            Home
          </button>
          {isLoggedIn && (
            <button
              className={styles.button}
              onClick={() => navigate("/create-post")}
            >
              Create post
            </button>
          )}
        </div>
        <div className={styles.buttonsRight}>
          {!isLoggedIn && (
            <button
              className={styles.button}
              onClick={() => {
                navigate("/login");
              }}
            >
              Log in
            </button>
          )}
          {!isLoggedIn ? (
            <button
              className={styles.button}
              onClick={() => navigate("/signup")}
            >
              Sign up
            </button>
          ) : (
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
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
