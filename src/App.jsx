import "./App.css";
import { Routes, Route } from "react-router-dom";
import CreatePost from "./components/posts/createPost";
import SignUpForm from "./components/signUpForm";
import Home from "./components/Home";
import Login from "./components/login/login";
import { Provider } from "react-redux";
import { store } from "./store";
import Layout from "./components/base/layout";

const App = () => {

  const getRoutes = () => {
    return <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-post" element={<CreatePost />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUpForm />} />
    </Routes>
  }

  return (
    <Provider store={store}>
      <Layout childrens={getRoutes()}>{
        }
      </Layout>
    </Provider>
  );
};

export default App;
