import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../components/Admin/AdminHeader";
import AdminNav from "../../components/Admin/AdminNav";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import {
  getLoginCredentialsFromLocalStorage,
  getUsersFromLocalStorage,
} from "../../settings/utils/localStorage";
import { checkToken } from "../../settings/utils/CheckSession";

const Profile = () => {
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      if (await checkToken(navigate, "/signin")) {
        getUserData();
      }
    })();
  }, [navigate]);
  const [data, setData] = useState({});
  const getUserData = async () => {
    const users = await getUsersFromLocalStorage();

    const auth = await getLoginCredentialsFromLocalStorage();

    const user = users.filter((user) => parseInt(user.id) === parseInt(auth.user));

    setData(user[0]);
  };

  return (
    <>
      <Nav isActive={"profile"} />
      <AdminHeader isActive={"profile"} />
      <main className="dashboard">
        <aside className="dashboard__sidebar">
          <AdminNav isActive={"profile"} />
        </aside>
        <section className="dashboard__main">
          <div className="dashboard__main__profile">
            <div className="dashboard__main__profile__header">
              <div className="dashboard__main__profile__header__img">
                {Object.keys(data).length > 0 && data != null ? (
                  <img
                    src={
                      "https://bits-bolts.000webhostapp.com/uploads/" +
                      data.avatar
                    }
                    alt={data.firstName}
                  />
                ) : (
                  <img
                    src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
                    alt=""
                  />
                )}
              </div>
            </div>

            <table className="table table-success table-hover">
              <thead>
                <tr>
                  <th>First Name</th>
                  <td>
                    {" "}
                    {Object.keys(data).length > 0 && data != null ? (
                      <h2>{data.firstName}</h2>
                    ) : (
                      <h2>First Name is not set</h2>
                    )}
                  </td>
                </tr>

                <tr>
                  <th>Last Name</th>
                  <td>
                    {" "}
                    {Object.keys(data).length > 0 && data != null ? (
                      <h2>{data.lastName}</h2>
                    ) : (
                      <h2>last Name is not set</h2>
                    )}
                  </td>
                </tr>

                <tr>
                  <th>Email</th>
                  <td>
                    {" "}
                    {Object.keys(data).length > 0 && data != null ? (
                      <h2>{data.email}</h2>
                    ) : (
                      <h2>Email is not set</h2>
                    )}
                  </td>
                </tr>

                <tr>
                  <th>Phone Number</th>
                  <td>
                    {" "}
                    {Object.keys(data).length > 0 && data != null ? (
                      <h2>{data.phoneNumber}</h2>
                    ) : (
                      <h2>Phonenumber is not set</h2>
                    )}
                  </td>
                </tr>

                <tr>
                  <th>Password</th>
                  <td>******** </td>
                </tr>
              </thead>
            </table>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Profile;
