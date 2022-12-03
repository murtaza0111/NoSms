import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getLoginCredentialsFromLocalStorage,
  getUsersFromLocalStorage,
} from "../../settings/utils/localStorage";
import { checkToken } from "../../settings/utils/CheckSession";
import { BASE_IMAGE_URL, DEFAULT_AVATAR } from "../../settings/api";

const AdminNav = ({ isActive }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  useEffect(() => {
    (async () => {
      if (await checkToken(navigate, "/signin")) {
        getUserData();
      }
    })();
  }, [navigate]);
  const getUserData = async () => {
    const users = await getUsersFromLocalStorage();

    const auth = await getLoginCredentialsFromLocalStorage();

    const user = users.filter(
      (user) => parseInt(user.id) === parseInt(auth.user)
    );

    setData(user[0]);
  };

  return (
    <div className="dashboard__sidebar__menu">
      <div className="dashboard__sidebar__menu__header">
        <div className="dashboard__sidebar__menu__header__img">
          {Object.keys(data).length > 0 && data != null ? (
            <img src={BASE_IMAGE_URL + data.avatar} alt={data.firstName} />
          ) : (
            <img src={DEFAULT_AVATAR} alt="Default Avatar" />
          )}
        </div>
        <div className="dashboard__sidebar__menu__header__name">
          {Object.keys(data).length > 0 && data != null ? (
            <h2>{data.firstName + " " + data.lastName}</h2>
          ) : (
            <h2>User</h2>
          )}
        </div>
      </div>
      <div className="dashboard__sidebar__menu__content">
        <Link
          to="/dashboard/profile"
          className={isActive === "profile" ? "active" : null}
        >
          <FontAwesomeIcon icon={["fas", "user"]} /> <span>Profile</span>
        </Link>
        <Link
          to="/dashboard/friends"
          className={isActive === "friends" ? "active" : null}
        >
          <FontAwesomeIcon icon={["fas", "user-friends"]} />
          <span>Friends</span>
        </Link>

        <Link
          to="/dashboard/posts"
          className={isActive === "posts" ? "active" : null}
        >
          <FontAwesomeIcon icon={["fas", "signs-post"]} />{" "}
          <span>All Posts</span>
        </Link>
        <Link
          to="/dashboard/a-post"
          className={isActive === "a-post" ? "active" : null}
        >
          <FontAwesomeIcon icon={["fas", "add"]} />
          <span>Add Post</span>
        </Link>
      </div>
    </div>
  );
};

export default AdminNav;
