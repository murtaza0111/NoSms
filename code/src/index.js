import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./../node_modules/bootstrap/dist/js/bootstrap.js";
import "./sass/styles.scss";
import App from "./App";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Detail from "./pages/Detail";
import Profile from "./pages/Admin/Profile";
import Posts from "./pages/Admin/Posts";
import Friends from "./pages/Admin/Friends";
import EditPost from "./pages/Admin/EditPost";
import AddPost from "./pages/Admin/AddPost";
import Connect from "./pages/Connect";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/pymk" element={<Connect />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/profile" element={<Profile />} />
        <Route path="/dashboard/posts" element={<Posts />} />
        <Route path="/dashboard/a-post" element={<AddPost />} />
        <Route path="/dashboard/e-post/:id" element={<EditPost />} />
        <Route path="/dashboard/friends" element={<Friends />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </App>
  </Router>
);
