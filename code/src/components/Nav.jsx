import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setLoginCredentialsToLocalStorage } from "../settings/utils/localStorage";
import { checkToken } from "../settings/utils/CheckSession";
import logoWhiteWatermark from "./../assets/icons/logo_w.png";

const Nav = ({ isActive }) => {
  library.add(fas);
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (await checkToken(navigate, "")) {
        setLoading(true);
      }
    })();
  }, [navigate]);

  return (
    <nav className="nav">
      <div className="nav__top">
        {isLoading ? (
          <>
            <div className="nav__top--left">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link
                    className={
                      isActive === "profile" ? "nav-link active" : "nav-link"
                    }
                    aria-current="page"
                    to="/dashboard/profile"
                  >
                    Admin
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={
                      isActive === "dashboard" ? "nav-link active" : "nav-link"
                    }
                    to="/dashboard"
                  >
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div className="nav__top--right">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link
                    className={
                      isActive === "signout" ? "nav-link active" : "nav-link"
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setLoginCredentialsToLocalStorage({
                        token: null,
                        user: null,
                      });
                      // removeUserCartFromLocalStorage();
                      // removeUserWishlistFromLocalStorage();
                      navigate("/signin", { replace: true });
                    }}
                  >
                    <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" />{" "}
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <div className="nav__top--left">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link
                    className={
                      isActive === "signin" ? "nav-link active" : "nav-link"
                    }
                    aria-current="page"
                    to="/"
                  >
                    Nosms@mail.com
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={
                      isActive === "signup" ? "nav-link active" : "nav-link"
                    }
                    to="/"
                  >
                    +000 123 123 123
                  </Link>
                </li>
              </ul>
            </div>
            <div className="nav__top--right">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link
                    className={
                      isActive === "signin" ? "nav-link active" : "nav-link"
                    }
                    to="/signin"
                  >
                    <FontAwesomeIcon icon="fa-solid fa-person-walking-arrow-right " />{" "}
                    Signin
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={
                      isActive === "signup" ? "nav-link active" : "nav-link"
                    }
                    to="/signup"
                  >
                    <FontAwesomeIcon icon="fa-solid fa-user-plus" /> Signup
                  </Link>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
      <div className="nav__main ">
        <div className="nav__main--left">
          <Link className="navbar-brand" to="/">
            <img
              src={logoWhiteWatermark}
              alt="NoSms logo"
              width={200}
              height={50}
            />
          </Link>
        </div>
        <div className="nav__main--right  navbar-expand-lg">
          <div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon">&#x2630;</span>
            </button>
          </div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={
                    isActive === "home" ? "nav-link active" : "nav-link"
                  }
                  to="/"
                >
                  <FontAwesomeIcon icon={["fas", "house"]} /> <span>Home</span>
                </Link>
              </li>
              {isLoading ? (
                <li className="nav-item">
                  <Link
                    className={
                      isActive === "people" ? "nav-link active" : "nav-link"
                    }
                    to="/pymk"
                  >
                    <FontAwesomeIcon icon={["fas", "users"]} />{" "}
                    <span>Connect</span>
                  </Link>
                </li>
              ) : null}
              <li className="nav-item">
                <Link
                  className={
                    isActive === "about" ? "nav-link active" : "nav-link"
                  }
                  to="/about"
                >
                  <FontAwesomeIcon icon={["fas", "info"]} /> <span>About</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    isActive === "contact" ? "nav-link active" : "nav-link"
                  }
                  to="/contact"
                >
                  <FontAwesomeIcon icon={["fas", "phone"]} />{" "}
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
