import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const AdminHeader = ({ isActive }) => {
  return (
    <header>
      {isActive === "dashboard" ? (
        <>
          <h1>
            <FontAwesomeIcon icon={["fas", "dashboard"]} /> Dashboard
          </h1>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/dashboard" className="active">
                <FontAwesomeIcon icon={["fas", "dashboard"]} /> Dashboard
              </Link>
            </li>
          </ol>
        </>
      ) : isActive === "profile" ? (
        <>
          <h1>
            <FontAwesomeIcon icon={["fas", "user"]} /> Profile
          </h1>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/dashboard">
                <FontAwesomeIcon icon={["fas", "dashboard"]} /> Dashboard
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/dashboard/profile" className="active">
                <FontAwesomeIcon icon={["fas", "user"]} /> Profile
              </Link>
            </li>
          </ol>
        </>
      ) : isActive === "posts" ? (
        <>
          <h1>
            <FontAwesomeIcon icon={["fas", "signs-post"]} /> Posts
          </h1>
          <br />
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/dashboard">
                <FontAwesomeIcon icon={["fas", "dashboard"]} /> Dashboard
              </Link>
            </li>
            <li className="breadcrumb-item" aria-current="page">
                <Link to="/dashboard/posts" className="active">
                <FontAwesomeIcon icon={["fas", "signs-post"]} /> Posts
              </Link>
            </li>
          </ol>
        </>
      ) : isActive === "friends" ? (
        <>
          <h1>
            <FontAwesomeIcon icon={["fas", "user-friends"]} /> 
          </h1>
          <br />
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/dashboard">
                <FontAwesomeIcon icon={["fas", "dashboard"]} /> Dashboard
              </Link>
            </li>
            <li className="breadcrumb-item" aria-current="page">
              <Link to="/dashboard/friends" className="active">
                <FontAwesomeIcon icon={["fas", "user-friends"]} /> Friends
              </Link>
            </li>
          </ol>
        </>
      ) : isActive === "a-post" ? (
        <>
          <h1>
            <FontAwesomeIcon icon={["fas", "add"]} /> Add Post
          </h1>
          <br />
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/dashboard">
                <FontAwesomeIcon icon={["fas", "dashboard"]} /> Dashboard
              </Link>
            </li>
            <li className="breadcrumb-item" aria-current="page">
              <Link to="/dashboard/a-posts" className="active">
                <FontAwesomeIcon icon={["fas", "add"]} /> Add Post
              </Link>
            </li>
          </ol>
        </>
      ) : isActive === "e-post" ? (
        <>
          <h1>
            <FontAwesomeIcon icon={["fas", "file-edit"]} /> Edit Post
          </h1>
          <br />
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/dashboard">
                <FontAwesomeIcon icon={["fas", "dashboard"]} /> Dashboard
              </Link>
            </li>
            <li className="breadcrumb-item" aria-current="page">
              <Link to="/dashboard/e-posts" className="active">
                <FontAwesomeIcon icon={["fas", "file-edit"]} /> Edit Post
              </Link>
            </li>
          </ol>
        </>
      ) : null}
    </header>
  );
};

export default AdminHeader;
