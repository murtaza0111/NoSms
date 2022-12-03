import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminNav from "../components/Admin/AdminNav";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Nav from "../components/Nav";
import {
  getLoginCredentialsFromLocalStorage,
  getUsersFromLocalStorage,
} from "../settings/utils/localStorage";
import { checkToken } from "../settings/utils/CheckSession";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Dashboard = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({});
  useEffect(() => {
    (async () => {
      if (await checkToken(navigate, "/signin")) {
        navigate("/dashboard", { replace: true });
        getUserData();
      }
    })();
  }, [navigate]);
  const getUserData = async () => {
    const users = await getUsersFromLocalStorage();

    const auth = await getLoginCredentialsFromLocalStorage();

    const user = users.filter((user) => user.email === auth.user);

    setData(user[0]);
  };

  return (
    <>
      <Nav isActive={"dashboard"} />
      <Header isActive={"dashboard"} />
      <main className="dashboard">
        <aside className="dashboard__sidebar">
          <AdminNav isActive={"dashboard"} data={data} />
        </aside>
        <section className="dashboard__main">
          <article className="dashboard__main__poster">
            <div className="dashboard__main__poster__header">
              <h2>
                <FontAwesomeIcon icon={["fas", "signs-post"]} /> Posts
              </h2>
              <span>1</span>
            </div>
            <div className="dashboard__main__poster__footer">
              <Link to="/dashboard/posts">
                <span>Details</span>{" "}
                <FontAwesomeIcon icon={["fas", "long-arrow-right"]} />
              </Link>
            </div>
          </article>
          <article className="dashboard__main__poster">
            <div className="dashboard__main__poster__header">
              <h2>
                <FontAwesomeIcon icon={["fas", "user-friends"]} /> Friends
              </h2>
              <span>1</span>
            </div>
            <div className="dashboard__main__poster__footer">
              <Link to="/dashboard/friends">
                <span>Details</span>{" "}
                <FontAwesomeIcon icon={["fas", "long-arrow-right"]} />
              </Link>
            </div>
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Dashboard;
