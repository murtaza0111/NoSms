import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../components/Admin/AdminHeader";
import AdminNav from "../../components/Admin/AdminNav";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import {
  addFriendsToLocalStorage,
  getFriendsFromLocalStorage,
  getLoginCredentialsFromLocalStorage,
  getUsersFromLocalStorage,
} from "../../settings/utils/localStorage";
import { checkToken } from "../../settings/utils/CheckSession";
import { BASE_IMAGE_URL, DEFAULT_AVATAR } from "../../settings/api";

const Friends = () => {
  const navigate = useNavigate();

  const [filteredFriendList, setFilteredFriendList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [authUser, setAuthUser] = useState();
  useEffect(() => {
    (async () => {
      if (await checkToken(navigate, "/signin")) {
        const friends = await getFriendsFromLocalStorage();
        if (friends) {
          await getFilteredFriendsList();
        }
      }
    })();
  }, [navigate]);

  const getFilteredFriendsList = async () => {
    const friends = await getFriendsFromLocalStorage();
    const auth = await getLoginCredentialsFromLocalStorage();
    setAuthUser(auth);
    let filteredList = [];
    let filteredFriendList = [];
    // const users = await getUsersFromLocalStorage();

    const isPresent1 = friends.some(
      (friend) =>
        (parseInt(friend.receiverId) === parseInt(auth.user) &&
          friend.status === "pending") ||
        friend.status === "rejected" ||
        friend.status === "accepted"
    );
    const isPresent2 = friends.some(
      (friend) =>
        (parseInt(friend.senderId) === parseInt(auth.user) &&
          friend.status === "pending") ||
        friend.status === "rejected" ||
        friend.status === "accepted"
    );
    if (isPresent1) {
      filteredList = friends.filter(
        (friend) => parseInt(friend.receiverId) === parseInt(auth.user)
      );
      filteredFriendList.push(filteredList);
    }
    if (isPresent2) {
      filteredList = friends.filter(
        (friend) => parseInt(friend.senderId) === parseInt(auth.user)
      );
      filteredFriendList.push(filteredList);
    }

    setFilteredFriendList(filteredFriendList);
    setUsersList(await getUsersFromLocalStorage());

    //  console.log(filteredFriendList);
    // const filter = await users.filter((user) => user.id != auth.user);
    // setFilteredFriendList(filter);
  };

  const updateFriendRequestStatus = async (f, status) => {
    let friends = await getFriendsFromLocalStorage();
    friends = friends.filter(
      (friend) => parseInt(friend.id) !== parseInt(f.id)
    );
    if (status === "accepted") {
      const singleFriend = { ...f, status };
      friends.push(singleFriend);
      // e.target.innerHTML = status;
    }

    // Sort the numbers in descending order:
    friends.sort(function (a, b) {
      return a.id - b.id;
    });
    addFriendsToLocalStorage(friends);
    getFilteredFriendsList();
  };
  return (
    <>
      <Nav isActive={"dashboard"} />
      <AdminHeader isActive={"friends"} />
      <main className="dashboard">
        <aside className="dashboard__sidebar">
          <AdminNav isActive={"friends"} />
        </aside>
        <section className="dashboard__main ">
          <div className="friends ">
            {filteredFriendList.length ? (
              filteredFriendList
                .slice(0)
                .reverse()
                .map((friends, i) => {
                  return friends.map((friend) => {
                    if (parseInt(friend.senderId) === parseInt(authUser.user)) {
                      return usersList.map((user, j) => {
                        if (parseInt(friend.receiverId) === parseInt(user.id)) {
                          return (
                            <article key={j} className="friend">
                              <div className="friend__header">
                                <div className="friend__header__img">
                                  {Object.keys(user).length > 0 &&
                                  user.avatar ? (
                                    <img
                                      src={BASE_IMAGE_URL + user.avatar}
                                      alt={user.firstName}
                                    />
                                  ) : (
                                    <img
                                      src={DEFAULT_AVATAR}
                                      alt="Default Avatar"
                                    />
                                  )}
                                </div>
                              </div>

                              <div className="friend__content">
                                <div className="friend__content__title">
                                  <h3>
                                    {user.firstName + " " + user.lastName}
                                  </h3>
                                  <p>
                                    {friend.status === "pending"
                                      ? "You have sent friends request"
                                      : friend.status === "accepted"
                                      ? "You are friends"
                                      : null}
                                  </p>
                                </div>
                              </div>
                              <div className="friend__footer">
                                <div className="friend__footer--status">
                                  {friend.status === "pending" ? (
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        updateFriendRequestStatus(
                                          friend,
                                          "cancel"
                                        );
                                      }}
                                    >
                                      Cancle request
                                    </button>
                                  ) : friend.status === "accepted" ? (
                                    <>
                                      <button
                                        onClick={(e) => {
                                          e.preventDefault();
                                          updateFriendRequestStatus(
                                            friend,
                                            "cancle"
                                          );
                                        }}
                                      >
                                        Remove Friend
                                      </button>
                                    </>
                                  ) : null}
                                </div>
                              </div>
                            </article>
                          );
                        }
                      });
                    } else if (
                      parseInt(friend.receiverId) === parseInt(authUser.user)
                    ) {
                      return usersList.map((user, j) => {
                        if (parseInt(friend.senderId) === parseInt(user.id)) {
                          return (
                            <article key={j} className="friend">
                              <div className="friend__header">
                                <div className="friend__header__img">
                                  <img
                                    src={BASE_IMAGE_URL + user.avatar}
                                    alt={user.firstName}
                                  />
                                </div>
                              </div>
                              <div className="friend__content">
                                <div className="friend__content__title">
                                  <h3>
                                    {user.firstName + " " + user.lastName}
                                  </h3>
                                  <p>
                                    {friend.status === "pending"
                                      ? "You have received a friend request"
                                      : friend.status === "accepted"
                                      ? "You are friends"
                                      : null}
                                  </p>
                                </div>
                              </div>
                              <div className="friend__footer">
                                <div className="friend__footer--status">
                                  {friend.status === "pending" ? (
                                    <>
                                      <button
                                        onClick={(e) => {
                                          e.preventDefault();
                                          updateFriendRequestStatus(
                                           
                                            friend,
                                            "accepted"
                                          );
                                        }}
                                      >
                                        Accept
                                      </button>
                                      <button
                                        onClick={(e) => {
                                          e.preventDefault();
                                          updateFriendRequestStatus(
                                           
                                            friend,
                                            "rejected"
                                          );
                                        }}
                                      >
                                        Reject
                                      </button>
                                    </>
                                  ) : friend.status === "accepted" ? (
                                    <>
                                      <button
                                        onClick={(e) => {
                                          e.preventDefault();
                                          updateFriendRequestStatus(
                                           
                                            friend,
                                            "cancle"
                                          );
                                        }}
                                      >
                                        Remove Friend
                                      </button>
                                    </>
                                  ) : null}
                                </div>
                              </div>
                            </article>
                          );
                        }
                      });
                    }
                  });
                })
            ) : (
              <div className="friend__error ">
                <h2>You have made no friends :( </h2>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Friends;
