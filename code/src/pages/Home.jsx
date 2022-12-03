import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Nav from "../components/Nav";
import { BASE_IMAGE_URL } from "../settings/api";
import {
  getPostsFromLocalStorage,
  getUsersFromLocalStorage,
} from "../settings/utils/localStorage";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const posts = await getPostsFromLocalStorage();
      const users = await getUsersFromLocalStorage();
      if (posts != null) {
        setPosts(posts);
      }
      if (users != null) {
        setUsers(users);
      }
    })();
  }, []);

  return (
    <>
      <Nav isActive={"home"} />
      <Header isActive={"home"} />
      <main className="home">
        <section className="home__posts">
          {posts.length > 0 ? (
            posts.map((post, postIndex) => {
              return users.length && users !== null
                ? users.map((user, userIndex) => {
                    if (post.authorId === user.id) {
                      return (
                        <article key={userIndex} className="post">
                          <div className="post__header">
                            <div className="post__header__img">
                              <img
                                src={BASE_IMAGE_URL + user.avatar}
                                alt={user.firstName + " " + user.lastName}
                              />
                            </div>
                            <div className="post__header__nt">
                              <div className="post__header__nt__title">
                                <h2>{post.title}</h2>
                              </div>
                              <div className="card__post__nt__name">
                                <h3>{user.firstName + " " + user.lastName}</h3>
                              </div>
                            </div>
                            <div className="card__header__dt">
                              <h4>
                                <FontAwesomeIcon icon={["fas", "clock"]} />{" "}
                                {" " + post.date}
                              </h4>
                            </div>
                          </div>
                          <div className="post__content">
                            <div className="post__content__img">
                              <img
                                src={BASE_IMAGE_URL + post.avatar}
                                alt={post.title}
                              />
                            </div>
                            <div className="post__content__description">
                              <p>{post.description.substring(0, 50) + "..."}</p>
                            </div>
                          </div>
                          <div className="post__footer">
                            <hr />
                            <div className="post__footer--likes">
                              <span>15</span> likes
                            </div>
                            <hr />
                            <div className="post__footer--readmore">
                              <Link to={"/detail/" + post.id}> Readmore</Link>
                            </div>
                          </div>
                        </article>
                      );
                    } else {
                      return <div key={userIndex}></div>;
                    }
                  })
                : null;
            })
          ) : (
            <div className="home__posts__error">
              <h2>Posts not found!!!</h2>
            </div>
          )}
        </section>
        <aside className="home__sidebar">
          <div className="home__sidebar__recentPosts">
            <div className="home__sidebar__recentPosts__heading">
              <h2>Recent Posts</h2>
            </div>
            <div className="home__sidebar__recentPosts__content">
              {posts.length > 0 && posts !== null ? (
                posts
                  .slice(0)
                  .reverse()
                  .map((post, postIndex) => {
                    return postIndex <= 2 ? (
                      <div
                        key={postIndex}
                        className="home__sidebar__recentPosts__content__item"
                      >
                        <div className="home__sidebar__recentPosts__content__item__img">
                          <Link to={"/detail/" + post.id}>
                            <img
                              src={BASE_IMAGE_URL + post.avatar}
                              alt={post.title}
                            />
                          </Link>
                        </div>
                        <div className="home__sidebar__recentPosts__content__item__title">
                          <Link to={"/detail/" + post.id}>
                            <h3>{post.title}</h3>
                          </Link>
                        </div>

                        <div className="home__sidebar__recentPosts__content__item__dt">
                          <h4>
                            {" "}
                            <FontAwesomeIcon icon={["fas", "clock"]} />{" "}
                            {post.date}
                          </h4>
                        </div>
                      </div>
                    ) : null;
                  })
              ) : (
                <div className="home__sidebar__error">
                  <h2>Recent posts not found!!!</h2>
                </div>
              )}
            </div>
          </div>
          <div className="home__sidebar__recentPosts">
            <div className="home__sidebar__recentPosts__heading">
              <h2>Popular Posts</h2>
            </div>
            <div className="home__sidebar__recentPosts__content">
              {posts.length > 0 && posts !== null ? (
                posts.map((post, postIndex) => {
                  if (postIndex < 3) {
                    return (
                      <div
                        key={postIndex}
                        className="home__sidebar__recentPosts__content__item"
                      >
                        <div className="home__sidebar__recentPosts__content__item__img">
                          <Link to={"/detail/" + post.id}>
                            <img
                              src={BASE_IMAGE_URL + post.avatar}
                              alt={post.title}
                            />
                          </Link>
                        </div>
                        <div className="home__sidebar__recentPosts__content__item__title">
                          <Link to={"/detail/" + post.id}>
                            <h3>{post.title}</h3>
                          </Link>
                        </div>

                        <div className="home__sidebar__recentPosts__content__item__dt">
                          <h4>
                            {" "}
                            <FontAwesomeIcon icon={["fas", "clock"]} />{" "}
                            {post.date}
                          </h4>
                        </div>
                      </div>
                    );
                  }
                })
              ) : (
                <div className="home__sidebar__error">
                  <h2>Popular posts not found!!!</h2>
                </div>
              )}
            </div>
          </div>
        </aside>
      </main>

      <Footer />
    </>
  );
};

export default Home;
