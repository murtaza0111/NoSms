import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Nav from "../components/Nav";
import {
  addFriendsToLocalStorage,
  getFriendsFromLocalStorage,
  getLoginCredentialsFromLocalStorage,
  getPostsFromLocalStorage,
  getUsersFromLocalStorage,
} from "../settings/utils/localStorage";
import { checkToken } from "../settings/utils/CheckSession";
import { BASE_IMAGE_URL } from "../settings/api";

const Connect = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [auth, setAuth] = useState([]);
  const [authorPosts, setAuthorPosts] = useState([]);
  const [friendList, setfriendList] = useState([]);

  useEffect(() => {
    (async () => {
      if (await checkToken(navigate, "/signin")) {
        setfriendList(await getFriendsFromLocalStorage());
        getUserData();
      }
    })();
  }, [navigate]);

  useEffect(() => {
    const addToCart = () => {
      const items = document.getElementsByClassName("friendsBtn");
      if (items) {
        toggleFriendsList(
          "friendsBtn",
          `data-friend`,
          toggleUserFriends,
          false
        );
      } else {
        console.log("Nothing Found");
      }
    };
    addToCart();
  });
  const getUserData = async () => {
    const users = await getUsersFromLocalStorage();
    const posts = await getPostsFromLocalStorage();
    const auth = await getLoginCredentialsFromLocalStorage();
    setAuth(auth);
    const people = await users.filter(
      (user) => parseInt(user.id) !== parseInt(auth.user)
    );
    const aps = [];

    if (posts && users) {
      users.map((user) => {
        return posts.map((post) => {
          return parseInt(user.id) === parseInt(post.authorId)
            ? aps.push({
                postId: post.id,
                postTitle: post.title,
                authorId: user.id,
              })
            : null;
        });
      });

      setAuthorPosts(aps);
    }
    if (people != null) {
      setData(people);
    }
  };

  const updateFriendStatus = async (e, status) => {};

  return (
    <>
      <Nav isActive={"people"} />
      <Header isActive={"people"} />
      <main className="people">
        <section className="people__main">
          {data.length > 0 ? (
            data
              .slice(0)
              .reverse()
              .map((user, userIndex) => {
                return (
                  <article key={userIndex} className="people__main__post">
                    <div className="people__main__post__header">
                      <div className="people__main__post__header__img">
                        {user.avatar ? (
                          <img
                            src={BASE_IMAGE_URL + user.avatar}
                            alt={user.firstName}
                          />
                        ) : (
                          <img
                            src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
                            alt=""
                          />
                        )}
                      </div>
                      <div className="people__main__post__header__title">
                        <h2>{user.firstName + " " + user.lastName}</h2>
                      </div>
                    </div>
                    <div className="people__main__post__content">
                      <div className="people__main__post__content__description">
                        <h3>Author of</h3>
                        {authorPosts &&
                          authorPosts.map((v, i) => {
                            return parseInt(v.authorId) ===
                              parseInt(user.id) ? (
                              <Link to={"/detail/" + v.postId} key={i}>
                                <p>{v.postTitle}</p>
                              </Link>
                            ) : null;
                          })}
                      </div>
                    </div>
                    <div className="people__main__post__footer">
                      <div className="people__main__post__footer__d--readmore">
                        {friendList != null
                          ? (function () {
                              let found = "default";
                              friendList.map((w) => {
                                if (
                                  parseInt(w.senderId) ===
                                    parseInt(auth.user) &&
                                  parseInt(w.receiverId) === parseInt(user.id)
                                ) {
                                  if (w.status === "pending") {
                                    found = "pending";
                                  } else if (w.status === "accepted") {
                                    found = "accepted";
                                  } else if (w.status === "rejected") {
                                    found = "rejected";
                                  }
                                }

                                if (
                                  parseInt(w.receiverId) ===
                                    parseInt(auth.user) &&
                                  parseInt(w.senderId) === parseInt(user.id)
                                ) {
                                  if (w.status === "pending") {
                                    found = "r-pending";
                                    console.log(w.status);
                                  } else if (w.status === "accepted") {
                                    console.log(w.status);
                                    found = "r-accepted";
                                  } else if (w.status === "rejected") {
                                    found = "r-rejected";
                                    console.log(w.status);
                                  }
                                  console.log(w.status);
                                }

                                return found;
                              });

                              return found === "pending" ? (
                                <button
                                  className="friendsBtn"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    updateFriendStatus(e, user, "cancle");
                                  }}
                                  data-friend={user.id}
                                >
                                  Cancel Request
                                </button>
                              ) : found === "accepted" ? (
                                <p>
                                  You are already friends. 
                                  Go to friends secton in your dashboard if you want to be friends any more :(
                                </p>
                              ) : found === "r-pending" ? (
                                <p>
                                  You have already received friends request. Go
                                  to friends secton in your dashboard to accept
                                  or reject the request.
                                </p>
                              ) : found === "r-accepted" ? (
                                <>
                                  <p>
                                    You are friends go to friends secton in your
                                    dashboard if you want to Unfriend
                                  </p>
                                </>
                              ) : found === "default" ? (
                                <button
                                  className="friendsBtn"
                                  data-friend={user.id}
                                >
                                  Add Friend
                                </button>
                              ) : null;
                            })()
                          : null}
                      </div>
                    </div>
                  </article>
                );
              })
          ) : (
            <div className="people__main__error">
              <h2>Other Users Not found!!!</h2>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Connect;

function toggleFriendsList(itemClass, dataKey, toggleItem, callBackToMain) {
  var friendsBtn = document.getElementsByClassName(itemClass);

  for (let i = 0; i < friendsBtn.length; i++) {
    friendsBtn[i].addEventListener("click", function () {
      toggleItem(this.getAttribute(dataKey), callBackToMain, friendsBtn[i]);
    });
  }
}

async function toggleUserFriends(product_id, callBackToMain, iconElement) {
  let isAdded = await addFriend(product_id, "pending");
  if (!isAdded) {
    // console.log("Friend request sent", "green");
  } else {
    // console.log("Friend request already sent", "red");
  }
  if (callBackToMain) {
  } else {
    const btnText = iconElement.innerHTML;

    if (btnText === "Add Friend") {
      iconElement.innerHTML = "Cancel Request";
    } else if (btnText === "Cancel Request") {
      iconElement.innerHTML = "Add Friend";
    }
  }
}

const addFriend = async (receiverId, status = "pending") => {
  const auth = await getLoginCredentialsFromLocalStorage();
  let friends = await getFriendsFromLocalStorage();
  let isPresent1 = false;
  let isPresent2 = false;
  let isPresent = false;
  let singleFriendRequest = {};
  let friendRequests = [];

  if (friends != null && friends.length) {
    isPresent1 = friends.some(
      (v) =>
        parseInt(v.receiverId) === parseInt(receiverId) &&
        parseInt(v.senderId) === parseInt(auth.user) &&
        v.status === "pending"
    );
    isPresent2 = friends.some(
      (v) =>
        parseInt(v.receiverId) === parseInt(auth.user) &&
        parseInt(v.senderId) === parseInt(receiverId) &&
        v.status === "pending"
    );
    if (isPresent1 || isPresent2) {
      isPresent = true;
      if (isPresent1) {
        friends = friends.filter(
          (v) => parseInt(receiverId) !== parseInt(v.receiverId)
        );
      }
      if (isPresent2) {
        friendRequests = friends.filter(
          (v) => parseInt(receiverId) !== parseInt(v.senderId)
        );

        console.log(friendRequests);
      }
    } else {
      singleFriendRequest = {
        id: friends.length + 1,
        senderId: auth.user,
        receiverId,
        status,
      };
      friends.push(singleFriendRequest);
    }
  } else {
    friends = [];
    singleFriendRequest = {
      id: friends + 1,
      senderId: auth.user,
      receiverId,
      status: "pending",
    };
    friends.push(singleFriendRequest);
  }

  // Sort the numbers in descending order:
  friends.sort(function (a, b) {
    return a.id - b.id;
  });
  addFriendsToLocalStorage(friends);
  return isPresent;
};
