import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../components/Admin/AdminHeader";
import AdminNav from "../../components/Admin/AdminNav";
import AdminShowPosts from "../../components/Admin/AdminShowPosts";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import {
  getLoginCredentialsFromLocalStorage,
  getPostsFromLocalStorage,
} from "../../settings/utils/localStorage";
import { checkToken } from "../../settings/utils/CheckSession";

const Posts = () => {
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
    const posts = await getPostsFromLocalStorage();

    const auth = await getLoginCredentialsFromLocalStorage();

    if (posts) {
      const authorPosts = await posts.filter(
        (post) => parseInt(post.authorId) === parseInt(auth.user)
      );
      setData(authorPosts);
    }
  };

  return (
    <>
      <Nav isActive={"dashboard"} />
      <AdminHeader isActive={"posts"} />
      <main className="dashboard">
        <aside className="dashboard__sidebar">
          <AdminNav isActive={"posts"} />
        </aside>
        <section className="dashboard__main">
          <table className="table table-dark  table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Title</th>
                <th scope="col">Category</th>
                <th scope="col">Image</th>
                <th scope="col">Date and Time</th>
                <th scope="col">Description</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((post, index) => {
                  return <AdminShowPosts key={index} data={post} />;
                })
              ) : (
                <tr>
                  <td colSpan={8} >
                    <h3 className="d-flex flex-row justify-content-center align-items-center">No Posts Found</h3>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Posts;
