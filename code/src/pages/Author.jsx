import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import { POSTS, USERS } from "../data";
import { checkToken } from "../settings/utils/CheckSession";

const Author = () => {
  const { id } = useParams();
  const postId = parseInt(id);

  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      if (await checkToken(navigate, "/signin")) {
        // getUserData();
      }
    })();
  }, [navigate]);

  return (
    <>
      <Nav isActive={""} />
      <main className="detail">
        <section className="detail__posts">
          {POSTS.map((post, postIndex) => {
            return (
              post.id === postId &&
              USERS &&
              USERS.map((user, userIndex) => {
                return post.authorId === user.id ? (
                  <article key={userIndex} className="post">
                    <div className="post__header">
                      <div className="post__header__img">
                        <img src={user.avatar} alt={user.name} />
                      </div>
                      <div className="post__header__nt">
                        <div className="post__header__nt__title">
                          <h2>{post.title}</h2>
                        </div>
                        <div className="card__post__nt__name">
                          <h3>{user.name}</h3>
                        </div>
                      </div>
                      <div className="card__header__dt">
                        <h4>{post.dateTime}</h4>
                      </div>
                    </div>
                    <div className="post__content">
                      <div className="post__content__img">
                        <img src={post.imageUrl} alt={post.title} />
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
                      <div className="post__footer--readmore">
                        {/* <Link to="/detail"> Readmore</Link> */}
                      </div>
                    </div>
                  </article>
                ) : (
                  <div key={userIndex}></div>
                );
              })
            );
          })}
        </section>

        <aside className="detail__sidebar">
          <div className="detail__sidebar__recentPosts">
            <div className="detail__sidebar__recentPosts__heading">
              <h2>Related Posts</h2>
            </div>
            <div className="detail__sidebar__recentPosts__content">
              {POSTS.slice(0)
                .reverse()
                .map((post, postIndex) => {
                  return (
                    <div
                      key={postIndex}
                      className="detail__sidebar__recentPosts__content__item"
                    >
                      <div className="detail__sidebar__recentPosts__content__item__header">
                        <div className="detail__sidebar__recentPosts__content__item__header__img">
                          <Link to={"/detail/" + post.id}>
                            <img src={post.imageUrl} alt={post.title} />
                          </Link>
                        </div>
                        <div className="detail__sidebar__recentPosts__content__item__header__title">
                          <Link to={"/detail/" + post.id}>
                            <h3>{post.title}</h3>
                          </Link>
                        </div>
                      </div>
                      <div className="detail__sidebar__recentPosts__content__item__description">
                        <p>{post.description}</p>
                      </div>
                      <div className="detail__sidebar__recentPosts__content__item__d--readmore">
                        <p>{post.dateTime}</p>
                        <Link to={"/detail/" + post.id}> Readmore</Link>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </aside>
      </main>

      <Footer />
    </>
  );
};

export default Author;
