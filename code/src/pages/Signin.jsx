import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Header from "../components/Header";
import {
  validateCredentials,
  validateEmail,
  validatePassword,
} from "../settings/utils/validation";
import { messageDialogue } from "../settings/utils/message";
import {
  getUsersFromLocalStorage,
  setLoginCredentialsToLocalStorage,
} from "../settings/utils/localStorage";
import { token } from "../settings/utils/generateToken";
import { checkToken } from "../settings/utils/CheckSession";

const Signin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      if (await checkToken(navigate, "/signin")) {
        navigate("/dashboard", { replace: true });
      }
    })();
  }, [navigate]);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const getData = async (user) => {
    setLoginCredentialsToLocalStorage({
      token: token(),
      user,
    });
    navigate("/dashboard", { replace: true });
    // const res = await getApiData(AUTH_TOKEN_URL, "post");

    //   if (res.access_token) {
    //     setLoginCredentialsToLocalStorage({
    //       token: res.access_token,
    //       expire: res.expires_in,
    //     });
    //     navigate("/browse", { replace: true });
    //   } else {
    //   }
  };

  const handleChange = async (e) => {
    e.preventDefault();
    const field = e.target.name;
    const value = e.target.value;
    switch (field) {
      case "email":
        if (validateEmail(value, 0)) {
          setData({ ...data, email: value });
          messageDialogue(".emailMsg", "none", "green", "Email is valid");
        } else {
          setData({ ...data, email: "" });
          messageDialogue(".emailMsg", "block", "red", "Email is required");
          return false;
        }
        break;
      case "password":
        if (validatePassword(value, 8, 16)) {
          messageDialogue(".passwordMsg", "none", "green", "Password");
          setData({ ...data, password: value });
        } else {
          setData({ ...data, password: "" });
          messageDialogue(
            ".passwordMsg",
            "block",
            "red",
            "Password is required"
          );
          return false;
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateCredentials(data.email, data.password)) {
      messageDialogue(".formMsg", "block", "red", "Invalid Email or Password");
    } else {
      messageDialogue(".formMsg", "block", "green", "...Loading");

      const getUsers = await getUsersFromLocalStorage();
      if (getUsers === null) {
        messageDialogue(
          ".formMsg",
          "block",
          "red",
          "No User Found. Please Signup!!"
        );
      } else if (getUsers.length > 0) {
        const found = getUsers.some(
          (user) => user.email === data.email && user.password === data.password
        );
        if (found) {
          const user = getUsers.filter((user) => user.email === data.email);

          await getData(user[0].id);
        } else {
          messageDialogue(
            ".formMsg",
            "block",
            "red",
            "Invalid Email or Password"
          );
        }
      }
    }
  };

  return (
    <>
      <Nav isActive={"signin"} />
      <Header isActive={"signin"} />
      <main className="signin">
        <section className="signin__section"></section>
        <section className="signin__section">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="signin__section__form"
          >
            <div className="signin__section__form__heading">
              <h1>SIGNIN</h1>
            </div>
            <span className="formMsg"></span>
            <div className="signin__section__form__group">
              <input
                type="email"
                placeholder="Email Address"
                className="form-control email"
                name="email"
                aria-describedby="emailHelp"
                onChange={(e) => {
                  e.preventDefault();
                  handleChange(e);
                }}
              />
              <div className="form-text emailMsg"></div>
            </div>
            <div className="signin__section__form__group">
              <input
                placeholder="Password"
                type="password"
                className="form-control  password"
                name="password"
                onChange={(e) => {
                  e.preventDefault();
                  handleChange(e);
                }}
              />
              <div className="form-text passwordMsg"></div>
            </div>
            <button type="submit" className="signin__section__form--button">
              Submit
            </button>
            <div className="signin__section__form__group">
              <div className="signin__section__form__group--text">
                Don't have account? <Link to="/signup">Signup</Link>
              </div>
            </div>
          </form>
        </section>
      </main>

      <Footer isSticky={false} />
    </>
  );
};

export default Signin;
