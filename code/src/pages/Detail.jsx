import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Nav from "../components/Nav";
import { CATEGORIES } from "../data";
import { BASE_IMAGE_URL } from "../settings/api";
import {
  getPostsFromLocalStorage,
  getUsersFromLocalStorage,
} from "../settings/utils/localStorage";

const Detail = () => {
  const { id } = useParams();
  const postId = parseInt(id);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [singlePost, setSinglePost] = useState([]);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const posts = await getPostsFromLocalStorage();
      const users = await getUsersFromLocalStorage();
      const categories = CATEGORIES;
      if (posts) {
        setPosts(posts);
      }
      if (users) {
        setUsers(users);
      }
      if (categories) {
        setCategories(categories);
      }
      if (posts) {
        getSinglePost(postId, posts);
      }
    })();
  }, []);

  function getSinglePost(pId, posts) {
    let post = {};
    posts.map((v, i) => {
      if (parseInt(v.id) === parseInt(pId)) {
        post = v;
      }
      return post;
    });
    setSinglePost(post);
  }

  return (
    <>
      <Nav isActive={""} />
      <Header isActive={"detail"} />
      <main className="detail">
        <section className="detail__posts">
          {posts.length > 0 && posts != null ? (
            posts.map((post) => {
              return post.id === postId && users.length > 0 && users != null ? (
                users.map((user, userIndex) => {
                  return post.authorId === user.id ? (
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
                            {post.date}
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
                          <p>{post.description}</p>
                        </div>
                      </div>
                      <div className="post__footer">
                        <hr />
                        <div className="post__footer--likes">
                          <span>15</span> likes
                        </div>
                        <hr />
                        <div className="post__footer--readmore"></div>
                      </div>
                    </article>
                  ) : (
                    <div key={userIndex}></div>
                  );
                })
              ) : null
              //  (
                // <div className="detail__posts__error">
                //   <h2>Author detail not found!!!</h2>
                // </div>
              // )
              ;
            })
          ) : (
            <div className="detail__posts__error">
              <h2>Post detail not found!!!</h2>
            </div>
          )}
        </section>

        <aside className="detail__sidebar">
          <div className="detail__sidebar__recentPosts">
            <div className="detail__sidebar__recentPosts__heading">
              <h2>Related Posts</h2>
            </div>
            <div className="detail__sidebar__recentPosts__content">
              {posts.length > 0 && posts != null ? (
                posts
                  .slice(0)
                  .reverse()
                  .map((post, postIndex) => {
                    return parseInt(post.category) ===
                      parseInt(singlePost.category)  ? (
                      <div
                        key={postIndex}
                        className="detail__sidebar__recentPosts__content__item"
                      >
                        <div className="detail__sidebar__recentPosts__content__item__header">
                          <div className="detail__sidebar__recentPosts__content__item__header__img">
                            <Link to={"/detail/" + post.id}>
                              <img
                                src={BASE_IMAGE_URL + post.avatar}
                                alt={post.title}
                              />
                            </Link>
                          </div>
                          <div className="detail__sidebar__recentPosts__content__item__header__title">
                            <Link to={"/detail/" + post.id}>
                              <h3>{post.title}</h3>
                            </Link>
                          </div>
                        </div>
                        <div className="detail__sidebar__recentPosts__content__item__description">
                          <p>{post.description.substring(0, 25) + "..."}</p>
                        </div>
                        <div className="detail__sidebar__recentPosts__content__item__d--readmore">
                          <p>
                            <FontAwesomeIcon icon={["fas", "clock"]} />{" "}
                            {post.date}
                          </p>
                          <Link to={"/detail/" + post.id}> Readmore</Link>
                        </div>
                      </div>
                    ) : (null);
                  })
              ) : (
                <div className="detail__sidebar__recentPosts__content__error">
                  <h2>Related post not found!!!</h2>
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

export default Detail;
